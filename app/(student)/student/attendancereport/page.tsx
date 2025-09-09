"use client";

import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>My Attendance</h2>

      {/* Month Selector */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5>Filter by Month</h5>
        <form>
          <div className="row">
            {/* Select Month */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Select Month</label>
              <select className="form-select">
                <option value="">-- Select Month --</option>
                <option value="1">January</option>
                <option value="2">February</option>
                <option value="3">March</option>
                <option value="4">April</option>
                <option value="5">May</option>
                <option value="6">June</option>
                <option value="7">July</option>
                <option value="8">August</option>
                <option value="9">September</option>
                <option value="10">October</option>
                <option value="11">November</option>
                <option value="12">December</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-md-6 d-flex align-items-end mb-3">
              <button type="submit" className="btn btn-primary w-100">
                View Attendance
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Attendance Table */}
      <div className="card p-4 shadow-sm">
        <h5>Attendance Records</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Date</th>
              <th>Attendance</th>
              <th>Attendance By</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>2025-09-01</td>
              <td>Present</td>
              <td>Teacher A</td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2025-09-02</td>
              <td>Absent</td>
              <td>Teacher B</td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2025-09-03</td>
              <td>Leave</td>
              <td>Teacher A</td>
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
