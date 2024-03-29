import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import Layout from "../../components/layouts/Layout";

const Users = () => {
  return (
    <Layout title={"DashBoard - Users"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-9">
            <h1>All users</h1>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Users;
