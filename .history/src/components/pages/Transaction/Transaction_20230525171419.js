/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";
import { Alert } from "react-bootstrap";

const Transaction = () => {

  const [ data , setData ] = useState([])

  const fetchData = async () => {
    try{
      const { data } = await axios.get("https://puneet-goyal-backend.vercel.app/api/v1/allTransaction")
      setData(data.totalOrders)
    }catch(e) { 
      console.log(e)
    }
  }

  useEffect(() => {
    fetchData()
  },[])

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
   

        {
          data?.length === 0 || !data ? 
          <Alert>No Order's Found</Alert>
          :
     
     <div>
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
          {data?.map((i, index) => (
            <tr key={index}>
                <td> #{index + 1} </td>
              <td> {i.user?.name} </td>
              <td> {i.orderId?.} </td>
              <td> {i.date} </td>
              <td> {i.amount} </td>
              <td> {i.mode} </td>
              <td>Success </td>
            </tr>
          ))}
        </tbody>
      </Table>
     </div>
        }


      </section>
    </>
  );
};

export default HOC(Transaction);
