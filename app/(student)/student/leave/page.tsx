"use client";

import React from "react";

function LeavePage() {
  return (
    <div className="container mt-4">
      <h2>Apply Leave</h2>

      {/* Apply Leave Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <form>
          <div className="row">
            {/* Leave Reason */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Leave Reason</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter reason for leave"
              />
            </div>

            {/* No. of Days */}
            <div className="col-md-6 mb-3">
              <label className="form-label">No. of Days</label>
              <input
                type="number"
                className="form-control"
                placeholder="Enter number of days"
              />
            </div>
          </div>

          {/* Apply Leave Button */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Apply Leave
            </button>
          </div>
        </form>
      </div>

      {/* Leave Records Table */}
      <div className="card p-4 shadow-sm">
        <h5>My Leave Applications</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Leave Reason</th>
              <th>No. of Days</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Fever</td>
              <td>2</td>
              <td>
                <span className="badge bg-warning text-dark">Pending</span>
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Family Function</td>
              <td>3</td>
              <td>
                <span className="badge bg-success">Approved</span>
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Out of Station</td>
              <td>1</td>
              <td>
                <span className="badge bg-danger">Rejected</span>
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

export default LeavePage;
