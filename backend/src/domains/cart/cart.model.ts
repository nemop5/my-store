import { ProductWithQuantity } from "../product";

export interface CartEntity {
  id: string;
  products: ProductWithQuantity[];
  total: number,
  discounted_total: number,
  user_id: number,
  total_products: number,
  total_quantity: number
}

export interface CartDto {
  id: string;
  products: ProductWithQuantity[];
  total: number;
  discountedTotal: number;
  userId: number;
  totalProducts: number;
  totalQuantity: number;
}

export class Cart {
  constructor(
    public id: string,
    public products: ProductWithQuantity[],
    public total: number,
    public discountedTotal: number,
    public userId: number,
    public totalProducts: number,
    public totalQuantity: number,
  ) {}

  static fromEntity(cartEntity: CartEntity): Cart {
    const { id, products, total, discounted_total, user_id, total_products, total_quantity } = cartEntity;
    return new Cart(id, products, total, discounted_total, user_id, total_products, total_quantity);
  }

  static fromDto(cartDto: CartDto): Omit<Cart, "id"> {
    const { products, total, discountedTotal, userId, totalProducts, totalQuantity } = cartDto;
    return { products, total, discountedTotal, userId, totalProducts, totalQuantity };
  }
}
