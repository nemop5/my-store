import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import './item-display-product.scss';

export const ItemDisplayProduct = ({ item }) => {
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
  };

  return (
    <div className="item-display-info">
      <div className="thumbnail">
        <img src={item.thumbnail} alt={item.name} />
      </div>
      <div className="item-details">
        <div className="item-title">{item.title}</div>
        <div className="item-brand">{item.brand}</div>
        <div className="item-price">${item.price}</div>
        <div className="item-discount">sniženo {item.discount_percentage}%</div>
        <div className="item-description">{item.description}</div>
      </div>
      <div className="quantity">
        <button onClick={handleDecrement}>
          <FaMinus />
        </button>
        <span>{quantity}</span>
        <button onClick={handleIncrement}>
          <FaPlus />
        </button>
      </div>
    </div>
  );
};