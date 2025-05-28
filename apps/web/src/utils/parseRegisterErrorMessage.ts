export function parseRegisterErrorMessage(error: unknown): string[] {
  if (error instanceof Error) {
    try {
      const parsed = JSON.parse(error.message);
      if (
        Array.isArray(parsed) &&
        parsed.every((item) => typeof item === "string")
      ) {
        return parsed;
      }
      if (parsed.message && typeof parsed.message === "string") {
        return [parsed.message];
      }
      if (parsed.error && typeof parsed.error === "string") {
        return [parsed.error];
      }
    } catch {
      // Fall through to default case
    }
    return [error.message];
  }
  return ["An unexpected error occurred"];
}
