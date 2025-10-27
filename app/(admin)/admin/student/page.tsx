"use client";

import React, { useEffect } from "react";
import { useStudentStore } from "@/store/studentStore";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserGraduate,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaTimesCircle,
  FaListUl,
} from "react-icons/fa";

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
    AOS.init({ duration: 900, once: true });
  }, [fetchStudents, fetchBranches]);

  return (
    <div className="container py-5">
      {/* Header Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="fw-bold text-primary display-5 mb-3">
          <FaUserGraduate className="me-2 text-success" />
          Student Management
        </h1>
        <p className="text-muted fs-5">
          Seamlessly manage student data — create, update, and view details with
          ease.
        </p>
        <hr className="w-25 mx-auto border-3 border-primary opacity-75" />
      </div>

      {/* Form Section */}
      <div
        className="card shadow-lg border-0 mb-5 form-card"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="card-header bg-gradient bg-primary text-white py-3 rounded-top">
          <h5 className="mb-0 fw-semibold">
            {editingId ? "✏️ Edit Student" : "➕ Add New Student"}
          </h5>
        </div>

        <div className="card-body bg-light">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-3" data-aos="zoom-in" data-aos-delay="150">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control shadow-sm"
                  placeholder="Enter full name"
                  required
                />
              </div>

              <div className="col-md-3" data-aos="zoom-in" data-aos-delay="200">
                <label className="form-label fw-semibold">Roll Number</label>
                <input
                  type="text"
                  name="rollNo"
                  value={formData.rollNo}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control shadow-sm"
                  placeholder="Enter roll number"
                  required
                />
              </div>

              <div className="col-md-3" data-aos="zoom-in" data-aos-delay="250">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control shadow-sm"
                  placeholder="Enter email"
                  required
                />
              </div>

              <div className="col-md-3" data-aos="zoom-in" data-aos-delay="300">
                <label className="form-label fw-semibold">Branch</label>
                <select
                  name="branchId"
                  value={formData.branchId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-select shadow-sm"
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

            <div className="mt-4" data-aos="fade-right">
              <button
                type="submit"
                className="btn btn-success me-2 px-4 py-2 shadow-sm transition-all"
              >
                <FaPlusCircle className="me-2" />
                {editingId ? "Update Student" : "Add Student"}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary px-4 py-2 shadow-sm"
                  onClick={resetForm}
                >
                  <FaTimesCircle className="me-2" />
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {/* Students Table */}
      <div
        className="card shadow-lg border-0"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="card-header bg-gradient bg-dark text-white py-3 d-flex justify-content-between align-items-center">
          <h5 className="mb-0 fw-semibold">
            <FaListUl className="me-2 text-warning" />
            Students List
          </h5>
          <span className="badge bg-secondary px-3 py-2">
            Total: {students.length}
          </span>
        </div>

        <div className="card-body bg-light">
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle shadow-sm">
              <thead className="table-primary text-center">
                <tr>
                  <th>ID</th>
                  <th>Full Name</th>
                  <th>Roll No</th>
                  <th>Email</th>
                  <th>Branch</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {students.length > 0 ? (
                  students.map((s, index) => (
                    <tr
                      key={s.id}
                      className="text-center"
                      data-aos="fade-up"
                      data-aos-delay={index * 80}
                    >
                      <td>{s.id}</td>
                      <td className="fw-semibold">{s.fullName}</td>
                      <td>{s.rollNo}</td>
                      <td>{s.email}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {s.branch?.branchName || "N/A"}
                        </span>
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2 shadow-sm"
                          onClick={() => handleEdit(s)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-danger shadow-sm"
                          onClick={() => handleDelete(s.id)}
                        >
                          <FaTrashAlt className="me-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No students found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .form-card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease;
        }
        button:hover {
          transform: scale(1.03);
          transition: all 0.2s ease-in-out;
        }
      `}</style>
    </div>
  );
}
