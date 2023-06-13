import { React, useState, useEffect } from "react";

import UserMenu from "../../components/layouts/UserMenu";
import Layout from "../../components/layouts/Layout";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../../styles/AuthStyles.scss";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth";

const Profile = () => {
  const [name, setname] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");

  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  const formSubmitHandler = async (e) => {
    e.preventDefault(); // to avoid default page refresh in js
    try {
      const headers = {
        authorization: auth?.token,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/auth/profile`,
        { name, email, phone, address, password },
        { headers }
      );
      if (data?.success) {
        setAuth({ ...auth, user: data?.updatedUser });

        let details = JSON.parse(localStorage.getItem("auth"));
        details.user = data.updatedUser;

        localStorage.setItem("auth", JSON.stringify(details));

        setTimeout(() => {
          toast.success(data.message);
        }, 500);
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.log(err);
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    const { name, email, phone, address } = auth?.user;
    setname(name);
    setEmail(email);
    setPhone(phone);
    setAddress(address);
  }, []);

  return (
    <Layout title={"User - Profile"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div className="col-md-9">
            <div className="register">
              <form onSubmit={formSubmitHandler}>
                <h1>User Profile</h1>

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
                    disabled
                    style={{
                      backgroundColor: "#28333a",
                    }}
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
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>

                <button type="submit" className="mainButton btn btn-primary">
                  Update
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
