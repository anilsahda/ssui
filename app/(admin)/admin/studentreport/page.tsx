import React from "react";

function StudentReport() {
  return (
    <div className="container mt-4">
      <h2>Student Report</h2>

      {/* Filters */}
      <div className="card p-4 mb-4 shadow-sm">
        <div className="row">
          {/* Standard */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Select Standard</label>
            <select className="form-control">
              <option>-- Select Standard --</option>
              <option>1 STD</option>
              <option>2 STD</option>
              <option>3 STD</option>
            </select>
          </div>

          {/* Division */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Select Division</label>
            <select className="form-control">
              <option>-- Select Division --</option>
              <option>A</option>
              <option>B</option>
              <option>C</option>
            </select>
          </div>

          {/* Roll No */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Select Roll No</label>
            <select className="form-control">
              <option>-- Select Roll No --</option>
              <option>101</option>
              <option>102</option>
              <option>103</option>
            </select>
          </div>
        </div>
      </div>

      {/* Student Report Table */}
      <div className="card p-4 shadow-sm">
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Date of Birth</th>
              <th>Address</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Username</th>
              <th>Password</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Amit Kumar</td>
              <td>amit@example.com</td>
              <td>9876543210</td>
              <td>2005-04-15</td>
              <td>123 Street, Near Market</td>
              <td>Mumbai</td>
              <td>400001</td>
              <td>amit123</td>
              <td>pass@123</td>
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

export default StudentReport;
