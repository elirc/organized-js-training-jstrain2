import { eq } from "drizzle-orm";
import { db, pool } from "@/lib/db";
import { tenantMembers, tenants, users, workflowSteps, workflows } from "@/lib/db/schema";
import { hashPassword, randomSecret } from "@/lib/utils/crypto";

async function run(): Promise<void> {
  const existingUser = await db.query.users.findFirst({
    where: eq(users.email, "test@flowpilot.dev"),
  });

  let userId = existingUser?.id;
  if (!userId) {
    const passwordHash = await hashPassword("password123");
    const [created] = await db
      .insert(users)
      .values({
        email: "test@flowpilot.dev",
        passwordHash,
        name: "FlowPilot Test User",
      })
      .returning({ id: users.id });
    userId = created.id;
  }

  const existingTenant = await db.query.tenants.findFirst({ where: eq(tenants.slug, "acme") });
  let tenantId = existingTenant?.id;
  if (!tenantId) {
    const [createdTenant] = await db
      .insert(tenants)
      .values({ name: "Acme Corp", slug: "acme", plan: "pro", maxConcurrency: 5, maxWorkflows: 100 })
      .returning({ id: tenants.id });
    tenantId = createdTenant.id;
  }

  await db
    .insert(tenantMembers)
    .values({ tenantId, userId, role: "owner" })
    .onConflictDoNothing({ target: [tenantMembers.tenantId, tenantMembers.userId] });

  const samples = [
    {
      name: "GitHub PR Notifier",
      triggerType: "webhook",
      triggerConfig: { source: "github" },
      steps: [
        { stepType: "transform", name: "Extract PR Data", config: { code: "return { title: input.payload?.pull_request?.title, author: input.payload?.pull_request?.user?.login };" } },
        { stepType: "http_request", name: "Post to Slack", config: { url: "https://example.com/slack-webhook", method: "POST", body: { text: "{{steps.extract_pr_data.output.title}}" } } },
      ],
    },
    {
      name: "Data Pipeline",
      triggerType: "manual",
      triggerConfig: {},
      steps: [
        { stepType: "http_request", name: "Fetch CSV", config: { url: "https://example.com/data.csv", method: "GET" } },
        { stepType: "transform", name: "Parse Rows", config: { code: "return { rows: (input.responseText || '').split('\\n').length };" } },
        { stepType: "webhook_send", name: "Notify Completion", config: { url: "https://example.com/notify", method: "POST", signingSecret: randomSecret(16) } },
      ],
    },
    {
      name: "Conditional Router",
      triggerType: "webhook",
      triggerConfig: { source: "generic" },
      steps: [
        { stepType: "transform", name: "Extract Type", config: { code: "return { type: input.payload?.type };" } },
        {
          stepType: "condition",
          name: "Route by Type",
          config: {
            expression: "steps.extract_type.output.type",
            branches: [
              { condition: "steps.extract_type.output.type == 'order'", nextStepId: "branch-order" },
              { condition: "steps.extract_type.output.type == 'refund'", nextStepId: "branch-refund" },
            ],
          },
        },
      ],
    },
  ] as const;

  for (const sample of samples) {
    const existingWorkflow = await db.query.workflows.findFirst({
      where: eq(workflows.name, sample.name),
    });
    if (existingWorkflow) {
      continue;
    }

    const [createdWorkflow] = await db
      .insert(workflows)
      .values({
        tenantId,
        createdBy: userId,
        name: sample.name,
        triggerType: sample.triggerType,
        triggerConfig: sample.triggerConfig,
      })
      .returning({ id: workflows.id });

    await db.insert(workflowSteps).values(
      sample.steps.map((step, index) => ({
        workflowId: createdWorkflow.id,
        stepType: step.stepType,
        name: step.name,
        position: index,
        config: step.config,
        inputMapping: {},
      })),
    );
  }
}

run()
  .then(async () => {
    await pool.end();
    process.exit(0);
  })
  .catch(async (error: unknown) => {
    console.error(error);
    await pool.end();
    process.exit(1);
  });
