/** @format */

import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "../../Auth";
import { Alert, Badge, Form, Modal } from "react-bootstrap";

const NotifyLabour = () => {
  const [data, setData] = useState([]);
  const [modalShow, setModalShow] = useState(false);
  const [ id  , setId ] = useState("")

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/admin/orders",
        Auth
      );
      setData(data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  function MyVerticallyCenteredModal(props) {

      const [paymentStatus , setPaymentStatus ] = useState("")
      const [  delivered , setDelivered] = useState("")

      const updateOrder  = async (e) => {
        e.preventDefault()
        try{
          const { data } = await axios.put(`https://puneet-goyal-backend.vercel.app/api/v1/admin/order/646ef874260d0df52b63550f`)
        }catch(e) { 
          console.log(e)
        }
  
      }

    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Edit Order Status
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Select aria-label="Default select example" className="mb-3">
              <option>-- Select Payment Status --</option>
              <option value="Cancelled">Cancelled</option>
              <option value="Pending">Pending</option>
              <option value="Success">Success</option>
            </Form.Select>
            <Form.Select aria-label="Default select example" className="mb-3">
              <option>-- Select Delivery Status --</option>
              <option value="true">Delivered</option>
              <option value="false">Not Delivered Yet</option>
            </Form.Select>
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
            <p> All Order's ( {data?.length} ) </p>
            <hr />
          </div>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>Orders Not Found</Alert>
        ) : (
          <div className="Overflow_Table">
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> Number </th>
                  <th> Customer Name </th>
                  <th> Customer Phone Number </th>
                  <th> Payment Status </th>
                  <th> Grand Total </th>
                  <th> Discount </th>
                  <th> Shipping Price </th>
                  <th> Delivery Status </th>
                  <th> Product Details </th>
                  <th> Amount To be Paid </th>
                  <th> Created At </th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td style={{ textTransform: "capitalize" }}>
                      {" "}
                      {i.user?.name}{" "}
                    </td>
                    <td> {i.user?.phone} </td>
                    <td> {i.paymentStatus} </td>
                    <td>
                      {" "}
                      <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                      {i.grandTotal}{" "}
                    </td>
                    <td> {i.discount}% </td>
                    <td>
                      {" "}
                      <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                      {i.shippingPrice}{" "}
                    </td>
                    <td>
                      {" "}
                      {i.delivered === false ? (
                        <Badge bg="secondary"> Not Delivered Yet</Badge>
                      ) : (
                        <Badge bg="success"> Delivered</Badge>
                      )}{" "}
                    </td>
                    <td>
                      {" "}
                      {i.products?.map((item, index) => (
                        <ul
                          key={index}
                          style={{
                            listStyle: "disc",
                            border: "1px solid black",
                          }}
                        >
                          <li> Product : {item.productName} </li>
                          <li> Quantity : {item.quantity} </li>
                          <li>
                            {" "}
                            Price :{" "}
                            <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                            {item.total}{" "}
                          </li>
                        </ul>
                      ))}{" "}
                    </td>
                    <td>
                      {" "}
                      <i className="fa-solid fa-indian-rupee-sign"></i>{" "}
                      {i.amountToBePaid}{" "}
                    </td>
                    <td> {i.createdAt?.slice(0, 10)} </td>
                    <td>
                      <i
                        className="fa-solid fa-pen-to-square"
                        onClick={() => setModalShow(true)}
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
export default HOC(NotifyLabour);
