import React from "react";
import loader from "../images/spinner1.gif";

const Spinner = (props) => {
  return (
    <div className="text-center">
      <img src={loader} alt="loading" width={"80px"} height="auto" />
    </div>
  );
};

export default Spinner;
