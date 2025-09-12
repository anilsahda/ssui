"use client";

import axios from "axios";
import { useEffect, useState, FormEvent } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface UserRole {
  id: number;
  userId: string;
  roleId: number;
}

const UserRoleManager = () => {
  const [userRoles, setUserRoles] = useState<UserRole[]>([]);
  const [id, setId] = useState<number>(0);
  const [userId, setUserId] = useState<string>("");
  const [roleId, setRoleId] = useState<number>(0);

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const API_BASE_URL = "https://localhost:7024/api/userRoles";

  useEffect(() => {
    fetchAllUserRoles();
  }, []);

  const fetchAllUserRoles = () => {
    setLoading(true);
    axios
      .get<UserRole[]>(`${API_BASE_URL}/getUserRoles`)
      .then((res) => {
        setUserRoles(res.data);
        setError("");
      })
      .catch((err) => {
        console.error("Error fetching user roles:", err);
        setError("Error fetching user roles");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const resetForm = () => {
    setId(0);
    setUserId("");
    setRoleId(0);
    setIsEditing(false);
    setIsViewing(false);
    setShowModal(false);
    setError("");
  };

  const assignOrUpdateUserRole = (e: FormEvent) => {
    e.preventDefault();

    if (!userId.trim()) {
      setError("User ID is required.");
      return;
    }
    if (roleId <= 0) {
      setError("Role ID must be a positive number.");
      return;
    }

    const payload = { userId, roleId };

    axios
      .post<UserRole>(`${API_BASE_URL}/assignRole`, payload)
      .then((res) => {
        setMessage("Role assigned successfully!");
        fetchAllUserRoles();
        resetForm();
      })
      .catch((err) => {
        console.error("Error assigning user role:", err);
        setError("Error assigning user role");
      });
  };

  const deleteUserRole = (urId: number) => {
    if (!window.confirm("Are you sure you want to delete this user role?")) {
      return;
    }
    axios
      .delete(`${API_BASE_URL}/${urId}`)
      .then(() => {
        setMessage("User role deleted successfully!");
        fetchAllUserRoles();
      })
      .catch((err) => {
        console.error("Error deleting user role:", err);
        setError("Error deleting user role");
      });
  };

  const viewUserRole = (ur: UserRole) => {
    setId(ur.id);
    setUserId(ur.userId);
    setRoleId(ur.roleId);
    setIsViewing(true);
    setIsEditing(false);
    setShowModal(true);
  };

  const editUserRole = (ur: UserRole) => {
    // If you have an update endpoint, you can implement editing logic similarly
    setId(ur.id);
    setUserId(ur.userId);
    setRoleId(ur.roleId);
    setIsEditing(true);
    setIsViewing(false);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage User Roles</h2>

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
            aria-label="Close"
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
            aria-label="Close"
          ></button>
        </div>
      )}

      {/* Assign Role Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
      >
        + Assign Role to User
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
                <th>User ID</th>
                <th>Role ID</th>
                <th style={{ width: "200px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {userRoles.map((ur) => (
                <tr key={ur.id}>
                  <td>{ur.id}</td>
                  <td>{ur.userId}</td>
                  <td>{ur.roleId}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => viewUserRole(ur)}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => editUserRole(ur)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteUserRole(ur.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {userRoles.length === 0 && (
                <tr>
                  <td colSpan={4} className="text-center">
                    No user roles found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <>
          <div
            className="modal show d-block"
            role="dialog"
            aria-modal="true"
            tabIndex={-1}
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={assignOrUpdateUserRole}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {isViewing
                        ? "View User Role"
                        : isEditing
                        ? "Edit User Role"
                        : "Assign Role to User"}
                    </h5>
                    <button
                      type="button"
                      className="btn-close"
                      aria-label="Close"
                      onClick={resetForm}
                    ></button>
                  </div>
                  <div className="modal-body">
                    <div className="mb-3">
                      <label className="form-label">User ID</label>
                      <input
                        type="text"
                        className="form-control"
                        value={userId}
                        onChange={(e) => setUserId(e.target.value)}
                        readOnly={isViewing}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Role ID</label>
                      <input
                        type="number"
                        className="form-control"
                        value={roleId}
                        onChange={(e) => setRoleId(Number(e.target.value))}
                        readOnly={isViewing}
                        required
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    {!isViewing && (
                      <button type="submit" className="btn btn-success">
                        {isEditing ? "Update User Role" : "Assign User Role"}
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

export default UserRoleManager;
