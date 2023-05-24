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
    <section className="component-dashboard">
        <div className="two-component">
          <div>
            <p>All Coupon's ( {data?.length} ) </p>
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

export default HOC(PushNotification);
