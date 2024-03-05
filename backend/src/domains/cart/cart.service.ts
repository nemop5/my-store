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
  return await cartRepository.createNew(cart, trx);
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
