import { Environment } from "./base-environment.config";
import {
  DatabaseConfiguration,
  getDatabaseHost,
  getDatabaseName,
  getDatabasePassword,
  getDatabasePort,
  getDatabaseUser,
} from "./database/database.config";
import { DummyServerConfiguration, getDummyApiUrl } from "./dummy-server/dummy-server.config";
import { RedisConfiguration, getRedisExpirationTime, getRedisUrl } from "./redis/redis.config";

export class DevelopmentEnvironment extends Environment {
  constructor() {
    const database: Partial<DatabaseConfiguration> = {
      user: getDatabaseUser(),
      password: getDatabasePassword(),
      database_name: getDatabaseName(),
      host: getDatabaseHost(),
      port: getDatabasePort(),
    };

    const dummyServer: Partial<DummyServerConfiguration> = {
      url: getDummyApiUrl()
    };

    const redis: Partial<RedisConfiguration> = {
      expirationTime: getRedisExpirationTime(),
      url: getRedisUrl(),
    };

    super(database, dummyServer, redis);
  }
}
