import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { Select } from "antd";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../Context/auth";

const UpdateProduct = () => {
  const navigate = useNavigate();
  const params = useParams();

  const [auth, setAuth] = useContext(AuthContext);

  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState("");
  const [photo, setPhoto] = useState("");
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [shipping, setShipping] = useState(false);

  const [id, setId] = useState("");

  const { Option } = Select;

  // to get all categories in db
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );

      if (data?.success) {
        data?.category?.reverse();
        setCategories(data?.category);
      }
    } catch (err) {
      //console.log(err);
      toast.error("Error in getting all categories!");
    }
  };
  useEffect(() => {
    getAllCategories();
  }, []);

  // get single product
  const getSingleProduct = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/single-product/${params.slug}`
      );

      setId(data.product._id);
      setName(data.product.name);
      setDescription(data.product.description);
      setPrice(data.product.price);
      setQuantity(data.product.quantity);
      setShipping(data.product.shipping);
      setCategory(data.product.category._id);
    } catch (err) {
      //console.log(err);
      toast.error("Error in fetching product details");
    }
  };
  useEffect(() => {
    getSingleProduct();
  }, []);

  // update Product
  const updateHandler = async (e) => {
    e.preventDefault();
    try {
      const prodData = new FormData();
      prodData.append("name", name);
      prodData.append("description", description);
      prodData.append("price", price);
      prodData.append("category", category);
      prodData.append("quantity", quantity);
      photo && prodData.append("photo", photo);
      prodData.append("shipping", shipping);

      const headers = {
        authorization: auth?.token,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/products/update-product/${id}`,
        prodData,
        {
          headers,
        }
      );

      if (data?.success) {
        setTimeout(() => {
          toast.success("Product Updated Successfully");
        }, 100);
        navigate("/dashboard/admin/products");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      //console.log(err);
      toast.error("something went wrong!");
    }
  };

  // delete Product
  const deleteHandler = async () => {
    const headers = {
      authorization: auth?.token,
    };

    try {
      let Sure = window.prompt("Sure? want to delete this product!");
      if (!Sure) return;

      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/products/delete-product/${id}`,
        {
          headers,
        }
      );
      setTimeout(() => {
        toast.success(`${data.product.name} Deleted Successfully`);
      }, 100);
      navigate("/dashboard/admin/products");
    } catch (err) {
      //console.log(err);
      toast.error("something went wring!");
    }
  };

  return (
    <Layout title={"DashBoard - UpdateProduct"}>
      <div className="container-fluid m-3 p-3 createProduct">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-8 mainBox">
            <h1>Update Product</h1>
            <div className="m-1">
              <Select
                onChange={(value) => {
                  setCategory(value);
                }}
                placeholder={"Select category"}
                size="large"
                showSearch
                className="form-select mb-3 "
                value={category}
              >
                {categories.map((el) => (
                  <Option
                    key={el._id}
                    value={el._id}
                    style={{
                      backgroundColor: "#ecf5de",
                    }}
                  >
                    {el.name}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="mb-3">
              <label htmlFor="photo" className="mainButton outline">
                {photo ? photo.name : "Update Photo"}
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => {
                    setPhoto(e.target.files[0]);
                  }}
                  hidden
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center ProdImg">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product photo"
                    height={"320px"}
                    className="img img-responsive"
                  />
                </div>
              ) : (
                <div className="text-center ProdImg">
                  <img
                    src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${id}`}
                    alt="product photo"
                    height={"320px"}
                    className="img img-responsive"
                  />
                </div>
              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={name}
                placeholder={"Product Name"}
                className="form-control"
                onChange={(e) => {
                  setName(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="Product Description.."
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={price}
                placeholder={"Product Price"}
                className="form-control"
                onChange={(e) => {
                  setPrice(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <input
                type="number"
                value={quantity}
                placeholder={"Product Quantity"}
                className="form-control"
                onChange={(e) => {
                  setQuantity(e.target.value);
                }}
              />
            </div>

            <div className="mb-3">
              <Select
                placeholder="Shipping?"
                className="form-control"
                onChange={(value) => {
                  setShipping(value);
                }}
                bordered={false}
                size="large"
                showSearch
                value={shipping ? "yes" : "no"}
              >
                <Option
                  value={true}
                  style={{
                    backgroundColor: "#ecf5de",
                  }}
                >
                  Yes
                </Option>
                <Option
                  value={false}
                  style={{
                    backgroundColor: "#ecf5de",
                  }}
                >
                  No
                </Option>
              </Select>
            </div>
            <div className="d-flex flex-row justify-content-center">
              <div
                className="m-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <button className="mainButton outline" onClick={updateHandler}>
                  Update Product
                </button>
              </div>

              <div
                className="m-3"
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <button className="mainButton outline" onClick={deleteHandler}>
                  Delete Product
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default UpdateProduct;
