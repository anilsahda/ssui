"use client";

import React, { useEffect } from "react";
import { useBranchStore } from "@/store/branchStore";
import "bootstrap/dist/css/bootstrap.min.css";

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
  }, [fetchBranches]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">🏫 Branch Management</h2>

      {/* ✅ Branch Form */}
      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          {isEditing ? "Edit Branch" : "Add New Branch"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Branch Name</label>
                <input
                  type="text"
                  name="branchName"
                  value={formData.branchName}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                  placeholder="Enter branch name"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  className="form-control"
                  placeholder="Enter address"
                  required
                />
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-2">
                {isEditing ? "Update Branch" : "Add Branch"}
              </button>
              {isEditing && (
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

      {/* ✅ Branch List */}
      <div className="card shadow-sm">
        <div className="card-header bg-dark text-white">Branch List</div>
        <div className="card-body">
          {branches.length === 0 ? (
            <p className="text-muted text-center">No branches available</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle">
                <thead className="table-light">
                  <tr>
                    <th>ID</th>
                    <th>Branch Name</th>
                    <th>Address</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {branches.map((b) => (
                    <tr key={b.id}>
                      <td>{b.id}</td>
                      <td>{b.branchName}</td>
                      <td>{b.address}</td>
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(b)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(b.id)}
                        >
                          Delete
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
  );
}
