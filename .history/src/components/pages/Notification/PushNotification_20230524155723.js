/** @format */
import { useEffect } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import HOC from "../../layout/HOC";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import { AiFillDelete } from "react-icons/ai";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";

const PushNotification = () => {
  const [modalShow, setModalShow] = useState(false);
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/notify"
      );
      setData(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {
    const [message, setM] = useState("");

    const AddNotification = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "https://puneet-goyal-backend.vercel.app/api/v1/notify",
          {
            message,
          }
        );
        toast.success("Notification Added");
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
            Push Notifcation
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={AddNotification}>
              <Form.Group className="mb-3">
                <FloatingLabel
                  controlId="floatingTextarea"
                  label="Comments"
                  className="mb-3"
                >
                  <Form.Control
                    as="textarea"
                    onChange={(e) => setM(e.target.value)}
                    placeholder="Leave a comment here"
                  />
                </FloatingLabel>
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
 
    </>
  );
};

export default HOC(PushNotification);
