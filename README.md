This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Codex Watchdog Agent

This repo includes a watchdog agent that checks every 5 minutes if Codex appears stuck and then triggers a restart from the latest steps.

### Run Once

```bash
npm run watchdog:once
```

### Run Continuously

```bash
npm run watchdog
```

### What It Does

- Reads latest Codex session activity from `~/.codex/sessions`.
- If activity is stale long enough, writes restart context to:
  - `.watchdog/restart-from-last-steps.txt`
- Sends a restart command:
  - `codex exec --cd <workspace> "Watchdog detected Codex inactivity ..."`
- Logs checks and actions to:
  - `.watchdog/watchdog.log`

### Environment Variables

- `WATCHDOG_CHECK_MS` (default `300000`)
- `WATCHDOG_STUCK_MS` (default `900000`)
- `WATCHDOG_STALE_CHECKS` (default `2`)
- `WATCHDOG_RESTART_COOLDOWN_MS` (default `1800000`)
- `WATCHDOG_AUTO_RESTART` (default `true`)
- `WATCHDOG_STEP_LINES` (default `12`)
- `CODEX_WATCHDOG_WORKSPACE` (default current directory)
- `CODEX_SESSIONS_DIR` (default `~/.codex/sessions`)

### Windows Task Scheduler (Every 5 Minutes)

Run this once in PowerShell to keep watchdog alive:

```powershell
schtasks /Create /SC MINUTE /MO 5 /TN "CodexWatchdog" /TR "powershell -NoProfile -ExecutionPolicy Bypass -Command \"cd C:\Users\Owner\Desktop\jstrain2; npm run watchdog:once\"" /F
```

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
