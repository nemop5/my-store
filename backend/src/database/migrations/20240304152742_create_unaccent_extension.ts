import { Knex } from "knex";

exports.up = async (knex: Knex) => {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "unaccent"');
};

exports.down = async (knex: Knex) => {
  await knex.raw('DROP EXTENSION IF EXISTS "unaccent"');
};
