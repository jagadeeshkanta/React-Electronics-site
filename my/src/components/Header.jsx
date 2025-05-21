import React, { useContext } from "react";
import { CartContext } from "./CartContext";
import "./Header.css";

const Header = () => {
  const { cartItems } = useContext(CartContext);

  // Count unique products
  const cartCount = cartItems.length;

  return (
    <nav className="navbar navbar-expand-lg navbar-light shadow">
      <div className="container-fluid px-5">
        <img src="/achieversIT.png" alt="icon" className="navbar-brand" />

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            <li className="nav-item px-3">
              <a className="nav-link fw-bold" href="/">Home</a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link fw-bold" href="/product">Shop</a>
            </li>
            <li className="nav-item px-3">
              <a className="nav-link fw-bold" href="/cart">Cart</a>
            </li>
            <li className="nav-item px-3 d-flex align-items-center">
                 <a href="/login"><img className='nav-link' src="/user.png" alt="User" id="user" /></a>               </li>
            <li className="nav-item px-3">
              <div className="cart">
                <a href="/cart">
                  <img className="nav-link" src="/grocery-store.png" alt="grocery" id="grocery" />
                  <button className="cart-count">{cartCount}</button>
                </a>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;

