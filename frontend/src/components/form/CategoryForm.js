import React from "react";
import "../../styles/adminDashboard.scss";

const CategoryForm = ({ handleSubmit, value, setValue }) => {
  return (
    <form onSubmit={handleSubmit} className="categoryForm">
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Enter category"
          value={value}
          onChange={(e) => {
            setValue(e.target.value);
          }}
        />
      </div>
      <button type="submit" className="mainButton outline">
        Create
      </button>
    </form>
  );
};

export default CategoryForm;
