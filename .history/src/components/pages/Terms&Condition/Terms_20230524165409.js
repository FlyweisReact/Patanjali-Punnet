/** @format */
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import HOC from "../../layout/HOC";
import {  AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import img from "../../SVG/list.svg";
import axios from "axios";

const Terms = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/terms/"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [terms, setName] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          "https://puneet-goyal-backend.vercel.app/api/v1/terms/63e4d098eb79be1cd58ad351",
          { terms }
        );
        console.log(data);
        toast.success("Updated");
        fetchData();
        setModalShow(false);
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
            Update Terms&Condition
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form
            style={{
              color: "black",
              margin: "auto",
            }}
            onSubmit={postHandler}
          >
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Terms&Condition</Form.Label>
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

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
 
      <section
        className="component-dashboard"
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            Terms&Condition
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Terms&Condition</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{data?.terms?.terms}</td>
                <td>
                  <AiFillEdit
                    color={"blue"}
                    onClick={() => setModalShow(true)}
                  />
                </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Terms);
