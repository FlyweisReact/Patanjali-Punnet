/** @format */

import React from "react";
import HOC from "../../layout/HOC";
import { Button } from "react-bootstrap";

const Coupon = () => {
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
      </section>
    </>
  );
};

export default HOC(Coupon);
