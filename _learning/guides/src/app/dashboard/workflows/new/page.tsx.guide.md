# Guide: src/app/dashboard/workflows/new/page.tsx

## Purpose
This file defines a Next.js App Router page/layout entrypoint. It controls what users see and how route-level UI is composed.

## Line-by-line walkthrough

### Imports (what and why)
- L1: `import { WorkflowBuilderShell } from "@/components/workflow-builder/Canvas";` imports from `@/components/workflow-builder/Canvas` so this module can use that dependency.

### Functions and components
- L3: **NewWorkflowPage** (default function) - signature: `export default function NewWorkflowPage() {`.

### Ordered walkthrough
- L1: `import { WorkflowBuilderShell } from "@/components/workflow-builder/Canvas";` - Imports a dependency so this module can use external functionality.
- L3: `export default function NewWorkflowPage() {` - Contributes to the local implementation details in this scope.
- L4: `return (` - Returns data/UI to the caller, ending the current function path.
- L5: `<section className="mx-auto w-full max-w-7xl px-6 py-10">` - Declares JSX UI structure rendered by this React component.
- L6: `<h1 className="mb-6 text-3xl font-semibold">New Workflow</h1>` - Declares JSX UI structure rendered by this React component.
- L7: `<WorkflowBuilderShell workflowId={null} />` - Declares JSX UI structure rendered by this React component.
- L8: `</section>` - Declares JSX UI structure rendered by this React component.
- L9: `);` - Contributes to the local implementation details in this scope.
- L10: `}` - Contributes to the local implementation details in this scope.

### State management
This file is mostly stateless. Most values are local constants or function parameters.

### Scope and closures
Scope is straightforward: module-level constants and function-local variables with no tricky closure behavior.

### Control flow
Control flow is mostly linear: input comes in, transformations run, and a value is returned.

### Side effects
No major external side effects; this file mostly shapes data or UI.

### TypeScript types and contracts
Type usage is light here; contracts are mostly inferred from function signatures and library types.

## Concepts taught by this file
- react component composition

## Common mistakes
- Changing this file without updating dependent modules.
- Ignoring edge-case error paths.
- Skipping tests/docs for behavior changes.

## Mini exercises
- Rename one variable to improve clarity, then explain why readability improved.
- Add one guard for invalid input and document expected behavior.
- Trace one value from input to output in this file and write the path as comments.

## Further reading
- react component composition: search for "React component composition patterns"
