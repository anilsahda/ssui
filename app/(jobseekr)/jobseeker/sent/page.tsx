"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface Message {
  id: number;
  content: string;
}

interface Sent {
  id: number;
  messageId: number;
  receiverId: number;
  message?: Message;
}

export default function SentPage() {
  const [sents, setSents] = useState<Sent[]>([]);
  const [formData, setFormData] = useState<Sent>({
    id: 0,
    messageId: 0,
    receiverId: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all sent entries
  const fetchSents = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Sent`);
      setSents(res.data);
    } catch (err) {
      console.error("Error fetching sent messages:", err);
    }
  };

  useEffect(() => {
    fetchSents();
  }, []);

  // Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["messageId", "receiverId"].includes(name)
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
        await axios.put(`${API_BASE}/Sent/${editingId}`, formData);
        alert("Sent message updated successfully!");
      } else {
        await axios.post(`${API_BASE}/Sent`, formData);
        alert("Sent message created successfully!");
      }
      setFormData({ id: 0, messageId: 0, receiverId: 0 });
      setEditingId(null);
      fetchSents();
    } catch (err) {
      console.error("Error saving sent message:", err);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Edit sent message
  const handleEdit = (sent: Sent) => {
    setFormData(sent);
    setEditingId(sent.id);
  };

  // Delete sent message
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this sent message?")) return;
    try {
      await axios.delete(`${API_BASE}/Sent/${id}`);
      alert("Sent message deleted successfully!");
      fetchSents();
    } catch (err) {
      console.error("Error deleting sent message:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-purple-700">
        ✉️ Sent Messages
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Message ID</label>
            <input
              type="number"
              name="messageId"
              value={formData.messageId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-purple-200"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Receiver ID</label>
            <input
              type="number"
              name="receiverId"
              value={formData.receiverId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-purple-200"
            />
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-5 py-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-purple-600 hover:bg-purple-700"
          }`}
        >
          {editingId ? "Update Sent Message" : "Create Sent Message"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Message ID</th>
            <th className="p-3 border-b">Message Content</th>
            <th className="p-3 border-b">Receiver ID</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {sents.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No sent messages found.
              </td>
            </tr>
          ) : (
            sents.map((sent) => (
              <tr key={sent.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{sent.id}</td>
                <td className="p-3 border-b">{sent.messageId}</td>
                <td className="p-3 border-b">{sent.message?.content || "-"}</td>
                <td className="p-3 border-b">{sent.receiverId}</td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(sent)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(sent.id)}
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
