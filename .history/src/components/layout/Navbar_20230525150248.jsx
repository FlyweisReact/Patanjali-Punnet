/** @format */

import { RiMenu4Line } from "react-icons/ri";
import Dropdown from "react-bootstrap/Dropdown";

const Navbar = ({ hamb, setHamb }) => {
  const AdminName = localStorage.getItem("adminName");
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
                    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
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
