import { productService, Product } from "../../src/domains/product";
import { Cart, cartService } from "../../src/domains/cart";
import { dummyServerService } from "../../src/domains/dummy-server";
import { Knex } from "knex";

export async function createProducts(trx: Knex.Transaction): Promise<void> {
  const dummyProducts = await dummyServerService.getDummyProducts();
  if (!dummyProducts) return;
  await Promise.all(dummyProducts.products.map(async (product) => {
    return await productService.createNew(Product.fromDto(product), trx);
  }));
}

export async function createCarts(trx: Knex.Transaction): Promise<void> {
  const dummyCarts = await dummyServerService.getDummyCarts();
  if (!dummyCarts) return;
  await Promise.all(dummyCarts.carts.map(async (cart: Cart) => {
    await cartService.createNew(cart, trx);
    await cartService.addProductsToCart(cart.id, cart.products, trx);
  }));
}
