import React from "react";

function LeavePage() {
  return (
    <div className="container mt-4">
      <h2>Leave Management</h2>

      {/* Filters */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="row">
          <div className="col-md-6 mb-3">
            <label className="form-label">Select Standard</label>
            <select className="form-control">
              <option>-- Select Standard --</option>
              <option>Standard 1</option>
              <option>Standart 2</option>
              <option>Standard 3</option>
            </select>
          </div>

          <div className="col-md-6 mb-3">
            <label className="form-label">Select Status</label>
            <select className="form-control">
              <option>-- Select Status --</option>
              <option>New</option>
              <option>Pending</option>
              <option>Reject</option>
            </select>
          </div>
        </div>
      </div>

      {/* Leave Report Table */}
      <div className="card p-4 shadow-sm">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Day</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>201</td>
              <td>Amit Kumar</td>
              <td>Sick Leave</td>
              <td>2 Days</td>
              <td>
                <span className="badge bg-warning text-dark">New</span>
              </td>
              <td>
                <button className="btn btn-sm btn-info me-2">View</button>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr>
              <td>202</td>
              <td>Sneha Gupta</td>
              <td>Family Function</td>
              <td>3 Days</td>
              <td>
                <span className="badge bg-info">Pending</span>
              </td>
              <td>
                <button className="btn btn-sm btn-info me-2">View</button>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
            <tr>
              <td>203</td>
              <td>Ravi Patel</td>
              <td>Travel</td>
              <td>1 Day</td>
              <td>
                <span className="badge bg-danger">Reject</span>
              </td>
              <td>
                <button className="btn btn-sm btn-info me-2">View</button>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default LeavePage;
