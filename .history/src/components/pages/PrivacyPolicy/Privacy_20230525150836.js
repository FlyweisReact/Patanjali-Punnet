/** @format */
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form } from "react-bootstrap";
import HOC from "../../layout/HOC";
import {  AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Privacy = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [ id , setId ] = useState('')

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/privacy"
      );
      setData(data.privacy);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://puneet-goyal-backend.vercel.app/api/v1/privacy/${id}`,
          { privacy: name }
        );
        console.log(data);
        toast.success("Privacy Policy Updated");
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
            Add Privacy Policy
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
        <div>
            <p> Privacy Policy  </p>
            <hr />
          </div>
        
        </div>

        {data?.length === 0 || !data ? (
          <Alert>Terms not Found</Alert>
        ) : (

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>PrivacyPolicy</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
            {data?.map((i, index) => (
              <tr>
                <td>{i.privacy}</td>
                <td >
                <span
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <i
                          className="fa-solid fa-trash"
                        ></i>
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                      setId(i._id)
                      setModalShow(true);
                    }}
                        ></i>
                      </span>
             
                </td>
              </tr>
            )}
            </tbody>
          </Table>
        </div>
        )}
      </section>
    </>
  );
};

export default HOC(Privacy);
