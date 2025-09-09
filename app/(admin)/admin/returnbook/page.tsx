"use client";
import React from "react";

function ReturnBookPage() {
  return (
    <div className="container mt-4">
      <h2>Return Book</h2>

      {/* Selection Section */}
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

          <div className="col-md-6 mb-3">
            <label className="form-label">Select Book</label>
            <select className="form-select">
              <option>Select Book</option>
              <option>Data Structures</option>
              <option>Operating System</option>
              <option>Machine Learning</option>
              <option>Computer Networks</option>
            </select>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm p-4">
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Book Name</th>
              <th>Author</th>
              <th>Publication</th>
              <th>Branch</th>
              <th>Price</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Data Structures</td>
              <td>John Smith</td>
              <td>Oxford University Press</td>
              <td>Computer Science</td>
              <td>₹500</td>
              <td>2025-08-01</td>
              <td>2025-08-15</td>
              <td>
                <span className="badge bg-warning text-dark">Pending Return</span>
              </td>
              <td>
                <button className="btn btn-sm btn-info me-1">Edit</button>
                <button className="btn btn-sm btn-danger me-1">Delete</button>
                <button className="btn btn-sm btn-success">Return</button>
              </td>
            </tr>
            <tr>
              <td>Operating System</td>
              <td>Jane Doe</td>
              <td>Cambridge University Press</td>
              <td>Electronics</td>
              <td>₹600</td>
              <td>2025-08-05</td>
              <td>2025-08-20</td>
              <td>
                <span className="badge bg-success">Returned</span>
              </td>
              <td>
                <button className="btn btn-sm btn-info me-1">Edit</button>
                <button className="btn btn-sm btn-danger me-1">Delete</button>
                <button className="btn btn-sm btn-success">Return</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ReturnBookPage;
