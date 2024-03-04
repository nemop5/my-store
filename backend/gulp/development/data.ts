import { transaction } from "../../src/database";
import {
  createProducts,
  createCarts,
} from "./scripts";

export async function createDevelopmentData(): Promise<void> {
  await transaction(async (trx) => {
    await createProducts(trx);
    await createCarts(trx);
  });
}
