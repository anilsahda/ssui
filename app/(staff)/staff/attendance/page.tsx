"use client";

import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>Manage Attendance</h2>

      {/* Attendance Filter Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5>Filter Students</h5>
        <form>
          <div className="row">
            {/* Select STD */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Select STD</label>
              <select className="form-select">
                <option value="">-- Select STD --</option>
                <option value="1">STD 1</option>
                <option value="2">STD 2</option>
                <option value="3">STD 3</option>
              </select>
            </div>

            {/* Select Division */}
            <div className="col-md-4 mb-3">
              <label className="form-label">Select Division</label>
              <select className="form-select">
                <option value="">-- Select Division --</option>
                <option value="A">Division A</option>
                <option value="B">Division B</option>
                <option value="C">Division C</option>
              </select>
            </div>

            {/* Submit Button */}
            <div className="col-md-4 d-flex align-items-end mb-3">
              <button type="submit" className="btn btn-primary w-100">
                View Students
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Attendance Table */}
      <div className="card p-4 shadow-sm">
        <h5>Attendance List</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Roll No.</th>
              <th>Student Name</th>
              <th>Attendance</th>
              <th>Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul Sharma</td>
              <td>
                <select className="form-select form-select-sm">
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="leave">Leave</option>
                </select>
              </td>
              <td>
                <input type="date" className="form-control form-control-sm" />
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Pooja Patel</td>
              <td>
                <select className="form-select form-select-sm">
                  <option value="present">Present</option>
                  <option value="absent">Absent</option>
                  <option value="leave">Leave</option>
                </select>
              </td>
              <td>
                <input type="date" className="form-control form-control-sm" />
              </td>
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
