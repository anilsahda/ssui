"use client";

import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>Manage Leave Reports</h2>

      {/* Filter Section */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5>Filter Leave Reports</h5>
        <form>
          <div className="row">
            <div className="col-md-6 mb-3">
              <label className="form-label">Select Report Type</label>
              <select className="form-select">
                <option value="">-- Select --</option>
                <option value="new">New Leave Report</option>
                <option value="approved">Approved Report</option>
                <option value="rejected">Rejected Leave</option>
              </select>
            </div>
            <div className="col-md-6 d-flex align-items-end mb-3">
              <button type="submit" className="btn btn-primary w-100">
                View Report
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Leave Report Table */}
      <div className="card p-4 shadow-sm">
        <h5>Leave Reports</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Day</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>101</td>
              <td>Rahul Sharma</td>
              <td>Sick Leave</td>
              <td>2 Days</td>
              <td><span className="badge bg-warning">Pending</span></td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>102</td>
              <td>Pooja Patel</td>
              <td>Family Function</td>
              <td>1 Day</td>
              <td><span className="badge bg-success">Approved</span></td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>103</td>
              <td>Amit Verma</td>
              <td>Travel</td>
              <td>3 Days</td>
              <td><span className="badge bg-danger">Rejected</span></td>
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
