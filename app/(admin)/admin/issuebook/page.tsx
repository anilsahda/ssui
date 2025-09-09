"use client";
import React, { useState } from "react";

function IssueBookPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [issuedBooks, setIssuedBooks] = useState([
    {
      id: 1,
      bookName: "Data Structures",
      publication: "Oxford University Press",
      branch: "Computer Science",
      student: "Amit Sharma",
      issueDays: 10,
    },
    {
      id: 2,
      bookName: "Operating System",
      publication: "Cambridge University Press",
      branch: "Electronics",
      student: "Neha Verma",
      issueDays: 7,
    },
  ]);

  return (
    <div className="container mt-4">
      <h2>Issue Book</h2>

      <button
        className="btn btn-primary mb-3"
        onClick={() => setShowPopup(true)}
      >
        + Issue New Book
      </button>

      {/* Popup Form */}
      {showPopup && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Issue Book</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">Select Publication</label>
                  <select className="form-select">
                    <option>Select Publication</option>
                    <option>Oxford University Press</option>
                    <option>Cambridge University Press</option>
                    <option>McGraw Hill</option>
                    <option>Pearson</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Book</label>
                  <select className="form-select">
                    <option>Select Book</option>
                    <option>Data Structures</option>
                    <option>Operating System</option>
                    <option>Machine Learning</option>
                    <option>Computer Networks</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Branch</label>
                  <select className="form-select">
                    <option>Select Branch</option>
                    <option>Computer Science</option>
                    <option>Electronics</option>
                    <option>Mechanical</option>
                    <option>Civil</option>
                    <option>Electrical</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Select Student</label>
                  <select className="form-select">
                    <option>Select Student</option>
                    <option>Amit Sharma</option>
                    <option>Neha Verma</option>
                    <option>Ravi Kumar</option>
                    <option>Pooja Singh</option>
                  </select>
                </div>
                <div className="mb-3">
                  <label className="form-label">Issue Days</label>
                  <input
                    type="number"
                    className="form-control"
                    placeholder="Enter no. of days"
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowPopup(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary">Issue Book</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Issued Books Table */}
      <div className="card shadow-sm p-4">
        <h5 className="mb-3">Issued Books</h5>
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Book Name</th>
              <th>Publication</th>
              <th>Branch</th>
              <th>Student Name</th>
              <th>Issue Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.bookName}</td>
                <td>{book.publication}</td>
                <td>{book.branch}</td>
                <td>{book.student}</td>
                <td>{book.issueDays}</td>
                <td>
                  <button className="btn btn-success btn-sm me-1">Return</button>
                  <button className="btn btn-warning btn-sm me-1">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IssueBookPage;
