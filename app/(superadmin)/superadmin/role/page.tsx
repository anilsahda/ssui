"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPlusCircle,
  FaEdit,
  FaTrashAlt,
  FaEye,
  FaUserShield,
  FaSearch,
} from "react-icons/fa";

export default function Page() {
  const [roles, setRoles] = useState([]);
  const [filteredRoles, setFilteredRoles] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Roles/GetRoles");
      setRoles(res.data);
      setFilteredRoles(res.data);
    } catch {
      Swal.fire("Error", "Failed to fetch roles", "error");
    }
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
    const filtered = roles.filter((r) =>
      r.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilteredRoles(filtered);
  };

  const handleSave = async () => {
    if (!roleName.trim()) {
      Swal.fire("Warning", "Role name cannot be empty", "warning");
      return;
    }
    try {
      if (editId) {
        await axios.put("https://localhost:7024/api/Roles/UpdateRole", {
          id: editId,
          name: roleName,
        });
        Swal.fire("Updated!", "Role updated successfully.", "success");
      } else {
        await axios.post("https://localhost:7024/api/Roles/AddRole", {
          name: roleName,
        });
        Swal.fire("Added!", "New role created.", "success");
      }
      setRoleName("");
      setEditId(null);
      setShowModal(false);
      fetchRoles();
    } catch {
      Swal.fire("Error", "Failed to save role", "error");
    }
  };

  const handleEdit = (role: any) => {
    setEditId(role.id);
    setRoleName(role.name);
    setShowModal(true);
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This role will be permanently deleted.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://localhost:7024/api/Roles/${id}`);
          Swal.fire("Deleted!", "Role deleted successfully.", "success");
          fetchRoles();
        } catch {
          Swal.fire("Error", "Failed to delete role", "error");
        }
      }
    });
  };

  const handleView = (role: any) => {
    Swal.fire({
      title: `<h5 class="fw-bold text-primary">Role Details</h5>`,
      html: `<div class="text-start">
              <p><strong>ID:</strong> ${role.id}</p>
              <p><strong>Name:</strong> ${role.name}</p>
             </div>`,
      icon: "info",
      confirmButtonColor: "#0d6efd",
    });
  };

  return (
    <div
      className="container py-5"
      data-aos="fade-up"
      style={{
        background:
          "linear-gradient(135deg, rgba(255,255,255,0.95), rgba(245,247,250,0.9))",
        backdropFilter: "blur(15px)",
        borderRadius: "20px",
        boxShadow: "0 8px 25px rgba(0,0,0,0.1)",
      }}
    >
      {/* Header */}
      <div
        className="d-flex flex-wrap justify-content-between align-items-center mb-4 border-bottom pb-3"
        data-aos="fade-down"
      >
        <h2 className="fw-bold text-primary d-flex align-items-center gap-2">
          <FaUserShield /> Role Management
        </h2>

        <div className="d-flex align-items-center gap-2">
          <div className="input-group shadow-sm">
            <span className="input-group-text bg-primary text-white border-0">
              <FaSearch />
            </span>
            <input
              type="text"
              placeholder="Search roles..."
              className="form-control border-0"
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
            />
          </div>

          <button
            className="btn btn-primary d-flex align-items-center gap-2 shadow-sm px-3"
            onClick={() => {
              setEditId(null);
              setRoleName("");
              setShowModal(true);
            }}
          >
            <FaPlusCircle /> Add Role
          </button>
        </div>
      </div>

      {/* Table */}
      <div
        className="table-responsive shadow-sm rounded"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <table className="table table-hover align-middle text-center">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th style={{ width: "220px" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredRoles.length > 0 ? (
              filteredRoles.map((role, index) => (
                <tr
                  key={role.id}
                  data-aos="fade-up"
                  data-aos-delay={index * 100}
                  className="table-row"
                >
                  <td>
                    <span className="badge bg-light text-dark border">
                      {role.id}
                    </span>
                  </td>
                  <td className="fw-semibold">{role.name}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-2 shadow-sm action-btn"
                      onClick={() => handleEdit(role)}
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-2 shadow-sm action-btn"
                      onClick={() => handleDelete(role.id)}
                    >
                      <FaTrashAlt /> Delete
                    </button>
                    <button
                      className="btn btn-success btn-sm shadow-sm action-btn"
                      onClick={() => handleView(role)}
                    >
                      <FaEye /> View
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="3" className="text-muted py-4">
                  No roles found.
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
            <div
              className="modal-content border-0 shadow-lg rounded-4"
              data-aos="zoom-in"
            >
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title fw-semibold">
                  {editId ? "Edit Role" : "Add New Role"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              <div className="modal-body p-4">
                <input
                  type="text"
                  placeholder="Enter Role Name"
                  className="form-control form-control-lg shadow-sm"
                  value={roleName}
                  onChange={(e) => setRoleName(e.target.value)}
                />
              </div>

              <div className="modal-footer border-0">
                <button
                  className="btn btn-outline-secondary rounded-pill px-4"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button
                  className="btn btn-primary rounded-pill px-4 shadow-sm"
                  onClick={handleSave}
                >
                  {editId ? "Update" : "Save"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom CSS */}
      <style jsx global>{`
        .table-row:hover {
          background-color: #f8f9fa;
          transform: scale(1.01);
          transition: all 0.25s ease;
        }
        .action-btn {
          transition: transform 0.2s ease, box-shadow 0.2s ease;
        }
        .action-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 10px rgba(0, 0, 0, 0.15);
        }
        .modal-content {
          border: 2px solid rgba(13, 110, 253, 0.2);
        }
      `}</style>
    </div>
  );
}
