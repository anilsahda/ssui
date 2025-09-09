"use client";

import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>Manage Attendance Reports</h2>

      {/* Attendance Report Filter Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5>Filter Attendance Report</h5>
        <form>
          <div className="row">
            {/* Select STD */}
            <div className="col-md-3 mb-3">
              <label className="form-label">Select STD</label>
              <select className="form-select">
                <option value="">-- Select STD --</option>
                <option value="1">STD 1</option>
                <option value="2">STD 2</option>
                <option value="3">STD 3</option>
              </select>
            </div>

            {/* Select Division */}
            <div className="col-md-3 mb-3">
              <label className="form-label">Select Division</label>
              <select className="form-select">
                <option value="">-- Select Division --</option>
                <option value="A">Division A</option>
                <option value="B">Division B</option>
                <option value="C">Division C</option>
              </select>
            </div>

            {/* Select Date */}
            <div className="col-md-3 mb-3">
              <label className="form-label">Select Date</label>
              <input type="date" className="form-control" />
            </div>

            {/* Submit Button */}
            <div className="col-md-3 d-flex align-items-end mb-3">
              <button type="submit" className="btn btn-primary w-100">
                View Report
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Attendance Report Table */}
      <div className="card p-4 shadow-sm">
        <h5>Attendance Report</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Attendance</th>
              <th>Attendance By</th>
              <th>Attendance Date & Time</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul Sharma</td>
              <td>Present</td>
              <td>Teacher A</td>
              <td>2025-09-09 09:15 AM</td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Pooja Patel</td>
              <td>Absent</td>
              <td>Teacher B</td>
              <td>2025-09-09 09:20 AM</td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            {/* Add more rows dynamically later */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
