/** @format */

import { Table } from "react-bootstrap";
import HOC from "../../layout/HOC";

const Help = () => {
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
            Help&Support
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Contact No.</th>
                <th>Query</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Demo Name</td>
                <td>Demo Email</td>
                <td>784512774</td>
                <td>Lorem lOrmendf ldm kv vkd </td>
              </tr>
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(Help);
