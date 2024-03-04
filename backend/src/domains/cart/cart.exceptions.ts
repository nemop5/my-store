import { Cart } from "./cart.model";
import { EntityAlreadyExists, EntityDoesNotExist } from "../../web/response";

export class CartDoesNotExist extends EntityDoesNotExist {
  constructor(id: string) {
    super(Cart.name, id);
  }
}

export class CartAlreadyExists extends EntityAlreadyExists {
  constructor(message: string) {
    super(message);
  }
}
