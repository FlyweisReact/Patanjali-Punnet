/** @format */

import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "../../Auth";

const NotifyLabour = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/url/api/v1/admin/orders",
        Auth
      );
      setData(data.orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

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
                <th> Discount </th>
                <th> Payment Status </th>
                <th> Shipping Price </th>
                <th> Delivered </th>
                <th> Total Amount </th>
                <th> Date </th>
              </tr>
            </thead>
            <tbody>
              {data?.map((i, index) => (
                <tr key={index}>
                  <td>{i.user} </td>
                  <td>{i.products?.map((a, index) => a.productName)} </td>
                  <td>{i.products?.map((a, index) => a.quantity)} </td>
                  <td>{i.products?.map((a, index) => a.total)} </td>
                  <td>{i.discount} </td>
                  <td>{i.paymentStatus} </td>
                  <td>{i.shippingPrice} </td>
                  <td>{i.delivered === true ? "Yes" : "No"} </td>
                  <td>{i.grandTotal} </td>
                  <td>{i.createdAt.slice(0, 10)}</td>
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
