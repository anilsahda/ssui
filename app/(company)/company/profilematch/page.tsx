"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface ProfileMatch {
  id: number;
  companyId: number;
  jobSeekerId: number;
  matchScore: number;
}

export default function ProfileMatchesPage() {
  const [matches, setMatches] = useState<ProfileMatch[]>([]);
  const [formData, setFormData] = useState<ProfileMatch>({
    id: 0,
    companyId: 0,
    jobSeekerId: 0,
    matchScore: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all profile matches
  const fetchMatches = async () => {
    try {
      const res = await axios.get(`${API_BASE}/ProfileMatch`);
      setMatches(res.data);
    } catch (err) {
      console.error("Error fetching profile matches:", err);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["companyId", "jobSeekerId", "matchScore"].includes(name)
        ? Number(value)
        : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/ProfileMatch/${editingId}`, formData);
        alert("Profile match updated successfully!");
      } else {
        await axios.post(`${API_BASE}/ProfileMatch`, formData);
        alert("Profile match created successfully!");
      }
      setFormData({ id: 0, companyId: 0, jobSeekerId: 0, matchScore: 0 });
      setEditingId(null);
      fetchMatches();
    } catch (err) {
      console.error("Error saving profile match:", err);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Edit profile match
  const handleEdit = (match: ProfileMatch) => {
    setFormData(match);
    setEditingId(match.id);
  };

  // Delete profile match
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this profile match?")) return;
    try {
      await axios.delete(`${API_BASE}/ProfileMatch/${id}`);
      alert("Profile match deleted successfully!");
      fetchMatches();
    } catch (err) {
      console.error("Error deleting profile match:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">
        🔗 Profile Matches
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Company ID</label>
            <input
              type="number"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-green-200"
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
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-green-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Match Score</label>
            <input
              type="number"
              name="matchScore"
              value={formData.matchScore}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-green-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-5 py-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {editingId ? "Update Profile Match" : "Create Profile Match"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Company ID</th>
            <th className="p-3 border-b">Job Seeker ID</th>
            <th className="p-3 border-b">Match Score</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {matches.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No profile matches found.
              </td>
            </tr>
          ) : (
            matches.map((match) => (
              <tr key={match.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{match.id}</td>
                <td className="p-3 border-b">{match.companyId}</td>
                <td className="p-3 border-b">{match.jobSeekerId}</td>
                <td className="p-3 border-b">{match.matchScore}</td>
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
