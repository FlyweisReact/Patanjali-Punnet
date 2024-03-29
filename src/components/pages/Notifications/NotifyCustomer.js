/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Button, Modal, Form, Container, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import img from "../../SVG/list.svg";
import axios from "axios";
import { toast } from "react-toastify";
import { Auth } from "../../Auth";

const NotifyCustomer = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchhandler = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/coupon/all",
        Auth
      );
      setData(data.coupons);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchhandler();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://puneet-goyal-backend.vercel.app/api/v1/coupon/${id}`,
        Auth
      );
      toast.success(data.msg);
      fetchhandler();
    } catch (err) {
      console.log(err);
    }
  };

  function MyVerticallyCenteredModal(props) {
    const [couponCode, setC] = useState("");
    const [minOrder, setM] = useState("");
    const [expirationDate, setE] = useState("");
    const [activationDate, setA] = useState("");
    const [discount, setDiscount] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      const FormD = {
        couponCode,
        minOrder,
        expirationDate,
        activationDate,
        discount,
      };
      try {
        const { data } = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/coupon",
          FormD,
          Auth
        );
        toast.success(data?.msg);
        fetchhandler();
        setModalShow(false);
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
            Add Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={postHandler}>
              <Form.Group className="mb-3">
                <Form.Label> Coupon Code </Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setC(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Minimum Amount </Form.Label>
                <Form.Control
                  type="number"
                  min={0}
                  onChange={(e) => setM(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Activation Date </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setA(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Expiry Date </Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setE(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Discount </Form.Label>
                <Form.Control
                  type="number"
                  min={1}
                  onChange={(e) => setDiscount(e.target.value)}
                />
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
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Coupon's List <br />
          <span style={{ fontSize: "14px" }}>All Coupon's List</span>
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
            All Coupon's
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
            Add Coupon's
          </Button>
        </div>

        <div
          style={{
            overflowX: "auto",
            padding: "10px",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Coupon code</th>
                <th> Minimum Amount </th>
                <th>Activation Date </th>
                <th>Expiry Date</th>
                <th>Discount</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td> {i.couponCode} </td>
                  <td> ₹{i.minOrder} </td>
                  <td> {i.activationDate.slice(0, 10)} </td>
                  <td> {i.expirationDate.slice(0, 10)} </td>
                  <td> {i.discount}% </td>
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
        </div>
      </section>
    </>
  );
};

export default HOC(NotifyCustomer);
