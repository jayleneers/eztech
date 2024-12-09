import React from 'react';
import list from './data';

import './Cart.css';

const Cart = () => {
  return (
    <div className="cart">
      {list.map((item) => (
        <div key={item.id} className="cart-item">
          <img src={item.img} alt={item.service} />
          <div className="cart-item-details">
            <h2>{item.service}</h2>
            <p>{item.serviceInfo}</p>
            <p>Price: ${item.price.toFixed(2)}</p>
            <p>Amount: {item.amount}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Cart;