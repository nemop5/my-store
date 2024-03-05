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
//   const { company, category, serialNumber, id, owner, amortizationType, ...other } = updateItem;
//   const data = {
//     companyId: company.id.toString(),
//     ownerId: owner.id.toString(),
//     categoryId: category.id.toString(),
//     serialNumber: serialNumber === null ? "" : serialNumber,
//     id: id.toString(),
//     amortizationTypeId: amortizationType?.id?.toString(),
//     ...other,
//   };

//   return api
//     .myStore({
//       method: "put",
//       url,
//       data,
//     })
//     .then((response) => response.data);
}

async function deleteCart(inventoryId, archivedReason) {
//   return api.myStore({
//     method: "delete",
//     url: `${url}/${inventoryId}`,
//     data: archivedReason,
//   });
}

export const CartService = {
  get,
  addCart,
  edit,
  deleteCart
};
