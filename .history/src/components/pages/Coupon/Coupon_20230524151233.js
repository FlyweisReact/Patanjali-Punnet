/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Alert, Button, Table, Modal, Form } from "react-bootstrap";
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
    const [couponCode, setCouponCode] = useState("");
    const [activationDate, setActivationDate] = useState("");
    const [expirationDate, setExpiryDate] = useState("");
    const [discount, setDiscount] = useState("");
    const [minOrder, setMinOrder] = useState("");

    const AddCategory = async (e) => {
      e.preventDefault();
      try {
        const { data } = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/coupon",
          {
            couponCode,
            activationDate,
            expirationDate,
            discount,
            minOrder,
          },
          Auth
        );
        console.log("Create", data);
        toast.success("New Coupon Create");
        props.onHide();
        GetCoupons();
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
            Create New Coupon
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={AddCategory}>
            <Form.Group className="mb-3">
              <Form.Label>Coupon Code</Form.Label>
              <Form.Control
                type="text"
                onChange={(e) => setCouponCode(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Activation Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setActivationDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control
                type="date"
                onChange={(e) => setExpiryDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Discount</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Minimum Order</Form.Label>
              <Form.Control
                type="number"
                min={0}
                onChange={(e) => setMinOrder(e.target.value)}
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

  useEffect(() => {
    GetCoupons();
  }, []);

  const deleteCoupon = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://puneet-goyal-backend.vercel.app/api/v1/coupon/${id}`,
        Auth
      );
      console.log("Deleted", data);
      toast.success("Coupon Deleted");
      GetCoupons();
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
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
            <p>All Coupon's {data?.length >0 ? ("Total" : data?.length) :""} </p>
            <hr style={{ width: "70%" }} />
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
                    <td> {i.expirationDate?.slice(0,10)} </td>
                    <td> {i.activationDate?.slice(0,10)} </td>
                    <td> {i.discount}% </td>
                    <td> <i className="fa-solid fa-indian-rupee-sign"></i> {i.minOrder} </td>
                    <td>
                      <i
                        className="fa-solid fa-trash"
                        onClick={() => deleteCoupon(i._id)}
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

export default HOC(Coupon);
