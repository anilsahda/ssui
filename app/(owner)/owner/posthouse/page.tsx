"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface PostHouse {
  id: number;
  title: string;
  description: string;
  ownerId: number;
  owner?: { id: number; name: string };
}

interface Owner {
  id: number;
  name: string;
}

const PostHousesManager: React.FC = () => {
  const [postHouses, setPostHouses] = useState<PostHouse[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [form, setForm] = useState<Partial<PostHouse>>({
    title: "",
    description: "",
    ownerId: 0,
  });
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);

  const API_BASE = "/api/PostHouses";
  const OWNER_API = "/api/Owners";

  useEffect(() => {
    fetchPostHouses();
    fetchOwners();
  }, []);

  const fetchPostHouses = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setPostHouses(data);
    } catch (err) {
      alert("Error fetching post houses");
    }
    setLoading(false);
  };

  const fetchOwners = async () => {
    try {
      const res = await fetch(OWNER_API);
      const data = await res.json();
      setOwners(data);
    } catch (err) {
      console.error("Error loading owners", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "ownerId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.ownerId) {
      alert("Title and Owner are required");
      return;
    }

    try {
      const res = await fetch(editing ? `${API_BASE}/${form.id}` : API_BASE, {
        method: editing ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Save failed");

      await fetchPostHouses();
      resetForm();
    } catch (err) {
      alert("Error saving post house");
    }
  };

  const handleEdit = (ph: PostHouse) => {
    setForm(ph);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this post house?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Delete failed");

      await fetchPostHouses();
    } catch (err) {
      alert("Error deleting post house");
    }
  };

  const resetForm = () => {
    setForm({ title: "", description: "", ownerId: 0 });
    setEditing(false);
  };

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h2 className="fw-bold text-primary">
          <i className="bi bi-house-door-fill me-2"></i>Post Houses Manager
        </h2>
        <p className="text-muted">Manage and publish house listings</p>
      </div>

      {/* FORM */}
      <div className="card shadow-sm mb-5">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            <i
              className={`bi ${
                editing ? "bi-pencil-square" : "bi-plus-circle"
              } me-2`}
            ></i>
            {editing ? "Edit Post House" : "Create New Post House"}
          </h5>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Title *</label>
              <input
                type="text"
                className="form-control"
                name="title"
                value={form.title || ""}
                onChange={handleChange}
                placeholder="Enter house title"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Description</label>
              <input
                type="text"
                className="form-control"
                name="description"
                value={form.description || ""}
                onChange={handleChange}
                placeholder="Optional description"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Owner *</label>
              <select
                className="form-select"
                name="ownerId"
                value={form.ownerId || 0}
                onChange={handleChange}
                required
              >
                <option value={0}>-- Select Owner --</option>
                {owners.map((owner) => (
                  <option key={owner.id} value={owner.id}>
                    {owner.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="d-flex justify-content-end">
              <button type="submit" className="btn btn-success me-2">
                <i
                  className={`bi ${editing ? "bi-save" : "bi-plus-lg"} me-1`}
                ></i>
                {editing ? "Update" : "Create"}
              </button>
              {editing && (
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

      {/* TABLE */}
      <div>
        <h5>
          <i className="bi bi-card-list me-2"></i>All Posted Houses
        </h5>
        {loading ? (
          <div className="text-center my-5">
            <div className="spinner-border text-primary" role="status"></div>
            <p className="mt-3 text-muted">Loading post houses...</p>
          </div>
        ) : postHouses.length === 0 ? (
          <p className="text-muted">No post houses available.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-hover table-bordered align-middle mt-3">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Owner</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {postHouses.map((ph) => (
                  <tr key={ph.id}>
                    <td>
                      <span className="badge bg-secondary">{ph.id}</span>
                    </td>
                    <td>{ph.title}</td>
                    <td>
                      {ph.description || <span className="text-muted">—</span>}
                    </td>
                    <td>{ph.owner?.name || "N/A"}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(ph)}
                        title="Edit"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(ph.id)}
                        title="Delete"
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
    </div>
  );
};

export default PostHousesManager;
