"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Page() {
  const [userRoles, setUserRoles] = useState([]);
  const [users, setUsers] = useState([]);
  const [roles, setRoles] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [editId, setEditId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // ✅ Fetch data on load
  useEffect(() => {
    fetchUserRoles();
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const res = await axios.get(
        "https://localhost:7071/api/UserRoles/GetUserRoles"
      );
      setUserRoles(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch user roles", "error");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Users/GetUsers");
      setUsers(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Roles/GetRoles");
      setRoles(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch roles", "error");
    }
  };

  // ✅ Add / Update UserRole
  const handleSave = async () => {
    if (!selectedUser || !selectedRole) {
      Swal.fire("Warning", "Please select both user and role", "warning");
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
        Swal.fire("Added!", "User role has been assigned.", "success");
      }
      setSelectedUser("");
      setSelectedRole("");
      setEditId(null);
      setShowModal(false);
      fetchUserRoles();
    } catch (err) {
      Swal.fire("Error", "Failed to save user role", "error");
    }
  };

  // ✅ Edit UserRole
  const handleEdit = (ur) => {
    setEditId(ur.id);
    setSelectedUser(ur.userId);
    setSelectedRole(ur.roleId);
    setShowModal(true);
  };

  // ✅ Delete UserRole
  const handleDelete = async (id) => {
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
          Swal.fire("Deleted!", "User role has been removed.", "success");
          fetchUserRoles();
        } catch (err) {
          Swal.fire("Error", "Failed to delete user role", "error");
        }
      }
    });
  };

  // ✅ View UserRole
  const handleView = (ur) => {
    Swal.fire({
      title: "User Role Details",
      html: `<strong>ID:</strong> ${ur.id}<br/>
             <strong>User:</strong> ${ur.userName}<br/>
             <strong>Role:</strong> ${ur.roleName}`,
      icon: "info",
    });
  };

  return (
    <div className="container mt-4">
      {/* Header + Add button in single line */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Manage User Role</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setEditId(null);
            setSelectedUser("");
            setSelectedRole("");
            setShowModal(true);
          }}
        >
          + Assign New Role
        </button>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Role</th>
            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {userRoles.length > 0 ? (
            userRoles.map((ur) => (
              <tr key={ur.id}>
                <td>{ur.id}</td>
                <td>{users.find((u) => u.id === ur.userId)?.name || "Unknown"}</td>
                <td>{roles.find((r) => r.id === ur.roleId)?.name || "Unknown"}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => handleEdit(ur)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-1"
                    onClick={() => handleDelete(ur.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleView(ur)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">
                No user roles found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {editId ? "Edit User Role" : "Assign New Role"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <select
                    className="form-control"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(e.target.value)}
                  >
                    <option value="">Select User</option>
                    {users.map((u) => (
                      <option key={u.id} value={u.id}>
                        {u.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="mb-3">
                  <select
                    className="form-control"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(e.target.value)}
                  >
                    <option value="">Select Role</option>
                    {roles.map((r) => (
                      <option key={r.id} value={r.id}>
                        {r.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editId ? "Update Role" : "Assign Role"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;