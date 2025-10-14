"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { usePostHouseStore } from "../store/posthouse";

const API_BASE = "https://localhost:7049/api/PostHouses";
const OWNER_API = "https://localhost:7049/api/Owner";

const PostHousesManager: React.FC = () => {
  const {
    postHouses,
    owners,
    form,
    editing,
    loading,
    setPostHouses,
    setOwners,
    setForm,
    setEditing,
    setLoading,
    resetForm,
  } = usePostHouseStore();

  useEffect(() => {
    fetchOwners();
    fetchPostHouses();
  }, []);

  const fetchPostHouses = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setPostHouses(Array.isArray(data) ? data : []);
    } catch (err) {
      alert("Error fetching post houses");
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const res = await fetch(OWNER_API);
      const data = await res.json();
      setOwners(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error loading owners", err);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "ownerId" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.title || !form.address || !form.ownerId) {
      alert("Title, Address, and Owner are required");
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
      console.error(err);
    }
  };

  const handleEdit = (ph: any) => {
    setForm(ph);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this post house?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");

      await fetchPostHouses();
    } catch (err) {
      alert("Error deleting post house");
      console.error(err);
    }
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
              <label className="form-label">Address *</label>
              <input
                type="text"
                className="form-control"
                name="address"
                value={form.address || ""}
                onChange={handleChange}
                placeholder="Enter house address"
                required
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
                  <th>Address</th>
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
                    <td>{ph.address}</td>
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
