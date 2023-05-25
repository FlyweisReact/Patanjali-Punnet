/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";


const Transaction = () => {
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
            All Transactions
            <hr style={{ width: "70%" }} />
          </span>
        </div>
   

      <Table
        striped
        bordered
        hover
        style={{
          marginTop: "2%",
          scrollBehavior: "smooth",
          overflow: "scroll",
        }}
      >
        <thead>
          <tr>
            <th> Customer </th>
            <th> Product </th>
            <th>Date </th>
            <th>Amount </th>
            <th> Payment Mode </th>
            <th> Status </th>

          </tr>
        </thead>
        <tbody>
          {users.map((i, index) => (
            <tr key={index}>
              <td> {i.customer} </td>
              <td> {i.Hero} </td>
              <td> {i.date} </td>
              <td> {i.amount} </td>
              <td> {i.mode} </td>
              <td>Success </td>
            </tr>
          ))}
        </tbody>
      </Table>
      </section>
    </>
  );
};

export default HOC(Transaction);
