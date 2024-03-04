export interface ProductEntity {
  id: string;
  title: string;
  description: string;
  price: number;
  discount_percentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: String[];
}

export interface ProductDto {
  id: string;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: String[];
}

export interface ProdcutFilterQuery {
  searchTerm?: string;
}

export class Product {
  constructor(
    public id: string,
    public title: string,
    public description: string,
    public price: number,
    public discount_percentage: number,
    public rating: number,
    public stock: number,
    public brand: string,
    public category: string,
    public thumbnail: string,
    public images: String[]
  ) {}

  static fromEntity(productEntity: ProductEntity): Product {
    const { id, title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, images  } = productEntity;
    return new Product(id, title, description, price, discount_percentage, rating, stock, brand, category, thumbnail, images);
  }

  static fromDto(productDto: ProductDto): Product {
    const { id, title, description, price, discountPercentage, rating, stock, brand, category, thumbnail, images } = productDto;
    return {
      id, title, description, price, discount_percentage: discountPercentage, rating, stock, brand, category, thumbnail, images,
    };
  }
}
