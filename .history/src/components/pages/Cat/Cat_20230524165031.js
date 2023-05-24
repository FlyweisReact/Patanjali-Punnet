/** @format */

import React, { useEffect, useState } from "react";
import axios from "axios";
import HOC from "../../layout/HOC";
import Form from "react-bootstrap/Form";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { toast } from "react-toastify";
import { Alert, Spinner } from "react-bootstrap";

const Cat = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/banner/all"
      );
      setData(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [desc, setName] = useState("");
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
          "https://puneet-goyal-backend.vercel.app/api/v1/banner/add",
          {
            desc,
            image: url,
          }
        );
        console.log(data);
        toast.success("New Banner Created");
        props.onHide();
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    return (
      <Modal
        {...props}
        size="lg-down"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            {" "}
            Create New{" "}
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

          <Form onSubmit={AddCategory}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Image</Form.Label>
              <Form.Control type="file" onChange={(e) => postDetails(e)} />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Description</Form.Label>
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
        `https://puneet-goyal-backend.vercel.app/api/v1/banner/delete/${id}`
      );
      console.log(data);
      toast.success("Banner Removed");
      fetchData();
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
            <p> All Banner's ( {data?.length} ) </p>
            <hr />
          </div>

          <Button
            onClick={() => {
              setModalShow(true);
            }}
          >
            Create New
          </Button>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>No Banner Found</Alert>
        ) : (
          <div className="main-card--container">
            {data?.map((i, index) => {
              return (
                <>
                  <div key={index}>
                    <img src={i.image} alt="" style={{ width: "100%" }} />
                    <p style={{ textAlign: "center" }}>{i.desc}</p>

                    <Button
                      variant="outline-danger"
                      onClick={() => deleteHandler(i._id)}
                    >
                      Delete
                    </Button>
                  </div>
                </>
              );
            })}
          </div>
        )}
      </section>
    </>
  );
};

export default HOC(Cat);
