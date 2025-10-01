"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface HouseReport {
  id: number;
  houseId: number;
  reportDetails: string;
  reportDate: string;
}

const API_BASE = "https://localhost:7293/api/HouseReports";

const HouseReportsManager: React.FC = () => {
  const [reports, setReports] = useState<HouseReport[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<HouseReport>>({
    houseId: undefined,
    reportDetails: "",
    reportDate: new Date().toISOString(),
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setLoading(true);
      const response = await fetch(API_BASE);
      if (!response.ok) throw new Error("Failed to fetch reports.");
      const data: HouseReport[] = await response.json();
      setReports(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error loading reports");
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.houseId || !form.reportDetails) {
      alert("House ID and Report Details are required.");
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${API_BASE}/${form.id}` : API_BASE;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(errorText);
      }

      await fetchReports();
      resetForm();
    } catch (err: any) {
      alert(err.message || "Error submitting the form");
    }
  };

  const handleEdit = (report: HouseReport) => {
    setForm({
      id: report.id,
      houseId: report.houseId,
      reportDetails: report.reportDetails,
      reportDate: report.reportDate,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this report?")) return;

    try {
      const response = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete");

      await fetchReports();
    } catch (err: any) {
      alert(err.message || "Delete failed");
    }
  };

  const resetForm = () => {
    setForm({
      houseId: undefined,
      reportDetails: "",
      reportDate: new Date().toISOString(),
    });
    setIsEditing(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center"> House Reports Manager</h2>

      {error && (
        <div className="alert alert-danger shadow-sm" role="alert">
          {error}
        </div>
      )}

      <div className="card shadow-sm mb-5">
        <div className="card-header bg-primary text-white">
          <h4 className="mb-0">
            {isEditing ? "Edit Report" : "Add New Report"}
          </h4>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-3">
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
                  placeholder="Enter House ID"
                  required
                />
              </div>

              <div className="col-md-5">
                <label
                  htmlFor="reportDetails"
                  className="form-label fw-semibold"
                >
                  Report Details <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="reportDetails"
                  name="reportDetails"
                  rows={3}
                  value={form.reportDetails ?? ""}
                  onChange={handleInputChange}
                  placeholder="Describe the report details"
                  required
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="reportDate" className="form-label fw-semibold">
                  Report Date
                </label>
                <input
                  type="datetime-local"
                  className="form-control"
                  id="reportDate"
                  name="reportDate"
                  value={form.reportDate?.substring(0, 16) || ""}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="mt-4 d-flex align-items-center">
              <button type="submit" className="btn btn-success me-3">
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
        </div>
      </div>

      <h4 className="mb-3">Existing House Reports</h4>

      {loading ? (
        <div className="text-center my-5">
          <div
            className="spinner-border text-primary"
            role="status"
            aria-hidden="true"
          ></div>
          <div className="mt-2">Loading reports...</div>
        </div>
      ) : reports.length === 0 ? (
        <div className="alert alert-info text-center">
          No reports available. Add a new report above.
        </div>
      ) : (
        <div className="table-responsive shadow-sm rounded">
          <table className="table table-hover align-middle">
            <thead className="table-primary">
              <tr>
                <th scope="col" style={{ width: "5%" }}>
                  ID
                </th>
                <th scope="col" style={{ width: "10%" }}>
                  House ID
                </th>
                <th scope="col" style={{ width: "50%" }}>
                  Details
                </th>
                <th scope="col" style={{ width: "20%" }}>
                  Date
                </th>
                <th scope="col" style={{ width: "15%" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id}>
                  <td>{r.id}</td>
                  <td>
                    <span className="badge bg-info text-dark">{r.houseId}</span>
                  </td>
                  <td>{r.reportDetails}</td>
                  <td>{new Date(r.reportDate).toLocaleString()}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(r)}
                      title="Edit Report"
                    >
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(r.id)}
                      title="Delete Report"
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

export default HouseReportsManager;
