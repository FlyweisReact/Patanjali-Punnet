/** @format */

import React, { useCallback, useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import Modal from "react-bootstrap/Modal";
import { toast } from "react-toastify";
import { Button, Container, Form } from "react-bootstrap";
import img from "../../SVG/list.svg";
import warning from "../../SVG/yellow-circle-exclamation-mark-icon-warning-sign-vector-13227823 1.png";
import axios from "axios";

const Customers = () => {
  const [modalShow, setModalShow] = React.useState(false);
  const [open, setOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [view, setView] = useState(false);
  const [wallet, setWallet] = useState(false);
  const [query, setQuery] = useState("");
  const [data, setData] = useState("");
  const [id, setID] = useState("");

  // FetchData
  const fetchData = useCallback(async () => {
    try {
      const { data } = await axios.get(
        "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/adminmodelRouter/allusers"
      );
      setData(data);
    } catch (err) {
      console.log(err);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const EditStatus = async (e) => {
    e.preventDefault();
    try {
      const data = await axios.put(
        `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/updateUserinadmin/${id}`,
        {
          status: "Disable",
        }
      );
      console.log(data);
      toast.success("Status Changed SuccessFully");
      setOpen(false);
      fetchData();
    } catch (err) {
      console.log(err);
    }
  };


  // Add Customer
  function MyVerticallyCenteredModal(props) {
    const [name, setName] = useState("");
    const [phoneNumber, setPhone] = useState("");
    const [gender, setGender] = useState("");
    const [email, setEmail] = useState("");
    const [birth, setBirth] = useState("");
    const [city, setCity] = useState("");
    const [website, setWebsite] = useState("");

    const EditCustomer = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/updateUserinadmin/${id}`,
          {
            name,
            phoneNumber,
            gender,
            email,
            birth,
            city,
            website,
          }
        );
        console.log(data);
        toast.success("Customer Edited SuccessFully");
        setModalShow(false);
        fetchData();
      } catch (err) {
        console.log(err);
      }
    };

    const AddCustomer = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.post(
          "http://ec2-15-206-210-177.ap-south-1.compute.amazonaws.com:5002/api/register",
          {
            name,
            phoneNumber,
            gender,
            email,
            birth,
            city,
            website,
          }
        );
        console.log(data);
        toast.success("Customer Added SuccessFully");
        setModalShow(false);
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
            {edit ? "Edit Customer" : "Add Customer"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <Form onSubmit={edit ? EditCustomer : AddCustomer}>
              <Form.Group>
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setName(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Phone Number </Form.Label>
                <Form.Control
                  type="tel"
                  pattern="[0-9]{10}"
                  onChange={(e) => setPhone(e.target.value)}
                />
              </Form.Group>
              <br />
              <Form.Select
                aria-label="Default select example"
                onChange={(e) => setGender(e.target.value)}
              >
                <option>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </Form.Select>
              <br />
              <Form.Group>
                <Form.Label>DOB</Form.Label>
                <Form.Control
                  type="date"
                  onChange={(e) => setBirth(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setCity(e.target.value)}
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Website</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(e) => setWebsite(e.target.value)}
                />
              </Form.Group>
              <br />
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



  const deleteHandler = async (id) => {
    try {      
      toast.success(`User deleted successfully`);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      {" "}
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    
      <div
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
        className="response"
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Users 
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
            onClick={() => {
              setModalShow(true);
            }}
          >
            Add User
          </Button>
        </div>

       

        {/* Table */}
        <div style={{ overflow: "auto", marginTop: "2%" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>First Name</th>
                <th>Last Name</th>
                <th> Mobile Number </th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
                <tr>
                 <td>React</td>
                 <td>Js</td>
                 <td>4512879654</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                  
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteHandler()}
                      ></i>
                    </div>
                  </td>
                </tr>
                <tr>
                 <td>React</td>
                 <td>Js</td>
                 <td>4512879654</td>
                  <td>
                    <div style={{ display: "flex", gap: "10px" }}>
                  
                      <i
                        className="fa-solid fa-trash"
                        style={{ color: "red", cursor: "pointer" }}
                        onClick={() => deleteHandler()}
                      ></i>
                    </div>
                  </td>
                </tr>
            </tbody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default HOC(Customers);
