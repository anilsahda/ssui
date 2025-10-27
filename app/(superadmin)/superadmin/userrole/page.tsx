"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUserTag,
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaEye,
} from "react-icons/fa";

export default function Page() {
  const [userRoles, setUserRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Initialize AOS and fetch data
  useEffect(() => {
    AOS.init({ duration: 900, easing: "ease-out-cubic", once: true });
    fetchAll();
  }, []);

  const fetchAll = async () => {
    await Promise.all([fetchUserRoles(), fetchUsers(), fetchRoles()]);
  };

  const fetchUserRoles = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7071/api/UserRoles/GetUserRoles"
      );
      setUserRoles(res.data);
    } catch {
      Swal.fire("Error", "Failed to fetch user roles", "error");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Users/GetUsers");
      setUsers(res.data);
    } catch {
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Roles/GetRoles");
      setRoles(res.data);
    } catch {
      Swal.fire("Error", "Failed to fetch roles", "error");
    }
  };

  // ✅ Save / Update
  const handleSave = async () => {
    if (!selectedUser || !selectedRole) {
      Swal.fire("Warning", "Please select both User and Role", "warning");
      return;
    }
    try {
      if (editId) {
        await axios.put("https://localhost:7024/api/UserRoles/UpdateUserRole", {
          id: editId,
          userId: selectedUser,
          roleId: selectedRole,
        });
        Swal.fire("Updated!", "User role has been updated.", "success");
      } else {
        await axios.post("https://localhost:7024/api/UserRoles/AddUserRole", {
          userId: selectedUser,
          roleId: selectedRole,
        });
        Swal.fire("Added!", "Role assigned successfully.", "success");
      }
      setSelectedUser("");
      setSelectedRole("");
      setEditId(null);
      setShowModal(false);
      fetchUserRoles();
    } catch {
      Swal.fire("Error", "Failed to save user role", "error");
    }
  };

  const handleEdit = (ur) => {
    setEditId(ur.id);
    setSelectedUser(ur.userId);
    setSelectedRole(ur.roleId);
    setShowModal(true);
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This will remove the assigned role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://localhost:7024/api/UserRoles/${id}`);
          Swal.fire("Deleted!", "User role removed.", "success");
          fetchUserRoles();
        } catch {
          Swal.fire("Error", "Failed to delete user role", "error");
        }
      }
    });
  };

  const handleView = (ur) => {
    Swal.fire({
      title: `<h5 class='fw-bold text-primary'>User Role Details</h5>`,
      html: `
        <div class='text-start'>
          <p><strong>ID:</strong> ${ur.id}</p>
          <p><strong>User:</strong> ${
            users.find((u) => u.id === ur.userId)?.name || "Unknown"
          }</p>
          <p><strong>Role:</strong> ${
            roles.find((r) => r.id === ur.roleId)?.name || "Unknown"
          }</p>
        </div>`,
      icon: "info",
      confirmButtonColor: "#0d6efd",
    });
  };

  return (
    <div className="container py-5 position-relative">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-4 p-3 rounded shadow-sm"
        style={{
          background: "linear-gradient(90deg, #007bff, #6610f2)",
          color: "#fff",
        }}
        data-aos="fade-down"
      >
        <h3 className="m-0 d-flex align-items-center gap-2">
          <FaUserTag /> Manage User Roles
        </h3>
        <button
          className="btn btn-light btn-lg fw-semibold d-flex align-items-center gap-2 shadow-sm rounded-pill"
          onClick={() => {
            setEditId(null);
            setSelectedUser("");
            setSelectedRole("");
            setShowModal(true);
          }}
        >
          <FaPlusCircle /> Assign Role
        </button>
      </div>

      {/* Table */}
      <div
        className="table-responsive rounded-4 shadow-sm bg-white p-3"
        data-aos="fade-up"
      >
        <table className="table table-hover align-middle text-center mb-0">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>User</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {userRoles.length > 0 ? (
              userRoles.map((ur, i) => (
                <tr
                  key={ur.id}
                  data-aos="fade-up"
                  data-aos-delay={i * 80}
                  style={{ transition: "transform 0.3s ease" }}
                >
                  <td>{ur.id}</td>
                  <td>
                    {users.find((u) => u.id === ur.userId)?.name || "Unknown"}
                  </td>
                  <td>
                    {roles.find((r) => r.id === ur.roleId)?.name || "Unknown"}
                  </td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2 shadow-sm"
                      onClick={() => handleEdit(ur)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2 shadow-sm"
                      onClick={() => handleDelete(ur.id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                    <button
                      className="btn btn-success btn-sm shadow-sm"
                      onClick={() => handleView(ur)}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="py-4 text-muted">
                  No user roles found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content border-0 shadow-lg rounded-4">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {editId ? "Edit User Role" : "Assign New Role"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body p-4">
                <div className="mb-3">
                  <label className="form-label fw-semibold">Select User</label>
                  <select
                    className="form-select form-select-lg"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="">Choose User</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="form-label fw-semibold">Select Role</label>
                  <select
                    className="form-select form-select-lg"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">Choose Role</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary rounded-pill px-4"
                  onClick={handleSave}
                >
                  {editId ? "Update" : "Assign"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Floating Action Button for mobile */}
      <button
        className="btn btn-primary rounded-circle position-fixed bottom-0 end-0 m-4 shadow-lg d-lg-none"
        style={{ width: "60px", height: "60px", fontSize: "1.5rem" }}
        onClick={() => {
          setEditId(null);
          setSelectedUser("");
          setSelectedRole("");
          setShowModal(true);
        }}
        data-aos="zoom-in"
      >
        <FaPlusCircle />
      </button>

      <style jsx global>{`
        tr:hover {
          transform: scale(1.01);
          background: #f8f9fa !important;
        }
        .modal-content {
          animation: fadeZoom 0.4s ease;
        }
        @keyframes fadeZoom {
          from {
            transform: scale(0.8);
            opacity: 0;
          }
          to {
            transform: scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}
