"use client";

import React, { useEffect } from "react";
import { usePublicationStore } from "@/store/publicationStore";
import "bootstrap/dist/css/bootstrap.min.css";

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
    fetchPublications();
  }, [fetchPublications]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">🏢 Publication Management</h2>

      {/* Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? "✏️ Edit Publication" : "➕ Add New Publication"}
          </h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="mb-3">
              <label className="form-label">Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                placeholder="Enter publication name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Publisher</label>
              <input
                type="text"
                name="publisher"
                value={formData.publisher}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                placeholder="Enter publisher name"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Contact Email</label>
              <input
                type="email"
                name="contactEmail"
                value={formData.contactEmail}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="form-control"
                placeholder="Enter contact email"
                required
              />
            </div>

            <div>
              <button type="submit" className="btn btn-success me-2">
                {editingId ? "Update Publication" : "Add Publication"}
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

      {/* Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">📋 Publications List</h5>
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Publisher</th>
                <th>Contact Email</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {publications.length > 0 ? (
                publications.map((p) => (
                  <tr key={p.id}>
                    <td>{p.id}</td>
                    <td>{p.name}</td>
                    <td>{p.publisher}</td>
                    <td>{p.contactEmail}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(p.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No publications found.
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
