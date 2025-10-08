"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// 🌐 API base URL (change if needed)
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

// Model Interface
interface FeedbackReport {
  id: number;
  userName: string;
  email: string;
  subject: string;
  message: string;
  createdDate?: string;
}

export default function FeedbackReportsPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackReport[]>([]);
  const [formData, setFormData] = useState<FeedbackReport>({
    id: 0,
    userName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Fetch all feedback reports
  const fetchFeedbacks = async () => {
    try {
      const response = await axios.get(`${API_BASE}/FeedbackReport`);
      setFeedbacks(response.data);
    } catch (error) {
      console.error("Error fetching feedback reports:", error);
    }
  };

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Create or Update feedback
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/FeedbackReport/${editingId}`, formData);
        alert("Feedback updated successfully!");
      } else {
        await axios.post(`${API_BASE}/FeedbackReport`, formData);
        alert("Feedback submitted successfully!");
      }
      setFormData({ id: 0, userName: "", email: "", subject: "", message: "" });
      setEditingId(null);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error saving feedback:", error);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Edit feedback
  const handleEdit = (feedback: FeedbackReport) => {
    setFormData(feedback);
    setEditingId(feedback.id);
  };

  // Delete feedback
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this feedback?")) return;
    try {
      await axios.delete(`${API_BASE}/FeedbackReport/${id}`);
      alert("Feedback deleted successfully!");
      fetchFeedbacks();
    } catch (error) {
      console.error("Error deleting feedback:", error);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-4xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📝 Feedback Reports
      </h1>

      {/* Feedback Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
      >
        <div className="mb-3">
          <label className="block font-medium mb-1">User Name</label>
          <input
            type="text"
            name="userName"
            value={formData.userName}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Subject</label>
          <input
            type="text"
            name="subject"
            value={formData.subject}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            required
            className="w-full border px-3 py-2 rounded-md focus:outline-none focus:ring focus:ring-blue-200"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Feedback" : "Submit Feedback"}
        </button>
      </form>

      {/* Feedback Table */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">User</th>
            <th className="p-3 border-b">Email</th>
            <th className="p-3 border-b">Subject</th>
            <th className="p-3 border-b">Message</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedbacks.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No feedback found.
              </td>
            </tr>
          ) : (
            feedbacks.map((f) => (
              <tr key={f.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{f.id}</td>
                <td className="p-3 border-b">{f.userName}</td>
                <td className="p-3 border-b">{f.email}</td>
                <td className="p-3 border-b">{f.subject}</td>
                <td className="p-3 border-b">{f.message}</td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(f)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(f.id)}
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
