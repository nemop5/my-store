import { Knex } from "knex";
import { getKnexInstance } from "./database";

export const database = getKnexInstance();

export async function transaction<T>(callback: (callbackTransaction: Knex.Transaction) => Promise<T>) {
  let result: T;
  await database.transaction(async (trx: Knex.Transaction) => {
    try {
      result = await callback(trx);
      await trx.commit();
    } catch (error) {
      await trx.rollback(error);
      throw error;
    }
  });
  return result!;
}

export enum Table {
  Product = "product",
  Cart = "cart",
  CartProduct = "cart_product"
}
