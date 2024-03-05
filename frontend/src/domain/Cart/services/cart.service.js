import { api } from "../../../shared";

const url = "/api/carts";

async function get() {
  return api
    .inventar({
      method: "get",
      url,
    })
    .then((response) => response.data);
}

async function add(item, count) {
//   const { company, category, amortizationType, location, owner, ...other } = item;
//   const data = {
//     ...other,
//     companyId: company.id.toString(),
//     ownerId: owner.id.toString(),
//     categoryId: category.id.toString(),
//     locationId: location?.id?.toString(),
//     amortizationTypeId: amortizationType?.id?.toString(),
//   };

//   return api
//     .inventar({
//       method: "post",
//       url: `${url}/?count=${count}`,
//       data,
//     })
//     .then((response) => response.data);
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
//     .inventar({
//       method: "put",
//       url,
//       data,
//     })
//     .then((response) => response.data);
}

async function deleteCart(inventoryId, archivedReason) {
//   return api.inventar({
//     method: "delete",
//     url: `${url}/${inventoryId}`,
//     data: archivedReason,
//   });
}

export const CartService = {
  get,
  add,
  edit,
  deleteCart
};
