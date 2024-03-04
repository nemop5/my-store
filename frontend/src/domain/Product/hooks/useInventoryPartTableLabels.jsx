import { useMemo } from "react";

const itemLabels = {
  itemId: "Evidencioni broj",
  label: "Naziv dela",
  purchasePrice: "Nabavna cena",
  serialNumber: "Serijski broj",
};

const modalLabels = {
  itemId: "Evidencioni broj",
  label: "Naziv predmeta",
  serialNumber: "Serijski broj",
};

export function useInventoryPartTableLabels(type) {
  const keys = type === "modal" ? modalLabels : itemLabels;
  const columns = useMemo(
    () =>
      Object.keys(keys).map((key) => {
        return {
          Header: type === "modal" ? modalLabels[key] : itemLabels[key],
          accessor: key,
        };
      }),
    [keys, type]
  );

  return { columns };
}
