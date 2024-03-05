import { api } from "../../../shared";

const url = "/api/products";

async function get(params) {
  const { itemId, ...query } = params;

  return itemId ? getById(itemId) : getAll(query);
}

async function getById(itemId) {
  return api
    .myStore({
      method: "get",
      url: `${url}/${itemId}`,
    })
    .then((response) => response.data);
}

async function getAll(params) {
  return api
    .myStore({
      method: "get",
      url,
      params,
    })
    .then((response) => response.data);
}

export const ProductService = {
  get,
};
