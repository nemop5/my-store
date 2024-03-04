import { api } from "../../../shared";

const url = "/api/products";

async function get(params) {
  const { itemId, ...query } = params;

  return itemId ? getById(itemId) : getAll(query);
}

async function getById(itemId) {
  return api
    .inventar({
      method: "get",
      url: `${url}/${itemId}`,
    })
    .then((response) => response.data);
}

async function getAll(params) {
  return api
    .inventar({
      method: "get",
      url,
      params,
    })
    .then((response) => response.data);
}

async function getArchivedReasons() {
  return api.inventar({ method: "get", url: `${url}/archived-reasons` }).then((response) => response.data);
}

async function add(item, count) {
  const { company, category, amortizationType, location, owner, ...other } = item;
  const data = {
    ...other,
    companyId: company.id.toString(),
    ownerId: owner.id.toString(),
    categoryId: category.id.toString(),
    locationId: location?.id?.toString(),
    amortizationTypeId: amortizationType?.id?.toString(),
  };

  return api
    .inventar({
      method: "post",
      url: `${url}/?count=${count}`,
      data,
    })
    .then((response) => response.data);
}

async function update(updateItem) {
  const { company, category, serialNumber, id, owner, amortizationType, ...other } = updateItem;
  const data = {
    companyId: company.id.toString(),
    ownerId: owner.id.toString(),
    categoryId: category.id.toString(),
    serialNumber: serialNumber === null ? "" : serialNumber,
    id: id.toString(),
    amortizationTypeId: amortizationType?.id?.toString(),
    ...other,
  };

  return api
    .inventar({
      method: "put",
      url,
      data,
    })
    .then((response) => response.data);
}

async function exportData(params) {
  return api.inventar({
    method: "get",
    responseType: "arraybuffer",
    headers: { "Content-Type": "blob" },
    url: url + "/export",
    params,
  });
}

async function getIsSmallInventory(params) {
  return api
    .inventar({
      method: "get",
      url: `${url}/isSmallInventory`,
      params,
    })
    .then((response) => response.data);
}

async function deleteInventory(inventoryId, archivedReason) {
  return api.inventar({
    method: "delete",
    url: `${url}/${inventoryId}`,
    data: archivedReason,
  });
}

export const InventoryService = {
  get,
  getArchivedReasons,
  add,
  update,
  exportData,
  getIsSmallInventory,
  deleteInventory,
};
