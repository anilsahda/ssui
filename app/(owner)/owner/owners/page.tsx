"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useOwnerStore, Owner } from "../store/owner";

const API_BASE = "https://localhost:7049/api/Owner";

export default function OwnerPage() {
  const {
    owners,
    form,
    isEditing,
    loading,
    error,
    setOwners,
    setForm,
    setEditing,
    setLoading,
    setError,
    resetForm,
  } = useOwnerStore();

  useEffect(() => {
    fetchOwners();
  }, []);

  const fetchOwners = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch owners");
      const data = await res.json();
      setOwners(Array.isArray(data) ? data : []);
    } catch (err: any) {
      console.error(err);
      setOwners([]);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.name || !form.email || !form.phone) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const url = isEditing && form.id ? `${API_BASE}/${form.id}` : API_BASE;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save owner");

      await fetchOwners();
      resetForm();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  const handleEdit = (owner: Owner) => {
    setForm(owner);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this owner?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete owner");
      await fetchOwners();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold">🏠 Manage Owners</h2>
        <p className="text-muted">Add, edit, and view house owners</p>
      </div>

      {/* Owner Form */}
      <form
        onSubmit={handleSubmit}
        className="border p-4 mb-4 rounded bg-light shadow-sm"
      >
        <h5>{isEditing ? "Edit Owner" : "Add New Owner"}</h5>
        {error && <div className="alert alert-danger">{error}</div>}

        <div className="mb-3">
          <label className="form-label">Name</label>
          <input
            type="text"
            className="form-control"
            name="name"
            value={form.name ?? ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            name="email"
            value={form.email ?? ""}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label">Phone</label>
          <input
            type="text"
            className="form-control"
            name="phone"
            value={form.phone ?? ""}
            onChange={handleChange}
            required
          />
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

      {/* Owner Table */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-2">Loading owners...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {owners.length > 0 ? (
                owners.map((o) => (
                  <tr key={o.id}>
                    <td>{o.id}</td>
                    <td>{o.name}</td>
                    <td>{o.email}</td>
                    <td>{o.phone}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(o)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(o.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No owners found.
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
