import React from "react";
import { useContext } from "react";
import { SearchContext } from "../../Context/search";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MagnifyingGlass } from "phosphor-react";
import "../../index.css";

const Searchbar = () => {
  const [searchObj, setSearchObj] = useContext(SearchContext);
  const navigate = useNavigate();

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/products/search/${searchObj.keyword}`
      );

      setSearchObj({ ...searchObj, results: data.products });
      //   //console.log(data);

      navigate("/search");
    } catch (err) {
      //console.log(err);
    }
  };
  return (
    <div>
      <form className="d-flex" role="search" onSubmit={submitHandler}>
        <input
          style={{
            zIndex: "1",
            borderTopRightRadius: "0px",
            borderBottomRightRadius: "0px",
          }}
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          values={searchObj.keywords}
          onChange={(e) => {
            setSearchObj({ ...searchObj, keyword: e.target.value });
          }}
        />
        <button
          style={{
            width: "60px",
            position: "relative",
            left: "-16px",
            borderLeft: "none",
            overflow: "hidden",
            zIndex: "0",

            color: "#ffc107",
            border: "1px solid #ffc107",
          }}
          className="btn btn-outline-warning jugaad"
          type="submit"
        >
          <MagnifyingGlass
            size={28}
            style={{
              position: "relative",
              right: "-4px",
            }}
            className="magnify"
          />
        </button>
      </form>
    </div>
  );
};

export default Searchbar;
