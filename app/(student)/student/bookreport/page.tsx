"use client";

import React, { useEffect } from "react";
import { useBookReportStore } from "@/store/bookReport";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BookReportPage() {
  const {
    reports,
    books,
    formData,
    editingId,
    fetchReports,
    fetchBooks,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useBookReportStore();

  useEffect(() => {
    fetchReports();
    fetchBooks();
  }, [fetchReports, fetchBooks]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">📖 Book Report Management</h2>

      {/* Form Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? "✏️ Edit Book Report" : "➕ Add New Book Report"}
          </h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Book</label>
                <select
                  name="bookId"
                  value={formData.bookId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-select"
                  required
                >
                  <option value={0}>Select Book</option>
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} | {b.author}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-8">
                <label className="form-label">Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                  placeholder="Enter remarks"
                  required
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Issued</label>
                <input
                  type="number"
                  name="issueCount"
                  value={formData.issueCount}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Returned</label>
                <input
                  type="number"
                  name="returnCount"
                  value={formData.returnCount}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Lost</label>
                <input
                  type="number"
                  name="lostCount"
                  value={formData.lostCount}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Damaged</label>
                <input
                  type="number"
                  name="DamagedCount"
                  value={formData.DamagedCount}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                />
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {editingId ? "Update Report" : "Add Report"}
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

      {/* Table Section */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">📋 Book Reports List</h5>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Book</th>
                <th>Issued</th>
                <th>Returned</th>
                <th>Lost</th>
                <th>Damaged</th>
                <th>Report Date</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.book?.title || "N/A"}</td>
                    <td>{r.issueCount}</td>
                    <td>{r.returnCount}</td>
                    <td>{r.lostCount}</td>
                    <td>{r.DamagedCount}</td>
                    <td>
                      {r.reportDate
                        ? new Date(r.reportDate).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>{r.remarks}</td>
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
                  <td colSpan={9} className="text-center">
                    No book reports found.
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
