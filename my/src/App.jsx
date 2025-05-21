

import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Header from "./components/Header";
import Footer from "./components/Footer";
import FilterProducts from "./components/FilterProducts";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Login from "./components/Login";

const App = () => {
  return (
    <>
    <Header />
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/product" element={<FilterProducts />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />

      </Routes>
    </Router>
    <Footer />
    </>
  );
};

export default App;
