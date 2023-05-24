/** @format */

import React, { useState, useEffect } from "react";
import axios from "axios";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { toast } from "react-toastify";
import { Badge } from "react-bootstrap";
import { Auth } from "../../Auth";

const Customers = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/admin/users/",
        Auth
      );
      setData(data.users);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://puneet-goyal-backend.vercel.app/api/v1/admin/user/${id}`,
        Auth
      );
      console.log(data);
      toast.success("User deleted");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="component-dashboard">
        <div className="two-component">
          <div>
            <p> All Users ( {data?.length} ) </p>
            <hr />
          </div>
        </div>


  {data?.length === 0 || !data ? (
          <Alert>No User Found</Alert>
        ) : (
        <div className="Overflow_Table">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th> Mobile Number </th>
                <th> Role </th>
                <th> Created At </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.name} </td>
                  <td>{i.phone} </td>
                  <td>
                    {i.role === "admin" ? (
                      <Badge bg="success">Admin</Badge>
                    ) : (
                      ""
                    )}{" "}
                    {i.role === "user" ? <Badge>User</Badge> : ""}{" "}
                  </td>
                  <td>{i.createdAt?.slice(1, 10)} </td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteHandler(i._id)}
                      ></i>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </div>
    </>
  );
};

export default HOC(Customers);
