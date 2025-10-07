"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Complain {
  id: number;
  houseId: number;
  memberId?: number | null;
  description: string;
  complainDate: string;
  isResolved: boolean;
}

const ComplainManager: React.FC = () => {
  const API_URL = "https://localhost:7255/api/Complain";

  const [complains, setComplains] = useState<Complain[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState<Partial<Complain>>({
    houseId: undefined,
    memberId: undefined,
    description: "",
    complainDate: new Date().toISOString(),
    isResolved: false,
  });
  const [isEditing, setIsEditing] = useState<boolean>(false);

  useEffect(() => {
    fetchComplains();
  }, []);

  const fetchComplains = async () => {
    try {
      setLoading(true);
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to load complains.");

      const data = await res.json();

      // Ensure data is an array before setting state
      if (Array.isArray(data)) {
        setComplains(data);
      } else if (data && Array.isArray(data.complains)) {
        // If API response wraps the array in an object, adjust here
        setComplains(data.complains);
      } else {
        // Fallback to empty array if data shape unexpected
        setComplains([]);
        setError("Unexpected data format received from server.");
      }
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error fetching complains");
      setComplains([]);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.houseId || !form.description?.trim()) {
      alert("House ID and Description are required.");
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${API_URL}/${form.id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorText = await res.text();
        throw new Error(errorText);
      }

      await fetchComplains();
      resetForm();
    } catch (err: any) {
      alert(err.message || "Error submitting form");
    }
  };

  const handleEdit = (complain: Complain) => {
    setForm({ ...complain });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this complain?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed.");
      await fetchComplains();
    } catch (err: any) {
      alert(err.message || "Error deleting complain");
    }
  };

  const resetForm = () => {
    setForm({
      houseId: undefined,
      memberId: undefined,
      description: "",
      complainDate: new Date().toISOString(),
      isResolved: false,
    });
    setIsEditing(false);
  };

  return (
    <div className="container my-5">
      <h2 className="mb-4 text-primary fw-bold">Complain Manager</h2>

      {error && (
        <div className="alert alert-danger shadow-sm" role="alert">
          {error}
        </div>
      )}

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="border rounded-3 p-4 mb-5 shadow-sm bg-white"
      >
        <h4 className="mb-4 text-secondary">
          {isEditing ? "Edit Complain" : "Add New Complain"}
        </h4>

        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="houseId" className="form-label fw-semibold">
              House ID <span className="text-danger">*</span>
            </label>
            <input
              type="number"
              className="form-control"
              id="houseId"
              name="houseId"
              value={form.houseId ?? ""}
              onChange={handleInputChange}
              required
              placeholder="Enter House ID"
              min={1}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="memberId" className="form-label fw-semibold">
              Member ID (optional)
            </label>
            <input
              type="number"
              className="form-control"
              id="memberId"
              name="memberId"
              value={form.memberId ?? ""}
              onChange={handleInputChange}
              placeholder="Enter Member ID"
              min={1}
            />
          </div>

          <div className="col-md-4">
            <label htmlFor="complainDate" className="form-label fw-semibold">
              Complain Date
            </label>
            <input
              type="datetime-local"
              className="form-control"
              id="complainDate"
              name="complainDate"
              value={form.complainDate?.substring(0, 16) || ""}
              onChange={handleInputChange}
              max={new Date().toISOString().substring(0, 16)}
            />
          </div>
        </div>

        <div className="mt-3">
          <label htmlFor="description" className="form-label fw-semibold">
            Description <span className="text-danger">*</span>
          </label>
          <textarea
            className="form-control"
            id="description"
            name="description"
            rows={4}
            value={form.description}
            onChange={handleInputChange}
            required
            placeholder="Describe the complain in detail"
          ></textarea>
        </div>

        <div className="form-check form-switch mt-4 mb-4">
          <input
            className="form-check-input"
            type="checkbox"
            id="isResolved"
            name="isResolved"
            checked={form.isResolved}
            onChange={handleInputChange}
          />
          <label className="form-check-label fw-semibold" htmlFor="isResolved">
            Mark as Resolved
          </label>
        </div>

        <div>
          <button type="submit" className="btn btn-primary me-3 shadow-sm">
            {isEditing ? (
              <>
                <i className="bi bi-pencil-square me-2"></i> Update
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i> Create
              </>
            )}
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
      <h4 className="mb-3 text-secondary">All Complains</h4>

      {loading ? (
        <div className="text-center py-5">
          <div
            className="spinner-border text-primary"
            role="status"
            aria-hidden="true"
          ></div>
          <span className="visually-hidden">Loading...</span>
        </div>
      ) : !Array.isArray(complains) || complains.length === 0 ? (
        <p className="text-muted fst-italic">No complains found.</p>
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
                  <td>{new Date(c.complainDate).toLocaleString()}</td>
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
                      title="Edit"
                      onClick={() => handleEdit(c)}
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-danger shadow-sm"
                      title="Delete"
                      onClick={() => handleDelete(c.id)}
                    >
                      <i className="bi bi-trash"></i>
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
