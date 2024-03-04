import { Knex } from "knex";
import { Table } from "../index";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(Table.Product, (table) => {
    table.increments("id").primary();
    table.string("title", 100).notNullable();
    table.string("description", 500);
    table.decimal("price", 12, 2).notNullable();
    table.decimal("discount_percentage", 10, 2).notNullable();
    table.decimal("rating", 10, 2).notNullable();
    table.integer("stock", 1000).notNullable();
    table.string("brand", 100).notNullable();
    table.string("category", 100).notNullable();
    table.string("thumbnail", 100).notNullable();
    table.json("images");
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(Table.Product);
};