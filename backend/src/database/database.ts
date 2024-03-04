import { knex, Knex } from "knex";
import { getAppDatabaseConfiguration } from "./knexfile";

let knexInstance: Knex;

export function getKnexInstance(): Knex {
  if (!knexInstance) {
    const configuration = getAppDatabaseConfiguration();
    knexInstance = knex(configuration);
  }

  return knexInstance;
}
