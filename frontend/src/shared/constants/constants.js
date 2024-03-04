import { ExportFileFormat } from "../enums";

export const actionTypeStrings = {
  created: "CREATED",
  updated: "UPDATED",
  deleted: "DELETED",
  part_updated: "PART_UPDATED",
  parent_updated: "PARENT_UPDATED",
};

export const actionTypeMap = new Map([
  [actionTypeStrings.created, "created"],
  [actionTypeStrings.updated, "updated"],
  [actionTypeStrings.deleted, "deleted"],
  [actionTypeStrings.part_updated, "part_updated"],
  [actionTypeStrings.parent_updated, "parent_updated"],
]);

export const sortingDirectionMap = new Map([
  ["DESCEND", "desc"],
  ["ASCEND", "asc"],
]);

export const sortingOptions = [
  { value: "purchase_date", name: "Datum nabavke" },
  { value: "purchase_price", name: "Cena nabavke" },
  { value: "created_at", name: "Datumu kreiranja" },
];

export const exportFileFormats = [
  { key: ExportFileFormat.CSV, name: "csv" },
  { key: ExportFileFormat.XLSX, name: "xlsx" },
];

export const partChangeLabels = new Map([
  ["TOTAL_PRICE", "Promena ukupne cene konfiguracije:"],
  ["IS_PARENT_SMALL_INVENTORY", "Promena tipa konfiguracije:"],
  ["IS_SMALL_INVENTORY", "Promena tipa za sve izabrane delove:"],
  ["ASSIGNED_TO", "Kolega:"],
  ["IS_ARCHIVED", "Arhivirano:"],
  ["LABEL", "Promena naziva:"],
  ["ITEM_ID", "Promena ID-ja:"],
  ["PURCHASE_PRICE", "Promena kupovne cene:"],
  ["TOTAL_PRICE", "Promena ukupne cene:"],
  ["AMORTIZATION_TYPE_ID", "Promena amortizacijskog tipa:"],
  ["SERIAL_NUMBER", "Promena serijskog broja:"],
  ["PURCHASE_DATE", "Promena datuma kupovine:"],
  ["CATEGORY_ID", "Promena kategorije:"],
  ["NAVIGATOR_ID", "Promena ID-ja u Navigatoru:"],
  ["COMPANY_ID", "Promena ID-ja kompanije:"],
  ["COMPANY_NAME", "Promena vlasništva:"],
  ["OWNER_ID", "Promena ID-ja vlasnika:"],
  ["ACTIVATION_DATE", "Datum aktiviranja predmeta:"],
]);

export const partCreateLabels = new Map([
  ["TOTAL_PRICE", "Ukupne cena konfiguracije:"],
  ["IS_PARENT_SMALL_INVENTORY", "Tip konfiguracije:"],
  ["IS_SMALL_INVENTORY", "Tip:"],
  ["ASSIGNED_TO", "Dodeljeno kolegi:"],
  ["LABEL", "Naziv:"],
  ["ITEM_ID", "ID:"],
  ["PURCHASE_PRICE", "Kupovna cena:"],
  ["TOTAL_PRICE", "Ukupna cena:"],
  ["AMORTIZATION_TYPE_ID", "Amortizacijski tip:"],
  ["SERIAL_NUMBER", "Serijski broj:"],
  ["PURCHASE_DATE", "Datum kupovine:"],
  ["CATEGORY_NAME", "Kategorija:"],
  ["NAVIGATOR_ID", "ID u Navigatoru:"],
  ["COMPANY_NAME", "Kompanija:"],
  ["OWNER_ID", "ID vlasnika:"],
]);

export const historyExtraTypeMap = new Map([
  ["ASSIGNED_TO", "assignedTo"],
  ["IS_ARCHIVED", "isArchived"],
  ["IS_SMALL_INVENTORY", "isSmallInventory"],
  ["LABEL", "label"],
  ["ITEM_ID", "itemId"],
  ["PURCHASE_PRICE", "purchasePrice"],
  ["TOTAL_PRICE", "totalPrice"],
  ["AMORTIZATION_TYPE_ID", "amortizationTypeId"],
  ["SERIAL_NUMBER", "serialNumber"],
  ["PURCHASE_DATE", "purchaseDate"],
  ["CATEGORY_NAME", "categoryName"],
  ["NAVIGATOR_ID", "navigatorId"],
  ["COMPANY_NAME", "companyName"],
  ["OWNER_ID", "ownerId"],
  ["ACTIVATION_DATE", "activationDate"],
]);

export const common = {
  PREFERRED_FE_DATE_FORMAT: "DD/MM/YYYY",
  PREFERRED_BE_DATE_FORMAT: "YYYY-MM-DD",
  MAX_VISABLE_INVENTORY_TABLE_COLUMNS: 8,
};

export const invoiceQueryParams = {
  limit: 10,
};

export const DISPLAYED_COLUMNS = "displayedColumns";
export const initialDisplayedColumns = {
  title: true,
  brand: true,
  description: true,
  category: true,
  assignedTo: true,
  discount_percentage: true,
  price: true,
  rating: true,
  stock: true,
  thumbnail: true,
  images: true,
};

export const inventoryTableColumns = [
  {
    key: "navigatorId",
    description: "Navigator id",
  },
  {
    key: "itemId",
    description: "Evidencioni broj",
  },
  {
    key: "isSmallInventory",
    description: "Tip",
  },

  {
    key: "category.name",
    description: "Kategorija",
  },
  {
    key: "label",
    description: "Naziv",
  },
  {
    key: "assignedTo",
    description: "Dodeljeno kolegi",
  },
  {
    key: "company.owner",
    description: "Vlasnik",
  },
  {
    key: "company.name",
    description: "Korisnik",
  },
  {
    key: "location.office",
    description: "Lokacija",
  },
  {
    key: "activationDate",
    description: "Datum aktivacije",
  },
  {
    key: "invoice.number",
    description: "Broj fakture",
  },
  {
    key: "invoice.purchaseDate",
    description: "Datum fakture",
  },
  {
    key: "supplier",
    description: "Dobavljač",
  },
];

export const ARCHIVED_REASON = {
  CreationMistake: "creationMistake",
  Duplicated: "duplicatedInventory",
};

export const WORK_FROM_HOME = "Working from home";
