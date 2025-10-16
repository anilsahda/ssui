"use client";

import React, { useEffect } from "react";
import { useReturnBookStore } from "@/store/returnBookStore";
import "bootstrap/dist/css/bootstrap.min.css";

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
  }, [fetchReturns, fetchIssueBooks]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">📚 Return Books Management</h2>

      {/* Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? "✏️ Edit Return" : "➕ Add New Return"}
          </h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Issue Book</label>
                <select
                  name="issueBookId"
                  value={formData.issueBookId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-select"
                  required
                >
                  <option value={0}>Select Issue Book</option>
                  {issueBooks.map((ib) => (
                    <option key={ib.id} value={ib.id}>
                      ID:{ib.id} | Student:{ib.studentId} | Book:{ib.bookId}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-4">
                <label className="form-label">Return Date</label>
                <input
                  type="date"
                  name="returnDate"
                  value={formData.returnDate}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-4 d-flex align-items-center">
                <div className="form-check mt-4">
                  <input
                    type="checkbox"
                    name="isDamaged"
                    className="form-check-input"
                    checked={formData.isDamaged}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                  <label className="form-check-label">Is Damaged</label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {editingId ? "Update Return" : "Add Return"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">📋 Returns List</h5>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Issue Book ID</th>
                <th>Return Date</th>
                <th>Is Damaged</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {returns.length > 0 ? (
                returns.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.issueBookId}</td>
                    <td>{new Date(r.returnDate).toLocaleDateString()}</td>
                    <td>{r.isDamaged ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(r)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(r.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No return records found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
