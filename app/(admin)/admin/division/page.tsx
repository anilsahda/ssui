"use client";
import React from "react";

function DivisionPage() {
  return (
    <div className="container mt-4">
      <h2>Manage Divisions</h2>

      {/* Division Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="row">
          <div className="col-md-4 mb-3">
            <label className="form-label">Division Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter division name"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Seats</label>
            <input
              type="number"
              className="form-control"
              placeholder="Enter number of seats"
            />
          </div>

          <div className="col-md-4 mb-3">
            <label className="form-label">Select Standard</label>
            <select className="form-select">
              <option>1st STD</option>
              <option>2nd STD</option>
              <option>3rd STD</option>
            </select>
          </div>
        </div>

        <div className="text-end">
          <button className="btn btn-primary">Add Division</button>
        </div>
      </div>

      {/* Division Table */}
      <div className="card p-4 shadow-sm">
        <h4>Division List</h4>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Sr. No</th>
              <th>Division Name</th>
              <th>Seats</th>
              <th>Standard</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>A</td>
              <td>40</td>
              <td>1st Std</td>
              <td>
                <button className="btn btn-info btn-sm me-2">View</button>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>B</td>
              <td>35</td>
              <td>2nd Std</td>
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

export default DivisionPage;


