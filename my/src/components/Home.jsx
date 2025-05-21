import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Carousel } from 'react-bootstrap';
import { discoutProducts } from "./products";
import { products } from "./products";
import "bootstrap/dist/css/bootstrap.min.css";
import "./product.css";
import { SliderData } from "./products";
import { serviceData } from "./products";

const Home = () => {
  const [alertMessage, setAlertMessage] = useState("");
  const discountItems = discoutProducts.filter((product) => product.discount > 0);

  const newItems = products.filter((product) => product.category === "mobile" || product.category === "wireless");

  const sofaItems = products.filter((product) => product.category === "sofa");

  // Function to add product to cart (local storage)
  const addToCart = (product) => {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const isProductInCart = cart.some(item => item.id === product.id);

    if (!isProductInCart) {
      cart.push(product);
      localStorage.setItem("cart", JSON.stringify(cart));
      setAlertMessage(`${product.productName} added to the cart!`);
      setTimeout(() => {
        setAlertMessage("");
      }, 5000);
    } else {
      setAlertMessage(`${product.productName} is already in the cart.`);
      setTimeout(() => {
        setAlertMessage("");
      }, 5000);
    }
  };

  return (
    <>
      {/* Display Alert Message */}
      {alertMessage && (
        <div className={`alert-message-container ${alertMessage ? 'show' : ''}`}>
          <div className="alert text-center mb-4">
            {alertMessage}
          </div>
        </div>
      )}

      <Carousel controls={false} indicators={false} interval={1000}>
        {SliderData.map(({ id, title, desc, cover }) => (
          <Carousel.Item key={id}>
            <div className="carousel-content mb-5 d-flex flex-column flex-md-row justify-content-around align-items-center p-3">
              <div className="text-container p-2 text-md-start text-center">
                <h1 className="carousel-title">{title}</h1>
                <p className="carousel-description my-4">{desc}</p>
                <button className="btn w-25 btn-light pl-0 mt-2 carousel-button">Visit Collection</button>
              </div>
              <div className="image-container d-flex justify-content-center align-items-center">
                <img className="carousel-img" src={cover} alt={`Slide ${id}`} />
              </div>
            </div>
          </Carousel.Item>
        ))}
      </Carousel>

      <div className="container my-5">
        <div className="row justify-content-center">
          {serviceData.map((service, index) => (
            <div key={index} className="col-12 col-md-6 col-lg-3 mb-4">
              <div className="card text-center p-3" style={{ backgroundColor: service.bg }}>
                <div className="icon-container p-2">
                  <img
                    src={service.img}
                    alt={service.title}
                    className="rounded-circle border border-white p-2"
                    style={{
                      width: '60px',
                      height: '60px',
                      objectFit: 'cover',
                    }}
                  />
                </div>
                <h4 className="mt-2">{service.title}</h4>
                <p className="text-muted">{service.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container mb-5">
        <h2 className="my-4 mb-5 text-center">Discount Products</h2>
        <div className="row justify-content-center">
          {discountItems.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
              <div className="card rounded h-100 d-flex flex-column">
                <Link to={`/product/${product.id}`} className="btn h-50">
                  <div className="img-container border-3 w-100 h-100">
                    <img
                      src={product.imgUrl}
                      className="product-img w-100 h-100 p-3"
                      alt={product.productName}
                    />
                  </div>
                </Link>
                <p className="card-text1 px-3 discount">{product.discount}% Off</p>
                <div className="heart">&#129293;</div>
                <div className="card-body justify-content-around">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="star pt-2 pb-3">⭐⭐⭐⭐⭐</p>
                  <div className="price d-flex justify-content-between align-items-center">
                    <p className="card-text price">${product.price}</p>
                    <button className="btn w-25 rounded-circle" onClick={() => addToCart(product)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-5">
        <h2 className="my-4 mb-5 text-center">New Arrivals</h2>
        <div className="row justify-content-center">
          {newItems.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
              <div className="card rounded h-100 d-flex flex-column">
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
                <div className="card-body d-flex justify-content-around">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="star pt-2 pb-3">⭐⭐⭐⭐⭐</p>
                  <div className="price d-flex justify-content-between align-items-center">
                    <p className="card-text price">${product.price}</p>
                    <button className="btn w-25 rounded-circle" onClick={() => addToCart(product)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="container my-4 mb-5">
        <h2 className="my-4 mb-5 text-center">Best Sales</h2>
        <div className="row justify-content-center">
          {sofaItems.map((product) => (
            <div key={product.id} className="col-md-4 col-sm-6 col-12 mb-4">
              <div className="card h-100 rounded d-flex flex-column">
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
                <div className="card-body d-flex justify-content-around">
                  <h5 className="card-title">{product.productName}</h5>
                  <p className="star">⭐⭐⭐⭐⭐</p>
                  <div className="price d-flex justify-content-between align-items-center">
                    <p className="card-text price">${product.price}</p>
                    <button className="btn w-25 rounded-circle" onClick={() => addToCart(product)}>+</button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Home;
