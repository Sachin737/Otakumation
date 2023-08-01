import React from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth";
import moment from "moment";
import AdminMenu from "../../components/layouts/AdminMenu.js";
import { Select } from "antd";
import { Option } from "antd/es/mentions";

const AdminOrders = () => {
  const [statusList, setStatusList] = useState([
    "Not Process",
    "Processing",
    "Shipped",
    "deliverd",
    "cancel",
  ]);

  const [myStatus, setMyStatus] = useState("");

  const [auth, setAuth] = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);

  const getMyOrders = async () => {
    try {
      const headers = {
        authorization: auth?.token,
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-orders`,
        { headers }
      );

      setMyOrders(data);

      //console.log(data);
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getMyOrders();
    }
  }, [auth?.token]);

  const statusHandler = async (val, id) => {
    try {
      const headers = {
        authorization: auth?.token,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/order-status/${id}`,
        { status: val },
        { headers }
      );
      getMyOrders();
    } catch (err) {
      //console.log(err);
    }
  };

  return (
    <Layout title={"All orders"}>
      <div className="container-fluid m-3 p-3 createProduct">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9 mt-5">
            <h1 className="text-center">All orders</h1>

            <div
              className=" d-flex flex-column flex-lg-row align-items-start align-items-lg-start"
              style={{
                marginRight: "28px",
              }}
            >
              <div
                style={{
                  width: "100%",
                  //   border: "2px solid red",
                }}
              >
                {myOrders?.length ? (
                  <>
                    {myOrders.map((o, i) => (
                      <div
                        className="container my-2"
                        style={{
                          maxWidth: 1080,
                        }}
                        key={i + 1}
                      >
                        {o?.products.map((el) => (
                          <div
                            key={el._id}
                            className="card mb-3 d-flex flex-row align-items-center"
                            style={{
                              height: "220px",
                              maxWidth: 1080,
                              overflow: "hidden",
                            }}
                          >
                            <div
                              className="col-3"
                              style={{
                                height: "100%",
                              }}
                            >
                              <img
                                src={`${process.env.REACT_APP_API}/api/v1/products/product-photo/${el._id}`}
                                className="img-fluid rounded-start "
                                alt="image not found"
                                style={{
                                  height: "100%",
                                  objectFit: "cover",
                                }}
                              />
                            </div>
                            <div className="col-6">
                              <div className="card-body text-start">
                                <h6 className="card-title">{el.name}</h6>
                                <p className="card-text d-none d-sm-block">
                                  {el.description.substr(0, 50)}...
                                </p>
                                <h6 className="card-text text-success h4">
                                  $ {el.price}
                                </h6>
                                <h6 className="card-text">
                                  Order No. {i + 1} from {o?.buyer?.name}
                                </h6>
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="card-body text-start">
                                <h6>
                                  <Select
                                    bordered={false}
                                    defaultValue={o?.status}
                                    onChange={(val) =>
                                      statusHandler(val, o?._id)
                                    }
                                  >
                                    {statusList.map((st, id) => (
                                      <Option key={id} value={st}>
                                        {st}
                                      </Option>
                                    ))}
                                  </Select>
                                </h6>
                                <h6 className="card-text d-none d-sm-block">
                                  ●{moment(o?.createAt).fromNow()}
                                </h6>
                                {o?.payment?.success ? (
                                  <h6 className="text-success d-none d-sm-block">
                                    Payment Success
                                  </h6>
                                ) : (
                                  <h6 className="text-danger d-none d-sm-block">
                                    Payment Failed
                                  </h6>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    ))}
                  </>
                ) : (
                  <h1
                    style={{
                      height: "100%",
                      width: "100%",
                      margin: "auto",
                    }}
                  >
                    No orders yet
                  </h1>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default AdminOrders;
