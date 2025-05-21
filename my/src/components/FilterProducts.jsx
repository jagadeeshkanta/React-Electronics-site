import React, { useState } from "react";
import { Link } from "react-router-dom";
import { products } from "./products";
import './FilterProducts.css';

const ProductList = () => {
  const [categoryFilter, setCategoryFilter] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [alertMessage, setAlertMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      categoryFilter === "" || product.category.toLowerCase() === categoryFilter.toLowerCase();
    const matchesSearchQuery =
      searchQuery.length < 2 || product.productName.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearchQuery;
  });

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleCategoryChange = (event) => {
    setCategoryFilter(event.target.value);
  };

  const handleSearchSubmit = () => {
    console.log("Searching for: ", searchQuery);
  };

  // Function to add product to cart (local storage)
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = cart.some(item => item.id === product.id);

    if (!isProductInCart) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      showAlertMessage(`${product.productName} added to the cart!`);
    } else {
      showAlertMessage(`${product.productName} is already in the cart.`);
    }
  };

  // Function to show the alert message
  const showAlertMessage = (message) => {
    setAlertMessage(message);
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
    }, 5000); // Hide the alert after 10 seconds
  };

  return (
    <>
      <div className="table mb-5">
        <img className="w-100" src="/table.jpg" alt="table" />
        <h1 className="text-center my-5">Product</h1>
      </div>

      <div>
        <div className="filter d-flex justify-content-center mt-5 mb-5">
          <div className="row w-100 justify-content-around">
            <div className="col-12 col-md-3 mb-3 mb-md-0">
              <select
                className="bg-primary text-white p-3 fs-5 border rounded w-70"
                onChange={handleCategoryChange}
                value={categoryFilter}
              >
                <option value="">All Categories | </option>
                <option value="sofa">Sofa</option>
                <option value="chair">Chair</option>
                <option value="mobile">Mobile</option>
                <option value="watch">Watch</option>
                <option value="wireless">Wireless</option>
              </select>
            </div>

            <div className="col-12 col-md-6">
              <div className="input-group w-100">
                <input
                  className="form rounded w-100 p-3 fs-5"
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                />
                <span
                  className="p-3"
                  onClick={handleSearchSubmit}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001q.044.06.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1 1 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0"/>
                  </svg>
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Alert Message */}
        {showAlert && (
          <div className="alert-box" style={{ 
            position: "fixed", 
            bottom: "20px", 
            right: "20px", 
            backgroundColor: "green", 
            color: "white", 
            padding: "10px 20px", 
            borderRadius: "5px",
            animation: "slideIn 1s forwards"
          }}>
            {alertMessage}
          </div>
        )}

        {/* Product List */}
        <div className="container mt-5">
          <div className="row justify-content-center">
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <div key={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
                  <div className="card h-100 d-flex flex-column">
                    <Link to={`/product/${product.id}`} className="btn h-50">
                      <div className="img-container border-3 w-100 h-100">
                        <img
                          src={product.imgUrl}
                          className="product-img w-100 h-100 p-3"
                          alt={product.productName}
                        />
                      </div>
                    </Link>
                    <div className="heart">&#129293;</div>
                    <div className="card-body d-flex flex-column">
                      <h5 className="card-title">{product.productName}</h5>
                      <p className="star pt-2 pb-3">⭐⭐⭐⭐⭐</p>
                      <div className="price d-flex justify-content-between align-items-center">
                        <p className="card-text price">${product.price}</p>
                        <button
                          className="btn w-25 rounded-circle"
                          onClick={() => addToCart(product)}
                        >
                          +
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p>No products found</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductList;
