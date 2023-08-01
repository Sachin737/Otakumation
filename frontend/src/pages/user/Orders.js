import React from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { useState, useEffect } from "react";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth";
import moment from "moment";

const Orders = () => {
  const [auth, setAuth] = useContext(AuthContext);
  const [myOrders, setMyOrders] = useState([]);

  const getMyOrders = async () => {
    try {
      const headers = {
        authorization: auth?.token,
      };

      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/orders`,
        { headers }
      );

      setMyOrders(data);

      // //console.log(data);
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    if (auth?.token) {
      getMyOrders();
    }
  }, [auth?.token]);

  return (
    <Layout title={"User - Orders"}>
      <div className="container-fluid md-m-3 mt-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div
            className="col-md-9 text-center mt-5"
            style={{
              color: "#80e38f",
            }}
          >
            <h1 className="text-center">Your Orders</h1>
            <div className=" d-flex flex-column flex-lg-row align-items-center align-items-lg-start">
              <div
                style={{
                  width: "100%",
                  //   border: "2px solid red",
                }}
              >
                {myOrders?.length ? (
                  <>
                    {myOrders.map((o, i) => (
                      <div key={i + 1}>
                        {o?.products.map((el) => (
                          <div
                            key={el._id}
                            className="card mb-3 d-flex flex-row align-items-center"
                            style={{ height: "220px", maxWidth: 1080 }}
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
                                <p className="card-text">
                                  {el.description.substr(0, 50)}...
                                </p>
                                <h6 className="card-text">$ {el.price}</h6>
                                <h6 className="card-text">Order No. {i + 1}</h6>
                              </div>
                            </div>
                            <div className="col-3">
                              <div className="card-body text-start">
                                {o.status === "deliverd" ? (
                                  <h6 className="card-text text-success">
                                    ● {o?.status}
                                  </h6>
                                ) : (
                                  <h6 className="card-text text-primary">
                                    {o?.status}
                                  </h6>
                                )}
                                <h6>{moment(o?.createAt).fromNow()}</h6>
                                {o?.payment?.success ? (
                                  <h6 className="text-success">Payment Success</h6>
                                ) : (
                                  <h6 className="text-danger">Payment Failed</h6>
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

export default Orders;
