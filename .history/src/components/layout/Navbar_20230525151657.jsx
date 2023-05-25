/** @format */

import { RiMenu4Line } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal , Form , Button } from 'react-bootstrap'
import axios from "axios";
import { useState } from "react";

const Navbar = ({ hamb, setHamb }) => {
  const AdminName = localStorage.getItem("adminName");


  function MyVerticallyCenteredModal(props) {
    const [oldPassword, setName] = useState("");
    const [newPassword, setName] = useState("");
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
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#263544",
        }}
        className="my-1 rounded-sm  p-4 py-3 shadow-md items-center  bg-slate-200 space-x-4"
      >
        <RiMenu4Line
          onClick={() => setHamb(!hamb)}
          className="text-2xl font-bold text-gray-900 hover:scale-90 cursor-pointer"
          style={{ color: "#aac0bb" }}
        />
        <div
          style={{ display: "flex", gap: "10px" }}
          className="items-center space-x-2  pr-2"
        >
          <section className="flex sm:ml-auto justify-end sm:w-full items-center space-x-2  pr-2">
            <figcaption className="tracking-wider pl-1 font-semibold">
              <div
                className="lg:text-base text-sm text-gray-900  uppercase"
                style={{
                  color: "#aac0bb",
                  display: "flex",
                  gap: "10px",
                  alignItems: "center",
                }}
              >
                Welcome {AdminName}
                <Dropdown>
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                  ></Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item>Update Password</Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </figcaption>
          </section>
        </div>
      </div>
    </>
  );
};

export default Navbar;
