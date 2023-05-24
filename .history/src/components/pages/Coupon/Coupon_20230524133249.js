/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Button } from "react-bootstrap";
import axios from "axios";

const Coupon = () => {

    const [ data , setData ] = useState([])

    const GetCoupons = async () => {
        try { 
            const { data } = await axios.get("https://puneet-goyal-backend.vercel.app/api/v1/coupon/all")
            setData(data.coupons)
        }catch(e) { 
            console.log(e)
        }
    }

    useEffect(() => {
        GetCoupons()
    },[])

  return (
    <>
      <section className="component-dashboard">
        <div className="two-component">
          <div>
            <p>All Patanjali Category</p>
            <hr style={{ width: "70%" }} />
          </div>

          <Button
            style={{
              backgroundColor: "#4099ff",
              color: "#fff",
              borderRadius: "0",
              border: "1px solid #4099ff",
              padding: "10px",
            }}
          >
            Add New
          </Button>
        </div>

            {data?.length  === 0 || !data ? 
            <Alert
            }

      </section>
    </>
  );
};

export default HOC(Coupon);
