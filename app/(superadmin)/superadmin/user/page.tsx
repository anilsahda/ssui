"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUserPlus,
  FaUserEdit,
  FaTrashAlt,
  FaEye,
  FaUsers,
} from "react-icons/fa";

export default function ManageUserPage() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="manage-user-container py-5">
      {/* Header Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="fw-bold text-gradient mb-2">
          <FaUsers className="me-2" />
          Manage Users
        </h1>
        <p className="text-muted">
          Add, update, and manage user details efficiently.
        </p>
        <div className="divider mx-auto"></div>
      </div>

      {/* User Form */}
      <div
        className="card shadow-lg border-0 glass-card mb-5 p-4 rounded-4"
        data-aos="zoom-in"
      >
        <h5 className="fw-semibold text-primary mb-4">
          <FaUserPlus className="me-2" /> Add New User
        </h5>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="text"
              placeholder="Enter Name"
              className="form-control form-control-lg rounded-pill"
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="text"
              placeholder="Enter Mobile"
              className="form-control form-control-lg rounded-pill"
            />
          </div>
        </div>

        <div className="row">
          <div className="col-md-6 mb-3">
            <input
              type="email"
              placeholder="Enter Email"
              className="form-control form-control-lg rounded-pill"
            />
          </div>
          <div className="col-md-6 mb-3">
            <input
              type="password"
              placeholder="Enter Password"
              className="form-control form-control-lg rounded-pill"
            />
          </div>
        </div>

        <div className="text-end">
          <button className="btn btn-primary rounded-pill px-4 shadow-sm">
            <FaUserPlus className="me-2" /> Add User
          </button>
        </div>
      </div>

      {/* User Table */}
      <div
        className="card border-0 shadow-lg glass-card p-3 rounded-4"
        data-aos="fade-up"
      >
        <h5 className="fw-semibold text-secondary mb-4">
          <FaUsers className="me-2" />
          User List
        </h5>

        <div className="table-responsive">
          <table className="table align-middle table-hover">
            <thead className="table-primary text-center">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Mobile</th>
                <th>Email</th>
                <th>Password</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {[
                {
                  id: 1,
                  name: "Philip",
                  mobile: "9999999999",
                  email: "philip@gmail.com",
                  password: "Philip@121",
                },
                {
                  id: 2,
                  name: "John",
                  mobile: "9999999999",
                  email: "john@gmail.com",
                  password: "John@121",
                },
                {
                  id: 3,
                  name: "Paul",
                  mobile: "9999999999",
                  email: "paul@gmail.com",
                  password: "Paul@121",
                },
              ].map((user, index) => (
                <tr key={index} data-aos="fade-up" data-aos-delay={index * 100}>
                  <td>{user.id}</td>
                  <td>{user.name}</td>
                  <td>{user.mobile}</td>
                  <td>{user.email}</td>
                  <td>{user.password}</td>
                  <td>
                    <button className="btn btn-warning btn-sm rounded-pill me-2">
                      <FaUserEdit />
                    </button>
                    <button className="btn btn-danger btn-sm rounded-pill me-2">
                      <FaTrashAlt />
                    </button>
                    <button className="btn btn-success btn-sm rounded-pill">
                      <FaEye />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="text-center mt-5 text-secondary small" data-aos="fade-up">
        © 2025 User Management | Built with ❤️ using Bootstrap & AOS
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .manage-user-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #eef2ff, #dbeafe, #e0f2fe);
          animation: gradientShift 12s ease infinite;
          background-size: 400% 400%;
        }

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

        .text-gradient {
          background: linear-gradient(90deg, #007bff, #6610f2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .divider {
          width: 120px;
          height: 4px;
          background: linear-gradient(90deg, #007bff, #6610f2);
          border-radius: 2px;
          margin-top: 10px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(8px);
          border-radius: 1rem;
        }

        .form-control:focus {
          border-color: #007bff;
          box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.2);
        }

        table thead {
          border-radius: 0.75rem;
        }

        table tbody tr:hover {
          background-color: rgba(0, 123, 255, 0.05);
          transition: background-color 0.3s ease;
        }
      `}</style>
    </div>
  );
}
