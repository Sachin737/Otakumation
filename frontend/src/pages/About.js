import React from "react";
import Layout from "./../components/layouts/Layout";
import aboutUs from "../images/about.png";

const About = () => {
  return (
    <Layout title={"About us - Shopcart"}>
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
          <img src={aboutUs} alt="about Us" style={{ width: "70%" }} />
        </div>

        <div
          className="col-lg-4 row-md-4 mx-5"
          style={{
            textAlign: "center",
          }}
        >
          <p className="text-justify mt-2">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Ducimus
            officiis obcaecati esse tempore unde ratione, eveniet mollitia,
            perferendis eius temporibus dicta blanditiis doloremque explicabo
            quasi sunt vero optio cum aperiam vel consectetur! Laborum enim
            accusantium atque, excepturi sapiente amet! Tenetur ducimus aut
            commodi illum quidem neque tempora nam. Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Autem commodi assumenda
          </p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
