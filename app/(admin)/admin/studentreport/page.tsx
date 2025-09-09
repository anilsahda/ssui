"use client";
import React from "react";

function StudentReportPage() {
  return (
    <div className="container mt-4">
      <h2>Student Report</h2>

      {/* Filter Section */}
      <div className="card shadow-sm p-4 mb-4">
        <div className="row">
          {/* Branch Dropdown */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Select Branch</label>
            <select className="form-select">
              <option value="">All Branches</option>
              <option>Computer Science</option>
              <option>Electronics</option>
              <option>Mechanical</option>
              <option>Civil</option>
              <option>Electrical</option>
            </select>
          </div>

          {/* Student Name Input */}
          <div className="col-md-4 mb-3">
            <label className="form-label">Student Name</label>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Student Name"
            />
          </div>

          {/* View Button */}
          <div className="col-md-4 mb-3 d-flex align-items-end">
            <button className="btn btn-primary w-100">View Report</button>
          </div>
        </div>
      </div>

      {/* Report Table */}
      <div className="card shadow-sm p-4">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Name</th>
              <th>Branch</th>
              <th>Gender</th>
              <th>DOB</th>
              <th>Mobile</th>
              <th>City</th>
              <th>Email</th>
              <th>Photo</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Amit Sharma</td>
              <td>Computer Science</td>
              <td>Male</td>
              <td>2000-05-12</td>
              <td>9876543210</td>
              <td>Delhi</td>
              <td>amit@example.com</td>
              <td>
                <img
                  src="/student1.jpg"
                  alt="student"
                  width="50"
                  className="rounded"
                />
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Neha Verma</td>
              <td>Electronics</td>
              <td>Female</td>
              <td>2001-08-20</td>
              <td>9123456789</td>
              <td>Mumbai</td>
              <td>neha@example.com</td>
              <td>
                <img src="/student2.jpg" alt="student" width="50" className="rounded" />
              </td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default StudentReportPage;
