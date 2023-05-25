/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Alert } from "react-bootstrap";

const Transaction = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/allTransaction"
      );
      setData(data.totalOrders);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <section
       className="component-dashboard"
      >
        <div className="two-component">
        <div>
            <p> All Transaction's ( {data?.length} ) </p>
            <hr />
          </div>
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All 
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>No Order's Found</Alert>
        ) : (
          <div className="Overflow_Table">
            <Table
              striped
              bordered
              hover
           
            >
              <thead>
                <tr>
                  <th> Index </th>
                  <th> Customer Name </th>
                  <th>Product </th>
                  <th>Amount </th>
                  <th> Payment Mode </th>
                  <th> Status </th>
                  <th> Created Date </th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td> #{index + 1} </td>
                    <td> {i.user?.name} </td>
                    <td>
                      {" "}
                      {i.orderId?.products?.map((item, index) => (
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
                    <td> {i.amount} </td>
                    <td> {i.paymentMode} </td>
                    <td> {i.Status} </td>
                    <td> {i.date?.slice(0,10)} </td>
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

export default HOC(Transaction);
