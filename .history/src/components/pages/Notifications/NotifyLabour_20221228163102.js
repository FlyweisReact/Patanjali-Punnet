/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import img from "../../SVG/list.svg";
import Table from "react-bootstrap/Table";

const users = [
  {
    customer: "Abhisekh",
    Hero: "Arpan",
    service: "Photo",
    location: "delhi",
    date: "12/02/2005",
    amount: "5,000",
    mode: "online",
  },
  {
    customer: "Sharukh",
    Hero: "Gauri",
    service: "Video",
    location: "delhi",
    date: "12/02/2005",
    amount: "45,000",
    mode: "Cash",
  },
  {
    customer: "Krishna",
    Hero: "Raftaar",
    service: "Video",
    location: "delhi",
    date: "12/02/2005",
    amount: "95,000",
    mode: "online",
  },
];

const NotifyLabour = () => {
  return (
    <>
      <div style={{ display: "flex", gap: "20px", marginBottom: "2%" }}>
        <img
          src={img}
          alt=""
          style={{
            backgroundColor: "#4099ff",
            padding: "8px",
            borderRadius: "5px",
            boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
            width: "40px",
            height: "40px",
            marginTop: "5px",
          }}
        />
        <p style={{ color: "black", fontSize: "18px", margin: "0" }}>
          Project's List <br />
          <span style={{ fontSize: "14px" }}>All Project's List</span>
        </p>
      </div>

      <section
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "84%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Project's
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div
          style={{
            overflowX: "auto",
            width: "100%",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Customer </th>
                <th> Hero </th>
                <th> Service </th>=
                <th> Date </th>
                <th> Status </th>
                <th>Amount </th>
                <th>Payment Method </th>
              </tr>
            </thead>
            <tbody>
              {users.map((i, index) => (
                <tr key={index}>
                  <td> {i.customer} </td>
                  <td> {i.Hero} </td>
                  <td> {i.service} </td>
                  <td> {i.date} </td>
                  <td> Successfull </td>
                  {/* <td> Complete </td> */}
                  {/* <td> 5 </td> */}
                  {/* <td> 5200 </td> */}
                  {/* <td> Rewards </td> */}
                  {/* <td> 100 points </td> */}
                  <td> {i.amount} </td>
                  <td> {i.mode} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};
export default HOC(NotifyLabour);
