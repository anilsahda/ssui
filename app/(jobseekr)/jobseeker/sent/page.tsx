"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7115/api";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  subject: string;
  content: string;
  sentAt: string;
}

interface Sent {
  id: number;
  messageId: number;
  senderId: number;
  message?: Message | null;
}

export default function SentPage() {
  const [sents, setSents] = useState<Sent[]>([]);
  const [formData, setFormData] = useState<Sent>({
    id: 0,
    messageId: 0,
    senderId: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch sent messages
  const fetchSents = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/Sent`);

      let data: any = res.data;

      // ✅ Normalize data from .NET API ($values fix)
      if (Array.isArray(data)) {
        setSents(data);
      } else if (data?.$values) {
        setSents(data.$values);
      } else if (data?.data) {
        setSents(data.data);
      } else {
        setSents([]);
      }
    } catch (err) {
      console.error("Error fetching sent messages:", err);
      setSents([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSents();
  }, []);

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["messageId", "senderId"].includes(name) ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/Sent/${editingId}`, formData);
        alert("✅ Sent message updated successfully!");
      } else {
        await axios.post(`${API_BASE}/Sent`, formData);
        alert("✅ Sent message created successfully!");
      }

      setFormData({ id: 0, messageId: 0, senderId: 0 });
      setEditingId(null);
      fetchSents();
    } catch (err) {
      console.error("Error saving sent message:", err);
      alert("❌ An error occurred while saving the sent message!");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (sent: Sent) => {
    setFormData({
      id: sent.id,
      messageId: sent.messageId,
      senderId: sent.senderId,
    });
    setEditingId(sent.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this sent message?")) return;
    try {
      await axios.delete(`${API_BASE}/Sent/${id}`);
      alert("✅ Sent message deleted successfully!");
      fetchSents();
    } catch (err) {
      console.error("Error deleting sent message:", err);
      alert("❌ Failed to delete sent message.");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary fw-bold mb-4">
        ✉️ Sent Messages Management
      </h1>

      {/* Form */}
      <div className="card shadow-sm mb-5 border-0 rounded-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Message ID</label>
                <input
                  type="number"
                  name="messageId"
                  value={formData.messageId}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter Message ID"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label fw-semibold">Sender ID</label>
                <input
                  type="number"
                  name="senderId"
                  value={formData.senderId}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter Sender ID"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="btn btn-primary w-100 mt-4 py-2 fw-semibold"
            >
              {loading
                ? "Processing..."
                : editingId
                ? "Update Sent Message"
                : "Create Sent Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0 rounded-4">
        <div className="card-body p-0">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Message ID</th>
                <th>Message Content</th>
                <th>Sender ID</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={5} className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : sents.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center p-4 text-muted">
                    No sent messages found.
                  </td>
                </tr>
              ) : (
                sents.map((sent) => (
                  <tr key={sent.id}>
                    <td>{sent.id}</td>
                    <td>{sent.messageId}</td>
                    <td>{sent.message?.content || "-"}</td>
                    <td>{sent.senderId}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEdit(sent)}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(sent.id)}
                        className="btn btn-sm btn-danger"
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
      </div>
    </div>
  );
}
