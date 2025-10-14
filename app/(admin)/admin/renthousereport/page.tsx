"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useRentHouseStore } from "../store/renthousereport";

const API_URL = "https://localhost:7255/api/RentHouseReport";
const HOUSES_API = "https://localhost:7255/api/House";

const RentHouseReportsManager: React.FC = () => {
  const {
    reports,
    houses,
    form,
    editing,
    loading,
    error,
    setReports,
    setHouses,
    setForm,
    setEditing,
    setLoading,
    setError,
    resetForm,
  } = useRentHouseStore();

  // ✅ Fetch Reports
  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_URL);
      const data = await res.json();
      if (Array.isArray(data)) setReports(data);
      else throw new Error("Unexpected reports response format.");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch rent reports.");
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Fetch Houses
  const fetchHouses = async () => {
    try {
      const res = await fetch(HOUSES_API);
      const data = await res.json();
      if (Array.isArray(data)) setHouses(data);
      else throw new Error("Unexpected houses response format.");
    } catch (err) {
      console.error(err);
      setError("Failed to fetch houses.");
      setHouses([]);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchHouses();
  }, []);

  // ✅ Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]:
        name === "houseId" || name === "rentAmount" ? parseInt(value) : value,
    });
  };

  // ✅ Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (
      !form.houseId ||
      !form.rentAmount ||
      !form.tenantName ||
      !form.duration ||
      !form.rentStartDate ||
      !form.rentEndDate ||
      !form.renterName
    ) {
      setError("All fields are required.");
      return;
    }

    try {
      const method = editing ? "PUT" : "POST";
      const url = editing ? `${API_URL}/${form.id}` : API_URL;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error("Failed to save report.");

      await fetchReports();
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Error saving rent report.");
    }
  };

  // ✅ Edit report
  const handleEdit = (report: any) => {
    setForm(report);
    setEditing(true);
    setError(null);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete report
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed.");
      await fetchReports();
    } catch (err) {
      console.error(err);
      setError("Failed to delete report.");
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h2 className="fw-bold">🏠 Rent House Reports</h2>
        <p className="text-muted">
          Manage and track rental agreements and house rent reports.
        </p>
      </div>

      <form
        className="border p-4 mb-5 rounded bg-light shadow-sm"
        onSubmit={handleSubmit}
      >
        <h5 className="mb-3">{editing ? "Edit Report" : "Add New Report"}</h5>

        {error && <div className="alert alert-danger">{error}</div>}

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
                  {h.houseNumber} - {h.address}
                </option>
              ))}
            </select>
          </div>

          <div className="col-md-6">
            <label className="form-label">Rent Amount (₹)</label>
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
            <label className="form-label">Renter Name</label>
            <input
              type="text"
              className="form-control"
              name="renterName"
              value={form.renterName || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
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

          <div className="col-md-4">
            <label className="form-label">Rent Start Date</label>
            <input
              type="date"
              className="form-control"
              name="rentStartDate"
              value={form.rentStartDate?.substring(0, 10) || ""}
              onChange={handleChange}
              required
            />
          </div>

          <div className="col-md-4">
            <label className="form-label">Rent End Date</label>
            <input
              type="date"
              className="form-control"
              name="rentEndDate"
              value={form.rentEndDate?.substring(0, 10) || ""}
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
            />{" "}
            {editing ? "Update Report" : "Create Report"}
          </button>
          {editing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              <i className="bi bi-x-circle" /> Cancel
            </button>
          )}
        </div>
      </form>

      <h5 className="mb-3">Existing Rent Reports</h5>
      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading rent reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <p className="text-muted">No rent reports found.</p>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>House</th>
                <th>Tenant</th>
                <th>Renter</th>
                <th>Rent</th>
                <th>Duration</th>
                <th>Start</th>
                <th>End</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>
                    <span className="badge bg-secondary">{r.id}</span>
                  </td>
                  <td>{r.house?.houseNumber || `#${r.houseId}`}</td>
                  <td>{r.tenantName}</td>
                  <td>{r.renterName}</td>
                  <td>₹{r.rentAmount.toLocaleString()}</td>
                  <td>{r.duration}</td>
                  <td>{new Date(r.rentStartDate).toLocaleDateString()}</td>
                  <td>{new Date(r.rentEndDate).toLocaleDateString()}</td>
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
