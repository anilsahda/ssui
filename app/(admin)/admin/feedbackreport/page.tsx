import React from "react";

function page() {
  return (
    <div className="container mt-4">
      <h2>Manage Feedback</h2>

      {/* Feedback Table */}
      <table className="table table-bordered mt-3">
        <thead className="table-dark">
          <tr>
            <th>Feedback From</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Feedback Message</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Kapil Yadav</td>
            <td>9876543210</td>
            <td>Kapil@gmail.com</td>
            <td>Great platform, very useful for job seekers!</td>
            <td>
              <button className="btn btn-sm btn-info me-2">View</button>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Priya</td>
            <td>9123456780</td>
            <td>priya@gmail.com</td>
            <td>The UI is simple and clean. Please add more job filters.</td>
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
