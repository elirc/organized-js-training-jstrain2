#!/usr/bin/env node

import fs from "node:fs";
import fsp from "node:fs/promises";
import os from "node:os";
import path from "node:path";
import { spawn } from "node:child_process";

const CHECK_INTERVAL_MS = Number.parseInt(process.env.WATCHDOG_CHECK_MS ?? "300000", 10);
const STUCK_AFTER_MS = Number.parseInt(process.env.WATCHDOG_STUCK_MS ?? "900000", 10);
const MIN_STALE_CHECKS = Number.parseInt(process.env.WATCHDOG_STALE_CHECKS ?? "2", 10);
const RESTART_COOLDOWN_MS = Number.parseInt(process.env.WATCHDOG_RESTART_COOLDOWN_MS ?? "1800000", 10);
const AUTO_RESTART = (process.env.WATCHDOG_AUTO_RESTART ?? "true").toLowerCase() === "true";
const MAX_STEP_LINES = Number.parseInt(process.env.WATCHDOG_STEP_LINES ?? "12", 10);

const workspace = process.env.CODEX_WATCHDOG_WORKSPACE ?? process.cwd();
const sessionRoot =
  process.env.CODEX_SESSIONS_DIR ?? path.join(os.homedir(), ".codex", "sessions");

const watchdogDir = path.join(workspace, ".watchdog");
const statePath = path.join(watchdogDir, "watchdog-state.json");
const promptPath = path.join(watchdogDir, "restart-from-last-steps.txt");
const logPath = path.join(watchdogDir, "watchdog.log");

async function ensureDir() {
  await fsp.mkdir(watchdogDir, { recursive: true });
}

function nowIso() {
  return new Date().toISOString();
}

async function log(message) {
  const line = `[${nowIso()}] ${message}\n`;
  await fsp.appendFile(logPath, line, "utf8");
  process.stdout.write(line);
}

async function readState() {
  try {
    const raw = await fsp.readFile(statePath, "utf8");
    return JSON.parse(raw);
  } catch {
    return {
      staleChecks: 0,
      lastRestartAt: 0,
      lastSessionPath: "",
      lastMtimeMs: 0,
      lastSize: 0,
    };
  }
}

async function writeState(state) {
  await fsp.writeFile(statePath, JSON.stringify(state, null, 2), "utf8");
}

async function findLatestSessionFile(rootDir) {
  if (!fs.existsSync(rootDir)) {
    return null;
  }

  const stack = [rootDir];
  let latest = null;

  while (stack.length > 0) {
    const current = stack.pop();
    if (!current) {
      continue;
    }

    let entries = [];
    try {
      entries = await fsp.readdir(current, { withFileTypes: true });
    } catch {
      continue;
    }

    for (const entry of entries) {
      const fullPath = path.join(current, entry.name);

      if (entry.isDirectory()) {
        stack.push(fullPath);
        continue;
      }

      if (!entry.isFile() || !entry.name.endsWith(".jsonl")) {
        continue;
      }

      let stats;
      try {
        stats = await fsp.stat(fullPath);
      } catch {
        continue;
      }

      if (!latest || stats.mtimeMs > latest.mtimeMs) {
        latest = {
          path: fullPath,
          mtimeMs: stats.mtimeMs,
          size: stats.size,
        };
      }
    }
  }

  return latest;
}

async function readLastLines(filePath, maxBytes = 400_000) {
  const stats = await fsp.stat(filePath);
  const start = Math.max(0, stats.size - maxBytes);
  const length = stats.size - start;
  const handle = await fsp.open(filePath, "r");

  try {
    const buffer = Buffer.alloc(length);
    await handle.read(buffer, 0, length, start);
    return buffer.toString("utf8").split(/\r?\n/).filter(Boolean);
  } finally {
    await handle.close();
  }
}

function extractStepSummary(lines) {
  const steps = [];

  for (const line of lines) {
    try {
      const parsed = JSON.parse(line);
      const payload = parsed?.payload ?? {};

      if (parsed?.type === "event_msg" && payload?.type === "agent_reasoning" && payload?.text) {
        steps.push(`reasoning: ${String(payload.text)}`);
        continue;
      }

      if (parsed?.type === "response_item" && payload?.type === "function_call" && payload?.name) {
        steps.push(`tool_call: ${String(payload.name)}`);
        continue;
      }

      if (parsed?.type === "response_item" && payload?.type === "message") {
        steps.push("assistant_message");
      }
    } catch {
      // Ignore malformed lines
    }
  }

  const deduped = [];
  for (const step of steps.reverse()) {
    if (!deduped.includes(step)) {
      deduped.push(step);
    }
    if (deduped.length >= MAX_STEP_LINES) {
      break;
    }
  }

  return deduped.reverse();
}

async function createRestartPrompt(sessionFile, mtimeMs) {
  const lines = await readLastLines(sessionFile);
  const summary = extractStepSummary(lines);

  const content = [
    "Codex appears stuck. Restart from the latest steps and continue.",
    `Workspace: ${workspace}`,
    `Session file: ${sessionFile}`,
    `Last activity: ${new Date(mtimeMs).toISOString()}`,
    "",
    "Recent steps:",
    ...(summary.length > 0 ? summary.map((line) => `- ${line}`) : ["- (no steps extracted)"]),
    "",
    "Instruction:",
    "Resume work from these last steps, avoid repeating completed work, and continue toward completion.",
  ].join("\n");

  await fsp.writeFile(promptPath, content, "utf8");
  return content;
}

async function triggerRestart(promptText) {
  if (!AUTO_RESTART) {
    await log(`Detected stuck state. Prompt written to ${promptPath} (auto restart disabled).`);
    return;
  }

  const compactPrompt = [
    "Watchdog detected Codex inactivity.",
    `Read and follow restart context from: ${promptPath}`,
    "Resume from last steps and continue the task.",
  ].join(" ");

  const child = spawn(
    "codex",
    ["exec", "--cd", workspace, compactPrompt],
    {
      detached: true,
      stdio: "ignore",
    },
  );

  child.unref();
  await log(`Detected stuck state. Restart command sent via 'codex exec'. Prompt snapshot saved (${promptText.length} chars).`);
}

async function checkOnce() {
  await ensureDir();

  const state = await readState();
  const latest = await findLatestSessionFile(sessionRoot);

  if (!latest) {
    await log(`No session file found under ${sessionRoot}.`);
    return;
  }

  const unchanged =
    state.lastSessionPath === latest.path &&
    state.lastMtimeMs === latest.mtimeMs &&
    state.lastSize === latest.size;

  state.staleChecks = unchanged ? state.staleChecks + 1 : 0;
  state.lastSessionPath = latest.path;
  state.lastMtimeMs = latest.mtimeMs;
  state.lastSize = latest.size;

  const ageMs = Date.now() - latest.mtimeMs;
  const stuck = ageMs >= STUCK_AFTER_MS && state.staleChecks >= MIN_STALE_CHECKS;

  if (!stuck) {
    await writeState(state);
    await log(
      `Healthy: latest session mtime=${new Date(latest.mtimeMs).toISOString()}, staleChecks=${state.staleChecks}, ageMs=${ageMs}.`,
    );
    return;
  }

  if (Date.now() - (state.lastRestartAt ?? 0) < RESTART_COOLDOWN_MS) {
    await writeState(state);
    await log("Stuck detected but restart cooldown is active. Skipping restart.");
    return;
  }

  const promptText = await createRestartPrompt(latest.path, latest.mtimeMs);
  await triggerRestart(promptText);
  state.lastRestartAt = Date.now();
  state.staleChecks = 0;

  await writeState(state);
}

async function main() {
  const once = process.argv.includes("--once");

  await checkOnce();

  if (once) {
    return;
  }

  await log(
    `Watchdog started. intervalMs=${CHECK_INTERVAL_MS}, stuckAfterMs=${STUCK_AFTER_MS}, autoRestart=${AUTO_RESTART}.`,
  );

  setInterval(() => {
    checkOnce().catch(async (error) => {
      await log(`Error during check: ${error instanceof Error ? error.message : String(error)}`);
    });
  }, CHECK_INTERVAL_MS);
}

main().catch(async (error) => {
  await ensureDir();
  await log(`Fatal error: ${error instanceof Error ? error.stack ?? error.message : String(error)}`);
  process.exit(1);
});
