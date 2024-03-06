import { database, Table } from "../../database";
import { ProductWithQuantity } from "../product";
import { Cart } from "./cart.model";
import { Knex } from "knex";

interface CartRepository {
  getAll(): Promise<Cart[]>;
  getById(id: string): Promise<Cart | undefined>;
  createNew(cart: Cart, trx: Knex.Transaction): Promise<Cart>;
  addProductsToCart(cartId: string, products: ProductWithQuantity[], trx: Knex.Transaction): Promise<ProductWithQuantity[]>;
  update(cart: Cart): Promise<Cart>;
  deleteCart(cart: Cart): Promise<void>;
}

async function getAll(): Promise<Cart[]> {
  const rows = await database
    .select(
      "c.id",
      "c.total as total",
      "c.discounted_total as discounted_total",
      "c.user_id as user_id",
      "c.total_products as total_products",
      "c.total_quantity as total_quantity",
      database.raw("json_agg(jsonb_strip_nulls(to_jsonb(cp) - 'cart_id' - 'product_id' - 'id' || jsonb_build_object('product', jsonb_strip_nulls(to_jsonb(p) - 'id')))) as products")
    )
    .from(`${Table.Cart} as c`)
    .leftJoin(`${Table.CartProduct} as cp`, "c.id", "cp.cart_id")
    .leftJoin(`${Table.Product} as p`, "cp.product_id", "p.id")
    .groupBy("c.id");

  const carts = rows.map((row) => {
    return {
      ...row,
      products: row.products.map((product:any) => { 
        return { total: product.total, quantity: product.quantity, ...product.product }
      }) || [],
    };
  });

  return carts.map(Cart.fromEntity);
}

async function getById(id: string): Promise<Cart | undefined> {
  const row = await database.select("*").from(Table.Cart).where({ id }).first();
  return Cart.fromEntity(row);
}

async function createNew(cart: Cart, trx: Knex.Transaction): Promise<Cart> {
  const { total, discountedTotal, userId, totalProducts, totalQuantity } = cart;
  const query = database
    .insert({
      total: total,
      discounted_total: discountedTotal,
      user_id: userId,
      total_products: totalProducts,
      total_quantity: totalQuantity
    })
    .into(Table.Cart)
    .returning("*");
  const [row] = await query.transacting(trx);
  return Cart.fromEntity(row);
}

async function addProductsToCart(cartId: string, products: ProductWithQuantity[], trx: Knex.Transaction): Promise<ProductWithQuantity[]> {
  return await Promise.all(products.map(async (product) => {
    product.total = Math.round(product.price * product.quantity);
    const query = database.insert({cart_id: cartId, product_id: product.id, quantity: product.quantity, total: product.total}).into(Table.CartProduct);
    await query.transacting(trx);
    return product;
  }));
}

async function update(cart: Cart): Promise<Cart> {
  const { id, total, discountedTotal, userId, totalProducts, totalQuantity } = cart;
  const query = database.table(Table.Cart).where("id", id).update({total, discounted_total: discountedTotal, user_id: userId, total_products: totalProducts, total_quantity: totalQuantity}).returning("*");
  const [row] = await query;
  return Cart.fromEntity(row);
}

async function deleteCart(cart: Cart): Promise<void> {
  await database.table(Table.Cart).where("id", cart.id).delete();
}

export const cartRepository: CartRepository = {
  getAll,
  getById,
  createNew,
  addProductsToCart,
  update,
  deleteCart
};
