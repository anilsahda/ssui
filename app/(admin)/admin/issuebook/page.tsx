"use client";

import React, { useEffect } from "react";
import { useIssueBookStore } from "@/store/issueBookStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function IssueBooksPage() {
  const {
    issues,
    books,
    students,
    formData,
    isEditing,
    fetchIssues,
    fetchBooksAndStudents,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useIssueBookStore();

  useEffect(() => {
    fetchIssues();
    fetchBooksAndStudents();
  }, [fetchIssues, fetchBooksAndStudents]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📚 Issue Book Management</h2>

      {/* ✅ Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          {isEditing ? "Edit Issued Book" : "Issue New Book"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              {/* Book */}
              <div className="col-md-4">
                <label className="form-label">Select Book</label>
                <select
                  name="bookId"
                  value={formData.bookId}
                  onChange={(e) =>
                    handleChange(
                      e.target.name,
                      e.target.value,
                      e.target.type,
                      e.target.checked
                    )
                  }
                  className="form-select"
                  required
                >
                  <option value={0}>Select Book</option>
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} by {b.author}
                    </option>
                  ))}
                </select>
              </div>

              {/* Student */}
              <div className="col-md-4">
                <label className="form-label">Select Student</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={(e) =>
                    handleChange(
                      e.target.name,
                      e.target.value,
                      e.target.type,
                      e.target.checked
                    )
                  }
                  className="form-select"
                  required
                >
                  <option value={0}>Select Student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} ({s.rollNumber})
                    </option>
                  ))}
                </select>
              </div>

              {/* Issue Date */}
              <div className="col-md-4">
                <label className="form-label">Issue Date</label>
                <input
                  type="date"
                  name="issueDate"
                  value={formData.issueDate || ""}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                  required
                />
              </div>

              {/* Due Date */}
              <div className="col-md-4">
                <label className="form-label">Due Date</label>
                <input
                  type="date"
                  name="dueDate"
                  value={formData.dueDate || ""}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                />
              </div>

              {/* Returned */}
              <div className="col-md-4 d-flex align-items-center">
                <div className="form-check mt-3">
                  <input
                    type="checkbox"
                    name="isReturned"
                    checked={formData.isReturned}
                    onChange={(e) =>
                      handleChange(
                        e.target.name,
                        e.target.value,
                        e.target.type,
                        e.target.checked
                      )
                    }
                    className="form-check-input"
                    id="isReturned"
                  />
                  <label htmlFor="isReturned" className="form-check-label ms-2">
                    Returned
                  </label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {isEditing ? "Update Record" : "Issue Book"}
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

      {/* ✅ Table */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">Issued Books List</div>
        <div className="card-body">
          {issues.length === 0 ? (
            <p className="text-muted text-center">No issued books available</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>Student</th>
                    <th>Issue Date</th>
                    <th>Due Date</th>
                    <th>Returned?</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {issues.map((i) => (
                    <tr key={i.id}>
                      <td>{i.id}</td>
                      <td>{i.book?.title || "N/A"}</td>
                      <td>{i.student?.fullName || "N/A"}</td>
                      <td>
                        {i.issueDate
                          ? new Date(i.issueDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>
                        {i.dueDate
                          ? new Date(i.dueDate).toLocaleDateString()
                          : "N/A"}
                      </td>
                      <td>{i.isReturned ? "✅ Yes" : "❌ No"}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(i)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(i.id)}
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
