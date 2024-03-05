import React from "react";
import { ItemDisplayValue } from "../item-display-value/item-display-value";

import "./item-display-info.scss";

export const ItemDisplayInfo = ({ item }) => {
  return (
    <>
      <div><img src={item.thumbnail} alt={"Nema slike"} style={{ maxWidth: '100%', height: 'auto' }} /></div>
      <hr />
      <ItemDisplayValue label="Naziv predmeta" value={item.title} />
      <ItemDisplayValue label="Brend" value={item.brand} />
      <ItemDisplayValue label="Kategorija" value={item.category} />
      <ItemDisplayValue label="Opis proizvoda" value={item.description} />
      <ItemDisplayValue label="Rejting" value={item.rating} />
      <hr />
      <ItemDisplayValue label="Cena" value={item.price} />
      <ItemDisplayValue label="Popust u %" value={item.discount_percentage} />
      <hr />
      <ItemDisplayValue label="Stock" value={item.stock} />
      <hr />
      <div className="images_table_wrap" style={{ display: 'flex', flexWrap: 'wrap' }}>
        {item.images?.map((image, index) => (
          <div key={index} style={{ flex: '0 0 48%', margin: '1%' }}>
            <img src={image} alt={"Nema slike"} style={{ width: '100%', height: 'auto' }} />
          </div>
        ))}
      </div>
    </>
  );
};
