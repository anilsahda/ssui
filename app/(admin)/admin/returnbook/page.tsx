"use client";

import React, { useEffect } from "react";
import { useReturnBookStore } from "@/store/returnBookStore";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBookOpen,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaUndoAlt,
  FaTimesCircle,
} from "react-icons/fa";

export default function ReturnBookPage() {
  const {
    returns,
    issueBooks,
    formData,
    editingId,
    fetchReturns,
    fetchIssueBooks,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useReturnBookStore();

  useEffect(() => {
    fetchReturns();
    fetchIssueBooks();
    AOS.init({ duration: 800, once: true });
  }, [fetchReturns, fetchIssueBooks]);

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h2 className="fw-bold display-6 text-primary mb-2">
          <FaBookOpen className="me-2 text-success" />
          Return Books Management
        </h2>
        <p className="text-muted">
          Manage book returns, track damage reports, and update records
          efficiently.
        </p>
        <hr className="w-25 mx-auto border-3 border-primary opacity-75" />
      </div>

      {/* Form Section */}
      <div className="card shadow-lg border-0 mb-5" data-aos="zoom-in">
        <div className="card-header bg-gradient bg-primary text-white py-3">
          <h5 className="mb-0 fw-semibold">
            {editingId ? "✏️ Edit Return Record" : "➕ Add New Return"}
          </h5>
        </div>

        <div className="card-body bg-light">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Issued Book</label>
                <select
                  name="issueBookId"
                  className="form-select shadow-sm"
                  value={formData.issueBookId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  required
                >
                  <option value={0}>Select Issued Book</option>
                  {issueBooks.map((ib) => (
                    <option key={ib.id} value={ib.id}>
                      #{ib.id} - Student {ib.studentId} | Book {ib.bookId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  className="form-control shadow-sm"
                  value={formData.returnDate}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4 d-flex align-items-center mt-4">
                <div className="form-check">
                  <input
                    type="checkbox"
                    name="isDamaged"
                    className="form-check-input"
                    checked={formData.isDamaged}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                  <label className="form-check-label fw-semibold">
                    Is Damaged
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className="btn btn-success me-2 shadow-sm px-4"
              >
                <FaPlusCircle className="me-2" />
                {editingId ? "Update Return" : "Add Return"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary shadow-sm px-4"
                  onClick={resetForm}
                >
                  <FaTimesCircle className="me-2" />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-lg border-0" data-aos="fade-up">
        <div className="card-header bg-gradient bg-dark text-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold">
            <FaUndoAlt className="me-2 text-warning" />
            Return Records
          </h5>
          <span className="badge bg-secondary px-3 py-2">
            Total: {returns.length}
          </span>
        </div>

        <div className="card-body bg-light">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle shadow-sm">
              <thead className="table-primary text-center">
                <tr>
                  <th>ID</th>
                  <th>Issue Book</th>
                  <th>Return Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {returns.length > 0 ? (
                  returns.map((r) => (
                    <tr key={r.id} className="text-center">
                      <td>{r.id}</td>
                      <td>
                        <span className="fw-semibold">#{r.issueBookId}</span>
                      </td>
                      <td>{new Date(r.returnDate).toLocaleDateString()}</td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            r.isDamaged ? "bg-danger" : "bg-success"
                          }`}
                        >
                          {r.isDamaged ? "Damaged" : "Good Condition"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(r)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(r.id)}
                        >
                          <FaTrashAlt className="me-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center text-muted py-4">
                      No return records found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
