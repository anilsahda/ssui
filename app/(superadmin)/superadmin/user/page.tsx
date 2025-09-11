"use client";

import axios from "axios";
import { useEffect, useState, FormEvent } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
  mobile: string;
}

const User = () => {
  const [users, setUsers] = useState<UserType[]>([]);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [mobile, setMobile] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const API_BASE_URL = "http://localhost:5000/api/users";

  useEffect(() => {
    fetchAllUsers();
  }, []);

  const fetchAllUsers = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/GetAllUsers`)
      .then((res) => setUsers(res.data))
      .catch((err) => setError("Error fetching users"))
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setId(0);
    setName("");
    setEmail("");
    setPassword("");
    setMobile("");
    setIsEditing(false);
    setIsViewing(false);
    setShowModal(false);
    setShowPassword(false);
  };

  const addOrUpdateUser = (e: FormEvent) => {
    e.preventDefault();
    const payload = { id, name, email, password, mobile };
    const url = isEditing
      ? `${API_BASE_URL}/UpdateUser/${id}`
      : `${API_BASE_URL}/AddUser`;
    const method = isEditing ? axios.put : axios.post;

    method(url, payload)
      .then(() => {
        setMessage(
          isEditing ? "User updated successfully!" : "User added successfully!"
        );
        fetchAllUsers();
        resetForm();
      })
      .catch(() => setError("Error saving user"));
  };

  const deleteUser = (userId: number) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      axios
        .delete(`${API_BASE_URL}/DeleteUser/${userId}`)
        .then(() => {
          setMessage("User deleted successfully!");
          fetchAllUsers();
        })
        .catch(() => setError("Error deleting user"));
    }
  };

  const viewUser = (user: UserType) => {
    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setMobile(user.mobile);
    setIsViewing(true);
    setIsEditing(false);
    setShowModal(true);
  };

  const editUser = (user: UserType) => {
    setId(user.id);
    setName(user.name);
    setEmail(user.email);
    setPassword(user.password);
    setMobile(user.mobile);
    setIsViewing(false);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Users</h2>

      {/* Alert Messages */}
      {message && (
        <div
          className="alert alert-success alert-dismissible fade show"
          role="alert"
        >
          {message}
          <button
            type="button"
            className="btn-close"
            onClick={() => setMessage("")}
          ></button>
        </div>
      )}
      {error && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          {error}
          <button
            type="button"
            className="btn-close"
            onClick={() => setError("")}
          ></button>
        </div>
      )}

      {/* Add User Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
      >
        + Add User
      </button>

      {/* Loading Spinner */}
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u.id}>
                  <td>{u.id}</td>
                  <td>{u.name}</td>
                  <td>{u.email}</td>
                  <td>{u.mobile}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => viewUser(u)}
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => editUser(u)}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUser(u.id)}
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <>
          <div className="modal show d-block" role="dialog" aria-modal="true">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={addOrUpdateUser}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {isViewing
                        ? "View User"
                        : isEditing
                        ? "Edit User"
                        : "Add New User"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      onClick={resetForm}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        placeholder="Enter name"
                        onChange={(e) => setName(e.target.value)}
                        readOnly={isViewing}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        value={email}
                        placeholder="Enter email"
                        onChange={(e) => setEmail(e.target.value)}
                        readOnly={isViewing}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Password</label>
                      <div className="input-group">
                        <input
                          type={showPassword ? "text" : "password"}
                          className="form-control"
                          value={password}
                          placeholder="Enter password"
                          onChange={(e) => setPassword(e.target.value)}
                          readOnly={isViewing}
                          required={!isViewing}
                        />
                        {!isViewing && (
                          <button
                            type="button"
                            className="btn btn-outline-secondary"
                            onClick={() => setShowPassword((prev) => !prev)}
                          >
                            {showPassword ? "Hide" : "Show"}
                          </button>
                        )}
                      </div>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        value={mobile}
                        placeholder="Enter mobile number"
                        onChange={(e) => setMobile(e.target.value)}
                        readOnly={isViewing}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    {!isViewing && (
                      <button type="submit" className="btn btn-success">
                        {isEditing ? "Update User" : "Add User"}
                      </button>
                    )}
                    <button
                      type="button"
                      className="btn btn-secondary"
                      onClick={resetForm}
                    >
                      Close
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>

          {/* Modal Backdrop */}
          <div className="modal-backdrop fade show"></div>
        </>
      )}
    </div>
  );
};

export default User;
