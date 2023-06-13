import React from "react";
import Header from "./Header";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import Design from "./Design";

import { Toaster } from "react-hot-toast";



const Layout = ({ children, description, keywords, author, title }) => {
  return (
    <div style={{ backgroundColor: "#031927", contain: "paint" }}>
      <Design></Design>
      <Helmet>
        <meta charSet="utf-8" />
        <meta name="description" content={description} />
        <meta name="keywords" content={keywords} />
        <meta name="author" content={author} />

        <title>{title}</title>
      </Helmet>

      <Header></Header>
      <main style={{ minHeight: "75vh" }}>
        <Toaster />
        {children}
      </main>
      <Footer></Footer>
    </div>
  );
};

// setting default values
Layout.defaultProps = {
  title: "Otakumation",
  description: "One destination for all anime realted shopping",
  keywords: "mern,express,react,node,mongodb",
  author: "Sachin",
};

export default Layout;
