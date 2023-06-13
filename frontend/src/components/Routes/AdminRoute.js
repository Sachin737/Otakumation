import React, { useEffect } from "react";

import { AuthContext } from "../../Context/auth";
import { useContext, useState } from "react";
import axios from "axios";
import { Outlet } from "react-router-dom";
import Spinner from "../Spinner";

const AdminRoute = () => {
  const [auth] = useContext(AuthContext);
  const [ok, setOk] = useState(false);


  useEffect(() => {
    const checkUser = async () => {
      const res = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/auth/admin-auth`,
        {
          headers: {
            authorization: auth?.token,
          },
        }
      );

      if (res.data.ok) {
        setOk(true);
      } else {
        setOk(false);
      }
    };

    if (auth?.token) {
      checkUser();
    }
  }, [auth?.token]);
  return ok ? <Outlet /> : <Spinner path={"/"} />;
};

export default AdminRoute;
