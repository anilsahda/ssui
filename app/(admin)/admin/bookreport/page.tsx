"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import { useBookReportStore } from "@/store/bookReportStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function BookReportsPage() {
  const {
    reports,
    books,
    formData,
    isEditing,
    fetchReports,
    fetchBooks,
    setFormData,
    resetForm,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useBookReportStore();

  // ✅ Load data
  useEffect(() => {
    fetchReports();
    fetchBooks();
  }, [fetchReports, fetchBooks]);

  // ✅ Input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      [name]:
        name === "bookId" ||
        name === "issueCount" ||
        name === "returnCount" ||
        name === "lostCount"
          ? Number(value)
          : value,
    });
  };

  // ✅ Submit form
  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📖 Book Reports Management</h2>

      {/* ✅ Book Report Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          {isEditing ? "Edit Book Report" : "Add New Book Report"}
        </div>
        <div className="card-body">
          <form onSubmit={onSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Book</label>
                <select
                  name="bookId"
                  value={formData.bookId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value={0}>Select Book</option>
                  {Array.isArray(books) &&
                    books.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title} by {b.author}
                      </option>
                    ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label">Report Details</label>
                <textarea
                  name="reportDetails"
                  value={formData.reportDetails}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter report details"
                  rows={2}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Issue Count</label>
                <input
                  type="number"
                  name="issueCount"
                  value={formData.issueCount}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Return Count</label>
                <input
                  type="number"
                  name="returnCount"
                  value={formData.returnCount}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Lost Count</label>
                <input
                  type="number"
                  name="lostCount"
                  value={formData.lostCount}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {isEditing ? "Update Report" : "Add Report"}
              </button>
              {isEditing && (
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

      {/* ✅ Reports Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">Book Reports List</div>
        <div className="card-body">
          {reports.length === 0 ? (
            <p className="text-muted text-center">No reports available</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Book Title</th>
                    <th>Author</th>
                    <th>Report Details</th>
                    <th>Issued</th>
                    <th>Returned</th>
                    <th>Lost</th>
                    <th>Report Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>{r.book?.title || "N/A"}</td>
                      <td>{r.book?.author || "N/A"}</td>
                      <td>{r.reportDetails}</td>
                      <td>{r.issueCount}</td>
                      <td>{r.returnCount}</td>
                      <td>{r.lostCount}</td>
                      <td>
                        {r.reportDate
                          ? new Date(r.reportDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(r)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(r.id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
