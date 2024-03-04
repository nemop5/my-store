import * as gulp from "gulp";
import knex, { Knex } from "knex";

import { localPostgresDefaultConfig, getAppDatabaseConfiguration } from "../src/database/knexfile";
import { createDevelopmentData } from "./development/data";
import { getEnvironmentConfig } from "../src/environment/environment.config";

// migrations
gulp.task("migrate-db:dev", async () => {
  await migrateDatabase();
});

gulp.task("migrate:up", async () => {
  const knexConfig = getAppDatabaseConfiguration();
  await knex(knexConfig)
    .migrate.up()
    .catch((err) => console.log(err))
    .then((migration) => {
      if (migration[1].length === 0) return console.log("Migrations are up to date");
      console.log("Successfully roll up migration", migration[1]);
    });
});

gulp.task("migrate:down", async () => {
  const knexConfig = getAppDatabaseConfiguration();
  await knex(knexConfig)
    .migrate.down()
    .catch((err) => console.log(err))
    .then((migration) => console.log("Successfully roll down migration", migration[1]));
});

gulp.task("migrate:make", async () => {
  const knexConfig = getAppDatabaseConfiguration();
  const nameIndex = process.argv.indexOf("--name");

  await knex(knexConfig)
    .migrate.make(process.argv[nameIndex + 1])
    .then((migrationPath) => console.log("New migration created: ", [migrationPath]));
});

// production operations
gulp.task("migrate-db:latest", async () => {
  await migrateDatabase();
});

// creating development data
gulp.task("create-data:dev", async () => {
  await createDevelopmentData();
});

// creating/dropping database
gulp.task(
  "create-db:dev",
  gulp.series(
    async () => {
      await createLocalDatabase();
    },
    "migrate-db:dev",
    "create-data:dev"
  )
);

gulp.task("drop-db:dev", async () => {
  await dropLocalDatabase();
});

gulp.task("recreate-db:dev", gulp.series("drop-db:dev", "create-db:dev"));

async function createLocalDatabase(): Promise<void> {
  const databaseConfiguration = getEnvironmentConfig().database;

  await openLocalDefaultDatabaseConnection(async (knexInstance: Knex) => {
    await knexInstance.raw(`CREATE DATABASE ${databaseConfiguration.database_name}`);
  });
}

async function dropLocalDatabase(): Promise<void> {
  const databaseConfiguration = getEnvironmentConfig().database;

  await openLocalDefaultDatabaseConnection(async (knexInstance: Knex) => {
    await knexInstance.raw(`DROP DATABASE IF EXISTS ${databaseConfiguration.database_name}`);
  });
}

async function openLocalDefaultDatabaseConnection(callback: (knexInstance: Knex) => Promise<void>): Promise<void> {
  const knexInstance = knex(localPostgresDefaultConfig);

  try {
    await callback(knexInstance);
  } catch (e) {
    //eslint-disable-next-line no-console
    console.log(e);
    throw e;
  } finally {
    await knexInstance.destroy();
  }
}

async function openDatabaseConnection(
  knexConfig: Knex.Config,
  callback: (knexInstance: Knex) => Promise<void>
): Promise<void> {
  const knexInstance = knex(knexConfig);

  try {
    await callback(knexInstance);
  } catch (e) {
    //eslint-disable-next-line no-console
    console.log(e);
    throw e;
  } finally {
    await knexInstance.destroy();
  }
}

async function migrateDatabase(): Promise<void> {
  const knexConfig = getAppDatabaseConfiguration();

  await openDatabaseConnection(knexConfig, async (knexInstance) => {
    await knexInstance.migrate.latest();
  });
}
