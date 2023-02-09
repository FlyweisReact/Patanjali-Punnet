import HOC from "../../layout/HOC";
import { Form, Table } from "react-bootstrap";
import img from "../../SVG/edit-3.svg";

const PushNotification = () => {
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
            Send Notification
            <hr style={{ width: "70%" }} />
          </span>
        </div>
        <div className="NewForm">
          <div className="mb-3">
            <p>Notification Type:*</p>
            <Form.Select
              aria-label="Default select example"
            >
              <option>Select Notification Type</option>
              <option value={"All User"}>All User's</option>
              <option value={"All Hero"}>All Hero's</option>
              <option value={"All User and Hero"}>All User's and Hero's</option>
            </Form.Select>
          </div>
          <div className="mb-3">
            <p>Message:*</p>
            <textarea
              placeholder="Message"
            />
          </div>
        </div>
      </section>
      <br />
      <button
        style={{
          color: "#fff",
          backgroundColor: "#4099ff",
          padding: "10px",
          fontSize: "18px",
          textAlign: "center",
          display: "block",
          margin: "auto",
          marginTop: "2% !important",
          width: "100px",
        }}
        type="submit"      >
        Send
      </button>

      <section
        style={{
          boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px",
          padding: "20px",
          width: "98%",
          marginLeft: "10px",
          marginTop: "5%",
          marginBottom: "5%",
        }}
      >
        <div className="pb-4 sticky top-0  w-full flex justify-between items-center bg-white">
          <span style={{ color: "black", fontSize: "15px", fontWeight: "400" }}>
            Notification List
            <hr style={{ width: "70%" }} />
          </span>
        </div>

        <div style={{ float: "right", color: "black" }}>
          Search:{" "}
          <input
            type={"search"}
            style={{
              border: "1px solid #bfbfbf",
              width: "250px",
              color: "black",
              padding: "5px",
            }}
            placeholder="Search by Type"
          />
        </div>
        <br />
        <br />

        <div style={{ overflow: "auto" }}>
          <Table striped bordered hover>
            <thead>
              <tr>
                <th>Notification type</th>
                <th>Message</th>
              </tr>
            </thead>
            <tbody>
              {filterData?.map((i, index) => (
                <tr key={index}>
                  <td> {i.role} </td>
                  <td> {i.message} </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </div>
      </section>
    </>
  );
};

export default HOC(PushNotification);
