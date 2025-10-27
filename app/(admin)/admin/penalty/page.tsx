"use client";

import React, { useEffect, useState } from "react";
import { usePenaltyStore } from "@/store/penaltyStore";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaMoneyBillWave,
  FaMoon,
  FaSun,
} from "react-icons/fa";

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

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchPenalties();
    fetchStudents();
    AOS.init({ duration: 800, once: true });
  }, [fetchPenalties, fetchStudents]);

  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    document.body.classList.toggle("text-light", darkMode);
  }, [darkMode]);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-5">
        <div data-aos="fade-down">
          <h2 className="fw-bold display-6 text-primary mb-1">
            <FaMoneyBillWave className="me-2 text-success" />
            Penalty Management
          </h2>
          <p className="text-muted">
            Manage student penalties efficiently — add, edit, and track all in
            one place.
          </p>
        </div>

        {/* Dark Mode Toggle */}
        <button
          className={`btn btn-outline-${
            darkMode ? "light" : "dark"
          } rounded-circle shadow-sm`}
          onClick={() => setDarkMode(!darkMode)}
          title={darkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
        >
          {darkMode ? <FaSun /> : <FaMoon />}
        </button>
      </div>

      <hr className="w-25 mx-auto border-3 border-primary opacity-75 mb-5" />

      {/* Form Section */}
      <div
        className={`card shadow-lg border-0 mb-5 ${
          darkMode ? "bg-secondary bg-opacity-25 text-light" : ""
        }`}
        data-aos="zoom-in"
      >
        <div
          className={`card-header bg-gradient ${
            darkMode ? "bg-info text-dark" : "bg-primary text-white"
          } py-3`}
        >
          <h5 className="mb-0 fw-semibold">
            {editingId ? "✏️ Edit Penalty" : "➕ Add New Penalty"}
          </h5>
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
                  className="form-select shadow-sm"
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
                <label className="form-label fw-semibold">Amount</label>
                <input
                  type="number"
                  name="amount"
                  className="form-control shadow-sm"
                  placeholder="Enter amount"
                  value={formData.amount}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Penalty Date</label>
                <input
                  type="date"
                  name="penaltyDate"
                  className="form-control shadow-sm"
                  value={formData.penaltyDate}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Reason</label>
                <textarea
                  name="reason"
                  className="form-control shadow-sm"
                  rows={2}
                  placeholder="Enter reason"
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
                  <label className="form-check-label fw-semibold">
                    Is Paid
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
                {editingId ? "Update Penalty" : "Add Penalty"}
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
      <div
        className={`card shadow-lg border-0 ${
          darkMode ? "bg-secondary bg-opacity-25 text-light" : ""
        }`}
        data-aos="fade-up"
      >
        <div
          className={`card-header bg-gradient ${
            darkMode ? "bg-dark text-light" : "bg-dark text-white"
          } py-3`}
        >
          <h5 className="mb-0 fw-semibold">📋 Penalties List</h5>
        </div>
        <div className="card-body">
          <div className="table-responsive">
            <table
              className={`table table-hover table-bordered align-middle shadow-sm ${
                darkMode ? "table-dark table-striped" : "table-striped"
              }`}
            >
              <thead className="table-primary text-center">
                <tr>
                  <th>ID</th>
                  <th>Student</th>
                  <th>Amount</th>
                  <th>Date</th>
                  <th>Reason</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {penalties.length > 0 ? (
                  penalties.map((p) => (
                    <tr key={p.id} className="text-center">
                      <td>{p.id}</td>
                      <td className="fw-semibold">
                        {p.student?.fullName || "N/A"}
                      </td>
                      <td>₹{p.amount}</td>
                      <td>{new Date(p.penaltyDate).toLocaleDateString()}</td>
                      <td>{p.reason}</td>
                      <td>
                        <span
                          className={`badge rounded-pill px-3 py-2 ${
                            p.isPaid ? "bg-success" : "bg-danger"
                          }`}
                        >
                          {p.isPaid ? "Paid" : "Unpaid"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(p)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          <FaTrashAlt className="me-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={7} className="text-center text-muted py-4">
                      No penalties found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Floating Add Button */}
      <button
        className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 p-3 shadow"
        style={{ zIndex: 1050 }}
        onClick={resetForm}
        title="Add New Penalty"
      >
        <FaPlusCircle size={24} />
      </button>
    </div>
  );
}
