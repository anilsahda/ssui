import React from "react";

function page() {
  return (
    <div className="container mt-4">
      <h2>Manage Company Report</h2>

      {/* Company Report Table */}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Company Name</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Contact Person</th>
            <th>Mobile</th>
            <th>Type</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>TCS Pvt Ltd</td>
            <td>Mumbai</td>
            <td>400001</td>
            <td>Ravi Kumar</td>
            <td>9876543210</td>
            <td>IT</td>
            <td>contact@tcs.com</td>
            <td>
              <button className="btn btn-sm btn-info me-2">View</button>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Infosys Ltd</td>
            <td>Bangalore</td>
            <td>560001</td>
            <td>Anjali Mehta</td>
            <td>9123456780</td>
            <td>Consulting</td>
            <td>info@infosys.com</td>
            <td>
              <button className="btn btn-sm btn-info me-2">View</button>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default page;
