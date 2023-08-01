import React from "react";
import Layout from "../components/layouts/Layout";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import { Radio, Checkbox } from "antd";
import { Prices } from "../components/PriceFilter.js";
import InfiniteScroll from "react-infinite-scroll-component";
import Spinner from "../components/Loader";

import toast from "react-hot-toast";
import { AuthContext } from "../Context/auth";
import { CartContext } from "../Context/cart";

import "../styles/Home.scss";
import cor1 from "../images/cor-1.jpg";
import cor2 from "../images/cor-2.jpg";
import cor3 from "../images/cor-3.jpg";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [checked, setChecked] = useState([]);
  const [price, setPrice] = useState([]);
  const [total, setTotal] = useState(0);
  const [pageNo, setPageNo] = useState(1);
  const [loading, setLoading] = useState(false);
  const [auth, setAuth] = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);
  const navigate = useNavigate();

  const getCartProduct = async () => {
    const headers = {
      authorization: auth?.token,
    };

    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/user-cart`,
        { headers }
      );
      setCart(data?.cart);
    } catch (err) {
      //console.log(err);
    }
  };

  // get total products count
  const getTotalCount = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/products-count`
      );
      setTotal(data?.totalCount);
    } catch (err) {
      //console.log(err);
    }
  };

  // get all products
  const getAllProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/products-page/${pageNo}`
      );
      setPageNo(pageNo + 1);

      setLoading(false);
      setProducts(data?.products);
      
    } catch (err) {
      setLoading(false);
      //console.log(err);
    }
  };

  // load more products
  const loadMoreProducts = async () => {
    try {
      setLoading(true);
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/products-page/${pageNo}`
      );
      setPageNo(pageNo + 1);

      setTimeout(() => {
        setProducts([...products, ...data?.products]);
      }, 1000);

      setLoading(false);

      // //console.log(products);
    } catch (err) {
      setLoading(false);
      //console.log(err);
    }
  };

  // to get all categories in db
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );

      if (data?.success) {
        data.category?.reverse();
        setCategories(data?.category);
      }
    } catch (err) {
      //console.log(err);
    }
  };

  // filter by category
  const handleFilter = async (value, id) => {
    let AllcheckCats = [...checked];
    // //console.log(id);
    if (value) {
      AllcheckCats.push(id); // adding that category
    } else {
      // removing that category from list
      AllcheckCats = AllcheckCats.filter((c) => c !== id);
    }
    setChecked(AllcheckCats);
  };

  // Get filtered Products
  const filteredProducts = async () => {
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/products/product-filter`,
        { checked, price }
      );
      setTotal(data?.prods?.length);
      setProducts(data?.prods);
    } catch (err) {
      //console.log(err);
    }
  };

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
      if(err.response.status==401){
        navigate(`/login`);
        setTimeout(() => {
          toast.error("Please login to use cart");
        }, 500);
      }else{
        toast.error("Failed to add product to cart");
      }
    }
  };

  useEffect(() => {
    if (!checked.length && !price.length) {
      getAllProducts();
    }
  }, [checked?.length, price]);

  useEffect(() => {
    if (checked?.length || price?.length) {
      filteredProducts();
    }
  }, [checked?.length, price]);

  useEffect(() => {
    getAllCategories();
    getTotalCount();
  }, []);

  return (
    <Layout title={"All Products - Otakumation"}>
      {/* COROUSAL */}

      <div
        id="carouselExampleDark"
        className="carousel carousel-dark slide mt-2"
        data-bs-ride="carousel"
        style={{
          borderTop: "2px solid white",
        }}
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={0}
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={1}
            aria-label="Slide 2"
          />
          <button
            type="button"
            data-bs-target="#carouselExampleDark"
            data-bs-slide-to={2}
            aria-label="Slide 3"
          />
        </div>
        <div className="carousel-inner" >
          <div className="carousel-item active" data-bs-interval={10000}>
            <img
              src={cor1}
              className="d-block w-100"
              alt="..."
              style={{
                maxHeight: "500px",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
            <div className="carousel-caption d-none d-md-block text-light">
              <h5>First slide label</h5>
              <p>
                Some representative placeholder content for the first slide.
              </p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval={2000}>
            <img
              src={cor2}
              className="d-block w-100"
              alt="..."
              style={{
                maxHeight: "500px",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
            <div className="carousel-caption d-none d-md-block text-light">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>

          <div className="carousel-item" data-bs-interval={2000}>
            <img
              src={cor3}
              className="d-block w-100"
              alt="..."
              style={{
                maxHeight: "500px",
                maxWidth: "100%",
                objectFit: "cover",
              }}
            />
            <div className="carousel-caption d-none d-md-block text-light">
              <h5>Second slide label</h5>
              <p>
                Some representative placeholder content for the second slide.
              </p>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="prev"
        >
          <span className="carousel-control-prev-icon" aria-hidden="true" />
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleDark"
          data-bs-slide="next"
        >
          <span className="carousel-control-next-icon" aria-hidden="true" />
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* MAIN CONTENT */}
      <div
        className="md-col row mt-5 homePage"
        style={{
          color: "#80e38f",
        }}
      >
        {/* FILTER SIDEBAR */}
        <div
          className="col-md-2 mt-3 d-flex 
         flex-column align-items-start"
          // style={{
          //   border: "2px solid red",
          // }}
        >
          {/* filter by category */}
          <div className="">
            <h4 className="text-center mx-3">Filter by category</h4>
            <hr />
            <div className="d-flex flex-wrap flex-md-column mx-3">
              {categories?.map((el) => (
                <Checkbox
                  key={el._id}
                  onChange={(e) => {
                    handleFilter(e.target.checked, el._id);
                  }}
                  style={{ color: "white" }}
                >
                  {el.name}
                </Checkbox>
              ))}
            </div>
          </div>

          {/* filter by Prices */}
          <div className="">
            <h4 className="text-center mt-4  mx-3">Filter by Price</h4>
            <hr />
            <div className="mx-3">
              <Radio.Group
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
                className="d-flex flex-wrap flex-md-row flex-lg-column"
              >
                {Prices?.map((el) => (
                  <div key={el._id}>
                    <Radio style={{ color: "white" }} value={el.array}>
                      {el.name}
                    </Radio>
                  </div>
                ))}
              </Radio.Group>
            </div>
          </div>

          <button
            className="btn btn-danger mx-3 mt-4"
            onClick={() => {
              window.location.reload();
            }}
          >
            Reset Filters
          </button>
        </div>

        {/* MAIN CONTENT */}
        <div className="col-md-9 mt-3">
          {/* {JSON.stringify(price, null, 4)} */}
          <h1 className="text-center">All Products</h1>
          <InfiniteScroll
            dataLength={products.length}
            next={loadMoreProducts}
            hasMore={products.length !== total}
            loader={<Spinner />}
          >
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
                      width: "300px",
                      maxHeight: "300px",
                      height: "100%",
                      objectFit: "cover",
                    }}
                  />
                  <div className="card-body d-flex flex-column justify-content-around">
                    <h5 className="card-title">{el.name.substr(0, 28)}...</h5>
                    <p className="card-text">
                      {el.description.substr(0, 40)}...
                    </p>
                    <p className="card-text h5 text-success">$ {el.price}</p>
                    <div className="d-flex justify-content-between">
                      <button
                        className="btn btn-info"
                        onClick={() => navigate(`/product/${el.slug}`)}
                      >
                        See details
                      </button>
                      <button
                        className="btn btn-dark"
                        onClick={() => handleCart(el)}
                      >
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </InfiniteScroll>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
