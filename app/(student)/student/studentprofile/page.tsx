"use client";

import React, { useEffect } from "react";
import { useMyAccountStore } from "@/store/myAccountStore";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrashAlt, FaUserPlus, FaRedo } from "react-icons/fa";

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
    AOS.init({ duration: 800, once: true });
  }, [fetchAccounts, fetchStudents]);

  return (
    <div className="container mt-5">
      {/* Header */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h2 className="fw-bold text-primary mb-2">👤 My Account Management</h2>
        <p className="text-muted">
          Manage student account details, penalties, and issued records.
        </p>
        <hr className="w-25 mx-auto border-primary" />
      </div>

      {/* Form Section */}
      <div className="card shadow-lg border-0 mb-5" data-aos="zoom-in-up">
        <div className="card-header bg-gradient text-white fw-semibold bg-primary">
          {editingId ? "✏️ Edit Account" : "➕ Add New Account"}
        </div>
        <div className="card-body">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">Student</label>
                <select
                  name="studentId"
                  value={formData.studentId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-select shadow-sm"
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
                <label className="form-label fw-semibold">Total Issued</label>
                <input
                  type="number"
                  name="totalIssuedBooks"
                  value={formData.totalIssuedBooks}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control shadow-sm"
                  min={0}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label fw-semibold">Total Returned</label>
                <input
                  type="number"
                  name="totalReturnedBooks"
                  value={formData.totalReturnedBooks}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control shadow-sm"
                  min={0}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label fw-semibold">
                  Total Penalties
                </label>
                <input
                  type="number"
                  name="totalPenalties"
                  value={formData.totalPenalties}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control shadow-sm"
                  min={0}
                />
              </div>

              <div className="col-md-2">
                <label className="form-label fw-semibold">
                  Outstanding Penalty
                </label>
                <input
                  type="number"
                  name="outStandingPenalty"
                  value={formData.outStandingPenalty}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-control shadow-sm"
                  min={0}
                />
              </div>
            </div>

            <div className="mt-4 text-end">
              <button
                type="submit"
                className="btn btn-success me-2 shadow-sm px-4"
              >
                {editingId ? (
                  <>
                    <FaRedo className="me-2" />
                    Update Account
                  </>
                ) : (
                  <>
                    <FaUserPlus className="me-2" />
                    Add Account
                  </>
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary shadow-sm px-4"
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
      <div className="card shadow-lg border-0" data-aos="fade-up">
        <div className="card-header bg-dark text-white fw-semibold">
          📋 Accounts List
        </div>
        <div className="card-body table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-primary text-center">
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
                accounts.map((a, index) => (
                  <tr
                    key={a.id}
                    data-aos="fade-up"
                    data-aos-delay={index * 80}
                    className="text-center"
                  >
                    <td>{a.id}</td>
                    <td>
                      <span className="fw-semibold">{a.student?.fullName}</span>
                      <br />
                      <small className="text-muted">
                        {a.student?.rollNo || "N/A"}
                      </small>
                    </td>
                    <td>
                      <span className="badge bg-info">
                        {a.totalIssuedBooks}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-success">
                        {a.totalReturnedBooks}
                      </span>
                    </td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        {a.totalPenalties}
                      </span>
                    </td>
                    <td>
                      <span
                        className={`badge ${
                          a.outStandingPenalty > 0
                            ? "bg-danger"
                            : "bg-secondary"
                        }`}
                      >
                        ₹{a.outStandingPenalty}
                      </span>
                    </td>
                    <td>
                      {a.lastUpdated
                        ? new Date(a.lastUpdated).toLocaleString()
                        : "N/A"}
                    </td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-warning me-2"
                        onClick={() => handleEdit(a)}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(a.id)}
                      >
                        <FaTrashAlt />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={8} className="text-center text-muted py-3">
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
