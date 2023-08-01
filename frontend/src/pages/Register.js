import Layout from "../components/layouts/Layout";
import { React, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../styles/AuthStyles.scss";
import { toast } from "react-hot-toast";

const Register = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  const [answer, setAnswer] = useState("");
  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault(); // to avoid default page refresh in js
    try {
      let cart = [];
      const res = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/auth/register`,
        { name, email, phone, address, password , answer, cart}
      );

      if (res && res.data.success) {
        setTimeout(() => {
          toast.success(res.data.message);
        }, 500);
        navigate("/login");
      } else {
        toast.error(res.data.message);
      }
    } catch (err) {
      //console.log(err);
      toast.error("Something went wrong!");
    }
  };

  return (
    <Layout title={"Register - Shopcart"}>
      <div className="register">
        <form onSubmit={formSubmitHandler}>
          <h1>Register</h1>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name"
              value={name}
              onChange={(e) => setname(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="email"
              className="form-control"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Name of your primary school?"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="mainButton btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default Register;
