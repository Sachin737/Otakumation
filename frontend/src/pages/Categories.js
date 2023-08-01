import React from "react";
import Layout from "../components/layouts/Layout.js";
import useCategory from "../hooks/useCategory.js";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/CategoryStyles.scss";

const Categories = () => {
  const categories = useCategory();
  //console.log(categories);

  return (
    <Layout title={"All categories"}>
      <div className="container">
        <div className="row mt-5">
          {categories?.map((el) => (
            <div key={el._id} className="col-md-3 my-3">
              <Link to={`/category/${el.slug}`} className="button">
                <span>{el.name}</span>
              </Link>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
};

export default Categories;
