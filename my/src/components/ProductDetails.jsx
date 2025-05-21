import React, { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { products } from "./products";
import './product.css';

const ProductDetails = () => {
  const { id } = useParams();
  const product = products.find((p) => p.id.toString() === id);
  const [activeTab, setActiveTab] = useState("description");
  const [quantity, setQuantity] = useState(1);
  const [alertMessage, setAlertMessage] = useState("");

  if (!product) {
    return <div>Product not found</div>;
  }

  const relatedProducts = products.filter((p) => p.category === product.category);

  // Function to add product to cart (local storage)
  const addToCart = (product) => {
    if (quantity <= 0) {
      alert("Please select a valid quantity.");
      return;
    }

    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const existingProductIndex = cart.findIndex((item) => item.id === product.id);

    if (existingProductIndex !== -1) {
      cart[existingProductIndex].quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Show the alert message
    setAlertMessage(`${quantity} ${product.productName}(s) added to the cart!`);

    // Hide the alert message after 3 seconds
    setTimeout(() => {
      setAlertMessage("");
    }, 5000);
  };

  return (
    <>
      <div className="table">
        <img className="" src="/table.jpg" alt="table" />
        <h1 className="text-center my-5">{product.productName}</h1>
      </div>
      <div className="container my-5">
        {/* Display the alert message */}
        {alertMessage && (
          <div className="alert-message">
            <p>{alertMessage}</p>
          </div>
        )}
        <div className="row justify-content-between align-items-center">
          <div className="col-md-6">
            <img src={product.imgUrl} alt={product.productName} className="img-fluid" />
          </div>

          <div className="col-md-6">
            <h2>{product.productName}</h2>
            <p className="mt-4">
              <strong className="me-4">⭐⭐⭐⭐⭐</strong> {product.avgRating} rating
            </p>
            <div className="cat d-flex justify-content-start align-items-center">
              <p className="fs-1 me-5">${product.price}</p>
              <p>Category: {product.category}</p>
            </div>

            <p className="mb-4">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti id, ipsa alias
              fugit excepturi adipisci?
            </p>

            <div className="align-items-center mb-3">
              <input
                type="number"
                value={quantity}
                onChange={(e) => setQuantity(Number(e.target.value))}
                className="form-control w-25 mb-3"
                min="1"
              />
              <button onClick={() => addToCart(product)} className="btn w-25 btn-primary">
                Add to Cart
              </button>
            </div>
          </div>
        </div>

        {/* Tabs for Description and Reviews */}
        <div className="mt-5">
          <div className="d-flex w-25 mb-4">
            <button
              className={`btn ${activeTab === "description" ? "btn-white fw-bold" : "btn-outline-white"} me-3`}
              onClick={() => setActiveTab("description")}
            >
              Description
            </button>
            <button
              className={`btn ${activeTab === "reviews" ? "btn-white fw-bold" : "btn-outline-white"}`}
              onClick={() => setActiveTab("reviews")}
            >
              Reviews({product.reviews.length})
            </button>
          </div>

          {/* Conditional Rendering for Description and Reviews */}
          {activeTab === "description" ? (
            <p className="ps-3">{product.description}</p>
          ) : (
            <div className="ps-3">
              {product.reviews.length > 0 ? (
                product.reviews.map((review, index) => (
                  <div key={index} className="border-bottom mb-3 pb-3">
                    <p>
                      <strong>Rating:</strong> {review.rating}
                    </p>
                    <p>{review.text}</p>
                  </div>
                ))
              ) : (
                <p>No reviews available.</p>
              )}
            </div>
          )}
        </div>

        {/* Related Products Section */}
        <div className="container my-5">
          <h2 className="my-4 mb-5">You might also like</h2>
          <div className="row justify-content-center">
            {relatedProducts.map((product) => (
              <div key={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
                <div className="card h-100 d-flex flex-column">
                <Link to={`/product/${product.id}`} className="btn h-50">
                  <div className="img-container border-3 w-100 h-100">
                    <img src={product.imgUrl} className="product-img w-50 h-100 p-3" alt={product.productName} />
                  </div>
                  </Link>
                  <div className="heart">&#129293;</div>
                  <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{product.productName}</h5>
                    <p className="star pt-2 pb-3">⭐⭐⭐⭐⭐</p>
                    <div className="price d-flex justify-content-between align-items-center">
                      <p className="card-text price">${product.price}</p>
                      <button className="btn w-25 rounded-circle" onClick={() => addToCart(product)}>
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
