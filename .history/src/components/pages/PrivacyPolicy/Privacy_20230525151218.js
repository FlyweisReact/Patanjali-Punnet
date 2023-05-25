/** @format */
import React, { useEffect, useState } from "react";
import { Button, Table, Modal, Form, Alert } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { toast } from "react-toastify";
import axios from "axios";
import { Auth } from "../../Auth";

const Privacy = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [data, setData] = useState([]);
  const [id, setId] = useState("");
  const [edit, setEdit] = useState(false);

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

    const AddHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/privacy",
          { privacy: name },
          Auth
        );
        console.log(data);
        toast.success("Privacy Policy Created");
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
            {edit ? " Add Privacy Policy" : "Create New Privacy Policy"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={edit ? postHandler : AddHandler}>
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

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(
        `https://puneet-goyal-backend.vercel.app/api/v1/privacy/${id}`,
        Auth
      );
      console.log(data);
      toast.success("Privacy Policy Removed");
      fetchData();
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
            <p> Privacy Policy </p>
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
          <Alert>Privacy Policy not Found</Alert>
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
                    <td>
                      <span
                        style={{
                          display: "flex",
                          gap: "10px",
                          alignItems: "center",
                        }}
                      >
                        <i className="fa-solid fa-trash"></i>
                        <i
                          className="fa-solid fa-pen-to-square"
                          onClick={() => {
                            setId(i._id);
                            setEdit(true);
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

export default HOC(Privacy);
