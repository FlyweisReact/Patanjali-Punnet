/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import {
  Button,
  Modal,
  Form,
  Container,
  Table,
  Alert,
  Spinner,
} from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Auth } from "../../Auth";

const City = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const fetchHandler = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/admin/products",
        Auth
      );
      setData(data.products);
    } catch (err) {
      console.log(err);
      toast.error(err.response.data.message);
    }
  };

  useEffect(() => {
    fetchHandler();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [url, setUrl] = useState("");
    const [Stock, setStock] = useState("");
    const [nonPatanjali, setNP] = useState([]);
    const [patanjali, setP] = useState([]);
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);

    const getPatanjali = async () => {
      try {
        const { data } = await axios.get(
          "https://puneet-goyal-backend.vercel.app/api/v1/getAllCategory",
          Auth
        );
        setP(data.categories);
      } catch (err) {
        console.log(err);
      }
    };

    const getNonPatanjali = async () => {
      try {
        const { data } = await axios.get(
          "https://puneet-goyal-backend.vercel.app/api/v1/non-pantangli/getAllNonPanangli",
          Auth
        );
        setNP(data.message);
      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      if (props.show) {
        getPatanjali();
        getNonPatanjali();
      }
    }, [props]);

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

    const AddProduct = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/admin/product/new",
          { name, description, price, category, images: url, Stock },
          Auth
        );
        console.log(data);
        toast.success("New Product Added");
        fetchHandler();
        props.onHide();
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
      }
    };

    const EditProduct = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.put(
          `https://puneet-goyal-backend.vercel.app/api/v1/admin/product/${id}`,
          { name, description, price, category, images: url, Stock },
          Auth
        );
        console.log(data);
        toast.success("Product Edited");
        fetchHandler();
        props.onHide();
      } catch (err) {
        console.log(err);
        toast.error(err.response.data.message);
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
            {edit ? "Edit Product" : "Create New Product"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            {loading ? (
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            ) : (
              ""
            )}
            {success ? <Alert variant="success">Image Uploaded</Alert> : ""}
            <Form onSubmit={edit ? EditProduct : AddProduct}>
              <Form.Group className="mb-3">
                <Form.Label> Image </Form.Label>
                <Form.Control type="file" onChange={(e) => postDetails(e)} />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
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
                <Form.Label>Stock</Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setStock(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Select
                  aria-label="Default select example"
                  onChange={(e) => setCategory(e.target.value)}
                >
                <option>-- Select Category --</option>
                  {patanjali?.map((i, index) => (
                    <>
                      <option>--All Patanjali Categories--</option>
                      <option key={index} value={i._id}>
                        {" "}
                        {i.name}{" "}
                      </option>
                    </>
                  ))}
                  {nonPatanjali?.map((i, index) => (
                    <>
                      <option>--All Non-Patanjali Categories--</option>
                      <option key={index} value={i._id}>
                        {" "}
                        {i.name}{" "}
                      </option>
                    </>
                  ))}
                </Form.Select>
              </Form.Group>
              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
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
      toast.error(err.response.data.message);
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
            <p> All Product's ( {data?.length} ) </p>
            <hr />
          </div>

          <Button
            onClick={() => {
              setEdit(false);
              setModalShow(true);
            }}
          >
            Create New
          </Button>
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
                    <td>  <i className="fa-solid fa-indian-rupee-sign"></i> {i.price} </td>
                    <td> {i.ratings} </td>
                    <td> {i.category?.name} </td>
                    <td> {i.Stock} </td>
                    <td> {i.numOfReviews} </td>
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
      </section>
    </>
  );
};

export default HOC(City);
