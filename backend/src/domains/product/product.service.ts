import { ProductDoesNotExist } from "./product.exceptions";
import { Product, ProdcutFilterQuery } from "./product.model";
import { productRepository } from "./product.repository";
import { Knex } from "knex";

interface ProductService {
  getAll(filters?: ProdcutFilterQuery): Promise<Product[]>;
  getById(id: string): Promise<Product | undefined>;
  createNew(product: Product, trx: Knex.Transaction): Promise<Product>;
}

async function getAll(filters?: ProdcutFilterQuery): Promise<Product[]> {
  return await productRepository.getAll(filters);
}

async function getById(id: string): Promise<Product | undefined> {
  const foundProduct = await productRepository.getById(id);
  if (!foundProduct) throw new ProductDoesNotExist(id);

  return foundProduct;
}

async function createNew(product: Product, trx: Knex.Transaction): Promise<Product> {
  return await productRepository.createNew(product, trx);
};

export const productService: ProductService = {
  getAll,
  getById,
  createNew
};
