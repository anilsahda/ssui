"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Member {
  id: number;
  fullName: string;
}

interface MemberReport {
  id: number;
  memberId: number;
  reportDetails: string;
  reportDate: string;
  member?: Member;
}

const API_BASE = "https://localhost:7255/api/MemberReport";
const MEMBERS_API = "https://localhost:7255/api/Member";

const MemberReportsManager: React.FC = () => {
  const [reports, setReports] = useState<MemberReport[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<Partial<MemberReport>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
    fetchMembers();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      console.log("Fetched reports:", data);

      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format: reports is not an array");
      }

      setReports(data);
    } catch (err: any) {
      console.error("Error fetching reports:", err);
      setReports([]); // fallback to avoid .map error
      setError(err.message || "Failed to fetch reports.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch(MEMBERS_API);
      const data = await res.json();

      if (!Array.isArray(data)) {
        throw new Error("Unexpected data format: members is not an array");
      }

      setMembers(data);
    } catch (err: any) {
      console.error("Error fetching members:", err);
      setMembers([]);
      setError(err.message || "Failed to fetch members.");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "memberId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.memberId || !form.reportDetails) {
      setError("Please select a member and enter report details.");
      return;
    }

    const payload = {
      ...form,
      reportDate: new Date().toISOString(),
    };

    try {
      const url = isEditing && form.id ? `${API_BASE}/${form.id}` : API_BASE;
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        throw new Error("Failed to save the report.");
      }

      resetForm();
      await fetchReports();
    } catch (err: any) {
      console.error("Error saving report:", err);
      setError(err.message || "Failed to save the report.");
    }
  };

  const handleEdit = (report: MemberReport) => {
    setForm({
      id: report.id,
      memberId: report.memberId,
      reportDetails: report.reportDetails,
      reportDate: report.reportDate,
    });
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this report?")) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete the report.");
      await fetchReports();
    } catch (err: any) {
      console.error("Error deleting report:", err);
      setError(err.message || "Failed to delete the report.");
    }
  };

  const resetForm = () => {
    setForm({});
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="container py-4">
      <div className="mb-4 text-center">
        <h2 className="fw-bold">Member Reports</h2>
        <p className="text-muted">Manage and view member-generated reports.</p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="border p-4 mb-4 rounded bg-light shadow-sm"
      >
        <h5 className="mb-3">{isEditing ? "Edit Report" : "Add New Report"}</h5>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="mb-3">
          <label htmlFor="memberId" className="form-label">
            Member
          </label>
          <select
            className="form-select"
            id="memberId"
            name="memberId"
            value={form.memberId ?? ""}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Member --</option>
            {members.map((m) => (
              <option key={m.id} value={m.id}>
                {m.fullName}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="reportDetails" className="form-label">
            Report Details
          </label>
          <textarea
            className="form-control"
            id="reportDetails"
            name="reportDetails"
            rows={4}
            value={form.reportDetails ?? ""}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <div>
          <button type="submit" className="btn btn-success me-2">
            <i
              className={`bi ${
                isEditing ? "bi-pencil-square" : "bi-plus-circle"
              }`}
            ></i>{" "}
            {isEditing ? "Update Report" : "Add Report"}
          </button>
          {isEditing && (
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

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status" />
          <p className="mt-2">Loading reports...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Member</th>
                <th>Details</th>
                <th>Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(reports) && reports.length > 0 ? (
                reports.map((report) => (
                  <tr key={report.id}>
                    <td>
                      <span className="badge bg-secondary">{report.id}</span>
                    </td>
                    <td>{report.member?.fullName ?? `#${report.memberId}`}</td>
                    <td>{report.reportDetails}</td>
                    <td>
                      <span className="text-muted">
                        {new Date(report.reportDate).toLocaleString()}
                      </span>
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(report)}
                      >
                        <i className="bi bi-pencil-fill"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(report.id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No reports available.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MemberReportsManager;
