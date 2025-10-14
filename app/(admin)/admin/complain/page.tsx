"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap-icons/font/bootstrap-icons.css";
import { useComplainStore, Complain } from "../store/complain";

const ComplainManager: React.FC = () => {
  const API_URL = process.env.NEXT_PUBLIC_API_BASE
    ? `${process.env.NEXT_PUBLIC_API_BASE}/Complain`
    : "https://localhost:7255/api/Complain";

  const {
    complains,
    loading,
    error,
    form,
    isEditing,
    setComplains,
    setLoading,
    setError,
    setForm,
    setIsEditing,
    resetForm,
  } = useComplainStore();

  // Fetch complaints
  const fetchComplains = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to load complaints.");
      const data: Complain[] = await res.json();
      setComplains(Array.isArray(data) ? data : []);
    } catch (err: any) {
      setComplains([]);
      setError(err.message || "Error fetching complaints.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchComplains();
  }, []);

  // Handle form inputs
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.houseId || !form.description?.trim()) {
      alert("House ID and Description are required.");
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${API_URL}/${form.id}` : API_URL;
      const payload: Complain = {
        ...form,
        complainDate:
          form.complainDate || new Date().toISOString().substring(0, 19) + "Z",
      };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error(await res.text());
      await fetchComplains();
      resetForm();
    } catch (err: any) {
      alert(err.message || "Error submitting complaint.");
    }
  };

  // Edit
  const handleEdit = (c: Complain) => {
    setForm({ ...c });
    setIsEditing(true);
  };

  // Delete
  const handleDelete = async (id?: number) => {
    if (!id) return;
    if (!window.confirm("Are you sure you want to delete this complaint?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed.");
      await fetchComplains();
    } catch (err: any) {
      alert(err.message || "Error deleting complaint.");
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-primary fw-bold">Complain Manager</h2>

      {error && <div className="alert alert-danger shadow-sm">{error}</div>}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border rounded-3 p-4 mb-5 shadow-sm bg-white"
      >
        <h4 className="mb-4 text-secondary">
          {isEditing ? "Edit Complaint" : "Add New Complaint"}
        </h4>

        <div className="row g-3">
          <div className="col-md-4">
            <label className="form-label fw-semibold">
              House ID <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              name="houseId"
              value={form.houseId ?? ""}
              onChange={handleInputChange}
              required
              min={1}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Member ID</label>
            <input
              type="number"
              className="form-control"
              name="memberId"
              value={form.memberId ?? ""}
              onChange={handleInputChange}
              min={1}
            />
          </div>

          <div className="col-md-4">
            <label className="form-label fw-semibold">Complaint Date</label>
            <input
              type="datetime-local"
              className="form-control"
              name="complainDate"
              value={form.complainDate?.substring(0, 16) || ""}
              onChange={handleInputChange}
              max={new Date().toISOString().substring(0, 16)}
            />
          </div>
        </div>

        <div className="mt-3">
          <label className="form-label fw-semibold">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            name="description"
            rows={4}
            value={form.description || ""}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>

        <div className="form-check form-switch mt-4 mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            name="isResolved"
            checked={form.isResolved || false}
            onChange={handleInputChange}
          />
          <label className="form-check-label fw-semibold">
            Mark as Resolved
          </label>
        </div>

        <div>
          <button type="submit" className="btn btn-primary me-3 shadow-sm">
            {isEditing ? "✏️ Update" : "➕ Create"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-outline-secondary shadow-sm"
              onClick={resetForm}
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <h4 className="mb-3 text-secondary">All Complaints</h4>
      {loading ? (
        <div className="text-center py-5">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : complains.length === 0 ? (
        <p className="text-muted fst-italic">No complaints found.</p>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-striped table-hover align-middle mb-0 bg-white">
            <thead className="table-primary text-primary">
              <tr>
                <th>ID</th>
                <th>House ID</th>
                <th>Member ID</th>
                <th>Description</th>
                <th>Date</th>
                <th>Resolved</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {complains.map((c) => (
                <tr key={c.id}>
                  <td className="fw-semibold">{c.id}</td>
                  <td>{c.houseId}</td>
                  <td>
                    {c.memberId ?? <span className="text-muted">N/A</span>}
                  </td>
                  <td style={{ maxWidth: "300px", whiteSpace: "normal" }}>
                    {c.description}
                  </td>
                  <td>
                    {c.complainDate
                      ? new Date(c.complainDate).toLocaleString()
                      : "-"}
                  </td>
                  <td>
                    {c.isResolved ? (
                      <span className="text-success" title="Resolved">
                        <i className="bi bi-check-circle-fill fs-5"></i>
                      </span>
                    ) : (
                      <span className="text-danger" title="Not resolved">
                        <i className="bi bi-x-circle-fill fs-5"></i>
                      </span>
                    )}
                  </td>
                  <td>
                    <button
                      className="btn btn-sm btn-info me-2 shadow-sm"
                      onClick={() => handleEdit(c)}
                    >
                      ✏️
                    </button>
                    <button
                      className="btn btn-sm btn-danger shadow-sm"
                      onClick={() => handleDelete(c.id)}
                    >
                      🗑️
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

export default ComplainManager;
