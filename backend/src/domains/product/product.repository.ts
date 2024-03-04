import { database, Table } from "../../database";
import { Product, ProdcutFilterQuery } from "./product.model";
import { Knex } from "knex";


interface ProductRepository {
  getAll(filters?: ProdcutFilterQuery): Promise<Product[]>;
  getById(id: string): Promise<Product | undefined>;
  createNew(product: Product, trx: Knex.Transaction): Promise<Product>;
}

async function getAll({searchTerm}: ProdcutFilterQuery): Promise<Product[]> {
  const rows = await database
    .select("id", "title", "description", "price", "discount_percentage", "rating", "stock", "brand", "category", "thumbnail", "images")
    .from(Table.Product)
    .where((queryBuilder) => {
      if (searchTerm) {
        queryBuilder.where(function () {
          this.whereRaw(`unaccent(replace(title, ' ', '')) ilike unaccent(replace('%${searchTerm}%', ' ', ''))`)
            .orWhereILike(`unaccent(replace(category, ' ', '')) ilike unaccent(replace('%${searchTerm}%', ' ', ''))`)
        });
      }
    });

  return rows.map(Product.fromEntity);
}

async function getById(id: string): Promise<Product | undefined> {
  const row = await database
    .select("id", "title", "description", "price", "discount_percentage", "rating", "stock", "brand", "category", "thumbnail", "images")
    .where({ id })
    .from(Table.Product)
    .first();
  return Product.fromEntity(row);
}

async function createNew(product: Product, trx: Knex.Transaction): Promise<Product> {
  const { id, title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, images } = product;
  const dbImages = JSON.stringify(images);
  const query = database.insert({id, title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, images: dbImages}).into(Table.Product).returning("*");
  const [row] = await query.transacting(trx);
  return Product.fromEntity(row);
}

export const productRepository: ProductRepository = {
  getAll,
  getById,
  createNew
};
