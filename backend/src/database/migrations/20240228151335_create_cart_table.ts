import { Knex } from "knex";
import { Table } from "../index";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(Table.Cart, (table) => {
    table.increments("id").primary();
    table.decimal("total", 10, 2).notNullable();
    table.decimal("discounted_total", 10, 2).notNullable();
    table.integer("user_id").notNullable();
    table.integer("total_products", 10000).notNullable();
    table.integer("total_quantity", 10000).notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(Table.Cart);
};