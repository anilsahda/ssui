"use client";

import axios from "axios";
import { useEffect, useState, FormEvent } from "react";
import { FaEdit, FaEye, FaTrash } from "react-icons/fa";

interface RoleType {
  id: number;
  name: string;
}

const RoleManager = () => {
  const [roles, setRoles] = useState<RoleType[]>([]);
  const [id, setId] = useState<number>(0);
  const [name, setName] = useState<string>("");

  const [showModal, setShowModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [isViewing, setIsViewing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [error, setError] = useState<string>("");

  const API_BASE_URL = "https://localhost:7024/api/roles";

  useEffect(() => {
    fetchAllRoles();
  }, []);

  const fetchAllRoles = () => {
    setLoading(true);
    axios
      .get(`${API_BASE_URL}/GetRoles`)
      .then((res) => setRoles(res.data))
      .catch(() => setError("Error fetching roles"))
      .finally(() => setLoading(false));
  };

  const resetForm = () => {
    setId(0);
    setName("");
    setIsEditing(false);
    setIsViewing(false);
    setShowModal(false);
  };

  const addOrUpdateRole = (e: FormEvent) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Role name is required.");
      return;
    }

    const payload = { id, name };
    const url = isEditing
      ? `${API_BASE_URL}/UpdateRole/${id}`
      : `${API_BASE_URL}/AddRole`;
    const method = isEditing ? axios.put : axios.post;

    method(url, payload)
      .then(() => {
        setMessage(
          isEditing ? "Role updated successfully!" : "Role added successfully!"
        );
        fetchAllRoles();
        resetForm();
      })
      .catch(() => setError("Error saving role"));
  };

  const deleteRole = (roleId: number) => {
    if (window.confirm("Are you sure you want to delete this role?")) {
      axios
        .delete(`${API_BASE_URL}/${roleId}`)
        .then(() => {
          setMessage("Role deleted successfully!");
          fetchAllRoles();
        })
        .catch(() => setError("Error deleting role"));
    }
  };

  const viewRole = (role: RoleType) => {
    setId(role.id);
    setName(role.name);
    setIsViewing(true);
    setIsEditing(false);
    setShowModal(true);
  };

  const editRole = (role: RoleType) => {
    setId(role.id);
    setName(role.name);
    setIsViewing(false);
    setIsEditing(true);
    setShowModal(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Manage Roles</h2>

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

      {/* Add Role Button */}
      <button
        className="btn btn-primary mb-3"
        onClick={() => {
          resetForm();
          setShowModal(true);
        }}
      >
        + Add Role
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
                <th style={{ width: "150px" }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {roles.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>{r.name}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => viewRole(r)}
                      title="View"
                    >
                      <FaEye />
                    </button>
                    <button
                      className="btn btn-sm btn-warning me-2"
                      onClick={() => editRole(r)}
                      title="Edit"
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => deleteRole(r.id)}
                      title="Delete"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
              {roles.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center">
                    No roles found.
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
                <form onSubmit={addOrUpdateRole}>
                  <div className="modal-header">
                    <h5 className="modal-title">
                      {isViewing
                        ? "View Role"
                        : isEditing
                        ? "Edit Role"
                        : "Add New Role"}
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
                      <label className="form-label">Role Name</label>
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        placeholder="Enter role name"
                        onChange={(e) => setName(e.target.value)}
                        readOnly={isViewing}
                        required
                        autoFocus
                      />
                    </div>
                  </div>
                  <div className="modal-footer">
                    {!isViewing && (
                      <button type="submit" className="btn btn-success">
                        {isEditing ? "Update Role" : "Add Role"}
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

export default RoleManager;
