import React from "react";
import Layout from "../components/layouts/Layout";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const ProductDetails = () => {
  const navigate = useNavigate();
  const [similarProducts, setSimilarProducts] = useState([]);
  const [product, setProduct] = useState({});
  const params = useParams();

  // get single product
  const getProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/single-product/${params.slug}`
      );
      setProduct(data?.product);

      // passed as args ? time to set prod state variable was higher than calling getsimilarProds func
      getSimilarProducts(data?.product?._id, data?.product?.category?._id);
    } catch (err) {
      console.log(err);
    }
  };

  // get similar prods
  const getSimilarProducts = async (pid, cid) => {
    try {
      // console.log(product?.category?._id, product?._id);

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/similar-products/${pid}/${cid}`
      );
      setSimilarProducts(data?.products);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (params?.slug) {
      getProducts();
    }
  }, [params.slug]);

  return (
    <Layout title={`${product?.name}`}>
      {/* {JSON.stringify(product, null, 4)} */}
      <button
        className="mx-3 smallButton outline"
        onClick={() => {
          navigate(-1);
        }}
      >
        Go Back
      </button>
      <div
        className="row container my-3 d-flex flex-md-column flex-xl-row align-items-xs-center align-items-md-center align-items-lg-center align-items-xl-start"
        style={{
          margin: "auto",
          color: "#ecf5de",
          gap: "25px",
          // height: "100vh"
          // border: "2px solid red",
        }}
      >
        <div
          className="col-md-6 card"
          style={{
            textAlign: "center",
            zIndex: "1",
            width: "32rem",
            height: "auto",
            margin: "auto",
            // border: "2px solid red",
          }}
        >
          <img
            src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${product?._id}`}
            alt={`${product?.name}`}
            className="card-img-top"
            width="400px"
            height="auto"
          />
        </div>
        <div className="col-md-6" style={{ zIndex: "1" }}>
          <h1 style={{ color: "#80e38f" }}>{product?.name}</h1>
          <h6>Description: {product?.description}</h6>
          <h4>Price: ${product?.price}</h4>
          <h6>Category: {product?.category?.name}</h6>
          <button className="mainButton outline mt-3">Add to Cart</button>
        </div>
      </div>

      <hr
        className="mt-5"
        style={{ color: "white", width: "70%", margin: "auto" }}
      />
      <div className="row mt-5">
        {similarProducts.length ? (
          <h1 className="text-center" style={{ color: "#80e38f" }}>
            Similar Products
          </h1>
        ) : (
          <h5 className="text-center" style={{ color: "#80e38f" }}>
            No more such products...
          </h5>
        )}
        {/* {JSON.stringify(similarProducts, null, 4)} */}

        <div className="d-flex flex-wrap justify-content-center">
          {similarProducts?.map((el) => (
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
                    onClick={() => {
                      navigate(`/product/${el.slug}`);
                      window.location.reload();
                    }}
                  >
                    See details
                  </button>
                  <button className="btn btn-warning">Add to Cart</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default ProductDetails;
