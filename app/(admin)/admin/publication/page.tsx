"use client";

import React, { useEffect } from "react";
import { usePublicationStore } from "@/store/publicationStore";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaNewspaper,
  FaEnvelope,
} from "react-icons/fa";

export default function PublicationPage() {
  const {
    publications,
    formData,
    editingId,
    fetchPublications,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = usePublicationStore();

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchPublications();
  }, [fetchPublications]);

  return (
    <div className="container my-5">
      {/* Header */}
      <div
        className="text-center py-4 mb-5 rounded-4 shadow-lg text-white"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
        data-aos="fade-down"
      >
        <h2 className="fw-bold display-6 mb-2">
          <FaNewspaper className="me-2" />
          Publication Management
        </h2>
        <p className="text-light mb-0">
          Manage and organize your publications efficiently.
        </p>
      </div>

      {/* Form Section */}
      <div className="card shadow-lg border-0 mb-5" data-aos="zoom-in-up">
        <div className="card-body p-4">
          <h5 className="card-title fw-semibold mb-4 text-primary">
            {editingId ? "✏️ Edit Publication" : "➕ Add New Publication"}
          </h5>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">
                  Publication Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Enter publication name"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Publisher</label>
                <input
                  type="text"
                  name="publisher"
                  value={formData.publisher}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control form-control-lg"
                  placeholder="Enter publisher name"
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Contact Email</label>
                <div className="input-group">
                  <span className="input-group-text bg-light">
                    <FaEnvelope />
                  </span>
                  <input
                    type="email"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={(e) =>
                      handleChange(e.target.name, e.target.value)
                    }
                    className="form-control form-control-lg"
                    placeholder="Enter contact email"
                    required
                  />
                </div>
              </div>
            </div>

            <div className="mt-4">
              <button
                type="submit"
                className={`btn btn-lg ${
                  editingId ? "btn-warning" : "btn-success"
                } me-3 shadow-sm`}
              >
                {editingId ? (
                  <>
                    <FaEdit className="me-2" /> Update Publication
                  </>
                ) : (
                  <>
                    <FaPlusCircle className="me-2" /> Add Publication
                  </>
                )}
              </button>
              {editingId && (
                <button
                  type="button"
                  className="btn btn-secondary btn-lg shadow-sm"
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
        className="card shadow-lg border-0"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="card-body p-4">
          <div className="d-flex justify-content-between align-items-center mb-3">
            <h5 className="fw-semibold mb-0 text-dark">📋 Publications List</h5>
            <span className="badge bg-primary rounded-pill fs-6">
              {publications.length} Total
            </span>
          </div>

          <div className="table-responsive">
            <table className="table table-hover align-middle table-bordered">
              <thead className="table-dark text-center">
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Name</th>
                  <th scope="col">Publisher</th>
                  <th scope="col">Contact Email</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>
                {publications.length > 0 ? (
                  publications.map((p, index) => (
                    <tr
                      key={p.id}
                      data-aos="fade-up"
                      data-aos-delay={index * 100}
                    >
                      <td className="text-center fw-bold">{p.id}</td>
                      <td>{p.name}</td>
                      <td>{p.publisher}</td>
                      <td>{p.contactEmail}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-warning me-2"
                          onClick={() => handleEdit(p)}
                        >
                          <FaEdit className="me-1" /> Edit
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(p.id)}
                        >
                          <FaTrashAlt className="me-1" /> Delete
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={5} className="text-center py-3 text-muted">
                      No publications found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
