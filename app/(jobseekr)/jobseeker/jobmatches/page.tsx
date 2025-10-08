"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface JobMatch {
  id: number;
  jobTitle: string;
  companyName: string;
  location: string;
  matchPercentage: number;
  jobSeekerId: number;
  jobId: number;
}

export default function JobMatchesPage() {
  const [jobMatches, setJobMatches] = useState<JobMatch[]>([]);
  const [formData, setFormData] = useState<JobMatch>({
    id: 0,
    jobTitle: "",
    companyName: "",
    location: "",
    matchPercentage: 0,
    jobSeekerId: 0,
    jobId: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all job matches
  const fetchJobMatches = async () => {
    try {
      const res = await axios.get(`${API_BASE}/JobMatches`);
      setJobMatches(res.data);
    } catch (err) {
      console.error("Error fetching job matches:", err);
    }
  };

  useEffect(() => {
    fetchJobMatches();
  }, []);

  // Handle form input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]:
        name === "matchPercentage" || name === "jobId" || name === "jobSeekerId"
          ? Number(value)
          : value,
    });
  };

  // Submit form (create or update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/JobMatches/${editingId}`, formData);
        alert("Job match updated successfully!");
      } else {
        await axios.post(`${API_BASE}/JobMatches`, formData);
        alert("Job match created successfully!");
      }
      setFormData({
        id: 0,
        jobTitle: "",
        companyName: "",
        location: "",
        matchPercentage: 0,
        jobSeekerId: 0,
        jobId: 0,
      });
      setEditingId(null);
      fetchJobMatches();
    } catch (err) {
      console.error("Error saving job match:", err);
      alert("An error occurred while saving!");
    } finally {
      setLoading(false);
    }
  };

  // Edit existing record
  const handleEdit = (jobMatch: JobMatch) => {
    setFormData(jobMatch);
    setEditingId(jobMatch.id);
  };

  // Delete record
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job match?")) return;
    try {
      await axios.delete(`${API_BASE}/JobMatches/${id}`);
      alert("Job match deleted successfully!");
      fetchJobMatches();
    } catch (err) {
      console.error("Error deleting job match:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🎯 Job Matches Management
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Job Title</label>
            <input
              type="text"
              name="jobTitle"
              value={formData.jobTitle}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Company Name</label>
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Location</label>
            <input
              type="text"
              name="location"
              value={formData.location}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Match Percentage</label>
            <input
              type="number"
              name="matchPercentage"
              value={formData.matchPercentage}
              onChange={handleChange}
              min="0"
              max="100"
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Job Seeker ID</label>
            <input
              type="number"
              name="jobSeekerId"
              value={formData.jobSeekerId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Job ID</label>
            <input
              type="number"
              name="jobId"
              value={formData.jobId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-5 py-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Job Match" : "Create Job Match"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Job Title</th>
            <th className="p-3 border-b">Company</th>
            <th className="p-3 border-b">Location</th>
            <th className="p-3 border-b">Match %</th>
            <th className="p-3 border-b">JobSeeker ID</th>
            <th className="p-3 border-b">Job ID</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobMatches.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center p-4 text-gray-500">
                No job matches found.
              </td>
            </tr>
          ) : (
            jobMatches.map((match) => (
              <tr key={match.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{match.id}</td>
                <td className="p-3 border-b">{match.jobTitle}</td>
                <td className="p-3 border-b">{match.companyName}</td>
                <td className="p-3 border-b">{match.location}</td>
                <td className="p-3 border-b">{match.matchPercentage}%</td>
                <td className="p-3 border-b">{match.jobSeekerId}</td>
                <td className="p-3 border-b">{match.jobId}</td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(match)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(match.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
