import { getEnvironmentVariable } from "../variables/environment.variables";

export interface DummyServerConfiguration {
  url: string;
}

export function getDummyApiUrl(): string | undefined {
  return getEnvironmentVariable("DUMMY_API_URL");
}
