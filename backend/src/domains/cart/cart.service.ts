import { CartDoesNotExist } from "./cart.exceptions";
import { Cart } from "./cart.model";
import { cartRepository } from "./cart.repository";
import { ProductWithQuantity } from "../product";
import { Knex } from "knex";

interface CartService {
  getAll(): Promise<Cart[]>;
  getById(id: string): Promise<Cart>;
  createNew(cart: Cart, trx: Knex.Transaction): Promise<Cart>;
  addProductsToCart(cartId: string, products: ProductWithQuantity[], trx: Knex.Transaction): Promise<void>;
  updateCart(cart: Cart): Promise<Cart>;
  deleteCart(cart: Cart): Promise<void>;
}

async function getAll(): Promise<Cart[]> {
  return await cartRepository.getAll();
}

async function getById(id: string): Promise<Cart> {
  const foundCart = await cartRepository.getById(id);
  if (!foundCart) throw new CartDoesNotExist(id);

  return foundCart;
}

async function createNew(cart: Cart, trx: Knex.Transaction): Promise<Cart> {
  cart.totalProducts = cart.products.length;
  cart.totalQuantity = cart.products.reduce((acc, product) => acc + product.quantity, 0);
  cart.total = Math.round(cart.products.reduce((acc, product) => acc + product.price * product.quantity, 0) * 100) / 100;
  cart.discountedTotal = Math.round(cart.products.reduce(
    (acc, product) => acc + (product.price * (100 - product.discountPercentage) / 100) * product.quantity, 0
  ));
  const newCart = await cartRepository.createNew(cart, trx);
  await addProductsToCart(newCart.id, cart.products, trx);
  return newCart;
};

async function addProductsToCart(cartId: string, products: ProductWithQuantity[], trx: Knex.Transaction): Promise<void> {
  return await cartRepository.addProductsToCart(cartId, products, trx);
}

async function updateCart(cart: Cart): Promise<Cart> {
  return await cartRepository.update(cart);
}

async function deleteCart(cart: Cart): Promise<void> {
  return await cartRepository.deleteCart(cart);
}

export const cartService: CartService = {
  getAll,
  getById,
  createNew,
  addProductsToCart,
  updateCart,
  deleteCart
};
