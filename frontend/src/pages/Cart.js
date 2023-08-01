import React, { useState } from "react";
import Layout from "../components/layouts/Layout";
import { useContext } from "react";
import { AuthContext } from "../Context/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../Context/cart";
import DropIn from "braintree-web-drop-in-react";
import { useEffect } from "react";
import toast from "react-hot-toast";

const Cart = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [instance, setInstance] = useState("");
  const [clientToken, setClientToken] = useState("");
  const [auth, setAuth] = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);

  // //console.log(cart, auth.token);

  const removeProd = async (el) => {
    try {
      const headers = {
        authorization: auth?.token,
      };

      // //console.log(headers);
      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/remove-product/${el._id}`,
        {},
        { headers }
      );

      setCart(data?.updatedCart);
      localStorage.setItem("cart", JSON.stringify([data?.updatedCart]));

      window.location.reload();
    } catch (err) {
      //console.log(err);
    }
  };

  // calculate total price
  const total = () => {
    try {
      let tot = 0;
      cart?.map((el) => {
        tot = tot + el.price;
      });
      return tot.toLocaleString("en-US", {
        style: "currency",
        currency: "USD",
      });
    } catch (err) {
      //console.log(err);
    }
  };

  // get Token for payment
  const getPaymentToken = async (req, res) => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/payment/generate-token`
      );
      // //console.log(data?.response?.clientToken);
      setClientToken(data?.response?.clientToken);
    } catch (err) {
      //console.log(err);
    }
  };

  useEffect(() => {
    getPaymentToken();
  }, [auth?.token]);

  const paymentHandler = async () => {
    try {
      const { nonce } = await instance.requestPaymentMethod();

      const headers = {
        authorization: auth?.token,
      };

      setLoading(true);
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/payment/client-payment`,
        {
          nonce,
          cart,
        },
        {
          headers,
        }
      );

      setLoading(false);

      // clear cart
      localStorage.removeItem("cart");
      cart.map((el) => {
        removeProd(el);
      });

      setTimeout(() => {
        toast.success("Payment completed successfully!");
      }, 1000);

      navigate("/dashboard/user/orders");
    } catch (err) {
      //console.log(err);
      setLoading(false);
    }
  };

  return (
    <Layout title={"Cart"}>
      <div
        className="container mt-3 text-center"
        style={{
          color: "#80e38f",
        }}
      >
        <h1>Your Cart</h1>
        <div className="mt-5 d-flex flex-column flex-lg-row flex-lg-row align-items-center align-items-lg-start">
          <div
            style={{
              width: "100%",
              //   border: "2px solid red",
            }}
          >
            {cart?.length ? (
              <>
                {cart?.map((el) => (
                  <div
                    key={el._id}
                    className="card mb-3 d-flex flex-row"
                    style={{ height: "220px", maxWidth: 780 }}
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
                    <div className="col-9">
                      <div className="card-body text-start">
                        <h5 className="card-title">{el.name}</h5>
                        <p className="card-text">
                          {el.description.substr(0, 40)}...
                        </p>
                        <h5 className="card-text">$ {el.price}</h5>
                        <button
                          onClick={() => {
                            removeProd(el);
                          }}
                          className="btn btn-danger"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <h3>Cart is Empty!</h3>
            )}
          </div>

          <div
            style={{
              width: "50%",
              //   border:"2px solid red",
            }}
          >
            <hr />
            <h2>Price Details</h2>
            <hr />
            <table
              className="table"
              style={{
                color: "white",
                textAlign: "start",
              }}
            >
              <thead>
                <tr>
                  <th scope="col">Item</th>
                  <th scope="col">Price</th>
                </tr>
              </thead>
              <tbody>
                {cart?.map((el) => (
                  <tr key={el._id}>
                    <td>{el.name.substr(0, 20)}</td>
                    <td>{el.price}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <h4 className="mt-4">Total Amount : {total()}</h4>

            {clientToken && auth?.token ? (
              <>
                <DropIn
                  style={{
                    color: "white",
                  }}
                  options={{
                    authorization: clientToken,
                    // paypal: {
                    //   flow: "vault",
                    // },
                  }}
                  onInstance={(i) => setInstance(i)}
                />

                <button
                  className="my-3 mainButton outline"
                  onClick={paymentHandler}
                  disabled={!clientToken || !instance || !cart?.length}
                >
                  {loading ? "Processing" : "Checkout"}
                </button>
              </>
            ) : (
              <div>
                <button
                  onClick={() =>
                    navigate("/login", {
                      state: "/cart",
                    })
                  }
                  className="btn btn-warning"
                >
                  Login to Checkout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Cart;
