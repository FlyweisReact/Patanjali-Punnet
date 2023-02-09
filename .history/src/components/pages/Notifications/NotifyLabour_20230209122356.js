/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import img from "../../SVG/list.svg";
import { Form, Modal, Container, Button } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import axios from "axios";

const data = [
  {
    customer: "Abhisekh",
    Product : "Hair Oil" , 
    Quantity : "2" , 
    price : "₹350",
    Total : "₹700"
    },
  {
    customer: "Sharukh",
    Hero: "Gauri",
    service: "Video",
    location: "delhi",
    date: "12/02/2005",
    amount: "45,000",
    mode: "Cash",
    status: "Success",
  },
  {
    customer: "Krishna",
    Hero: "Raftaar",
    service: "Video",
    location: "delhi",
    date: "12/02/2005",
    amount: "95,000",
    mode: "online",
    status: "Ongoing",
  },
];

const NotifyLabour = () => {
  const [modalShow, setModalShow] = React.useState(false);


  return (
    <>

      <section
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Order's
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div
          style={{
            overflow: "auto",
            width: "100%",
          }}
        >
          <Table striped bordered hover>
            <thead>
              <tr>
                <th> Customer </th>
                <th> Product </th>
                <th> Quantity </th>
                <th> Price </th>
                <th> Total Amount </th>
                <th> Amount </th>
              </tr>
            </thead>
            <tbody>
              {data.map((i, index) => (
                <tr key={index}>
                  <td> {i?.userobject?.name} </td>
                  <td> {i?.heroobject?.name} </td>
                  <td> {i?.combinedobject?.category?.name} </td>
                  <td> {i?.Date.slice(0, 10)} </td>
                  <td>  {i.Status}</td>
                  <td> {i.amount} </td>
                  <td> {i.payment} </td>
               
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
