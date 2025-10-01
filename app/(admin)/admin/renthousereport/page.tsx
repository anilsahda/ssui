"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface House {
  id: number;
  name: string;
}

interface RentHouseReport {
  id: number;
  houseId: number;
  rentAmount: number;
  tenantName: string;
  duration: string;
  house?: House;
}

const RentHouseReportsManager: React.FC = () => {
  const [reports, setReports] = useState<RentHouseReport[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [form, setForm] = useState<Partial<RentHouseReport>>({});
  const [editing, setEditing] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://localhost:7293/api/RentHouseReports";
  const HOUSES_API = "https://localhost:7293/api/Houses";

  useEffect(() => {
    fetchReports();
    fetchHouses();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setReports(data);
    } catch (error) {
      setError("Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  const fetchHouses = async () => {
    try {
      const res = await fetch(HOUSES_API);
      const data = await res.json();
      setHouses(data);
    } catch (error) {
      setError("Failed to fetch houses.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "houseId" || name === "rentAmount" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (
      !form.houseId ||
      !form.rentAmount ||
      !form.tenantName ||
      !form.duration
    ) {
      setError("All fields are required.");
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
        throw new Error("Failed to save report.");
      }

      await fetchReports();
      resetForm();
    } catch (error) {
      setError("Error saving report.");
    }
  };

  const handleEdit = (report: RentHouseReport) => {
    setForm(report);
    setEditing(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const response = await fetch(`${API_URL}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Failed to delete report.");
      }

      await fetchReports();
    } catch (error) {
      setError("Failed to delete the report.");
    }
  };

  const resetForm = () => {
    setForm({});
    setEditing(false);
    setError(null);
  };

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h2 className="fw-bold"> Rent House Reports</h2>
        <p className="text-muted">Manage house rental records efficiently.</p>
      </div>

      <form
        className="border p-4 mb-5 rounded bg-light shadow-sm"
        onSubmit={handleSubmit}
      >
        <h5 className="mb-3">{editing ? " Edit Report" : " Add Report"}</h5>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label">House</label>
            <select
              className="form-select"
              name="houseId"
              value={form.houseId || ""}
              onChange={handleChange}
              required
            >
              <option value="">-- Select House --</option>
              {houses.map((h) => (
                <option key={h.id} value={h.id}>
                  {h.name}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Rent Amount</label>
            <input
              type="number"
              className="form-control"
              name="rentAmount"
              value={form.rentAmount || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Tenant Name</label>
            <input
              type="text"
              className="form-control"
              name="tenantName"
              value={form.tenantName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-6">
            <label className="form-label">Duration</label>
            <input
              type="text"
              className="form-control"
              name="duration"
              value={form.duration || ""}
              onChange={handleChange}
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
            {editing ? "Update Report" : "Create Report"}
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

      <h5 className="mb-3"> Existing Reports</h5>
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <p className="text-muted">No reports found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>House</th>
                <th>Rent</th>
                <th>Tenant</th>
                <th>Duration</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className="badge bg-secondary">{r.id}</span>
                  </td>
                  <td>{r.house?.name || `#${r.houseId}`}</td>
                  <td>${r.rentAmount.toLocaleString()}</td>
                  <td>{r.tenantName}</td>
                  <td>{r.duration}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(r)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(r.id)}
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

export default RentHouseReportsManager;
