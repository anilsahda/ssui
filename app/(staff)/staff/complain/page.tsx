"use client";

import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>Manage Complaints</h2>

      {/* Complaints Table */}
      <div className="card p-4 shadow-sm">
        <h5>Total Complaints</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Complaint</th>
              <th>Reply</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Rahul Sharma</td>
              <td>Library Issue</td>
              <td>Books are not available on time.</td>
              <td>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm me-2"
                    placeholder="Enter reply"
                  />
                  <button className="btn btn-success btn-sm">Reply</button>
                </div>
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>102</td>
              <td>Pooja Patel</td>
              <td>Hostel Food</td>
              <td>Food quality needs improvement.</td>
              <td>
                <div className="d-flex">
                  <input
                    type="text"
                    className="form-control form-control-sm me-2"
                    placeholder="Enter reply"
                  />
                  <button className="btn btn-success btn-sm">Reply</button>
                </div>
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            {/* More rows dynamically later */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
