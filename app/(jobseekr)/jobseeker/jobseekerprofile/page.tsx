"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface JobSeekerProfile {
  id: number;
  fullName: string;
  email: string;
  mobile: string;
  skills: string;
  experience: number; // in years
  resumeUrl?: string;
}

export default function JobSeekersPage() {
  const [jobSeekers, setJobSeekers] = useState<JobSeekerProfile[]>([]);
  const [formData, setFormData] = useState<JobSeekerProfile>({
    id: 0,
    fullName: "",
    email: "",
    mobile: "",
    skills: "",
    experience: 0,
    resumeUrl: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all job seekers
  const fetchJobSeekers = async () => {
    try {
      const res = await axios.get(`${API_BASE}/JobSeeker`);
      setJobSeekers(res.data);
    } catch (err) {
      console.error("Error fetching job seekers:", err);
    }
  };

  useEffect(() => {
    fetchJobSeekers();
  }, []);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "experience" ? Number(value) : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/JobSeeker/${editingId}`, formData);
        alert("Job seeker updated successfully!");
      } else {
        await axios.post(`${API_BASE}/JobSeeker`, formData);
        alert("Job seeker created successfully!");
      }
      setFormData({
        id: 0,
        fullName: "",
        email: "",
        mobile: "",
        skills: "",
        experience: 0,
        resumeUrl: "",
      });
      setEditingId(null);
      fetchJobSeekers();
    } catch (err) {
      console.error("Error saving job seeker:", err);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Edit existing seeker
  const handleEdit = (seeker: JobSeekerProfile) => {
    setFormData(seeker);
    setEditingId(seeker.id);
  };

  // Delete seeker
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this job seeker?")) return;
    try {
      await axios.delete(`${API_BASE}/JobSeeker/${id}`);
      alert("Job seeker deleted successfully!");
      fetchJobSeekers();
    } catch (err) {
      console.error("Error deleting job seeker:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        👤 Job Seekers Management
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Mobile</label>
            <input
              type="text"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Skills</label>
            <textarea
              name="skills"
              value={formData.skills}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Experience (Years)</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              min={0}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Resume URL</label>
            <input
              type="text"
              name="resumeUrl"
              value={formData.resumeUrl || ""}
              onChange={handleChange}
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
          {editingId ? "Update Job Seeker" : "Create Job Seeker"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Full Name</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Mobile</th>
            <th className="p-3 border-b">Skills</th>
            <th className="p-3 border-b">Experience</th>
            <th className="p-3 border-b">Resume</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobSeekers.length === 0 ? (
            <tr>
              <td colSpan={8} className="text-center p-4 text-gray-500">
                No job seekers found.
              </td>
            </tr>
          ) : (
            jobSeekers.map((seeker) => (
              <tr key={seeker.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{seeker.id}</td>
                <td className="p-3 border-b">{seeker.fullName}</td>
                <td className="p-3 border-b">{seeker.email}</td>
                <td className="p-3 border-b">{seeker.mobile}</td>
                <td className="p-3 border-b">{seeker.skills}</td>
                <td className="p-3 border-b">{seeker.experience}</td>
                <td className="p-3 border-b">
                  {seeker.resumeUrl ? (
                    <a
                      href={seeker.resumeUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:underline"
                    >
                      View Resume
                    </a>
                  ) : (
                    "N/A"
                  )}
                </td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(seeker)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(seeker.id)}
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
