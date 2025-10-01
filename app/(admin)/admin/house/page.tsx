"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface House {
  id: number;
  houseNumber: string;
  societyId: number;
  address: string;
  isAllocated: boolean;
}

const API_BASE = "https://localhost:7293/api/Houses";

const HousesManager: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<House>>({
    houseNumber: "",
    societyId: undefined,
    address: "",
    isAllocated: false,
  });
  const [isEditing, setIsEditing] = useState(false);

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const resp = await fetch(API_BASE);
      if (!resp.ok) throw new Error(`Error ${resp.status}`);
      const data = (await resp.json()) as House[];
      setHouses(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Failed to fetch houses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type, checked } = e.target;
    let val: any = value;
    if (type === "checkbox") val = checked;
    if (type === "number") val = value === "" ? undefined : parseInt(value, 10);
    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.houseNumber || form.societyId == null || !form.address) {
      alert("House number, Society ID, and address are required.");
      return;
    }

    try {
      let resp: Response;
      if (isEditing && form.id != null) {
        resp = await fetch(`${API_BASE}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        resp = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`${resp.status} - ${errText}`);
      }

      await fetchHouses();
      resetForm();
    } catch (err: any) {
      alert(err.message || "Error submitting");
    }
  };

  const startEdit = (h: House) => {
    setForm({
      id: h.id,
      houseNumber: h.houseNumber,
      societyId: h.societyId,
      address: h.address,
      isAllocated: h.isAllocated,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this house?")) return;

    try {
      const resp = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error(`Delete failed ${resp.status}`);
      await fetchHouses();
    } catch (err: any) {
      alert(err.message || "Error deleting");
    }
  };

  const resetForm = () => {
    setForm({
      houseNumber: "",
      societyId: undefined,
      address: "",
      isAllocated: false,
    });
    setIsEditing(false);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Houses Manager</h2>

          {error && (
            <div className="alert alert-danger" role="alert">
              {error}
            </div>
          )}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="border rounded p-4 mb-5 bg-light"
            noValidate
          >
            <h4 className="mb-4">
              {isEditing ? "Edit House" : "Add New House"}
            </h4>

            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="houseNumber" className="form-label fw-semibold">
                  House Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="houseNumber"
                  name="houseNumber"
                  value={form.houseNumber ?? ""}
                  onChange={handleChange}
                  required
                  placeholder="e.g. A-101"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="societyId" className="form-label fw-semibold">
                  Society ID <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="societyId"
                  name="societyId"
                  value={form.societyId ?? ""}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 5"
                  min={1}
                />
              </div>

              <div className="col-md-4 d-flex align-items-center">
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isAllocated"
                    name="isAllocated"
                    checked={form.isAllocated ?? false}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="isAllocated"
                    className="form-check-label fw-semibold"
                  >
                    Is Allocated
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label fw-semibold">
                  Address <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows={2}
                  value={form.address ?? ""}
                  onChange={handleChange}
                  required
                  placeholder="Full house address"
                />
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary me-2">
                {isEditing ? (
                  <>
                    <i className="bi bi-pencil-square me-1"></i> Update
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-1"></i> Create
                  </>
                )}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Houses Table */}
          <h4 className="mb-3">House List</h4>
          {loading ? (
            <div className="text-center py-5">
              <div
                className="spinner-border text-primary"
                role="status"
                aria-hidden="true"
              ></div>
              <span className="visually-hidden">Loading houses...</span>
            </div>
          ) : houses.length === 0 ? (
            <p className="text-center text-muted">No houses found.</p>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>ID</th>
                    <th>House Number</th>
                    <th>Society ID</th>
                    <th>Address</th>
                    <th>Allocated</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {houses.map((h) => (
                    <tr key={h.id}>
                      <td>{h.id}</td>
                      <td>{h.houseNumber}</td>
                      <td>{h.societyId}</td>
                      <td>{h.address}</td>
                      <td>
                        {h.isAllocated ? (
                          <span className="badge bg-success">Yes</span>
                        ) : (
                          <span className="badge bg-secondary">No</span>
                        )}
                      </td>
                      <td className="text-center">
                        <div
                          className="btn-group"
                          role="group"
                          aria-label="Actions"
                        >
                          <button
                            className="btn btn-sm btn-info"
                            title="Edit"
                            onClick={() => startEdit(h)}
                          >
                            <i className="bi bi-pencil"></i>
                          </button>
                          <button
                            className="btn btn-sm btn-danger"
                            title="Delete"
                            onClick={() => handleDelete(h.id)}
                          >
                            <i className="bi bi-trash"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Bootstrap Icons CDN */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />
    </div>
  );
};

export default HousesManager;
