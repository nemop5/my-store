import { Product } from "./product.model";
import { EntityAlreadyExists, EntityDoesNotExist } from "../../web/response";

export class ProductDoesNotExist extends EntityDoesNotExist {
  constructor(id: string) {
    super(Product.name, id);
  }
}

export class ProductyAlreadyExists extends EntityAlreadyExists {
  constructor(message: string) {
    super(message);
  }
}
