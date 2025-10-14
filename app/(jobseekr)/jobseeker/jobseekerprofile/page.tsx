"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "https://localhost:7115/api";

interface JobSeekerProfile {
  id: number;
  fullName: string;
  email: string;
  skills: string;
  experience: string; // string for input field, backend can accept number
  resumeUrl?: string;
  createdAt?: string;
}

export default function JobSeekersPage() {
  const [jobSeekers, setJobSeekers] = useState<JobSeekerProfile[]>([]);
  const [filteredSeekers, setFilteredSeekers] = useState<JobSeekerProfile[]>(
    []
  );
  const [formData, setFormData] = useState<JobSeekerProfile>({
    id: 0,
    fullName: "",
    email: "",
    skills: "",
    experience: "0",
    resumeUrl: "",
    createdAt: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // ✅ Fetch all job seekers
  const fetchJobSeekers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/JobSeeker`);
      const data = Array.isArray(res.data) ? res.data : res.data?.$values || [];
      setJobSeekers(data);
      setFilteredSeekers(data);
    } catch (err) {
      console.error("Error fetching job seekers:", err);
      setJobSeekers([]);
      setFilteredSeekers([]);
    }
  };

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  // ✅ Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // ✅ Handle resume file upload
  const handleResumeUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    try {
      setUploading(true);
      const res = await axios.post(`${API_BASE}/JobSeeker`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setFormData({ ...formData, resumeUrl: res.data.resumeUrl });
      alert("✅ Resume uploaded successfully!");
    } catch (err) {
      console.error("Error uploading resume:", err);
      alert("❌ Resume upload failed!");
    } finally {
      setUploading(false);
    }
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Exclude createdAt, convert experience to number if needed
      const { createdAt, ...payload } = formData;
      const payloadToSend = {
        ...payload,
        experience: Number(payload.experience),
      };

      if (editingId) {
        await axios.put(`${API_BASE}/JobSeeker/${editingId}`, payloadToSend);
        alert("✅ Job seeker updated successfully!");
      } else {
        await axios.post(`${API_BASE}/JobSeeker`, payloadToSend);
        alert("✅ Job seeker created successfully!");
      }

      // Reset form
      setFormData({
        id: 0,
        fullName: "",
        email: "",
        skills: "",
        experience: "0",
        resumeUrl: "",
        createdAt: "",
      });
      setEditingId(null);
      fetchJobSeekers();
    } catch (err) {
      console.error("Error saving job seeker:", err);
      alert("❌ Failed to save job seeker.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit job seeker
  const handleEdit = (seeker: JobSeekerProfile) => {
    setFormData(seeker);
    setEditingId(seeker.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete job seeker
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job seeker?")) return;
    try {
      await axios.delete(`${API_BASE}/JobSeeker/${id}`);
      alert("🗑️ Job seeker deleted successfully!");
      fetchJobSeekers();
    } catch (err) {
      console.error("Error deleting job seeker:", err);
      alert("❌ Failed to delete job seeker.");
    }
  };

  // ✅ Search/filter
  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const keyword = e.target.value.toLowerCase();
    const filtered = jobSeekers.filter(
      (j) =>
        j.fullName.toLowerCase().includes(keyword) ||
        j.email.toLowerCase().includes(keyword) ||
        j.skills.toLowerCase().includes(keyword)
    );
    setFilteredSeekers(filtered);
  };

  return (
    <div className="container py-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <h2 className="mb-4 text-center text-primary fw-bold">
        👤 Job Seekers Management
      </h2>

      {/* ✅ Form Section */}
      <div className="card mb-5 shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          {editingId ? "✏️ Edit Job Seeker" : "➕ Add New Job Seeker"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Full Name</label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter full name"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter email address"
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Experience (Years)
                </label>
                <input
                  type="text"
                  name="experience"
                  value={formData.experience}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter experience"
                />
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Skills</label>
                <textarea
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="List job seeker skills"
                />
              </div>

              {/* ✅ Resume Upload */}
              <div className="col-12">
                <label className="form-label fw-semibold">Resume</label>
                <input
                  type="file"
                  accept=".pdf,.doc,.docx"
                  className="form-control"
                  onChange={handleResumeUpload}
                  disabled={uploading}
                />
                {formData.resumeUrl && (
                  <a
                    href={formData.resumeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-link mt-2"
                  >
                    View Uploaded Resume
                  </a>
                )}
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              disabled={loading || uploading}
            >
              {loading
                ? "⏳ Processing..."
                : editingId
                ? "Update Job Seeker"
                : "Create Job Seeker"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Search */}
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="🔍 Search job seekers..."
          onChange={handleSearch}
        />
      </div>

      {/* ✅ Table Section */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light fw-bold">📋 Job Seeker List</div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0 text-center">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Skills</th>
                <th>Experience</th>
                <th>Resume</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredSeekers.length > 0 ? (
                filteredSeekers.map((seeker) => (
                  <tr key={seeker.id}>
                    <td>{seeker.id}</td>
                    <td>{seeker.fullName}</td>
                    <td>{seeker.email}</td>
                    <td>{seeker.skills}</td>
                    <td>{seeker.experience}</td>
                    <td>
                      {seeker.resumeUrl ? (
                        <a
                          href={seeker.resumeUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn btn-outline-primary btn-sm"
                        >
                          View
                        </a>
                      ) : (
                        "N/A"
                      )}
                    </td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(seeker)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(seeker.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center py-3 text-muted">
                    No job seekers found.
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
