import React, { useState, useEffect ,Redirect} from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import { PropTypes } from "prop-types";
import { getProducts } from "../redux/actions/product";
import Carousel from "../components/Carousel";
import { addProductToCart } from "../redux/actions/cart";


const Home = ({ productList, getProducts, auth, cart, addProductToCart }) => {
  let cart_products = cart.products;

  const navigate = useNavigate();

  useEffect(() => {
    getProducts();
  }, []);

  if (!auth.isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (auth.user.permissions.seller) {
    return <Navigate to="/products" />;
  }

  if (auth.user.permissions.admin) {
    return <Navigate to="/users" />;
  }

  return (
    <div className="container">
      {/* <h1 className="w-100 text-center mt-2 mb-2">Shop Now</h1> */}
      <Carousel />
      <div className="row">
        {productList.map((p, index) => (
          <div className="col-lg-3 col-md-4 card mb-4" key={index}>
            <img
              className="card-img-top "
              src={p.image}
              alt="Card image cap"
            ></img>
            <div className="card-body">
              <h5 className="card-title mt-0 mb-0 text-info">{p.name}</h5>
              <p className="card-text mt-0 mb-0 text-secondary">
                {"Price : ₹"}
                {p.price}
              </p>
              {/* <p className="card-text mt-0 mb-0">{p.description}</p> */}
              <button className="btn btn-outline-success mb-2 w-100 btn-sm"
              onClick={(e)=>{
                navigate('/product',{state:p});
              }}
              >Buy Now</button>
              <br></br>
              <button
                className="btn btn-outline-info w-100 btn-sm"
                onClick={(e) => {
                  cart_products.push(p)
                  addProductToCart(cart_products);
                }}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

Home.protoTypes = {
  getProducts: PropTypes.func.isRequired,
  addProductToCart: PropTypes.func.isRequired,
  auth: PropTypes.object,
  cart: PropTypes.object,
};

const mapStateToProps = (state) => ({
  productList: state.product.products,
  auth: state.auth,
  cart: state.cart,
});

export default connect(mapStateToProps, { getProducts, addProductToCart })(
  Home
);
