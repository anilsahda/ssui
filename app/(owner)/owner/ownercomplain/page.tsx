"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";

interface Owner {
  id: number;
  name: string;
}

interface OwnerComplain {
  id: number;
  description: string;
  createdAt: string;
  ownerId: number;
  owner?: Owner;
}

const OwnerComplainsManager: React.FC = () => {
  const API_BASE = "/api/OwnerComplains";
  const OWNER_API = "/api/Owners";

  const [complains, setComplains] = useState<OwnerComplain[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [form, setForm] = useState<Partial<OwnerComplain>>({
    description: "",
    ownerId: undefined,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchComplains();
    fetchOwners();
  }, []);

  const fetchComplains = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setComplains(data);
    } catch (err) {
      console.error("Error loading complains:", err);
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const res = await fetch(OWNER_API);
      const data = await res.json();
      setOwners(data);
    } catch (err) {
      console.error("Error loading owners:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "ownerId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.description || form.ownerId == null) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const method = isEditing && form.id ? "PUT" : "POST";
      const url = isEditing && form.id ? `${API_BASE}/${form.id}` : API_BASE;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());

      resetForm();
      await fetchComplains();
    } catch (err) {
      console.error("Submit error:", err);
      setError("Submission failed.");
    }
  };

  const handleEdit = (complain: OwnerComplain) => {
    setForm({
      id: complain.id,
      description: complain.description,
      ownerId: complain.ownerId,
      createdAt: complain.createdAt,
    });
    setIsEditing(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this complaint?")) return;
    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchComplains();
    } catch (err) {
      console.error(err);
      setError("Failed to delete complaint.");
    }
  };

  const resetForm = () => {
    setForm({ description: "", ownerId: undefined });
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-exclamation-circle me-2"></i>
          Owner Complaints Manager
        </h2>
        <p className="text-muted">
          View, create, edit or delete complaints submitted by owners
        </p>
      </div>

      <div className="card shadow-sm mb-4">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            {isEditing ? (
              <>
                <i className="bi bi-pencil-square me-2"></i>Edit Complaint
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>New Complaint
              </>
            )}
          </h5>
        </div>
        <div className="card-body">
          {error && (
            <div className="alert alert-danger d-flex align-items-center">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Owner</label>
              <select
                className="form-select"
                name="ownerId"
                value={form.ownerId ?? ""}
                onChange={handleChange}
                required
              >
                <option value="">Select owner</option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="mb-3">
              <label className="form-label">Complaint Description</label>
              <textarea
                className="form-control"
                name="description"
                value={form.description ?? ""}
                onChange={handleChange}
                rows={3}
                required
                placeholder="Describe the issue..."
              />
            </div>
            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success me-2">
                <i
                  className={`bi ${isEditing ? "bi-save" : "bi-plus-lg"} me-1`}
                ></i>
                {isEditing ? "Update" : "Create"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                >
                  <i className="bi bi-x-circle me-1"></i>Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      <div className="mb-3">
        <h5>
          <i className="bi bi-list-ul me-2"></i>All Complaints
        </h5>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-3 text-muted">Loading complaints...</p>
        </div>
      ) : complains.length === 0 ? (
        <p className="text-muted">No complaints found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Owner</th>
                <th>Description</th>
                <th>Created At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complains.map((c) => (
                <tr key={c.id}>
                  <td>
                    <span className="badge bg-secondary">{c.id}</span>
                  </td>
                  <td>{c.owner?.name ?? `#${c.ownerId}`}</td>
                  <td>{c.description}</td>
                  <td>{new Date(c.createdAt).toLocaleString()}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(c)}
                    >
                      <i className="bi bi-pencil-square"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(c.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OwnerComplainsManager;
