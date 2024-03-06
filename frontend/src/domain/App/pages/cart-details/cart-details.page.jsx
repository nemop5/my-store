import React, { useEffect } from 'react';
import { FaEdit, FaTrash } from 'react-icons/fa';
import { useCartContext } from 'domain/Cart';

import { Spinner } from 'shared';

import './cart-details.page.scss';

export const CartDetailsPage = () => {
  const { carts } = useCartContext();

  const handleEdit = (cartId) => {
    // TO DO: Handle edit logic, you can make an API call for editing cart
    console.log(`Editing cart with ID ${cartId}`);
  };

  const handleDelete = (cartId) => {
    // TO DO: Handle delete logic, you can make an API call for deleting cart
    console.log(`Deleting cart with ID ${cartId}`);
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
            <button onClick={() => handleEdit(cart.id)}><FaEdit /> Izmeni korpu</button>
            <button onClick={() => handleDelete(cart.id)}><FaTrash /> Obriši korpu</button>
          </div>
        </div>
      ))}
    </div>
  );
};