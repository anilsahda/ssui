"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface House {
  id: number;
  name: string;
}

interface SellHouseReport {
  id: number;
  houseId: number;
  sellPrice: number;
  buyerName: string;
  sellDate?: string;
  house?: House;
}

const SellHouseReportsManager: React.FC = () => {
  const [reports, setReports] = useState<SellHouseReport[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [form, setForm] = useState<Partial<SellHouseReport>>({});
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = "https://localhost:7255/api/SellHouseReport";
  const HOUSES_API = "https://localhost:7255/api/House";

  useEffect(() => {
    fetchReports();
    fetchHouses();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      const data = await response.json();

      if (Array.isArray(data)) {
        setReports(data);
      } else {
        console.error("Unexpected API response for reports:", data);
        setReports([]);
        setError("Unexpected response format for sell house reports.");
      }
    } catch (err) {
      console.error("Error fetching reports:", err);
      setError("Error fetching sell house reports.");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchHouses = async () => {
    try {
      const res = await fetch(HOUSES_API);
      const data = await res.json();

      if (Array.isArray(data)) {
        setHouses(data);
      } else {
        console.error("Unexpected API response for houses:", data);
        setHouses([]);
        setError("Unexpected response format for houses.");
      }
    } catch (err) {
      console.error("Error fetching houses:", err);
      setError("Error fetching house data.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]:
        name === "houseId" || name === "sellPrice" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.houseId || !form.sellPrice || !form.buyerName) {
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
        throw new Error(errorText || "Failed to save report.");
      }

      await fetchReports();
      resetForm();
    } catch (err) {
      console.error("Error saving report:", err);
      setError("Error saving report.");
    }
  };

  const handleEdit = (report: SellHouseReport) => {
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

      if (!response.ok) throw new Error("Failed to delete");

      await fetchReports();
    } catch (err) {
      console.error("Error deleting report:", err);
      setError("Error deleting report.");
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
        <h2 className="fw-bold">Sell House Reports</h2>
        <p className="text-muted">
          Track property sales and buyers efficiently.
        </p>
      </div>

      <form
        className="border p-4 mb-5 rounded bg-light shadow-sm"
        onSubmit={handleSubmit}
      >
        <h5 className="mb-3">{editing ? "Edit Report" : "Add Sell Report"}</h5>

        {error && <div className="alert alert-danger">{error}</div>}

        <div className="row g-3">
          <div className="col-md-6">
            <label htmlFor="houseId" className="form-label">
              House
            </label>
            <select
              id="houseId"
              name="houseId"
              className="form-select"
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
            <label htmlFor="sellPrice" className="form-label">
              Sell Price
            </label>
            <input
              id="sellPrice"
              name="sellPrice"
              type="number"
              className="form-control"
              value={form.sellPrice ?? ""}
              onChange={handleChange}
              required
              min={0}
            />
          </div>

          <div className="col-md-6">
            <label htmlFor="buyerName" className="form-label">
              Buyer Name
            </label>
            <input
              id="buyerName"
              name="buyerName"
              type="text"
              className="form-control"
              value={form.buyerName || ""}
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

      <h5 className="mb-3">Existing Sell Reports</h5>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <p className="text-center text-muted">No sell house reports found.</p>
      ) : (
        <div className="row g-3">
          {reports.map((report) => (
            <div key={report.id} className="col-md-6">
              <div className="card shadow-sm">
                <div className="card-body">
                  <h6 className="card-title">
                    {report.house?.name || `House #${report.houseId}`}{" "}
                    <span className="badge bg-secondary">{report.id}</span>
                  </h6>
                  <p className="card-text mb-1">
                    <strong>Price:</strong> ${report.sellPrice.toLocaleString()}
                  </p>
                  <p className="card-text mb-1">
                    <strong>Buyer:</strong> {report.buyerName}
                  </p>
                  <p className="card-text mb-3">
                    <strong>Date:</strong>{" "}
                    {report.sellDate
                      ? new Date(report.sellDate).toLocaleString()
                      : "-"}
                  </p>
                  <button
                    className="btn btn-sm btn-outline-primary me-2"
                    onClick={() => handleEdit(report)}
                  >
                    <i className="bi bi-pencil-square"></i> Edit
                  </button>
                  <button
                    className="btn btn-sm btn-outline-danger"
                    onClick={() => handleDelete(report.id)}
                  >
                    <i className="bi bi-trash-fill"></i> Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellHouseReportsManager;
