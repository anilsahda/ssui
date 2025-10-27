"use client";

import React, { useEffect } from "react";
import { useMyAccountStore } from "@/store/myAccountStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function MyAccountPage() {
  const {
    accounts,
    students,
    formData,
    editingId,
    fetchAccounts,
    fetchStudents,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useMyAccountStore();

  useEffect(() => {
    fetchAccounts();
    fetchStudents();
  }, [fetchAccounts, fetchStudents]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">👤 My Account Management</h2>

      {/* Form Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? "✏️ Edit Account" : "➕ Add New Account"}
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

              <div className="col-md-2">
                <label className="form-label">Total Issued</label>
                <input
                  type="number"
                  name="totalIssuedBooks"
                  value={formData.totalIssuedBooks}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Total Returned</label>
                <input
                  type="number"
                  name="totalReturnedBooks"
                  value={formData.totalReturnedBooks}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control"
                  min={0}
                />
              </div>

              <div className="col-md-2">
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
                />
              </div>

              <div className="col-md-2">
                <label className="form-label">Outstanding Penalty</label>
                <input
                  type="number"
                  name="outStandingPenalty"
                  value={formData.outStandingPenalty}
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
                {editingId ? "Update Account" : "Add Account"}
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
          <h5 className="card-title mb-3">📋 Accounts List</h5>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Student</th>
                <th>Total Issued</th>
                <th>Total Returned</th>
                <th>Total Penalties</th>
                <th>Outstanding Penalty</th>
                <th>Last Updated</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.length > 0 ? (
                accounts.map((a) => (
                  <tr key={a.id}>
                    <td>{a.id}</td>
                    <td>{a.student?.fullName || "N/A"}</td>
                    <td>{a.totalIssuedBooks}</td>
                    <td>{a.totalReturnedBooks}</td>
                    <td>{a.totalPenalties}</td>
                    <td>{a.outStandingPenalty}</td>
                    <td>
                      {a.lastUpdated
                        ? new Date(a.lastUpdated).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(a)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(a.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center">
                    No accounts found.
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
