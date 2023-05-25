/** @format */

import HOC from "../../layout/HOC";
import Table from "react-bootstrap/Table";
import { useState, useEffect } from "react";
import axios from "axios";
import { Auth } from "../../Auth";
import { Alert } from "react-bootstrap";

const NotifyLabour = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/admin/orders",
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
            All Order's ( {data?.length} )
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        {data?.length === 0 || !data ? (
          <Alert>Orders Not Found</Alert>
        ) : (
          <div
            style={{
              overflow: "auto",
              width: "100%",
            }}
          >
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th> Number </th>
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
                    <td> #{index + 1} </td>
                    <td> {i.user?.name} </td>
                    <td> {i.user?.phone} </td>
                    <td> {i.paymentStatus} </td>
                    <td> {i.grandTotal} </td>
                    <td> {i.discount} </td>
                    <td> {i.shippingPrice} </td>
                    <td> {i.amountToBePaid} </td>
                    <td> {i.delivered} </td>
                    <td>
                      {" "}
                      {i.products?.map((item, index) => (
                        <ul key={index} style={{ listStyle: "disc " }}>
                          <li>  Product Name : {item.productName} </li>
                          <li>  Quantity : {item.quantity} </li>
                          <li>  Price : {item.quantity} </li>
                        </ul>
                      ))}{" "}
                    </td>
                    <td> {i.amountToBePaid} </td>
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
export default HOC(NotifyLabour);
