import { api } from "../../../shared";

const url = "/api/carts";

async function get() {
  return api
    .myStore({
      method: "get",
      url,
    })
    .then((response) => response.data);
}

async function addCart(products) {
  const data = { userId: 1, products };

  return api
    .myStore({
      method: "post",
      url,
      data,
    })
    .then((response) => response.data);
}

async function edit(updateItem) {
  //TO DO: cart edit
}

async function deleteCart(cartId) {
  return api.myStore({
    method: "delete",
    url: `${url}/${cartId}`,
  });
}

export const CartService = {
  get,
  addCart,
  edit,
  deleteCart
};
