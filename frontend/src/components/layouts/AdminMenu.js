import React from "react";
import { NavLink } from "react-router-dom";

import "../../styles/adminDashboard.scss";

const AdminMenu = () => {
  return (
    <div className="d-flex align-items-center flex-column">
      <div className="text-center sideBar">
        <div className="list-group options">
          <h4>
            <NavLink
              style={{
                textDecoration: "none",
              }}
              to="/dashboard/admin"
            >
              Admin Dashboard
            </NavLink>
          </h4>

          <NavLink
            to="/dashboard/admin/create-category"
            className="list-group-item list-group-item-action list-group-item-light"
          >
            Create Category
          </NavLink>
          <NavLink
            to="/dashboard/admin/create-product"
            className="list-group-item list-group-item-action list-group-item-light"
          >
            Create Product
          </NavLink>
          <NavLink
            to="/dashboard/admin/products"
            className="list-group-item list-group-item-action list-group-item-light"
          >
            Products
          </NavLink>
          <NavLink
            to="/dashboard/admin/orders"
            className="list-group-item list-group-item-action list-group-item-light"
          >
            Orders
          </NavLink>
        </div>
      </div>
    </div>
  );
};

export default AdminMenu;
