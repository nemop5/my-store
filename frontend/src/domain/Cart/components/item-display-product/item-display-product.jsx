import React, { useState } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';

import './item-display-product.scss';
import { useProductContext } from '../../../Product';

export const ItemDisplayProduct = ({ item }) => {
  const { selectedItems, updateSelection } = useProductContext();
  const [quantity, setQuantity] = useState(1);

  const handleIncrement = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
    const index = selectedItems.findIndex(obj => obj.original.id === item.id);
    if (index !== -1) {
      selectedItems[index].original = { ...item, quantity: quantity + 1}
      updateSelection(selectedItems);
    }
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity((prevQuantity) => prevQuantity - 1);
    }
    const index = selectedItems.findIndex(obj => obj.original.id === item.id);
    if (index !== -1) {
      selectedItems[index].original = { ...item, quantity: quantity - 1}
      updateSelection(selectedItems);
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
        <div className="item-discount">sniženo {item.discountPercentage}%</div>
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