import React from "react";
import Layout from "./../components/layouts/Layout";
import policy from "../images/policy.png";

const Policy = () => {
  return (
    <Layout title={"Policy - Shopcart"}>
      <div
        className="contactus d-flex flex-column flex-lg-row align-items-center"
        style={{
          color: "#ecf5de",
          height: "70vh",
          // border: "2px solid green",
        }}
      >
        <div
          className="col-lg-6 row-md-6 mx-5"
          style={{
            textAlign: "center",
          }}
        >
          <img src={policy} alt={"privacy policy"} style={{ width: "70%" }} />
        </div>
        <div
          className="col-lg-4 row-md-4 mx-5"
          style={{
            textAlign: "center",
          }}
        >
          <h4>add privacy policy</h4>
          <h4>add privacy policy</h4>
          <h4>add privacy policy</h4>
        </div>
      </div>
    </Layout>
  );
};

export default Policy;
