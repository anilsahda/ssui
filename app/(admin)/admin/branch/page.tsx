"use client";

import React, { useEffect } from "react";
import { useBranchStore } from "@/store/branchStore";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBuilding,
  FaEdit,
  FaTrash,
  FaPlusCircle,
  FaSyncAlt,
} from "react-icons/fa";

export default function BranchPage() {
  const {
    branches,
    formData,
    isEditing,
    fetchBranches,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useBranchStore();

  useEffect(() => {
    fetchBranches();
    AOS.init({ duration: 900, easing: "ease-in-out", once: true });
  }, [fetchBranches]);

  return (
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #007bff, #6610f2, #20c997)",
        backgroundSize: "400% 400%",
        animation: "gradientShift 14s ease infinite",
      }}
    >
      <div className="container">
        {/* ✅ Title Section */}
        <div className="text-center text-white mb-5" data-aos="fade-down">
          <h1 className="fw-bold display-5 text-uppercase letter-spacing-wide">
            <FaBuilding className="me-2 mb-2" />
            Branch Management
          </h1>
          <p className="lead text-light fst-italic">
            Organize and manage your branches efficiently 🏢
          </p>
        </div>

        {/* ✅ Branch Form */}
        <div
          className="card shadow-lg border-0 mb-5"
          style={{
            borderRadius: "20px",
            background: "rgba(255, 255, 255, 0.97)",
            backdropFilter: "blur(6px)",
          }}
          data-aos="zoom-in"
        >
          <div
            className="card-header text-white fw-bold"
            style={{
              background: "linear-gradient(90deg, #007bff, #6610f2, #20c997)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            {isEditing ? "✏️ Edit Branch" : "➕ Add New Branch"}
          </div>

          <div className="card-body p-4">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <div className="row g-4">
                <div className="col-md-6" data-aos="fade-right">
                  <label className="form-label fw-semibold">Branch Name</label>
                  <input
                    type="text"
                    name="branchName"
                    value={formData.branchName}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="form-control form-control-lg shadow-sm"
                    placeholder="Enter branch name"
                    required
                  />
                </div>

                <div className="col-md-6" data-aos="fade-left">
                  <label className="form-label fw-semibold">Address</label>
                  <input
                    type="text"
                    name="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="form-control form-control-lg shadow-sm"
                    placeholder="Enter address"
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
                  {isEditing ? "Update Branch" : "Add Branch"}
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

        {/* ✅ Branch List Table */}
        <div
          className="card shadow-lg border-0"
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
              background: "linear-gradient(90deg, #212529, #343a40, #495057)",
              borderTopLeftRadius: "20px",
              borderTopRightRadius: "20px",
            }}
          >
            📋 Branch List
          </div>

          <div className="card-body">
            {branches.length === 0 ? (
              <p className="text-muted text-center py-3">
                No branches available 🏙️
              </p>
            ) : (
              <div className="table-responsive">
                <table className="table table-hover align-middle text-center shadow-sm">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Branch Name</th>
                      <th>Address</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {branches.map((b, i) => (
                      <tr key={b.id} data-aos="fade-up" data-aos-delay={i * 80}>
                        <td>{b.id}</td>
                        <td className="fw-semibold text-primary">
                          {b.branchName}
                        </td>
                        <td>{b.address}</td>
                        <td>
                          <button
                            className="btn btn-warning btn-sm me-2 rounded-circle shadow-sm"
                            onClick={() => handleEdit(b)}
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-danger btn-sm rounded-circle shadow-sm"
                            onClick={() => handleDelete(b.id)}
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
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
        }

        .table-hover tbody tr:hover {
          background-color: rgba(13, 110, 253, 0.08);
          transition: all 0.3s ease;
        }

        .letter-spacing-wide {
          letter-spacing: 1.2px;
        }
      `}</style>
    </div>
  );
}
