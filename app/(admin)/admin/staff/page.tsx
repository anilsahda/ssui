"use client";

import React, { useState } from "react";

function Page() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h2>Staff Management</h2>

      {/* Button to open modal */}
      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={handleOpenModal}>
          + Add Staff
        </button>
      </div>

      {/* Staff Table */}
      <div className="card p-4 shadow-sm">
        <h5>Staff List</h5>
        <table className="table table-bordered mt-3">
          <thead>
            <tr>
              <th>Staff Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Qualification</th>
              <th>City</th>
              <th>Gender</th>
              <th>Username</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>9876543210</td>
              <td>MBA</td>
              <td>Delhi</td>
              <td>Male</td>
              <td>john123</td>
              <td>photo.jpg</td>
              <td>
                <button className="btn btn-info btn-sm me-2">View</button>
                <button className="btn btn-warning btn-sm me-2">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Centered Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Staff</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <div className="row">
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Staff Name</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mobile</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Qualification</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Gender</label>
                    <select className="form-control">
                      <option value="">Select</option>
                      <option>Male</option>
                      <option>Female</option>
                      <option>Other</option>
                    </select>
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Photo</label>
                    <input type="file" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Username</label>
                    <input type="text" className="form-control" />
                  </div>
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" />
                  </div>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={handleCloseModal}
                >
                  Cancel
                </button>
                <button className="btn btn-primary">Add Staff</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
