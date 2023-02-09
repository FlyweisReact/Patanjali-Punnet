/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
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
    Product : "Hair Oil" , 
    Quantity : "2" , 
    price : "₹350",
    Total : "₹700"
  },
  {
    customer: "Krishna",
    Product : "Hair Oil" , 
    Quantity : "2" , 
    price : "₹350",
    Total : "₹700",
  },
];

const NotifyLabour = () => {

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
                <th> Date </th>
              </tr>
            </thead>
            <tbody>
              {data.map((i, index) => (
                <tr key={index}>
                <td>{i.customer} </td>
                <td>{i.Product} </td>
                <td>{i.Quantity} </td>
                <td>{i.price} </td>
                <td>{i.Total} </td>
                <td>
                  12/02/2023
                </td>
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
