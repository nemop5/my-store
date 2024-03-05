import { Knex } from "knex";
import { Table } from "../index";

exports.up = async (knex: Knex) => {
  await knex.schema.createTable(Table.CartProduct, (table) => {
    table.increments("id").primary();
    table.integer("cart_id").references("id").inTable(Table.Cart).notNullable();
    table.integer("product_id").references("id").inTable(Table.Product).notNullable();
    table.integer("quantity").notNullable();
    table.decimal("total", 10, 2).notNullable();
  });
};

exports.down = async (knex: Knex) => {
  await knex.schema.dropTable(Table.CartProduct);
};