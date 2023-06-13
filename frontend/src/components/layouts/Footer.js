import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <div className="footer" style={{ zIndex: "5" }}>
        <h2 className="text-center">All Rights Reserved &copy; Sachin</h2>
        <div className="text-center mt-4">
          <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
          <Link to="/policy">Privacy Policy</Link>
        </div>
      </div>
    </>
  );
};

export default Footer;
