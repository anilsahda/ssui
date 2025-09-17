"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Page() {
  const [roles, setRoles] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [roleName, setRoleName] = useState("");
  const [editId, setEditId] = useState(null);

  // ✅ Fetch roles on page load
  useEffect(() => {
    fetchRoles();
  }, []);

  const fetchRoles = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Roles/GetRoles");
      setRoles(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch roles", "error");
    }
  };

  // ✅ Add / Update role
  const handleSave = async () => {
    try {
      if (editId) {
        await axios.put("https://localhost:7024/api/Roles/UpdateRole", { id: editId, name: roleName });
        Swal.fire("Updated!", "Role has been updated.", "success");
      } else {
        await axios.post("https://localhost:7024/api/Roles/AddRole", { name: roleName });
        Swal.fire("Added!", "Role has been added.", "success");
      }
      setRoleName("");
      setEditId(null);
      setShowModal(false);
      fetchRoles();
    } catch (err) {
      Swal.fire("Error", "Failed to save role", "error");
    }
  };

  // ✅ Edit role (open modal with data)
  const handleEdit = (role) => {
    setEditId(role.id);
    setRoleName(role.name);
    setShowModal(true);
  };

  // ✅ Delete role with SweetAlert2 confirmation
  const handleDelete = async (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await axios.delete(`https://localhost:7024/api/Roles/${id}`);
          Swal.fire("Deleted!", "Role has been deleted.", "success");
          fetchRoles();
        } catch (err) {
          Swal.fire("Error", "Failed to delete role", "error");
        }
      }
    });
  };

  // ✅ View role details with SweetAlert2
  const handleView = (role) => {
    Swal.fire({
      title: "Role Details",
      html: `<strong>ID:</strong> ${role.id}<br/><strong>Name:</strong> ${role.name}`,
      icon: "info",
    });
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 m-0">Manage Role</h1>
        <button className="btn btn-primary" onClick={() => {
            setEditId(null);
            setRoleName("");
            setShowModal(true);
          }}> + Add Role</button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {roles.length > 0 ? (
            roles.map((role) => (
              <tr key={role.id}>
                <td>{role.id}</td>
                <td>{role.name}</td>
                <td>
                  <button className="btn btn-warning me-1" onClick={() => handleEdit(role)}>Edit</button>
                  <button className="btn btn-danger me-1" onClick={() => handleDelete(role.id)}>Delete</button>
                  <button className="btn btn-success" onClick={() => handleView(role)}>View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="3" className="text-center">No roles found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{editId ? "Edit Role" : "Add Role"}</h5>
                <button type="button" className="btn-close btn-close-white" onClick={() => setShowModal(false)}></button>
              </div>

              {/* Body */}
              <div className="modal-body">
                <input type="text" placeholder="Enter Role" className="form-control mb-3" value={roleName} onChange={(e) => setRoleName(e.target.value)} />
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Close</button>
                <button className="btn btn-primary" onClick={handleSave}>{editId ? "Update" : "Save"}</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
