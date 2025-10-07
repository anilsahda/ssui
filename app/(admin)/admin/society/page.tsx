"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface House {
  id: number;
  name: string;
}

interface Society {
  id: number;
  name: string;
  location: string;
  houses?: House[];
}

const SocietiesManager: React.FC = () => {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [form, setForm] = useState<Partial<Society>>({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://localhost:7255/api/Society";

  useEffect(() => {
    fetchSocieties();
  }, []);

  const fetchSocieties = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch societies");

      const data = await res.json();
      console.log("Fetched societies:", data); // Optional: Debug

      if (!Array.isArray(data)) {
        throw new Error(
          "Unexpected response format: societies is not an array."
        );
      }

      setSocieties(data);
      setError(null);
    } catch (error: any) {
      console.error(error);
      setSocieties([]); // fallback to avoid crash on `.map`
      setError(error.message || "Error loading societies.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.location) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${API_URL}/${form.id}` : API_URL;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText || "Failed to save society");
      }

      await fetchSocieties();
      resetForm();
    } catch (error: any) {
      setError(error.message || "Error saving society.");
      console.error(error);
    }
  };

  const handleEdit = (society: Society) => {
    setForm(society);
    setEditing(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this society?"))
      return;

    try {
      const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!response.ok) throw new Error("Failed to delete society");
      await fetchSocieties();
    } catch (error: any) {
      console.error(error);
      setError(error.message || "Error deleting society.");
    }
  };

  const resetForm = () => {
    setForm({});
    setEditing(false);
    setError(null);
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold">Societies Management</h2>
        <p className="text-muted">
          Manage housing societies and their locations
        </p>
      </div>

      <div className="card shadow-sm mb-5">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            {editing ? "Edit Society" : "Add New Society"}
          </h5>
        </div>
        <form className="card-body" onSubmit={handleSubmit} noValidate>
          {error && (
            <div className="alert alert-danger" role="alert">
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              {error}
            </div>
          )}

          <div className="row g-3">
            <div className="col-md-6">
              <label htmlFor="name" className="form-label">
                Society Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="form-control"
                value={form.name || ""}
                onChange={handleChange}
                maxLength={100}
                required
              />
            </div>

            <div className="col-md-6">
              <label htmlFor="location" className="form-label">
                Location
              </label>
              <input
                type="text"
                id="location"
                name="location"
                className="form-control"
                value={form.location || ""}
                onChange={handleChange}
                maxLength={150}
                required
              />
            </div>
          </div>

          <div className="mt-4">
            <button type="submit" className="btn btn-success me-2">
              <i
                className={`bi ${
                  editing ? "bi-pencil-square" : "bi-plus-circle"
                }`}
              ></i>{" "}
              {editing ? "Update" : "Create"}
            </button>
            {editing && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                <i className="bi bi-x-circle"></i> Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      <h5 className="mb-3">Existing Societies</h5>
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading societies...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-bordered table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Location</th>
                <th>Houses</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {societies.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No societies found.
                  </td>
                </tr>
              ) : (
                societies.map((society) => (
                  <tr key={society.id}>
                    <td>
                      <span className="badge bg-secondary">{society.id}</span>
                    </td>
                    <td>{society.name}</td>
                    <td>{society.location}</td>
                    <td>
                      <span className="badge bg-info text-dark">
                        {society.houses?.length ?? 0}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(society)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(society.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default SocietiesManager;
