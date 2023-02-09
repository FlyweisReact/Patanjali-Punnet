/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Button, Modal, Form, Container, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";

import img from "../../SVG/list.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { Auth } from "../../Auth";

const City = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [nonPatanjali, setNP] = useState([]);
  const [patanjali, setP] = useState([]);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5005/api/v1/admin/products",
        Auth
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  const getPatanjali = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5005/api/v1/getAllCategory"
      );
      setP(data.categories);
    } catch (err) {
      console.log(err);
    }
  };

  const getNonPatanjali = async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5005/api/v1/non-pantangli/getAllNonPanangli"
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
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5005/api/v1/admin/product/new",
          { name, description, price, category, images: url },
          Auth
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
                  <option>--Select Category--</option>
                  {patanjali?.map((i, index) => (
                    <option key={index} value={i._id}>
                      {" "}
                      {i.name}{" "}
                    </option>
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
      const data = await axios.delete(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/cityRouter/deletepost/${id}`
      );
      console.log(data)
      toast.success("City Delted");
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

      <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: "40px",
            height: "40px",
            marginTop: "5px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", marginTop: "10px" }}>
          All Product List
        </p>
      </div>

      <section
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Product's
            <hr style={{ width: "70%" }} />
          </span>
          <Button
            style={{
              backgroundColor: "#4099ff",
              color: "#fff",
              borderRadius: "0",
              border: "1px solid #4099ff",
              padding: "10px",
            }}
            onClick={() => setModalShow(true)}
          >
            Add Product's
          </Button>
        </div>

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
            {data?.products?.map((i, index) => (
              <tr key={index}>
                <td>
                {i.images?.map((pic ,index) =)}
                  <img
                    src={}
                    className="fast-food"
                    alt="ProductImage"
                  />
                </td>
                <td> {i.name} </td>
                <td> {i.description} </td>
                <td> {i.price} </td>
                <td> {i.ratings} </td>
                <td> {i.category?.name} </td>
                <td> {i.Stock} </td>
                <td> {i.numOfReviews} </td>
                <td>
                  <AiFillDelete
                    color="red"
                    cursor={"pointer"}
                    onClick={() => deleteHandler(i._id)}
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </section>
    </>
  );
};

export default HOC(City);
