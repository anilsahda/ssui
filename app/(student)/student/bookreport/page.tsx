"use client";

import React, { useEffect } from "react";
import { useBookReportStore } from "@/store/bookReport";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaPlusCircle, FaEdit, FaTrashAlt, FaBookOpen } from "react-icons/fa";

export default function BookReportPage() {
  const {
    reports,
    books,
    formData,
    editingId,
    fetchReports,
    fetchBooks,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useBookReportStore();

  useEffect(() => {
    fetchReports();
    fetchBooks();
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, [fetchReports, fetchBooks]);

  return (
    <div
      className="py-5 min-vh-100"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #0f172a 60%, #1e3a8a 100%)",
        fontFamily: "Inter, sans-serif",
        color: "#f8f9fa",
      }}
    >
      <div className="container" data-aos="fade-up">
        <div className="text-center mb-5">
          <FaBookOpen className="fs-1 text-warning mb-3 aos-init aos-animate" />
          <h2 className="fw-bold display-6 text-uppercase">
            Book Report Management
          </h2>
          <p className="text-light opacity-75">
            Manage, track, and analyze your book reports with ease 📘
          </p>
        </div>

        {/* --- Form Section --- */}
        <div
          className="card shadow-lg border-0 mb-5"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
          }}
          data-aos="zoom-in"
        >
          <div className="card-body">
            <h5 className="card-title fw-bold mb-4 text-warning">
              {editingId ? "✏️ Edit Book Report" : "➕ Add New Book Report"}
            </h5>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="row g-3"
            >
              <div className="col-md-4">
                <label className="form-label fw-semibold">Book</label>
                <select
                  name="bookId"
                  value={formData.bookId}
                  onChange={(e) =>
                    handleChange(e.target.name, Number(e.target.value))
                  }
                  className="form-select bg-dark text-light border-secondary"
                  required
                >
                  <option value={0}>Select Book</option>
                  {books.map((b) => (
                    <option key={b.id} value={b.id}>
                      {b.title} | {b.author}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-8">
                <label className="form-label fw-semibold">Remarks</label>
                <input
                  type="text"
                  name="remarks"
                  value={formData.remarks}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control bg-dark text-light border-secondary"
                  placeholder="Enter remarks"
                  required
                />
              </div>

              {[
                { name: "issueCount", label: "Issued" },
                { name: "returnCount", label: "Returned" },
                { name: "lostCount", label: "Lost" },
                { name: "DamagedCount", label: "Damaged" },
              ].map((field, idx) => (
                <div className="col-md-3" key={idx}>
                  <label className="form-label fw-semibold">
                    {field.label}
                  </label>
                  <input
                    type="number"
                    name={field.name}
                    value={formData[field.name] || 0}
                    onChange={(e) =>
                      handleChange(e.target.name, Number(e.target.value))
                    }
                    className="form-control bg-dark text-light border-secondary"
                    min={0}
                  />
                </div>
              ))}

              <div className="col-12 mt-4 d-flex justify-content-start gap-3">
                <button
                  type="submit"
                  className="btn btn-warning text-dark fw-semibold px-4 shadow"
                  data-aos="fade-right"
                >
                  <FaPlusCircle className="me-2" />
                  {editingId ? "Update Report" : "Add Report"}
                </button>

                {editingId && (
                  <button
                    type="button"
                    className="btn btn-outline-light fw-semibold px-4"
                    onClick={resetForm}
                    data-aos="fade-left"
                  >
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* --- Table Section --- */}
        <div
          className="card shadow-lg border-0"
          style={{
            background: "rgba(255, 255, 255, 0.1)",
            backdropFilter: "blur(12px)",
            borderRadius: "16px",
          }}
          data-aos="fade-up"
        >
          <div className="card-body">
            <h5 className="card-title fw-bold text-warning mb-4">
              📋 Book Reports List
            </h5>
            <div className="table-responsive">
              <table className="table table-hover table-bordered align-middle mb-0">
                <thead
                  className="table-dark text-center"
                  style={{ background: "#111827" }}
                >
                  <tr>
                    <th>ID</th>
                    <th>Book</th>
                    <th>Issued</th>
                    <th>Returned</th>
                    <th>Lost</th>
                    <th>Damaged</th>
                    <th>Report Date</th>
                    <th>Remarks</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  {reports.length > 0 ? (
                    reports.map((r) => (
                      <tr key={r.id} data-aos="zoom-in-up">
                        <td>{r.id}</td>
                        <td className="fw-semibold text-info">
                          {r.book?.title || "N/A"}
                        </td>
                        <td>{r.issueCount}</td>
                        <td>{r.returnCount}</td>
                        <td>{r.lostCount}</td>
                        <td>{r.DamagedCount}</td>
                        <td>
                          {r.reportDate
                            ? new Date(r.reportDate).toLocaleString()
                            : "N/A"}
                        </td>
                        <td>{r.remarks}</td>
                        <td>
                          <div className="d-flex justify-content-center gap-2">
                            <button
                              className="btn btn-sm btn-outline-warning"
                              onClick={() => handleEdit(r)}
                            >
                              <FaEdit className="me-1" /> Edit
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(r.id)}
                            >
                              <FaTrashAlt className="me-1" /> Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={9} className="text-center text-light py-3">
                        No book reports found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .table-hover tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transition: background-color 0.3s ease;
        }
        .btn {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 4px 10px rgba(255, 255, 255, 0.3);
        }
      `}</style>
    </div>
  );
}
