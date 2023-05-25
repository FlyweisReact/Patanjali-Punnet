/** @format */

import React, { useState, useEffect } from "react";
import HOC from "../layout/HOC";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import axios from "axios";
import { Auth } from "../Auth";

const NonPatanjali = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = React.useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/non-pantangli/getAllNonPanangli"
      );
      setData(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [url, setUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const postDetails = (e) => {
      setLoading(true);
      const data = new FormData();
      data.append("file", e.target.files[0]);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          setSuccess(true);
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
          toast.error(err.response.data.message);
        });
    };

    const AddCategory = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/non-pantangli/admin/cat/new",
          {
            name,
            image: url,
          }
        );
        console.log(data);
        toast.success("New Category Created");
        props.onHide();
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    const EditCategory = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://puneet-goyal-backend.vercel.app/api/v1/non-pantangli/admin/category/${id}`,
          {
            name,
            image: url,
          },
          Auth
        );
        console.log(data);
        toast.success(" Category Edited");
        props.onHide();
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
          {
              edit ? "Edit  Category" : 'Create New Category'
            }
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {loading ? (
            <Spinner animation="border" role="status">
              <span className="visually-hidden">Loading...</span>
            </Spinner>
          ) : (
            ""
          )}
          {success ? <Alert variant="success">Image Uploaded</Alert> : ""}

          <Form onSubmit={edit ? EditCategory : AddCategory}>
            <Form.Group className="mb-3">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => postDetails(e)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Button variant="outline-success" type="submit">
              Submit
            </Button>
          </Form>
        </Modal.Body>
      </Modal>
    );
  }
  const deleteHandler = async (id) => {
    try {
      const data = await axios.delete(
        `https://puneet-goyal-backend.vercel.app/api/v1/non-pantangli/delete/${id}`
      );
      console.log(data);
      toast.success("Category Removed");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <div className="component-dashboard">
        <div className="two-component">
          <div>
            <p> All Non-Patanjali Category ( {data?.length} ) </p>
            <hr />
          </div>

          <Button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            <i className="fa-solid fa-plus mr-1"></i>    Create New
          </Button>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>No Category Found</Alert>
        ) : (
          <div className="Overflow_Table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th> Name </th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td>
                      <img src={i.image} alt="" className="fast-food" />
                    </td>
                    <td> {i.name} </td>
                    <td>
                    <span
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="fa-solid fa-trash"
                          onClick={() => deleteHandler(i._id)}
                        ></i>
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setEdit(true);
                            setId(i._id);
                            setModalShow(true);
                          }}
                        ></i>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </div>
    </>
  );
};

export default HOC(NonPatanjali);
