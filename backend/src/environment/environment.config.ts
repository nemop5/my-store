import { DevelopmentEnvironment } from "./development.environment";
import { Environment } from "./base-environment.config";

export function getEnvironmentConfig(): Environment {
  return new DevelopmentEnvironment();
}
