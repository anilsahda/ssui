"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface PostJob {
  id: number;
  title: string;
  description: string;
  location: string;
  salary: string;
}

interface PostedJob {
  id: number;
  companyId: number;
  postJobId: number;
  postedDate: string;
  postJob?: PostJob;
}

export default function PostedJobsPage() {
  const [jobs, setJobs] = useState<PostedJob[]>([]);
  const [formData, setFormData] = useState<PostedJob>({
    id: 0,
    companyId: 0,
    postJobId: 0,
    postedDate: new Date().toISOString().slice(0, 10),
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all posted jobs
  const fetchJobs = async () => {
    try {
      const res = await axios.get(`${API_BASE}/PostedJob`);
      setJobs(res.data);
    } catch (err) {
      console.error("Error fetching posted jobs:", err);
    }
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["companyId", "postJobId"].includes(name) ? Number(value) : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/PostedJob/${editingId}`, formData);
        alert("Posted job updated successfully!");
      } else {
        await axios.post(`${API_BASE}/PostedJob`, formData);
        alert("Posted job created successfully!");
      }
      setFormData({
        id: 0,
        companyId: 0,
        postJobId: 0,
        postedDate: new Date().toISOString().slice(0, 10),
      });
      setEditingId(null);
      fetchJobs();
    } catch (err) {
      console.error("Error saving posted job:", err);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Edit posted job
  const handleEdit = (job: PostedJob) => {
    setFormData(job);
    setEditingId(job.id);
  };

  // Delete posted job
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this posted job?")) return;
    try {
      await axios.delete(`${API_BASE}/PostedJob/${id}`);
      alert("Posted job deleted successfully!");
      fetchJobs();
    } catch (err) {
      console.error("Error deleting posted job:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        💼 Posted Jobs
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
            <label className="block font-medium mb-1">Post Job ID</label>
            <input
              type="number"
              name="postJobId"
              value={formData.postJobId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Posted Date</label>
            <input
              type="date"
              name="postedDate"
              value={formData.postedDate.slice(0, 10)}
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
          {editingId ? "Update Posted Job" : "Create Posted Job"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Company ID</th>
            <th className="p-3 border-b">Post Job ID</th>
            <th className="p-3 border-b">Title</th>
            <th className="p-3 border-b">Description</th>
            <th className="p-3 border-b">Posted Date</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {jobs.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No posted jobs found.
              </td>
            </tr>
          ) : (
            jobs.map((job) => (
              <tr key={job.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{job.id}</td>
                <td className="p-3 border-b">{job.companyId}</td>
                <td className="p-3 border-b">{job.postJobId}</td>
                <td className="p-3 border-b">{job.postJob?.title || "-"}</td>
                <td className="p-3 border-b">
                  {job.postJob?.description || "-"}
                </td>
                <td className="p-3 border-b">
                  {new Date(job.postedDate).toLocaleDateString()}
                </td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(job)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(job.id)}
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
