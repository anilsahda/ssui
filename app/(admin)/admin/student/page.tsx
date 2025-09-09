"use client";

import React, { useState } from "react";

function StudentPage() {
  const [showModal, setShowModal] = useState(false);
  const [students, setStudents] = useState([
    {
      id: 1,
      name: "Kapil Yadav",
      branch: "Computer Science",
      mobile: "9876543210",
      email: "kapil@example.com",
      dob: "2000-01-01",
      address: "Delhi, India",
    },
    {
      id: 2,
      name: "Rahul Sharma",
      branch: "Electronics",
      mobile: "9123456780",
      email: "rahul@example.com",
      dob: "2001-05-15",
      address: "Mumbai, India",
    },
  ]);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

  return (
    <div className="container mt-4">
      <h2>Student Registration</h2>

      {/* Button to open modal */}
      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={handleOpenModal}>
          + Add Student
        </button>
      </div>

      {/* Modal Popup */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Student</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Student Name</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Student Name"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Branch</label>
                      <select className="form-select">
                        <option>Select Branch</option>
                        <option>Computer Science</option>
                        <option>Electronics</option>
                        <option>Mechanical</option>
                        <option>Civil</option>
                        <option>Electrical</option>
                      </select>
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter Mobile Number"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        placeholder="Enter Email"
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date of Birth</label>
                      <input type="date" className="form-control" />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        rows={2}
                        placeholder="Enter Address"
                      ></textarea>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Student
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Students Table */}
      <table className="table table-bordered table-striped mt-4">
        <thead className="table-light">
          <tr>
            <th>Name</th>
            <th>Branch</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.branch}</td>
              <td>{student.mobile}</td>
              <td>{student.email}</td>
              <td>{student.dob}</td>
              <td>{student.address}</td>
              <td>
                <button className="btn btn-success btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default StudentPage;
