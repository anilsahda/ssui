"use client";
import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>Manage Standard</h2>

      {/* Student Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="mb-3">
          <label className="form-label">Student Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter name"
          />
        </div>
        <div className="text-end">
          <button className="btn btn-primary">Add Standard</button>
        </div>
      </div>

      {/* Student Table */}
      <div className="card p-4 shadow-sm">
        <h4>Standard List</h4>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Name</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Kapil Yadav</td>
              <td>
                <button className="btn btn-info btn-sm me-2">View</button>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Rahul Sharma</td>
              <td>
                <button className="btn btn-info btn-sm me-2">View</button>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
