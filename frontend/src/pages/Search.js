import React from "react";
import axios from "axios";
import Layout from "../components/layouts/Layout.js";
import { useContext,useEffect } from "react";
import { SearchContext } from "../Context/search.js";
import { useNavigate } from "react-router-dom";

import { AuthContext } from "../Context/auth";
import { CartContext } from "../Context/cart";
import toast from "react-hot-toast";

const Search = () => {
  const [searchObj, setSearchObj] = useContext(SearchContext);
  const navigate = useNavigate();

  const [auth, setAuth] = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);
  
  // add product to cart
  const handleCart = async (el) => {
    try {
      const headers = {
        authorization: auth?.token,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/update-cart`,
        { el },
        { headers }
      );

      setCart([...cart, el]);
      localStorage.setItem("cart", JSON.stringify([...cart, el]));

      toast.success("Product added to cart");
    } catch (err) {
      //console.log(err);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <Layout>
      <div
        className="container mt-5"
        style={{
          color: "#80e38f",
        }}
      >
        <div className="text-center m-d-4">
          <h1>
            {searchObj?.results?.length
              ? `found ${searchObj?.results?.length} results for "${searchObj.keyword}"`
              : "No results found"}
          </h1>
          <div className="d-flex flex-wrap justify-content-center">
            {searchObj?.results?.map((el) => (
              <div
                className="card m-2 mb-5 d-flex flex-column justify-content-between"
                style={{
                  maxWidth: "300px",
                  height: "auto",
                }}
                key={el._id}
              >
                <img
                  src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${el._id}`}
                  className="card-img-top"
                  alt={el.name}
                  style={{
                    width: "100%",
                    maxHeight: "300px",
                    height: "100%",
                    objectFit: "cover",
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{el.name.substr(0, 28)}...</h5>
                  <p className="card-text">{el.description.substr(0, 40)}...</p>
                  <p className="card-text">$ {el.price}</p>
                  <div className="d-flex justify-content-around">
                    <button
                      className="btn btn-info"
                      onClick={() => navigate(`/product/${el.slug}`)}
                    >
                      See details
                    </button>
                    <button className="btn btn-dark" onClick={() => handleCart(el)}>Add to Cart</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Search;
