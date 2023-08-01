import React from "react";
import Layout from "../../components/layouts/Layout";
import AdminMenu from "../../components/layouts/AdminMenu";
import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/all-products`
      );
      setProducts(data.products);
    } catch (err) {
      //console.log(err);
      toast.error("something went wrong!");
    }
  };

  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout title={"Dashboard - Products"}>
      <div className="container-fluid m-3 p-3 createProduct">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9 mainBox mt-5">
            <h1 className="text-center">Your Products List</h1>
            <div className="d-flex flex-wrap mt-3 justify-content-center">
              {products &&
                products.map((el) => (
                  <Link
                    to={`/dashboard/admin/products/${el.slug}`}
                    key={el._id}
                    className="product-link"
                  >
                    <div
                      className="card m-2 d-flex flex-column justify-content-between"
                      style={{
                        maxWidth: "300px",
                        height: "auto",
                      }}
                    >
                      <img
                        src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${el._id}`}
                        className="card-img-top"
                        alt={el.name}
                        style={{
                          width: "100%",
                          width: "300px",
                          maxHeight: "300px",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <div className="card-body">
                        <h5 className="card-title">
                          {el.name.substr(0, 28)}
                          {el.name.length < 28 ? "" : "..."}
                        </h5>
                        <p className="card-text">
                          {el.description.substr(0, 40)}...
                        </p>
                        <p className="card-text h5 text-success">$ {el.price}</p>
                      </div>
                    </div>
                  </Link>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
