/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Button, Modal, Form, Container, Table, Alert } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Auth } from "../../Auth";

const City = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [nonPatanjali, setNP] = useState([]);
  const [patanjali, setP] = useState([]);
  const token = localStorage.getItem("token");


  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/admin/products",
      Auth
      );
      setData(data.products);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message)
    }
  };

  const getPatanjali = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/getAllCategory"
      );
      setP(data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const getNonPatanjali = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/non-pantangli/getAllNonPanangli"
      );
      setNP(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchHandler();
    getPatanjali();
    getNonPatanjali();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [image, setImage] = useState([]);
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [url, setUrl] = useState("");

    const postDetails = (e) => {
      const data = new FormData();
      data.append("file", image);
      data.append("upload_preset", "ml_default");
      data.append("cloud_name", "dbcnha741");
      fetch("https://api.cloudinary.com/v1_1/dbcnha741/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setUrl(data.url);
          console.log(data.url);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    const AddProduct = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/admin/product/new",
          { name, description, price, category, images: url },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        toast.success(`${data.product.name} Added`);
        fetchHandler();
        props.onHide();
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
          <Modal.Title id="contained-modal-title-vcenter">Add City</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={AddProduct}>
              <Form.Group className="mb-3">
                <Form.Label> Image </Form.Label>
                <Form.Control
                  type="file"
                  accept="image/*"
                  multiple
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onClick={() => postDetails()}
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setPrice(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {patanjali?.map((i, index) => (
                    <>
                      <option>--Select Category--</option>
                      <option key={index} value={i._id}>
                        {" "}
                        {i.name}{" "}
                      </option>
                    </>
                  ))}
                  {nonPatanjali?.map((i, index) => (
                    <>
                      <option></option>
                      <option key={index} value={i._id}>
                        {" "}
                        {i.name}{" "}
                      </option>
                    </>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="outline-dark" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://puneet-goyal-backend.vercel.app/api/v1/admin/product/${id}`,
       Auth
      );
      toast.success(data.message);
      fetchHandler();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <section className="component-dashboard">
        <div className="two-component">
          <div>
            <p> All Product's</p>
            <hr />
          </div>

          <Button onClick={() => setModalShow(true)}>Create New</Button>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>Product Not Found</Alert>
        ) : (
          <div className="Overflow_Table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Product</th>
                  <th>Description</th>
                  <th>Price</th>
                  <th>Rating</th>
                  <th>Category</th>
                  <th>Stock</th>
                  <th>No. of Reviews</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td>
                      {i.images?.map((pic, index) => (
                        <img
                          src={pic}
                          key={index}
                          className="fast-food"
                          alt=""
                        />
                      ))}
                    </td>
                    <td> {i.name} </td>
                    <td> {i.description} </td>
                    <td> {i.price} </td>
                    <td> {i.ratings} </td>
                    <td> {i.category?.name} </td>
                    <td> {i.Stock} </td>
                    <td> {i.numOfReviews} </td>
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteHandler(i._id)}
                      ></i>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        )}
      </section>
    </>
  );
};

export default HOC(City);
