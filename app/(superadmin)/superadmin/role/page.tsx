"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaEye, FaPlus } from "react-icons/fa";

export default function ManageRolePage() {
  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  return (
    <div className="container py-5">
      {/* Header */}
      <div
        className="text-center mb-5"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <h2 className="fw-bold text-primary mb-2">⚙️ Manage Roles</h2>
        <p className="text-muted">
          Create, edit, or remove user roles with ease.
        </p>
      </div>

      {/* Role Form Section */}
      <div
        className="card shadow-lg border-0 mb-5"
        data-aos="zoom-in"
        data-aos-delay="200"
      >
        <div
          className="card-header text-white"
          style={{
            background: "linear-gradient(90deg, #0d6efd, #00bcd4)",
          }}
        >
          <h5 className="m-0 fw-semibold">Add or Update Role</h5>
        </div>
        <div className="card-body p-4">
          <div className="row align-items-center">
            <div className="col-md-8 mb-3 mb-md-0">
              <input
                type="text"
                placeholder="Enter Role Name"
                className="form-control form-control-lg shadow-sm"
              />
            </div>
            <div className="col-md-4 text-md-end text-center">
              <button className="btn btn-primary btn-lg shadow-sm d-flex align-items-center gap-2 mx-auto">
                <FaPlus /> Add Role
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Role Table Section */}
      <div
        className="card shadow-lg border-0"
        data-aos="fade-up"
        data-aos-delay="300"
      >
        <div
          className="card-header text-white d-flex justify-content-between align-items-center"
          style={{
            background: "linear-gradient(90deg, #6a11cb, #2575fc)",
          }}
        >
          <h5 className="m-0 fw-semibold">Existing Roles</h5>
          <span className="badge bg-light text-dark px-3 py-2">Total: 3</span>
        </div>
        <div className="card-body p-0">
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead className="table-light">
                <tr>
                  <th style={{ width: "10%" }}>#</th>
                  <th>Role Name</th>
                  <th style={{ width: "25%" }} className="text-center">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody>
                {[
                  { id: 1, name: "Super Admin" },
                  { id: 2, name: "Admin" },
                  { id: 3, name: "User" },
                ].map((role) => (
                  <tr key={role.id} data-aos="fade-up" data-aos-delay="400">
                    <td>{role.id}</td>
                    <td className="fw-semibold">{role.name}</td>
                    <td className="text-center">
                      <button className="btn btn-sm btn-warning me-2 shadow-sm d-inline-flex align-items-center gap-1">
                        <FaEdit /> Edit
                      </button>
                      <button className="btn btn-sm btn-danger me-2 shadow-sm d-inline-flex align-items-center gap-1">
                        <FaTrash /> Delete
                      </button>
                      <button className="btn btn-sm btn-success shadow-sm d-inline-flex align-items-center gap-1">
                        <FaEye /> View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Table Footer */}
        <div className="card-footer text-muted text-center small">
          Last updated: <strong>{new Date().toLocaleDateString()}</strong>
        </div>
      </div>
    </div>
  );
}
