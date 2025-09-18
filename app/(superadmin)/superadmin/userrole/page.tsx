"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

interface UserRole {
  id: number;
  userId: number; // assuming numeric
  roleId: number;
  userName?: string;
  roleName?: string;
}

interface User {
  id: number;
  name: string;
}

interface Role {
  id: number;
  name: string;
}

const Page: React.FC = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [selectedUser, setSelectedUser] = useState<number | "">("");
  const [selectedRole, setSelectedRole] = useState<number | "">("");
  const [editId, setEditId] = useState<number | null>(null);
  const [showModal, setShowModal] = useState<boolean>(false);

  // Fetch data on mount
  useEffect(() => {
    fetchUserRoles();
    fetchUsers();
    fetchRoles();
  }, []);

  const fetchUserRoles = async () => {
    try {
      const res = await axios.get<UserRole[]>(
        "https://localhost:7024/api/UserRoles/GetUserRoles"
      );
      setUserRoles(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch user roles", "error");
    }
  };

  const fetchUsers = async () => {
    try {
      const res = await axios.get<User[]>(
        "https://localhost:7024/api/Users/GetUsers"
      );
      setUsers(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await axios.get<Role[]>(
        "https://localhost:7024/api/Roles/GetRoles"
      );
      setRoles(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch roles", "error");
    }
  };

  const handleSave = async () => {
    if (selectedUser === "" || selectedRole === "") {
      Swal.fire("Warning", "Please select both user and role", "warning");
      return;
    }

    try {
      if (editId !== null) {
        // Update existing
        await axios.put("https://localhost:7024/api/UserRoles/UpdateUserRole", {
          id: editId,
          userId: selectedUser,
          roleId: selectedRole,
        });
        Swal.fire("Updated!", "User role has been updated.", "success");
      } else {
        // Add new
        debugger;
        await axios.post("https://localhost:7024/api/UserRoles/AssignRole", {
          userId: selectedUser,
          roleId: selectedRole,
        });
        Swal.fire("Added!", "User role has been assigned.", "success");
      }
      // Reset form and reload
      resetForm();
      fetchUserRoles();
    } catch (err) {
      Swal.fire("Error", "Failed to save user role", "error");
    }
  };

  const handleEdit = (ur: UserRole) => {
    setEditId(ur.id);
    setSelectedUser(ur.userId);
    setSelectedRole(ur.roleId);
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will remove the assigned role!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(
          `https://localhost:7024/api/UserRoles/DeleteUserRole/${id}`
        );
        Swal.fire("Deleted!", "User role has been removed.", "success");
        fetchUserRoles();
      } catch (err) {
        Swal.fire("Error", "Failed to delete user role", "error");
      }
    }
  };

  const handleView = (ur: UserRole) => {
    Swal.fire({
      title: "User Role Details",
      html: `<strong>ID:</strong> ${ur.id}<br/>
             <strong>User:</strong> ${ur.userName ?? ur.userId}<br/>
             <strong>Role:</strong> ${ur.roleName ?? ur.roleId}`,
      icon: "info",
    });
  };

  const resetForm = () => {
    setEditId(null);
    setSelectedUser("");
    setSelectedRole("");
    setShowModal(false);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="mb-0">Manage User Roles</h2>
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Assign New Role
        </button>
      </div>

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
                <td>
                  {users.find((u) => u.id === ur.userId)?.name || "Unknown"}
                </td>
                <td>
                  {roles.find((r) => r.id === ur.roleId)?.name || "Unknown"}
                </td>
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
              <td colSpan={4} className="text-center">
                No user roles found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <div
          className="modal show d-block"
          tabIndex={-1}
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {editId !== null ? "Edit User Role" : "Assign New Role"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={resetForm}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label>User</label>
                  <select
                    className="form-control"
                    value={selectedUser}
                    onChange={(e) => setSelectedUser(Number(e.target.value))}
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
                  <label>Role</label>
                  <select
                    className="form-control"
                    value={selectedRole}
                    onChange={(e) => setSelectedRole(Number(e.target.value))}
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
                <button className="btn btn-secondary" onClick={resetForm}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editId !== null ? "Update Role" : "Assign Role"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Page;
