"use client";
import React from "react";

function PenaltyPage() {
  return (
    <div className="container mt-4">
      <h2>Penalty Management</h2>

      {/* Student Selection */}
      <div className="card shadow-sm p-4 mb-4">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Select Student</label>
            <select className="form-select">
              <option>Select Student</option>
              <option>Amit Sharma</option>
              <option>Neha Verma</option>
              <option>Ravi Kumar</option>
              <option>Pooja Singh</option>
            </select>
          </div>
        </div>
      </div>

      {/* Penalty Table */}
      <div className="card shadow-sm p-4">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Book Name</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Days Late</th>
              <th>Penalty Amount</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Structures</td>
              <td>2025-08-01</td>
              <td>2025-08-15</td>
              <td>5</td>
              <td>₹50</td>
              <td>
                <span className="badge bg-danger">Pending</span>
              </td>
              <td>
                <button className="btn btn-sm btn-success">Pay</button>
                <button className="btn btn-sm btn-info ms-1">Edit</button>
                <button className="btn btn-sm btn-danger ms-1">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Operating System</td>
              <td>2025-08-05</td>
              <td>2025-08-20</td>
              <td>0</td>
              <td>₹0</td>
              <td>
                <span className="badge bg-success">Paid</span>
              </td>
              <td>
                <button className="btn btn-sm btn-info">Edit</button>
                <button className="btn btn-sm btn-danger ms-1">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PenaltyPage;
