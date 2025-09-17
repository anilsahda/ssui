"use client";

import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";

function Page() {
  const [users, setUsers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState(null);

  // form fields
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // ✅ Fetch users on page load
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Users/GetUsers");
      setUsers(res.data);
    } catch (err) {
      Swal.fire("Error", "Failed to fetch users", "error");
    }
  };

  // ✅ Add / Update user
  const handleSave = async () => {
    if (!name || !mobile || !email || !password) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      if (editId) {
        await axios.put("https://localhost:7024/api/Users/UpdateUser", {
          id: editId,
          name,
          mobile,
          email,
          password,
        });
        Swal.fire("Updated!", "User has been updated.", "success");
      } else {
        await axios.post("https://localhost:7024/api/Users/AddUser", {
          name,
          mobile,
          email,
          password,
        });
        Swal.fire("Added!", "User has been added.", "success");
      }
      resetForm();
      setShowModal(false);
      fetchUsers();
    } catch (err) {
      Swal.fire("Error", "Failed to save user", "error");
    }
  };

  // ✅ Edit user (open modal with data)
  const handleEdit = (user) => {
    setEditId(user.id);
    setName(user.name);
    setMobile(user.mobile);
    setEmail(user.email);
    setPassword(user.password);
    setShowModal(true);
  };

  // ✅ Delete user with confirmation
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
          await axios.delete(`https://localhost:7024/api/Users/${id}`);
          Swal.fire("Deleted!", "User has been deleted.", "success");
          fetchUsers();
        } catch (err) {
          Swal.fire("Error", "Failed to delete user", "error");
        }
      }
    });
  };

  // ✅ View user details
  const handleView = (user) => {
    Swal.fire({
      title: "User Details",
      html: `
        <strong>ID:</strong> ${user.id}<br/>
        <strong>Name:</strong> ${user.name}<br/>
        <strong>Mobile:</strong> ${user.mobile}<br/>
        <strong>Email:</strong> ${user.email}<br/>
        <strong>Password:</strong> ${user.password}
      `,
      icon: "info",
    });
  };

  const resetForm = () => {
    setEditId(null);
    setName("");
    setMobile("");
    setEmail("");
    setPassword("");
  };

  return (
    <div className="container mt-4">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="h3 m-0">Manage User</h1>
        <button
          className="btn btn-primary"
          onClick={() => {
            resetForm();
            setShowModal(true);
          }}
        >
          + Add User
        </button>
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Password</th>
            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.mobile}</td>
                <td>{user.email}</td>
                <td>{user.password}</td>
                <td>
                  <button
                    className="btn btn-warning me-1"
                    onClick={() => handleEdit(user)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger me-1"
                    onClick={() => handleDelete(user.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => handleView(user)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No users found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex="-1"
          style={{ background: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog">
            <div className="modal-content">
              {/* Header */}
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">
                  {editId ? "Edit User" : "Add User"}
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>

              {/* Body */}
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Name"
                    className="form-control"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    placeholder="Enter Mobile"
                    className="form-control"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    placeholder="Enter Email"
                    className="form-control"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="password"
                    placeholder="Enter Password"
                    className="form-control"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>

              {/* Footer */}
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {editId ? "Update" : "Save"}
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