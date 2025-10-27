"use client";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";

export default function ManageUserRolePage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="container my-5">
      <div
        className="card shadow-lg border-0 p-4"
        style={{ borderRadius: "15px" }}
        data-aos="fade-up"
      >
        <h2
          className="text-center mb-4 text-primary fw-bold"
          data-aos="zoom-in"
        >
          Manage User Roles
        </h2>

        {/* Form Section */}
        <div className="row justify-content-center" data-aos="fade-up">
          <div className="col-md-5 mb-3">
            <label className="form-label fw-semibold">Select User</label>
            <select className="form-select shadow-sm border-primary">
              <option>Select User</option>
              <option>Philip</option>
              <option>John</option>
              <option>Paul</option>
            </select>
          </div>

          <div className="col-md-5 mb-3">
            <label className="form-label fw-semibold">Select Role</label>
            <select className="form-select shadow-sm border-primary">
              <option>Select Role</option>
              <option>Super Admin</option>
              <option>Admin</option>
              <option>User</option>
            </select>
          </div>

          <div className="col-md-10 text-center mb-4">
            <button
              className="btn btn-primary px-5 py-2 mt-2 shadow-sm"
              data-aos="zoom-in"
            >
              Assign Role
            </button>
          </div>
        </div>

        {/* Table Section */}
        <div className="table-responsive" data-aos="fade-up">
          <table className="table align-middle table-hover table-striped">
            <thead className="table-primary">
              <tr>
                <th scope="col">ID</th>
                <th scope="col">User</th>
                <th scope="col">Role</th>
                <th scope="col" className="text-center">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {[
                { id: 1, user: "Philip", role: "Super Admin" },
                { id: 2, user: "John", role: "Admin" },
                { id: 3, user: "Paul", role: "User" },
              ].map((item, index) => (
                <tr
                  key={item.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 200}
                >
                  <td>{item.id}</td>
                  <td>{item.user}</td>
                  <td>
                    <span
                      className={`badge bg-${
                        item.role === "Super Admin"
                          ? "danger"
                          : item.role === "Admin"
                          ? "warning"
                          : "secondary"
                      }`}
                    >
                      {item.role}
                    </span>
                  </td>
                  <td className="text-center">
                    <button className="btn btn-outline-warning btn-sm me-2">
                      <FaEdit /> Edit
                    </button>
                    <button className="btn btn-outline-danger btn-sm me-2">
                      <FaTrashAlt /> Delete
                    </button>
                    <button className="btn btn-outline-success btn-sm">
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
