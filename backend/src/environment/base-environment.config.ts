import { DatabaseConfiguration } from "./database/database.config";
import { DummyServerConfiguration } from "./dummy-server/dummy-server.config";
import { RedisConfiguration } from "./redis/redis.config";
import { EnvironmentException } from "./environment.exceptions";

interface EnvironmentConfig {
  database: Partial<DatabaseConfiguration>;
  dummyServer: Partial<DummyServerConfiguration>;
  redis: Partial<RedisConfiguration>;
}

export abstract class Environment implements EnvironmentConfig {
  protected constructor(
    public database: Partial<DatabaseConfiguration>,
    public dummyServer: Partial<DummyServerConfiguration>,
    public redis: Partial<RedisConfiguration>
  ) {
    const { user, password, host, database_name, port } = database;
    if (!user) {
      throw new EnvironmentException("Database user name not found");
    }

    if (!password) {
      throw new EnvironmentException("Database password not found");
    }

    if (!host) {
      throw new EnvironmentException("Database host not found");
    }

    if (!database_name) {
      throw new EnvironmentException("Database name not found");
    }

    if (!port) {
      throw new EnvironmentException("Database port not found");
    }

    const { url } = dummyServer;

    if (!url) {
      throw new EnvironmentException("Dummy server url not found");
    }

    const { expirationTime } = redis;

    if (!expirationTime) {
      throw new EnvironmentException("Redis expiration time not found");
    }
  }
}
