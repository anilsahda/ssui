"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import { useBookReportStore } from "@/store/bookReportStore";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBookOpen,
  FaEdit,
  FaTrash,
  FaPlusCircle,
  FaSyncAlt,
} from "react-icons/fa";

export default function BookReportsPage() {
  const {
    reports,
    books,
    formData,
    isEditing,
    fetchReports,
    fetchBooks,
    setFormData,
    resetForm,
    handleSubmit,
    handleEdit,
    handleDelete,
  } = useBookReportStore();

  useEffect(() => {
    fetchReports();
    fetchBooks();
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, [fetchReports, fetchBooks]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      [name]:
        name === "bookId" ||
        name === "issueCount" ||
        name === "returnCount" ||
        name === "lostCount"
          ? Number(value)
          : value,
    });
  };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    handleSubmit();
  };

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background:
          "linear-gradient(135deg, #007bff, #6610f2, #20c997, #0dcaf0)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      <div className="container">
        {/* ✅ Header Section */}
        <div className="text-center text-white mb-5" data-aos="fade-down">
          <h1 className="fw-bold display-5 text-uppercase letter-spacing-wide">
            <FaBookOpen className="me-2 mb-2" />
            Book Reports Management
          </h1>
          <p className="lead text-light fst-italic">
            Track, manage, and visualize your book performance effortlessly 📚
          </p>
        </div>

        {/* ✅ Report Form */}
        <div
          className="card shadow-lg border-0 mb-5"
          style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(5px)",
          }}
          data-aos="fade-up"
        >
          <div
            className="card-header text-white fw-bold"
            style={{
              background:
                "linear-gradient(90deg, #007bff, #6f42c1, #20c997, #0dcaf0)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
              boxShadow: "0 2px 10px rgba(0,0,0,0.15)",
            }}
          >
            {isEditing ? "✏️ Edit Book Report" : "➕ Add New Book Report"}
          </div>

          <div className="card-body">
            <form onSubmit={onSubmit} className="p-2">
              <div className="row g-4">
                <div className="col-md-6" data-aos="fade-right">
                  <label className="form-label fw-semibold">Book</label>
                  <select
                    name="bookId"
                    value={formData.bookId}
                    onChange={handleChange}
                    className="form-select form-select-lg shadow-sm"
                    required
                  >
                    <option value={0}>Select Book</option>
                    {Array.isArray(books) &&
                      books.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.title} by {b.author}
                        </option>
                      ))}
                  </select>
                </div>

                <div className="col-md-6" data-aos="fade-left">
                  <label className="form-label fw-semibold">
                    Report Details
                  </label>
                  <textarea
                    name="reportDetails"
                    value={formData.reportDetails}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    placeholder="Enter detailed report..."
                    rows={2}
                    required
                  />
                </div>

                <div
                  className="col-md-4"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <label className="form-label fw-semibold">Issue Count</label>
                  <input
                    type="number"
                    name="issueCount"
                    value={formData.issueCount}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    required
                  />
                </div>

                <div
                  className="col-md-4"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <label className="form-label fw-semibold">Return Count</label>
                  <input
                    type="number"
                    name="returnCount"
                    value={formData.returnCount}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    required
                  />
                </div>

                <div
                  className="col-md-4"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <label className="form-label fw-semibold">Lost Count</label>
                  <input
                    type="number"
                    name="lostCount"
                    value={formData.lostCount}
                    onChange={handleChange}
                    className="form-control shadow-sm"
                    required
                  />
                </div>
              </div>

              <div className="text-end mt-4" data-aos="zoom-in-up">
                <button
                  type="submit"
                  className="btn btn-gradient-primary me-2 rounded-pill px-4 py-2 shadow-lg"
                >
                  <FaPlusCircle className="me-2" />
                  {isEditing ? "Update Report" : "Add Report"}
                </button>
                {isEditing && (
                  <button
                    type="button"
                    className="btn btn-outline-dark rounded-pill px-4 py-2 shadow-sm"
                    onClick={resetForm}
                  >
                    <FaSyncAlt className="me-2" /> Cancel
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>

        {/* ✅ Reports Table */}
        <div
          className="card shadow-lg border-0"
          style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(6px)",
          }}
          data-aos="fade-up"
        >
          <div
            className="card-header text-white fw-bold"
            style={{
              background: "linear-gradient(90deg, #212529, #343a40, #495057)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            📘 Book Reports List
          </div>

          <div className="card-body">
            {reports.length === 0 ? (
              <p className="text-muted text-center py-3">
                No reports available yet 📄
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Book Title</th>
                      <th>Author</th>
                      <th>Details</th>
                      <th>Issued</th>
                      <th>Returned</th>
                      <th>Lost</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reports.map((r, i) => (
                      <tr key={r.id} data-aos="fade-up" data-aos-delay={i * 60}>
                        <td>{r.id}</td>
                        <td className="fw-semibold text-primary">
                          {r.book?.title || "N/A"}
                        </td>
                        <td>{r.book?.author || "N/A"}</td>
                        <td>{r.reportDetails}</td>
                        <td className="text-success fw-bold">{r.issueCount}</td>
                        <td className="text-info fw-bold">{r.returnCount}</td>
                        <td className="text-danger fw-bold">{r.lostCount}</td>
                        <td>
                          {r.reportDate
                            ? new Date(r.reportDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          <button
                            className="btn btn-sm btn-warning me-2 rounded-circle shadow-sm"
                            onClick={() => handleEdit(r)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-danger rounded-circle shadow-sm"
                            onClick={() => handleDelete(r.id)}
                          >
                            <FaTrash />
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

      {/* ✅ Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .btn-gradient-primary {
          background: linear-gradient(90deg, #007bff, #6610f2, #20c997);
          color: white;
          border: none;
          transition: all 0.3s ease;
        }

        .btn-gradient-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .table-hover tbody tr:hover {
          background-color: rgba(13, 110, 253, 0.08);
          transition: all 0.3s ease;
        }

        .letter-spacing-wide {
          letter-spacing: 1.5px;
        }
      `}</style>
    </div>
  );
}
