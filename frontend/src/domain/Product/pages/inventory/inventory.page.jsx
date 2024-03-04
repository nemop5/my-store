import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import { useInventoryContext } from "../../context";

import { Spinner } from "shared";
import { ItemDisplayInfo } from "../../components";

import "./inventory.page.scss";

export const InventoryPage = () => {
  const [item, setItem] = useState(undefined);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const { getItem } = useInventoryContext();

  useEffect(() => {
    getItem(params.id)
    .then((data) => {
      setItem(data);
      setLoading(false);
      return data;
    })
  }, [getItem, params.id]);

  if (loading) return <Spinner size={"large"} />
  if (!item) return <div className="page__error"><h2 >Ne postoji proizvod sa traženim evidencionim brojem {params.id}</h2></div>;

  return (
    <>
      <div className="item-page">
        <div className="item-page__item">
          <div className="item-page__info">
            <ItemDisplayInfo
              item={item}
            />
          </div>
        </div>
      </div>
    </>
  );
};
