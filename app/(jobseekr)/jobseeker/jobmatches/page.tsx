"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7115/api";

interface JobMatch {
  id: number;
  jobSeekerId: number;
  matchingJobId: number;
}

export default function JobMatchesPage() {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [formData, setFormData] = useState<JobMatch>({
    id: 0,
    jobSeekerId: 0,
    matchingJobId: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch Job Matches
  const fetchJobMatches = async () => {
    try {
      const res = await axios.get(`${API_BASE}/JobMatches`);
      const data = Array.isArray(res.data) ? res.data : [];
      setJobMatches(data);
    } catch (err) {
      console.error("Error fetching job matches:", err);
      setJobMatches([]); // fallback to empty array
    }
  };

  useEffect(() => {
    fetchJobMatches();
  }, []);

  // ✅ Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value),
    });
  };

  // ✅ Handle form submit (Create / Update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/JobMatches/${editingId}`, formData);
        alert("✅ Job match updated successfully!");
      } else {
        await axios.post(`${API_BASE}/JobMatches`, formData);
        alert("✅ Job match created successfully!");
      }

      // Reset form
      setFormData({ id: 0, jobSeekerId: 0, matchingJobId: 0 });
      setEditingId(null);
      fetchJobMatches();
    } catch (err) {
      console.error("Error saving job match:", err);
      alert("❌ An error occurred while saving!");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit Job Match
  const handleEdit = (match: JobMatch) => {
    setFormData(match);
    setEditingId(match.id);
  };

  // ✅ Delete Job Match
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job match?")) return;
    try {
      await axios.delete(`${API_BASE}/JobMatches/${id}`);
      alert("🗑️ Job match deleted successfully!");
      fetchJobMatches();
    } catch (err) {
      console.error("Error deleting job match:", err);
      alert("❌ Failed to delete job match.");
    }
  };

  return (
    <div
      className="container py-5"
      style={{ fontFamily: "Inter, sans-serif", maxWidth: "900px" }}
    >
      <h1 className="text-center text-primary mb-5 fw-bold">
        🎯 Job Matches Management
      </h1>

      {/* ✅ Form Section */}
      <div className="card shadow-sm border-0 mb-5">
        <div className="card-header bg-primary text-white">
          {editingId ? "✏️ Edit Job Match" : "➕ Add Job Match"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Job Seeker ID</label>
                <input
                  type="number"
                  name="jobSeekerId"
                  value={formData.jobSeekerId}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Job Seeker ID"
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Matching Job ID
                </label>
                <input
                  type="number"
                  name="matchingJobId"
                  value={formData.matchingJobId}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Enter Matching Job ID"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              disabled={loading}
            >
              {loading
                ? "⏳ Processing..."
                : editingId
                ? "Update Job Match"
                : "Create Job Match"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light fw-bold">📋 Job Matches List</div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0 text-center">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Job Seeker ID</th>
                <th>Matching Job ID</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(jobMatches) && jobMatches.length > 0 ? (
                jobMatches.map((match) => (
                  <tr key={match.id}>
                    <td>{match.id}</td>
                    <td>{match.jobSeekerId}</td>
                    <td>{match.matchingJobId}</td>
                    <td>
                      <button
                        onClick={() => handleEdit(match)}
                        className="btn btn-warning btn-sm me-2"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(match.id)}
                        className="btn btn-danger btn-sm"
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-muted py-3">
                    No job matches found.
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
