import React from "react";
import Layout from "./../components/layouts/Layout";
import { BiMailSend, BiPhoneCall, BiSupport } from "react-icons/bi";
import contactUs from "../images/contact.png";

const Contact = () => {
  return (
    <Layout title={"Contact - Shopcart"}>
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
          <img src={contactUs} alt="contact Us" style={{ width: "70%" }} />
        </div>

        <div className="col-md-4 mx-5">
          <h1
            className="bg-dark p-2 text-center"
            style={{
              color: "#80e38f",
            }}
          >
            CONTACT US
          </h1>
          <p className="text-justify mt-2">
            any query and info about prodduct feel free to call anytime we 24X7
            avialible
          </p>
          <p className="mt-3">
            <BiMailSend /> : www.help@ecommerceapp.com
          </p>
          <p className="mt-3">
            <BiPhoneCall /> : 021-65165431
          </p>
          <p className="mt-3">
            <BiSupport /> : 1800-0000-0000 (toll free)
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
