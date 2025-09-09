"use client";
import React from "react";

function BookReportPage() {
  return (
    <div className="container mt-4">
      <h2>Book Report</h2>

      {/* Select Branch */}
      <div className="mb-3">
        <label className="form-label">Select Branch</label>
        <select className="form-select">
          <option>Select Branch</option>
          <option>Computer Science</option>
          <option>Electronics</option>
          <option>Mechanical</option>
          <option>Civil</option>
          <option>Electrical</option>
        </select>
        <button className="btn btn-primary mt-2">View Branch Report</button>
      </div>

      {/* Select Publication */}
      <div className="mb-3">
        <label className="form-label">Select Publication</label>
        <select className="form-select">
          <option>Select Publication</option>
          <option>Oxford University Press</option>
          <option>Cambridge University Press</option>
          <option>McGraw Hill</option>
          <option>Pearson</option>
        </select>
        <button className="btn btn-primary mt-2">View Publication Report</button>
      </div>

      <hr />

      {/* Report Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Book Name</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Available</th>
            <th>Rent</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Introduction to Algorithms</td>
            <td>1200</td>
            <td>10</td>
            <td>7</td>
            <td>No</td>
            <td>
              <button className="btn btn-info btn-sm me-1">View</button>
              <button className="btn btn-danger btn-sm me-1">Delete</button>
              <button className="btn btn-warning btn-sm">Edit</button>
            </td>
          </tr>
          <tr>
            <td>Digital Logic Design</td>
            <td>850</td>
            <td>5</td>
            <td>3</td>
            <td>Yes</td>
            <td>
              <button className="btn btn-info btn-sm me-1">View</button>
              <button className="btn btn-danger btn-sm me-1">Delete</button>
              <button className="btn btn-warning btn-sm">Edit</button>
            </td>
          </tr>
          <tr>
            <td>Strength of Materials</td>
            <td>950</td>
            <td>7</td>
            <td>6</td>
            <td>No</td>
            <td>
              <button className="btn btn-info btn-sm me-1">View</button>
              <button className="btn btn-danger btn-sm me-1">Delete</button>
              <button className="btn btn-warning btn-sm">Edit</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookReportPage;
