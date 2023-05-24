/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Alert, Button, Container, Form, Modal, Table } from "react-bootstrap";
import axios from "axios";
import { AiFillDelete } from "react-icons/ai";
import { toast } from "react-toastify";

const GenerateId = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/getAllCategory"
      );
      setData(data.categories);
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
        `https://puneet-goyal-backend.vercel.app/api/v1/admin/delete/cat/${id}`
      );
      toast.success("category deleted");
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
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

    const AddCategory = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/admin/category/new",
          {
            name,
            image: url,
          }
        );
        console.log(data);
        toast.success("Category Added");
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
            Add Patanjali Category
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={AddCategory}>
              <Form.Group className="mb-3">
                <Form.Label>Image</Form.Label>
                <Form.Control
                  type="file"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                  onClick={() => postDetails()}
                />
              </Form.Group>

              <Button variant="outline-success" type="submit">
                Submit
              </Button>
            </Form>
          </Container>
        </Modal.Body>
        <Modal.Footer></Modal.Footer>
      </Modal>
    );
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
      <section
       className="component-dashboard"
      >
        <div className="two-component">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Patanjali Category
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
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add New
          </Button>
        </div>
            {
              data?.length === 0 || !data ?
              <Alert>No Category Found </Alert>
              :        <div style={{ overflow: "auto"}} className="response">
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Image</th>
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
                    <AiFillDelete
                      color="red"
                      onClick={() => deleteHandler(i._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
            }


      </section>
    </>
  );
};
export default HOC(GenerateId);
