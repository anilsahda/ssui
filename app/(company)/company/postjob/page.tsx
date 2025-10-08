"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface Company {
  id: number;
  name: string;
  email?: string;
}

interface PostJob {
  id: number;
  companyId: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  company?: Company;
}

export default function PostJobsPage() {
  const [jobs, setJobs] = useState<PostJob[]>([]);
  const [formData, setFormData] = useState<PostJob>({
    id: 0,
    companyId: 0,
    title: "",
    description: "",
    location: "",
    salary: "",
  });
  const [loading, setLoading] = useState(false);

  // Fetch all post jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/PostJob`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching post jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["companyId"].includes(name) ? Number(value) : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await axios.post(`${API_BASE}/PostJob`, formData);
      alert("Post job created successfully!");
      setFormData({
        id: 0,
        companyId: 0,
        title: "",
        description: "",
        location: "",
        salary: "",
      });
      fetchJobs();
    } catch (err) {
      console.error("Error creating post job:", err);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        📌 Post Jobs
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
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Title</label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Description</label>
            <textarea
              name="description"
              value={formData.description}
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
            <label className="block font-medium mb-1">Salary</label>
            <input
              type="text"
              name="salary"
              value={formData.salary}
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
          Create Post Job
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Company</th>
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Description</th>
            <th className="p-3 border-b">Location</th>
            <th className="p-3 border-b">Salary</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No post jobs found.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{job.id}</td>
                <td className="p-3 border-b">{job.company?.name || "-"}</td>
                <td className="p-3 border-b">{job.title}</td>
                <td className="p-3 border-b">{job.description}</td>
                <td className="p-3 border-b">{job.location}</td>
                <td className="p-3 border-b">{job.salary}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
