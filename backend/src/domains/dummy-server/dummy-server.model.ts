import { Cart } from "../cart";
import { ProductDto } from "../product";

export interface DummyProducts {
  products: ProductDto[];
  total: number;
  skip: number;
  limit: number;
}

export interface DummyCarts {
  carts: Cart[];
  total: number;
  skip: number;
  limit: number;
}
