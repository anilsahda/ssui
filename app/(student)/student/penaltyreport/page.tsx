"use client";

import React, { useEffect } from "react";
import { usePenaltyReportStore } from "@/store/penaltyReportStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function PenaltyReportPage() {
  const {
    reports,
    students,
    formData,
    editingId,
    fetchReports,
    fetchStudents,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = usePenaltyReportStore();

  useEffect(() => {
    fetchReports();
    fetchStudents();
  }, [fetchReports, fetchStudents]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">💰 Penalty Report Management</h2>

      {/* Form Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? "✏️ Edit Penalty Report" : "➕ Add New Penalty Report"}
          </h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-3">
                <label className="form-label">Student</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-select"
                  required
                >
                  <option value={0}>Select Student</option>
                  {students.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.fullName} | {s.rollNo}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-3">
                <label className="form-label">Total Penalties</label>
                <input
                  type="number"
                  name="totalPenalties"
                  value={formData.totalPenalties}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Paid Penalties</label>
                <input
                  type="number"
                  name="paidPenalties"
                  value={formData.paidPenalties}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                  required
                />
              </div>

              <div className="col-md-3">
                <label className="form-label">Pending Penalties</label>
                <input
                  type="number"
                  name="pendingPenalties"
                  value={formData.pendingPenalties}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                  required
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
          <h5 className="card-title mb-3">📋 Penalty Reports List</h5>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Total Penalties</th>
                <th>Paid Penalties</th>
                <th>Pending Penalties</th>
                <th>Report Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((r) => (
                  <tr key={r.id}>
                    <td>{r.id}</td>
                    <td>{r.student?.fullName || "N/A"}</td>
                    <td>{r.totalPenalties}</td>
                    <td>{r.paidPenalties}</td>
                    <td>{r.pendingPenalties}</td>
                    <td>
                      {r.reportDate
                        ? new Date(r.reportDate).toLocaleString()
                        : "N/A"}
                    </td>
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
                  <td colSpan={7} className="text-center">
                    No penalty reports found.
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
