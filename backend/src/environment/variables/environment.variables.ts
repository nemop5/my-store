export function getEnvironmentVariable(variableName: string): string | undefined {
  return process.env[variableName];
}
