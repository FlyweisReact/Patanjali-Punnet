/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import axios from "axios";

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
        }


      </section>
    </>
  );
};

export default HOC(Transaction);
