"use client";

import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>Complain Management</h2>

      {/* Complain Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <form>
          <div className="row">
            {/* Complain About */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Complain About</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter subject"
              />
            </div>

            {/* Message */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Message</label>
              <input
                type="text"
                className="form-control"
                placeholder="Enter message"
              />
            </div>
          </div>

          {/* Send Button */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Send
            </button>
          </div>
        </form>
      </div>

      {/* Complain Table */}
      <div className="card p-4 shadow-sm">
        <h5>Complain List</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>About</th>
              <th>Message</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Library Issue</td>
              <td>Books not available</td>
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
              <td>Lab Equipment</td>
              <td>Microscope not working</td>
              <td>
                <span className="badge bg-success">Resolved</span>
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>Classroom Issue</td>
              <td>Fan not working</td>
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

export default Page;
