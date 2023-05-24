/** @format */

import React, { useEffect, useState } from "react";
import HOC from "../../layout/HOC";
import { Alert, Button } from "react-bootstrap";
import axios from "axios";
import { toast } from "react-toastify";

const Coupon = () => {
    const [ data , setData ] = useState([])
    


    const GetCoupons = async () => {
        try { 
            const { data } = await axios.get("https://puneet-goyal-backend.vercel.app/api/v1/coupon/all")
            setData(data.coupons)
        }catch(e) { 
            console.log(e)
            toast.error(e.response.data.message)
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
            <p>All Coupon's</p>
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

            <div className="overflow_Cont">
            {data?.length  === 0 || !data ? 
            <Alert>
                No Coupon's Found
            </Alert> : ""
            }
            </div>
         

      </section>
    </>
  );
};

export default HOC(Coupon);
