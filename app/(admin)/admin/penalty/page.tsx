"use client";

import React, { useEffect } from "react";
import { usePenaltyStore } from "@/store/penaltyStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PenaltyPage() {
  const {
    penalties,
    students,
    formData,
    editingId,
    fetchPenalties,
    fetchStudents,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = usePenaltyStore();

  useEffect(() => {
    fetchPenalties();
    fetchStudents();
  }, [fetchPenalties, fetchStudents]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">💰 Penalty Management</h2>

      {/* Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? "✏️ Edit Penalty" : "➕ Add New Penalty"}
          </h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label">Student</label>
                <select
                  name="studentId"
                  className="form-select"
                  value={formData.studentId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
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

              <div className="col-md-4">
                <label className="form-label">Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control"
                  value={formData.amount}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Penalty Date</label>
                <input
                  type="date"
                  name="penaltyDate"
                  className="form-control"
                  value={formData.penaltyDate}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label">Reason</label>
                <textarea
                  name="reason"
                  className="form-control"
                  value={formData.reason}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <div className="form-check mt-2">
                  <input
                    type="checkbox"
                    name="isPaid"
                    className="form-check-input"
                    checked={formData.isPaid}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.checked)
                    }
                  />
                  <label className="form-check-label">Is Paid</label>
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {editingId ? "Update Penalty" : "Add Penalty"}
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

      {/* Penalties Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">📋 Penalties List</h5>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Amount</th>
                <th>Penalty Date</th>
                <th>Reason</th>
                <th>Paid</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {penalties.length > 0 ? (
                penalties.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.student?.fullName || "N/A"}</td>
                    <td>{p.amount}</td>
                    <td>{new Date(p.penaltyDate).toLocaleDateString()}</td>
                    <td>{p.reason}</td>
                    <td>{p.isPaid ? "Yes" : "No"}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center">
                    No penalties found.
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
