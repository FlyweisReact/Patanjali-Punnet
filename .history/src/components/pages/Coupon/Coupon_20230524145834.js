/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Alert, Button, Table ,Modal , Form } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Auth } from "../../Auth";

const Coupon = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);

  const GetCoupons = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/coupon/all",
        Auth
      );
      setData(data.coupons);
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
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


  useEffect(() => {
    GetCoupons();
  }, []);




  return (
    <>
      <section className="component-dashboard">
        <div className="two-component">
          <div>
            <p>All Coupon's</p>
            <hr style={{ width: "70%" }} />
          </div>

          <Button
            style={{
              backgroundColor: "#4099ff",
              color: "#fff",
              borderRadius: "0",
              border: "1px solid #4099ff",
              padding: "10px",
            }}
          >
            Add New
          </Button>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>No Coupon's Found</Alert>
        ) : (
          <div className="Overflow_Table">
            <Table striped bordered hover>  
              <thead>
                <tr>
                  <th>Coupon Code</th>
                  <th>Expiration Date</th>
                  <th>Activation Date</th>
                  <th>Discount</th>
                  <th>Minimum Order</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td> {i.couponCode} </td>
                    <td> {i.expirationDate} </td>
                    <td> {i.activationDate} </td>
                    <td> {i.discount} </td>
                    <td> {i.minOrder} </td>
                    <td>
                     <span className="d-flex gap-1 ">
                     <i className="fa-solid fa-pen-to-square"></i>
                     <i className="fa-solid fa-trash"></i>
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

export default HOC(Coupon);
