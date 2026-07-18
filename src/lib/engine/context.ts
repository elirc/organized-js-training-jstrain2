export interface RunContextState {
  triggerData: Record<string, unknown>;
  steps: Record<string, { output: Record<string, unknown> }>;
}

export class RunContext {
  private state: RunContextState;

  constructor(triggerData: Record<string, unknown>) {
    this.state = {
      triggerData,
      steps: {},
    };
  }

  public setStepOutput(stepName: string, output: Record<string, unknown>): void {
    this.state.steps[this.normalizeStepName(stepName)] = { output };
  }

  public getState(): RunContextState {
    return this.state;
  }

  public resolvePath(path: string): unknown {
    const segments = path.split(".").filter(Boolean);
    let cursor: unknown = this.state;

    for (const segment of segments) {
      if (!cursor || typeof cursor !== "object") {
        return undefined;
      }
      cursor = (cursor as Record<string, unknown>)[segment];
    }

    return cursor;
  }

  public resolveTemplates(value: unknown): unknown {
    if (typeof value === "string") {
      return value.replace(/\{\{\s*([^{}]+?)\s*\}\}/g, (_, token: string) => {
        const resolved = this.resolvePath(token.trim());
        return resolved === undefined ? "" : String(resolved);
      });
    }

    if (Array.isArray(value)) {
      return value.map((item) => this.resolveTemplates(item));
    }

    if (value && typeof value === "object") {
      return Object.fromEntries(
        Object.entries(value as Record<string, unknown>).map(([key, nested]) => [key, this.resolveTemplates(nested)]),
      );
    }

    return value;
  }

  private normalizeStepName(name: string): string {
    return name.trim().toLowerCase().replace(/[^a-z0-9]+/g, "_");
  }
}
