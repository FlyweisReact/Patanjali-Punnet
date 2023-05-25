/** @format */

import { RiMenu4Line } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";
import { Modal, Form, Button } from "react-bootstrap";
import axios from "axios";
import { useState } from "react";
import { Auth } from "../Auth";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const Navbar = ({ hamb, setHamb }) => {
  const AdminName = localStorage.getItem("adminName");
  const navigate = useNavigate();
  const [modalShow, setModalShow] = useState(false);

  function MyVerticallyCenteredModal(props) {
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const postHandler = async (e) => {
      e.preventDefault();
      try {
        const data = await axios.put(
          `https://puneet-goyal-backend.vercel.app/api/v1/password/update`,
          {
            oldPassword,
            newPassword,
            confirmPassword,
          },
          Auth
        );
        console.log(data);
        toast.success("Password Updated Successfully");
        props.onHide();
        navigate("/");
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
            Edit Profile
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={postHandler}>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Old Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setOldPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setnewPassword(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label>Re-Type New Password</Form.Label>
              <Form.Control
                type="password"
                onChange={(e) => setConfirmPassword(e.target.value)}
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

  function LogOut () {
    localStorage.clear()
    navigate('/')
    toast.success('Logged Out ')
  }

  return (
    <>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
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
                    <Dropdown.Item onClick={() => setModalShow(true)}>
                      Update Password
                    </Dropdown.Item>
                    <Dropdown.Item onClick={() => LogOut(true)}>
                      Log Out
                    </Dropdown.Item>
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
