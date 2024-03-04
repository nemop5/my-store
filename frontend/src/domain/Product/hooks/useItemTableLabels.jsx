import { useMemo } from "react";

const itemLabels = {
  title: "Naziv",
  brand: "Brend",
  description: "Opis",
  category: "Kategorija",
  discount_percentage: "Popust",
  price: "Cena",
  rating: "Ocena",
  stock: "Komada",
  thumbnail: "Thumbnail",
  images: "Slike",
};

export function useItemTableLabels(displayedColumns) {
  const columns = useMemo(() => {
    const visibleColumns = Object.keys(itemLabels).reduce((itemLabel, key) => {
      itemLabel["button"] = "";

      if (displayedColumns[key]) {
        itemLabel[key] = itemLabels[key];
      }
      return itemLabel;
    }, {});

    return Object.keys(visibleColumns).map((key) => {
      return {
        Header: visibleColumns[key],
        accessor: key,
      };
    });
  }, [displayedColumns]);

  return { columns };
}
