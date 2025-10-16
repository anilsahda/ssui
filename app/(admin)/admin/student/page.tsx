"use client";

import React, { useEffect } from "react";
import { useStudentStore } from "@/store/studentStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function StudentPage() {
  const {
    students,
    branches,
    formData,
    editingId,
    fetchStudents,
    fetchBranches,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useStudentStore();

  useEffect(() => {
    fetchStudents();
    fetchBranches();
  }, [fetchStudents, fetchBranches]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">🎓 Student Management</h2>

      {/* Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? "✏️ Edit Student" : "➕ Add New Student"}
          </h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Roll Number</label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                  placeholder="Enter roll number"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Branch</label>
                <select
                  name="branchId"
                  value={formData.branchId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-select"
                  required
                >
                  <option value={0}>Select Branch</option>
                  {branches.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.branchName}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {editingId ? "Update Student" : "Add Student"}
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
          <h5 className="card-title mb-3">📋 Students List</h5>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Roll Number</th>
                <th>Email</th>
                <th>Branch</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.length > 0 ? (
                students.map((s) => (
                  <tr key={s.id}>
                    <td>{s.id}</td>
                    <td>{s.fullName}</td>
                    <td>{s.rollNo}</td>
                    <td>{s.email}</td>
                    <td>{s.branch?.branchName || "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(s)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(s.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    No students found.
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
