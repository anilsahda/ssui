"use client";
import React from "react";

function BranchPage() {
  return (
    <div className="container mt-4">
      <h2>Manage Branch</h2>

      {/* Input and Add Button */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter Branch Name"
          className="form-control"
        />
      </div>

      <div className="mb-4">
        <button className="btn btn-primary">Add Branch</button>
      </div>

      {/* Branch Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Branch Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Computer Science</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Electronics</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Mechanical</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BranchPage;
