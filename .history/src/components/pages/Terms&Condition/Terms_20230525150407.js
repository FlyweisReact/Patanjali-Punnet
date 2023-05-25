/** @format */
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { AiFillEdit } from "react-icons/ai";
import { toast } from "react-toastify";
import axios from "axios";

const Terms = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/terms/"
      );
      setData(data.terms);
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
          `https://puneet-goyal-backend.vercel.app/api/v1/terms/${id}`,
          { terms }
        );
        console.log(data);
        toast.success("Terms and Condition Updated");
        fetchData();
        setModalShow(false);
      } catch (err) {
        console.log(err);
      }
    };

    const AddHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/terms",
          { terms }
        );
        console.log(data);
        toast.success("Terms and Condition Added");
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
            {edit ? "Update Terms&Condition" : "Create new"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? postHandler : AddHandler}>
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

      <section className="component-dashboard">
        <div className="two-component">
          <div>
            <p> Terms&Condition </p>
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
          <Alert>Terms not Found</Alert>
        ) : (

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Terms&Condition</th>
                <th> Action </th>
              </tr>
            </thead>
            <tbody>
            {data?.map((i ,index) => (
              <tr>
                <td> {i.} </td>
                <td>
                  <AiFillEdit
                    color={"blue"}
                    cursor={"pointer"}
                    onClick={() => {
                      setId(data?.terms?._id);
                      setEdit(true);
                      setModalShow(true);
                    }}
                  />
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

export default HOC(Terms);
