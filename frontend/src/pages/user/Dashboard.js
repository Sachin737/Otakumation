import React, { useContext } from "react";
import Layout from "../../components/layouts/Layout";
import UserMenu from "../../components/layouts/UserMenu";
import { AuthContext } from "../../Context/auth";

const Dashboard = () => {
  const [auth] = useContext(AuthContext);
  return (
    <Layout title={"DashBoard - Otakumation"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <UserMenu></UserMenu>
          </div>
          <div className="col-md-9">
            <div className="card w-75 p-3">
              <h3>User name: {auth?.user?.name}</h3>
              <h3>User email: {auth?.user?.email}</h3>
              <h3>User phone no: {auth?.user?.phone}</h3>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
