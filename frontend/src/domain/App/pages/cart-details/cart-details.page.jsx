import React, { useState, useCallback } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useCartContext } from 'domain/Cart';

import { Spinner } from 'shared';

import './cart-details.page.scss';

export const CartDetailsPage = () => {
  const [editingCart, setEditingCart] = useState();
  const { carts, deleteCart } = useCartContext();

  const handleEdit = (cart) => {
    // TO DO: Handle edit logic, you can make an API call for editing cart
    setEditingCart(cart);
  };

  const handleDelete = useCallback((cartId) => {
    deleteCart(cartId)
      .then(() => {
        alert("Uspešno ste obrisali korpu!")
      })
    .catch((error) => console.log(error.response.data))
  }, []);

  const handleUpdateQuantity = (cart, productId, newQuantity) => {
    // TO DO: Handle updating quantity logic, you can make an API call for updating cart
  };

  const handleRemoveProduct = (cart, productId) => {
    // TO DO: Handle removing product logic, you can make an API call for removing product from cart
  };

  const handleSaveChanges = () => {
    // TO DO: Handle saving changes logic, you can make an API call to update the cart
    console.log(`Saving changes for cart with ID ${editingCart.id}`);
    setEditingCart(null); // Reset editing state after saving changes
  };

  const handleCancelEdit = () => {
    setEditingCart(null); // Reset editing state if canceled
  };

  if (!carts) return <Spinner />

  return (
    <div className="cart-page">
      <h1>Prikaz svih sačuvanih korpa</h1>
      {carts.sort((a, b) => b.id - a.id).map((cart) => (
        <div key={cart.id} className="cart-item">
          <h2>Korpa ID: {cart.id}</h2>
          <ul>
            {cart.products.map((product, index) => (
              <li key={index} className="product-item">
                <img src={product.thumbnail} alt={product.title} />
                <div>
                  <p>{product.title}</p>
                  <p>Cena: ${product.price}</p>
                  <p>Količina: {product.quantity}</p>
                  <p>Ukupno: ${product.total}</p>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Ukupno: ${cart.total}</p>
            <p>Ukupno sniženo: ${cart.discountedTotal}</p>
            <p>Ukupno proizvoda: {cart.totalProducts}</p>
            <p>Ukupna količina: {cart.totalQuantity}</p>
          </div>
          <div className="cart-actions">
            {editingCart?.id === cart.id ? (
              <>
                <button onClick={handleSaveChanges}>Sačuvaj promene</button>
                <button onClick={handleCancelEdit}>Otkaži</button>
              </>
            ) : (
              <>
                <button onClick={() => handleEdit(cart)}>
                  <FaEdit /> Izmeni korpu
                </button>
                <button onClick={() => handleDelete(cart.id)}>
                  <FaTrash /> Obriši korpu
                </button>
              </>
            )}
          </div>
          {editingCart?.id === cart.id && (
            <div className="edit-options">
              {cart.products.map((product, index) => (
                <div key={index} className="edit-option">
                  <p>{product.title}</p>
                  <label>Količina:</label>
                  <input
                    type="number"
                    min="1"
                    defaultValue={product.quantity}
                    onChange={(e) =>
                      handleUpdateQuantity(cart, product.id, parseInt(e.target.value, 10))
                    }
                  />
                  <button onClick={() => handleRemoveProduct(cart, product.id)}>
                    Ukloni proizvod
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}
    </div>
  );
};