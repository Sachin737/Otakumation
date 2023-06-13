import React from "react";
import AdminMenu from "../../components/layouts/AdminMenu";
import CategoryForm from "../../components/form/CategoryForm.js";
import Layout from "../../components/layouts/Layout";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useContext } from "react";
import { AuthContext } from "../../Context/auth";
import { Modal } from "antd";

import { useEffect, useState } from "react";

import "../../styles/adminDashboard.scss";

const CreateCategory = () => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [auth] = useContext(AuthContext);
  const [visible, setVisible] = useState(false);

  const [updatedName, setUpdatedName] = useState("");
  const [selected, setSelected] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        authorization: auth?.token,
      };
      const mydata = {
        name,
      };
      const { data } = await axios.post(
        `${process.env.REACT_APP_API}/api/v1/category/create-category`,
        mydata,
        { headers }
      );

      if (data?.success) {
        toast.success(`Category ${name} created successfully!`);
        setName("");
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Oops! Error in input form");
      console.log(err);
    }
  };

  // to get all categories in db
  const getAllCategories = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API}/api/v1/category/all-categories`
      );

      if (data?.success) {
        data.category?.reverse();
        setCategories(data.category);
      }
    } catch (err) {
      console.log(err);
      toast.error("Error in getting all categories!");
    }
  };

  // handle update On Edit
  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const headers = {
        authorization: auth?.token,
      };
      const mydata = {
        name: updatedName,
      };

      const { data } = await axios.put(
        `${process.env.REACT_APP_API}/api/v1/category/update-category/${selected._id}`,
        mydata,
        {
          headers,
        }
      );

      if (data.success) {
        toast.success(data.message);
        setSelected(null);
        setUpdatedName("");
        setVisible(false);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  // Delete category
  const handleDelete = async (deletedID) => {
    try {
      const headers = {
        authorization: auth?.token,
      };

      const { data } = await axios.delete(
        `${process.env.REACT_APP_API}/api/v1/category/delete-category/${deletedID}`,
        {
          headers,
        }
      );

      if (data.success) {
        toast.success(data.message);
        getAllCategories();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  useEffect(() => {
    getAllCategories();
  }, []);

  return (
    <Layout title={"DashBoard - CreateCategory"}>
      <div className="container-fluid m-3 p-3">
        <div className="row">
          <div className="col-md-3 dashboard">
            <AdminMenu></AdminMenu>
          </div>
          <div className="col-md-8 createCategory">
            <h1>Manage Category</h1>
            <div className="p-3">
              <CategoryForm
                handleSubmit={handleSubmit}
                value={name}
                setValue={setName}
              ></CategoryForm>
            </div>
            <div className=" cat-list">
              <table className="table table-dark table-striped">
                <thead>
                  <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {categories &&
                    categories.map((Row) => (
                      <tr key={Row._id}>
                        <td>{Row["name"]}</td>

                        <td>
                          <button
                            onClick={() => {
                              setVisible(true);
                              setUpdatedName(Row.name);
                              setSelected(Row);
                            }}
                            className="btn btn-primary ms-3"
                          >
                            Edit
                          </button>
                          <button
                            className="btn btn-danger ms-3"
                            onClick={() => handleDelete(Row._id)}
                          >
                            Delete
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>

            <Modal
              onCancel={() => setVisible(false)}
              footer={null}
              open={visible}
              centered
            >
              <CategoryForm
                handleSubmit={handleUpdate}
                value={updatedName}
                setValue={setUpdatedName}
              />
            </Modal>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default CreateCategory;
