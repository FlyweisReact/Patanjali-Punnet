/** @format */

import { Alert, Table } from "react-bootstrap";
import HOC from "../../layout/HOC";
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const Help = () => {
  const [data, setData] = useState([]);

  const fetchData = async () => {
    try {
      const { data } = await axios.get(
        "https://puneet-goyal-backend.vercel.app/api/v1/help"
      );
      setData(data.message);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const deleteHandler = async (id) => {
    try {
      const { data } = await axios.delete(`https://puneet-goyal-backend.vercel.app/api/v1/help/delete/${id}`)
      toast.success("Query Removed")
    }catch(e) { 
      console.log(e)
    }
  }

  return (
    <>
      <section className="component-dashboard">
        <div className="two-component">
          <div>
            <p> Help&Support ( {data?.length} ) </p>
            <hr />
          </div>
        </div>
        {data?.length === 0 || !data ? (
          <Alert>No Data Found</Alert>
        ) : (
          <div>
            <Table striped bordered hover className="Overflow_Table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Contact No.</th>
                  <th>Options</th>
                </tr>
              </thead>
              <tbody>
                {data?.map((i, index) => (
                  <tr key={index}>
                    <td> {i.name} </td>
                    <td> {i.email} </td>
                    <td> {i.mobile} </td>
                    <td>
                      <i className="fa-solid fa-trash" />
                    </td>
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

export default HOC(Help);
