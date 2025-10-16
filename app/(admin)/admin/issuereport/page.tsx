"use client";

import React, { useEffect } from "react";
import { useIssueReportStore } from "@/store/issueReportStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function IssueReportPage() {
  const {
    reports,
    formData,
    editingId,
    fetchReports,
    handleChange,
    handleSubmit,
    handleEdit,
    handleDelete,
    resetForm,
  } = useIssueReportStore();

  useEffect(() => {
    fetchReports();
  }, [fetchReports]);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4 fw-bold">📘 Issue Reports Management</h2>

      {/* Form Section */}
      <div className="card shadow-sm mb-4">
        <div className="card-body">
          <h5 className="card-title mb-3">
            {editingId ? "✏️ Edit Report" : "➕ Add New Report"}
          </h5>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <div className="row mb-3">
              <div className="col-md-4">
                <label className="form-label">Issue Book ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="issueBookId"
                  value={formData.issueBookId}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Report Date</label>
                <input
                  type="date"
                  className="form-control"
                  name="reportDate"
                  value={formData.reportDate}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </div>

              <div className="col-md-4">
                <label className="form-label">Remarks</label>
                <textarea
                  className="form-control"
                  name="remarks"
                  value={formData.remarks}
                  onChange={(e) => handleChange(e.target.name, e.target.value)}
                  required
                />
              </div>
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {editingId ? "Update" : "Save"}
            </button>
            {editingId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Reports Table */}
      <div className="card shadow-sm">
        <div className="card-body">
          <h5 className="card-title mb-3">📋 Reports List</h5>
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Issue Book ID</th>
                <th>Report Date</th>
                <th>Remarks</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id}>
                    <td>{report.id}</td>
                    <td>{report.issueBookId}</td>
                    <td>{new Date(report.reportDate).toLocaleDateString()}</td>
                    <td>{report.remarks}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-warning me-2"
                        onClick={() => handleEdit(report)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger"
                        onClick={() => handleDelete(report.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center">
                    No reports found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
