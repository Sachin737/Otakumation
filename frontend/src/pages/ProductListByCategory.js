import axios from "axios";
import React from "react";
import { useState } from "react";
import Layout from "../components/layouts/Layout.js";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useContext } from "react";
import { AuthContext } from "../Context/auth";
import { CartContext } from "../Context/cart";
import toast from "react-hot-toast";

const ProductListByCategory = () => {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState([]);

  const [auth, setAuth] = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);

  const params = useParams();
  const navigate = useNavigate();


  const getAllProds = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/get-categorywise-products/${params.slug}`
      );
      setProducts(data?.products);
      setCategory(data?.category);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (params?.slug) getAllProds();
  }, [params?.slug]);

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
      console.log(err);
      toast.error("Failed to add product to cart");
    }
  };

  return (
    <Layout title={`${params.slug} - Products`}>
      <div className="container mt-3">
        <h2 style={{ color: "#80e38f" }} className="text-center">
          Category - {params?.slug.toUpperCase()}
        </h2>

        <h6 style={{ color: "#ecf5de" }} className="text-center">
          {products?.length} results found
        </h6>
        <div className="row">
          <div className="d-flex flex-wrap justify-content-center">
            {products?.map((el) => (
              <div
                className="card m-3 mb-5 d-flex flex-column justify-content-between"
                style={{ maxWidth: "300px", height: "auto" }}
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

export default ProductListByCategory;
