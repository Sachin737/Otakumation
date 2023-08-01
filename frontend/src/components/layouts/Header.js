import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sword } from "phosphor-react";
import { AuthContext } from "../../Context/auth";
import { useContext } from "react";
import toast from "react-hot-toast";
import Searchbar from "../form/Searchbar";
import useCategory from "../../hooks/useCategory";

import { Badge } from "antd";
import axios from "axios";
import { CartContext } from "../../Context/cart";

const Header = () => {
  const categories = useCategory();
  const [auth, setAuth] = useContext(AuthContext);

  const [cart, setCart] = useContext(CartContext);


  const logoutUser = (e) => {
    setAuth({
      ...auth,
      user: null,
      token: "",
    });
    localStorage.removeItem("auth");
    localStorage.removeItem("cart");
    setTimeout(() => {
      toast.success("Logout Successfully");
    }, 500);
    window.location.reload();
  };

  return (
    <>
      <nav
        className="navbar navbar-expand-lg"
        style={{
          zIndex: "5",
        }}
      >
        <div className="container-fluid">
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo01"
            aria-controls="navbarTogglerDemo01"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link to="/" className="navbar-brand">
              <Sword className="siteIcon" size={42} />
              <span id="siteTitle">Otakumation</span>
            </Link>

            <div
              style={{
                width: "60%",
              }}
              className="mx-3 my-3 my-sm-4 mx-sm-3"
            >
              <Searchbar></Searchbar>
            </div>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink to="/" className="nav-link" aria-current="page">
                  Home
                </NavLink>
              </li>

              {/* Category DropDown */}
              <li className="nav-item dropdown">
                <NavLink
                  className="nav-link dropdown-toggle"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Category
                </NavLink>
                <ul
                  // style={{}}
                  className="dropdown-menu"
                  style={{
                    backgroundColor: "#031927",
                    height: "300px",
                    overflowX: "hidden",
                    overflowY: "auto",
                  }}
                >
                  <li className="nav-item">
                    <NavLink to={`/category`} className="nav-link">
                      All
                    </NavLink>
                  </li>
                  {categories?.map((el) => (
                    <li key={el._id} className="nav-item">
                      <NavLink to={`/category/${el.slug}`} className="nav-link">
                        {el.name}
                      </NavLink>
                    </li>
                  ))}
                </ul>
              </li>

              {/* USER DROPDOWN */}
              {!auth.user ? (
                <>
                  <li className="nav-item">
                    <NavLink to="/register" className="nav-link">
                      Signup
                    </NavLink>
                  </li>
                  <li className="nav-item">
                    <NavLink to="/login" className="nav-link">
                      Login
                    </NavLink>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item dropdown">
                    <NavLink
                      className="nav-link dropdown-toggle"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      {auth?.user?.name}
                    </NavLink>
                    <ul
                      className="dropdown-menu"
                      style={{ backgroundColor: "#031927" }}
                    >
                      <li className="nav-item">
                        <NavLink
                          to={`/dashboard/${
                            auth?.user?.role === 1 ? "admin" : "user"
                          }`}
                          className="nav-link"
                        >
                          Dashboard
                        </NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink
                          to="/login"
                          onClick={logoutUser}
                          className=" nav-link"
                        >
                          Logout
                        </NavLink>
                      </li>
                    </ul>
                  </li>
                </>
              )}

              <li className="nav-item position-relative">
                {cart?.length ? (
                  <span
                    className="badge rounded-pill bg-danger"
                    style={{
                      position: "absolute",
                      right: "-6px",
                      top: "-8px",
                    }}
                  >
                    {cart.length}
                  </span>
                ) : (
                  <></>
                )}
                <NavLink to="/cart" className="nav-link ">
                  Cart
                </NavLink>
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Header;
