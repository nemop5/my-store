import { getEnvironmentVariable } from "../variables/environment.variables";

export interface RedisConfiguration {
  expirationTime: string;
  url: string;
}

export function getRedisExpirationTime(): string | undefined {
  return getEnvironmentVariable("REDIS_EXPIRATION_TIME");
}

export function getRedisUrl(): string | undefined {
  return getEnvironmentVariable("REDIS_URL");
}
