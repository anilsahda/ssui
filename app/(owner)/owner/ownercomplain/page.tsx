"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useOwnerComplainStore } from "../store/ownercomplain";

const API_BASE = "https://localhost:7049/api/OwnerComplain";
const OWNER_API = "https://localhost:7049/api/Owner";

export default function OwnerComplainPage() {
  const {
    complains,
    owners,
    loading,
    error,
    form,
    isEditing,
    setComplains,
    setOwners,
    setLoading,
    setError,
    setForm,
    setIsEditing,
    resetForm,
  } = useOwnerComplainStore();

  useEffect(() => {
    fetchOwners();
    fetchComplains();
  }, []);

  const fetchComplains = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch complains");
      const data = await res.json();
      setComplains(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setError(err.message);
      setComplains([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const res = await fetch(OWNER_API);
      if (!res.ok) throw new Error("Failed to fetch owners");
      const data = await res.json();
      setOwners(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setOwners([]);
      setError(err.message);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: name === "ownerId" ? parseInt(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.ownerId || !form.content) {
      setError("Please select owner and enter complain text.");
      return;
    }

    const payload = { ...form, createdAt: new Date().toISOString() };
    const url = isEditing && form.id ? `${API_BASE}/${form.id}` : API_BASE;
    const method = isEditing ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save complain.");

      await fetchComplains();
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (complain: any) => {
    setForm(complain);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this complain?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete complain.");
      await fetchComplains();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold">🏠 Owner Complains</h2>
        <p className="text-muted">Manage complains submitted by owners</p>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border p-4 mb-4 rounded bg-light shadow-sm"
      >
        <h5>{isEditing ? "Edit Complain" : "Add New Complain"}</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Owner</label>
          <select
            className="form-select"
            name="ownerId"
            value={form.ownerId ?? ""}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Owner --</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label className="form-label">Complain Text</label>
          <textarea
            className="form-control"
            name="content"
            rows={4}
            value={form.content ?? ""}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-success me-2">
          <i
            className={`bi ${
              isEditing ? "bi-pencil-square" : "bi-plus-circle"
            }`}
          ></i>{" "}
          {isEditing ? "Update" : "Add"}
        </button>

        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            <i className="bi bi-x-circle"></i> Cancel
          </button>
        )}
      </form>

      {/* Table */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading complains...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Owner</th>
                <th>Complain</th>
                <th>Created At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complains.length > 0 ? (
                complains.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.owner?.name ?? `#${c.ownerId}`}</td>
                    <td>{c.content}</td>
                    <td>
                      {c.createdAt
                        ? new Date(c.createdAt).toLocaleString()
                        : "Not Set"}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(c)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(c.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No complains found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
