"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaEdit, FaTrash, FaPlusCircle, FaTimesCircle } from "react-icons/fa";

interface Owner {
  id: number;
  name: string;
  email?: string;
  phoneNumber?: string;
}

const OwnersManager: React.FC = () => {
  const API_URL = "/api/Owners";

  const [owners, setOwners] = useState<Owner[]>([]);
  const [form, setForm] = useState<Partial<Owner>>({
    name: "",
    email: "",
    phoneNumber: "",
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteOwnerId, setDeleteOwnerId] = useState<number | null>(null);

  // Load data
  useEffect(() => {
    loadOwners();
  }, []);

  const loadOwners = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      setOwners(data);
    } catch (err) {
      console.error("Failed to load owners:", err);
    }
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.name) {
      alert("Name is required.");
      return;
    }

    try {
      const res = await fetch(editing ? `${API_URL}/${form.id}` : API_URL, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save.");

      resetForm();
      loadOwners();
    } catch (err) {
      console.error("Submit error:", err);
      alert("Error submitting form.");
    }
  };

  const handleEdit = (owner: Owner) => {
    setForm(owner);
    setEditing(true);
  };

  const confirmDelete = (id: number) => {
    setDeleteOwnerId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deleteOwnerId === null) return;

    try {
      const res = await fetch(`${API_URL}/${deleteOwnerId}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      setShowDeleteModal(false);
      setDeleteOwnerId(null);
      loadOwners();
    } catch (err) {
      console.error("Delete error:", err);
      alert("Failed to delete owner.");
    }
  };

  const resetForm = () => {
    setForm({ name: "", email: "", phoneNumber: "" });
    setEditing(false);
  };

  return (
    <div className="container my-5">
      <h3 className="mb-4 text-primary fw-bold">Owners Manager</h3>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border rounded-3 p-4 mb-5 shadow-sm bg-white"
      >
        <h5 className="mb-4 text-secondary">
          {editing ? (
            <>
              <FaEdit className="me-2" />
              Edit Owner
            </>
          ) : (
            <>
              <FaPlusCircle className="me-2" />
              Add New Owner
            </>
          )}
        </h5>

        <div className="mb-3">
          <label htmlFor="ownerName" className="form-label fw-semibold">
            Name <span className="text-danger">*</span>
          </label>
          <input
            id="ownerName"
            type="text"
            className="form-control"
            name="name"
            value={form.name || ""}
            onChange={handleChange}
            required
            placeholder="Enter owner's name"
          />
        </div>

        <div className="mb-3">
          <label htmlFor="ownerEmail" className="form-label fw-semibold">
            Email
          </label>
          <input
            id="ownerEmail"
            type="email"
            className="form-control"
            name="email"
            value={form.email || ""}
            onChange={handleChange}
            placeholder="example@mail.com"
          />
        </div>

        <div className="mb-4">
          <label htmlFor="ownerPhone" className="form-label fw-semibold">
            Phone Number
          </label>
          <input
            id="ownerPhone"
            type="text"
            className="form-control"
            name="phoneNumber"
            value={form.phoneNumber || ""}
            onChange={handleChange}
            placeholder="+1 234 567 890"
          />
        </div>

        <button type="submit" className="btn btn-primary me-3 px-4">
          {editing ? "Update" : "Create"}
        </button>

        {editing && (
          <button
            type="button"
            className="btn btn-outline-secondary px-4"
            onClick={resetForm}
          >
            <FaTimesCircle className="me-2" />
            Cancel
          </button>
        )}
      </form>

      {/* Owners Table */}
      <h5 className="mb-3 text-secondary">All Owners</h5>

      {loading ? (
        <div className="d-flex justify-content-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
            aria-label="Loading owners"
          >
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : owners.length === 0 ? (
        <p className="text-muted fst-italic">No owners found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle mb-0">
            <thead className="table-primary">
              <tr>
                <th scope="col" style={{ width: "6%" }}>
                  ID
                </th>
                <th scope="col" style={{ width: "30%" }}>
                  Name
                </th>
                <th scope="col" style={{ width: "30%" }}>
                  Email
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Phone
                </th>
                <th scope="col" style={{ width: "14%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {owners.map((owner) => (
                <tr key={owner.id}>
                  <td>{owner.id}</td>
                  <td>{owner.name}</td>
                  <td>{owner.email || <i className="text-muted">-</i>}</td>
                  <td>
                    {owner.phoneNumber || <i className="text-muted">-</i>}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2"
                      onClick={() => handleEdit(owner)}
                      aria-label={`Edit ${owner.name}`}
                    >
                      <FaEdit />
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => confirmDelete(owner.id)}
                      aria-label={`Delete ${owner.name}`}
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

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby="deleteModalLabel"
          onClick={() => setShowDeleteModal(false)}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="modal-content shadow">
              <div className="modal-header">
                <h5 className="modal-title" id="deleteModalLabel">
                  Confirm Delete
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  aria-label="Close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                Are you sure you want to delete this owner?
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={handleDelete}
                >
                  Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OwnersManager;
