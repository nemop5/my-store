import type { Knex } from "knex";
import { getEnvironmentConfig } from "../environment/environment.config";
import { getDatabasePort } from "../environment/database/database.config";

const migrationsDirectory = __dirname + "/migrations";

const defaultConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: "postgres",
    user: "postgres",
    password: "postgres",
    database: "postgres",
    port: 5432,
  },
  pool: {
    min: 0,
    max: 7, // default from docs
  },
  //acquireConnectionTimeout: 10_000,
  migrations: {
    directory: migrationsDirectory,
    stub: `${migrationsDirectory}/../knex-migration.template.ts`,
    extension: "ts",
    loadExtensions: [".ts"],
  },
};

export function getAppDatabaseConfiguration(): Knex.Config {
  const { user, password, host, database_name, port } = getEnvironmentConfig().database;

  return {
    ...defaultConfig,
    connection: {
      user,
      host,
      password,
      database: database_name,
      port,
    },
  };
}

export const localPostgresDefaultConfig: Knex.Config = {
  client: "pg",
  connection: {
    host: "postgres",
    database: "postgres",
    user: "postgres",
    password: "postgres",
    port: getDatabasePort() || 5432,
  },
};

export default async () => {
  // We need this default export so the knex npm scripts like migrate:make will be able to find
  // a configuration.
  return getAppDatabaseConfiguration();
};
