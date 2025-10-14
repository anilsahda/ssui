"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useHouseReportStore, HouseReport } from "../store/housereport";

const API_BASE = "https://localhost:7255/api/HouseReport";

const HouseReportsManager: React.FC = () => {
  const {
    reports,
    loading,
    error,
    form,
    isEditing,
    setReports,
    setLoading,
    setError,
    setForm,
    setIsEditing,
    resetForm,
  } = useHouseReportStore();

  // ✅ Fetch Reports
  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch reports.");
      const data = await res.json();
      if (!Array.isArray(data)) throw new Error("Invalid data format.");
      setReports(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // ✅ Input change
  const handleInputChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.houseId || !form.reportDetails) {
      Swal.fire(
        "Validation Error",
        "House ID and Report Details are required.",
        "warning"
      );
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${API_BASE}/${form.id}` : API_BASE;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());

      Swal.fire({
        icon: "success",
        title: isEditing ? "Updated Successfully" : "Created Successfully",
        showConfirmButton: false,
        timer: 1500,
      });

      await fetchReports();
      resetForm();
    } catch (err: any) {
      Swal.fire("Error", err.message || "Error submitting the form", "error");
    }
  };

  // ✅ Edit report
  const handleEdit = (report: HouseReport) => {
    setForm(report);
    setIsEditing(true);
  };

  // ✅ Delete report
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete report.");
      Swal.fire("Deleted!", "The report has been deleted.", "success");
      await fetchReports();
    } catch (err: any) {
      Swal.fire("Error", err.message || "Delete failed", "error");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-lg border-0">
        <div className="card-header bg-primary text-white">
          <h3 className="mb-0 text-center">
            🏠 {isEditing ? "Edit House Report" : "Add New House Report"}
          </h3>
        </div>

        <div className="card-body bg-light">
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
                  required
                  placeholder="Enter House ID"
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
                  required
                  placeholder="Describe the issue or report details"
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

            <div className="mt-4">
              <button type="submit" className="btn btn-success me-3">
                {isEditing ? "Update" : "Create"}
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

      {/* Reports Table */}
      <div className="mt-5 card shadow-sm">
        <div className="card-header bg-dark text-white d-flex justify-content-between align-items-center">
          <h4 className="mb-0">📋 Existing House Reports</h4>
          <span className="badge bg-light text-dark">
            {reports.length} total
          </span>
        </div>

        <div className="card-body p-0">
          {loading ? (
            <div className="text-center py-5">
              <div className="spinner-border text-primary" role="status"></div>
              <p className="mt-2">Loading reports...</p>
            </div>
          ) : reports.length === 0 ? (
            <div className="alert alert-info text-center m-3">
              No reports available.
            </div>
          ) : (
            <div className="table-responsive">
              <table className="table table-striped table-hover align-middle mb-0">
                <thead className="table-primary">
                  <tr>
                    <th>ID</th>
                    <th>House ID</th>
                    <th>Details</th>
                    <th>Date</th>
                    <th className="text-center">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {reports.map((r) => (
                    <tr key={r.id}>
                      <td>{r.id}</td>
                      <td>
                        <span className="badge bg-info text-dark">
                          {r.houseId}
                        </span>
                      </td>
                      <td>{r.reportDetails}</td>
                      <td>{new Date(r.reportDate).toLocaleString()}</td>
                      <td className="text-center">
                        <button
                          className="btn btn-sm btn-outline-primary me-2"
                          onClick={() => handleEdit(r)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-outline-danger"
                          onClick={() => handleDelete(r.id)}
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
      </div>

      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />
    </div>
  );
};

export default HouseReportsManager;
