"use client";

import React, { useEffect } from "react";
import { useIssueBookStore } from "@/store/issueBookStore";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBook,
  FaUserGraduate,
  FaCalendarAlt,
  FaPlusCircle,
  FaSyncAlt,
  FaEdit,
  FaTrash,
  FaClipboardList,
} from "react-icons/fa";

export default function IssueBooksPage() {
  const {
    issues,
    books,
    students,
    formData,
    isEditing,
    fetchIssues,
    fetchBooksAndStudents,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useIssueBookStore();

  useEffect(() => {
    fetchIssues();
    fetchBooksAndStudents();
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, [fetchIssues, fetchBooksAndStudents]);

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6f42c1, #20c997)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 15s ease infinite",
      }}
    >
      <div className="container">
        {/* ✅ Title Section */}
        <div
          className="text-center text-white mb-5"
          data-aos="fade-down"
          data-aos-delay="100"
        >
          <h1 className="fw-bold display-5 text-uppercase letter-spacing-wide mb-3">
            <FaClipboardList className="me-2 mb-2" />
            Issue Book Management
          </h1>
          <p className="lead text-light opacity-75 fst-italic">
            Manage all issued books and returns seamlessly 📚
          </p>
        </div>

        {/* ✅ Form Section */}
        <div
          className="card shadow-lg border-0 mb-5"
          style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(8px)",
          }}
          data-aos="zoom-in"
        >
          <div
            className="card-header text-white fw-bold py-3"
            style={{
              background:
                "linear-gradient(90deg, #0d6efd, #6610f2, #20c997, #6f42c1)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            {isEditing ? "✏️ Edit Issued Book" : "➕ Issue New Book"}
          </div>

          <div className="card-body p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="row g-4">
                {/* Book Dropdown */}
                <div className="col-md-4" data-aos="fade-right">
                  <label className="form-label fw-semibold">
                    <FaBook className="me-2 text-primary" />
                    Select Book
                  </label>
                  <select
                    name="bookId"
                    value={formData.bookId}
                    onChange={(e) =>
                      handleChange(
                        e.target.name,
                        e.target.value,
                        e.target.type,
                        e.target.checked
                      )
                    }
                    className="form-select form-select-lg shadow-sm"
                    required
                  >
                    <option value={0}>Select Book</option>
                    {books.map((b) => (
                      <option key={b.id} value={b.id}>
                        {b.title} — {b.author}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Student Dropdown */}
                <div className="col-md-4" data-aos="fade-up">
                  <label className="form-label fw-semibold">
                    <FaUserGraduate className="me-2 text-success" />
                    Select Student
                  </label>
                  <select
                    name="studentId"
                    value={formData.studentId}
                    onChange={(e) =>
                      handleChange(
                        e.target.name,
                        e.target.value,
                        e.target.type,
                        e.target.checked
                      )
                    }
                    className="form-select form-select-lg shadow-sm"
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

                {/* Issue Date */}
                <div className="col-md-4" data-aos="fade-left">
                  <label className="form-label fw-semibold">
                    <FaCalendarAlt className="me-2 text-danger" />
                    Issue Date
                  </label>
                  <input
                    type="date"
                    name="issueDate"
                    value={formData.issueDate || ""}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="form-control form-control-lg shadow-sm"
                    required
                  />
                </div>

                {/* Due Date */}
                <div className="col-md-4" data-aos="fade-right">
                  <label className="form-label fw-semibold">Due Date</label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate || ""}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="form-control form-control-lg shadow-sm"
                  />
                </div>

                {/* Returned Checkbox */}
                <div
                  className="col-md-4 d-flex align-items-center"
                  data-aos="fade-up"
                >
                  <div className="form-check mt-3">
                    <input
                      type="checkbox"
                      name="isReturned"
                      checked={formData.isReturned}
                      onChange={(e) =>
                        handleChange(
                          e.target.name,
                          e.target.value,
                          e.target.type,
                          e.target.checked
                        )
                      }
                      className="form-check-input"
                      id="isReturned"
                    />
                    <label
                      htmlFor="isReturned"
                      className="form-check-label ms-2 fw-semibold"
                    >
                      Returned
                    </label>
                  </div>
                </div>
              </div>

              {/* Buttons */}
              <div
                className="text-end mt-4"
                data-aos="zoom-in-up"
                data-aos-delay="200"
              >
                <button
                  type="submit"
                  className="btn btn-gradient-primary me-2 rounded-pill px-4 py-2 shadow-lg"
                >
                  <FaPlusCircle className="me-2" />
                  {isEditing ? "Update Record" : "Issue Book"}
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

        {/* ✅ Table Section */}
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
            className="card-header text-white fw-bold py-3"
            style={{
              background:
                "linear-gradient(90deg, #212529, #343a40, #495057, #6c757d)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            📋 Issued Books List
          </div>

          <div className="card-body">
            {issues.length === 0 ? (
              <p className="text-muted text-center py-4 mb-0 fs-5">
                No issued books available 📖
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center shadow-sm rounded">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Book</th>
                      <th>Student</th>
                      <th>Issue Date</th>
                      <th>Due Date</th>
                      <th>Returned?</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {issues.map((i, idx) => (
                      <tr
                        key={i.id}
                        data-aos="fade-up"
                        data-aos-delay={idx * 80}
                        className="table-row-hover"
                      >
                        <td>{i.id}</td>
                        <td className="fw-semibold text-primary">
                          {i.book?.title || "N/A"}
                        </td>
                        <td className="fw-semibold text-success">
                          {i.student?.fullName || "N/A"}
                        </td>
                        <td>
                          {i.issueDate
                            ? new Date(i.issueDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          {i.dueDate
                            ? new Date(i.dueDate).toLocaleDateString()
                            : "N/A"}
                        </td>
                        <td>
                          {i.isReturned ? (
                            <span className="text-success fw-bold">✅ Yes</span>
                          ) : (
                            <span className="text-danger fw-bold">❌ No</span>
                          )}
                        </td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2 rounded-circle shadow-sm"
                            onClick={() => handleEdit(i)}
                            title="Edit"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm rounded-circle shadow-sm"
                            onClick={() => handleDelete(i.id)}
                            title="Delete"
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

      {/* ✅ Custom Styles */}
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
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(0, 0, 0, 0.2);
        }

        .table-hover tbody tr:hover {
          background-color: rgba(13, 110, 253, 0.1);
          transform: scale(1.01);
          transition: all 0.25s ease;
        }

        .letter-spacing-wide {
          letter-spacing: 1.2px;
        }

        .table-row-hover {
          transition: all 0.3s ease;
        }
      `}</style>
    </div>
  );
}
