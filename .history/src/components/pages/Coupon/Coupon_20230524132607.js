/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Button } from "react-bootstrap";

const Coupon = () => {
  return (
    <>
      <section className="component-dashboard">
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white two-component">

          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            All Patanjali Category
            <hr style={{ width: "70%" }} />
          </span>

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
      </section>
    </>
  );
};

export default HOC(Coupon);
