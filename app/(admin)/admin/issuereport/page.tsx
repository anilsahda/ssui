"use client";

import React, { useEffect, useState } from "react";
import { useIssueReportStore } from "@/store/issueReportStore";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function IssueReportPage() {
  const {
    reports,
    formData,
    editingId,
    fetchReports,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useIssueReportStore();

  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    fetchReports();
    AOS.init({ duration: 800, once: true });

    // Load saved theme
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") setDarkMode(true);
  }, [fetchReports]);

  const toggleTheme = () => {
    const newTheme = !darkMode;
    setDarkMode(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
  };

  return (
    <div
      className={`min-vh-100 py-5 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      } transition-all`}
    >
      <div className="container">
        {/* Header with Toggle */}
        <div className="d-flex justify-content-between align-items-center mb-5">
          <h2
            className="fw-bold"
            data-aos="fade-down"
            style={{
              color: darkMode ? "#66b2ff" : "#0d6efd",
              letterSpacing: "1px",
              textShadow: darkMode
                ? "0 1px 2px rgba(255,255,255,0.1)"
                : "0 1px 2px rgba(0,0,0,0.2)",
            }}
          >
            📘 Issue Reports Management
          </h2>

          <button
            onClick={toggleTheme}
            className={`btn btn-sm ${
              darkMode ? "btn-outline-light" : "btn-outline-dark"
            } rounded-pill px-3`}
            data-aos="fade-left"
          >
            {darkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
          </button>
        </div>

        {/* ✅ Form Section */}
        <div
          className={`card shadow-lg border-0 mb-5 ${
            darkMode ? "bg-secondary text-light" : "bg-white"
          }`}
          data-aos="zoom-in"
        >
          <div
            className={`card-header fw-semibold ${
              darkMode
                ? "bg-gradient bg-info text-dark"
                : "bg-gradient bg-primary text-white"
            }`}
          >
            {editingId ? "✏️ Edit Report" : "➕ Add New Report"}
          </div>
          <div className="card-body">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="row g-3">
                {/* Issue Book ID */}
                <div className="col-md-4" data-aos="fade-right">
                  <label className="form-label fw-semibold">
                    Issue Book ID
                  </label>
                  <input
                    type="number"
                    className="form-control shadow-sm"
                    name="issueBookId"
                    value={formData.issueBookId}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    placeholder="Enter Issue Book ID"
                    required
                  />
                </div>

                {/* Report Date */}
                <div className="col-md-4" data-aos="fade-up">
                  <label className="form-label fw-semibold">Report Date</label>
                  <input
                    type="date"
                    className="form-control shadow-sm"
                    name="reportDate"
                    value={formData.reportDate}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>

                {/* Remarks */}
                <div className="col-md-4" data-aos="fade-left">
                  <label className="form-label fw-semibold">Remarks</label>
                  <textarea
                    className="form-control shadow-sm"
                    name="remarks"
                    rows={2}
                    placeholder="Enter remarks..."
                    value={formData.remarks}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    required
                  />
                </div>
              </div>

              <div className="mt-4 text-end">
                <button
                  type="submit"
                  className="btn btn-success px-4 me-2 shadow-sm"
                  data-aos="zoom-in"
                >
                  {editingId ? "Update Report" : "Save Report"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-secondary px-4 shadow-sm"
                    onClick={resetForm}
                    data-aos="zoom-in"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ✅ Reports Table */}
        <div
          className={`card shadow-lg border-0 ${
            darkMode ? "bg-secondary text-light" : "bg-white"
          }`}
          data-aos="fade-up"
        >
          <div
            className={`card-header fw-semibold d-flex justify-content-between align-items-center ${
              darkMode ? "bg-dark text-light" : "bg-dark text-white"
            }`}
          >
            <span>📋 Reports List</span>
            <span
              className={`badge ${
                darkMode ? "bg-info text-dark" : "bg-info text-dark"
              }`}
            >
              Total Reports: {reports.length}
            </span>
          </div>

          <div className="card-body">
            {reports.length === 0 ? (
              <p
                className="text-center py-4"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                No reports found. Try adding a new one.
              </p>
            ) : (
              <div className="table-responsive" data-aos="zoom-in">
                <table
                  className={`table table-hover align-middle text-center ${
                    darkMode ? "table-dark table-striped" : "table-striped"
                  }`}
                >
                  <thead className={darkMode ? "table-info" : "table-primary"}>
                    <tr>
                      <th>ID</th>
                      <th>Issue Book ID</th>
                      <th>Report Date</th>
                      <th>Remarks</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((report, index) => (
                      <tr
                        key={report.id}
                        data-aos="fade-up"
                        data-aos-delay={index * 100}
                      >
                        <td>{report.id}</td>
                        <td>{report.issueBookId}</td>
                        <td>
                          {new Date(report.reportDate).toLocaleDateString()}
                        </td>
                        <td className="text-start">{report.remarks}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2 shadow-sm"
                            onClick={() => handleEdit(report)}
                          >
                            <i className="bi bi-pencil-square me-1"></i>Edit
                          </button>
                          <button
                            className="btn btn-danger btn-sm shadow-sm"
                            onClick={() => handleDelete(report.id)}
                          >
                            <i className="bi bi-trash me-1"></i>Delete
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
    </div>
  );
}
