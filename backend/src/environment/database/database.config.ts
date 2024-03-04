import { getEnvironmentVariable } from "../variables/environment.variables";

export interface DatabaseConfiguration {
  database_name: string;
  user: string;
  password: string;
  host: string;
  port: number;
}

export function getDatabaseName(): string | undefined {
  return getEnvironmentVariable("DATABASE_NAME");
}

export function getDatabaseUser(): string | undefined {
  return getEnvironmentVariable("DATABASE_USER");
}

export function getDatabasePassword(): string | undefined {
  return getEnvironmentVariable("DATABASE_PASSWORD");
}

export function getDatabaseHost(): string | undefined {
  return getEnvironmentVariable("DATABASE_HOST");
}

export function getDatabasePort(): number | undefined {
  const port = getEnvironmentVariable("DATABASE_PORT");
  return port ? +port : undefined;
}
