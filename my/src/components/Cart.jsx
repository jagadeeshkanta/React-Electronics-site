import React, { useState, useEffect } from "react";
import './Cart.css';

const Cart = () => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cart")) || [];
    setCartItems(storedCart);
  }, []);

  // Clear item from the cart
  const handleClear = (id) => {
    const updatedCart = cartItems.filter(item => item.id !== id);
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Handle quantity change (increment/decrement)
  const handleQuantityChange = (id, action) => {
    const updatedCart = cartItems.map(item => {
      if (item.id === id) {
        let updatedQuantity = item.quantity || 1;
        if (action === 'increment') updatedQuantity++;
        if (action === 'decrement' && updatedQuantity > 1) updatedQuantity--;
        return { ...item, quantity: updatedQuantity };
      }
      return item;
    });
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setCartItems(updatedCart);
  };

  // Calculate total amount
  const totalAmount = cartItems.reduce((acc, item) => {
    return acc + (item.price * (item.quantity || 1));
  }, 0);

  return (
    <div className="container my-5">
      <h2 className="my-4 text-center">Your Cart</h2>
      <div className="cart-container d-flex">
        <div className="cart-details">
          {cartItems.length > 0 ? (
            cartItems.map((item) => (
              <div key={item.id} className="card rounded d-flex mb-4 position-relative">
                <button className="clear rounded position-absolute" onClick={() => handleClear(item.id)}>X</button>
                <div className="layout d-flex">
                  <div className="img-container w-50 d-flex">
                    <img
                      src={item.imgUrl}
                      className="product-img w-100"
                      alt={item.productName}
                    />
                  </div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{item.productName}</h5>
                    <div className="price d-flex justify-content-between align-items-center">
                      <div className="priceQuantity d-flex justify-content-between align-items-center">
                        <p className="fs-5 mx-3">${item.price} * {item.quantity || 1} item(s)</p>
                        <p className="card-text price">${item.price * (item.quantity || 1)}</p>
                      </div>
                      <div className="incDec">
                        <button
                          className="increment rounded fs-4 mx-1"
                          onClick={() => handleQuantityChange(item.id, 'increment')}
                        >
                          +
                        </button>
                        <button
                          className="decrement rounded fs-4"
                          onClick={() => handleQuantityChange(item.id, 'decrement')}
                        >
                          -
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="card justify-content-center" style={{ height: "135px" }}>
              <h3 className="text-center">Your cart is empty.</h3>
            </div>
          )}
        </div>

        <div className="cart-total">
          <div className="total-card border rounded shadow p-3">
            <h3>Total Amount:</h3>
            <p className="fs-4">${totalAmount.toFixed(2)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
