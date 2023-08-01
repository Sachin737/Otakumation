import Layout from "../components/layouts/Layout";
import { React, useContext, useState } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/AuthStyles.scss";
import { toast } from "react-hot-toast";
import { AuthContext } from "../Context/auth";
import { CartContext } from "../Context/cart.js";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const [auth, setAuth] = useContext(AuthContext);
  const [cart, setCart] = useContext(CartContext);

  const formSubmitHandler = async (e) => {
    e.preventDefault(); // to avoid default page refresh in js
    try {
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/login`,
        { email, password }
      );

      if (data?.success) {
        setTimeout(() => {
          toast.success(data?.message);
        }, 500);

        // saving user info using context api

        setAuth({
          ...data,
          user: data?.user,
          token: data?.token,
        });

        // //console.log(auth.user.role);

        // saving data in local storage
        localStorage.setItem("auth", JSON.stringify(data));

        //######## fetching cart of user
        const headers = {
          authorization: data?.token,
        };

        const res = await axios.get(
          `${process.env.REACT_APP_API}/api/v1/auth/user-cart`,
          { headers }
        );

        localStorage.setItem("cart", JSON.stringify(...res?.data?.cart));

        navigate(location.state || "/");
      } else {
        toast.error(data?.message);
      }
    } catch (err) {
      //console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title={"Login - Otakumation"}>
      <div className="login">
        <form onSubmit={formSubmitHandler}>
          <h1>Login</h1>

          <div className="ipButton mb-3">
            <input
              type="email"
              className="form-control"
              id="exampleInputEmail"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="ipButton mb-3">
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="mainButton btn btn-primary">
            Login
          </button>

          <button
            type="submit"
            className="smallButton"
            onClick={() => {
              navigate("/forgot-password");
            }}
          >
            Forgot Password?
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Login;
