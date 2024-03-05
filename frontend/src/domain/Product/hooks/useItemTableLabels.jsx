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
    return Object.keys(itemLabels).map((key) => {
      return {
        Header: itemLabels[key],
        accessor: key,
      };
    });
  }, []);

  return { columns };
}
