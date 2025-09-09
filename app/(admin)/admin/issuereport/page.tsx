"use client";
import React from "react";

function BookIssueReport() {
  return (
    <div className="container mt-4">
      <h2>Book Issue Report</h2>

      {/* Filters */}
      <div className="row mb-4">
        <div className="col-md-4">
          <label className="form-label">Select Branch</label>
          <select className="form-select">
            <option>-- Select Branch --</option>
            <option>Computer Science</option>
            <option>Mechanical</option>
            <option>Electrical</option>
          </select>
        </div>

        <div className="col-md-4">
          <label className="form-label">Select Student</label>
          <select className="form-select">
            <option>-- Select Student --</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
            <option>Robert Brown</option>
          </select>
        </div>

        <div className="col-md-4 d-flex align-items-end">
          <button className="btn btn-primary">View Report</button>
        </div>
      </div>

      {/* Book Issue Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Book Name</th>
            <th>Issue Date</th>
            <th>Days</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Introduction to Algorithms</td>
            <td>2025-09-01</td>
            <td>15</td>
            <td>
              <button className="btn btn-success btn-sm me-1">View</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Digital Electronics</td>
            <td>2025-09-03</td>
            <td>10</td>
            <td>
              <button className="btn btn-success btn-sm me-1">View</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Database Systems</td>
            <td>2025-09-05</td>
            <td>7</td>
            <td>
              <button className="btn btn-success btn-sm me-1">View</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookIssueReport;
