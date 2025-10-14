"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

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

interface Inbox {
  id: number;
  senderId: number;
  messageId?: number;
  message?: Message;
}

export default function InboxPage() {
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState<Inbox>({
    id: 0,
    senderId: 0,
    messageId: undefined,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // ✅ Fetch inboxes
  const fetchInboxes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Inbox`);
      const data = Array.isArray(res.data) ? res.data : [];
      setInboxes(data);
    } catch (err) {
      console.error("Error fetching inboxes:", err);
      setInboxes([]);
    }
  };

  // ✅ Fetch messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Message`);
      const data = Array.isArray(res.data) ? res.data : [];
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([]);
    }
  };

  useEffect(() => {
    fetchInboxes();
    fetchMessages();
  }, []);

  // ✅ Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["senderId", "messageId"].includes(name) ? Number(value) : value,
    });
  };

  // ✅ Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/Inbox/${editingId}`, formData);
        alert("Inbox updated successfully!");
      } else {
        await axios.post(`${API_BASE}/Inbox`, formData);
        alert("Inbox created successfully!");
      }

      setFormData({ id: 0, senderId: 0, messageId: undefined });
      setEditingId(null);
      fetchInboxes();
    } catch (err) {
      console.error("Error saving inbox:", err);
      alert("An error occurred while saving.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (inbox: Inbox) => {
    setFormData({
      id: inbox.id,
      senderId: inbox.senderId,
      messageId: inbox.messageId,
    });
    setEditingId(inbox.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inbox message?")) return;
    try {
      await axios.delete(`${API_BASE}/Inbox/${id}`);
      alert("Inbox deleted successfully!");
      fetchInboxes();
    } catch (err) {
      console.error("Error deleting inbox:", err);
      alert("Failed to delete inbox.");
    }
  };

  return (
    <div className="container py-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <h1 className="text-center text-primary mb-4 fw-bold">
        📬 Inbox Management
      </h1>

      {/* ✅ Form Section */}
      <div className="card shadow-sm mb-5 border-0">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">Sender ID</label>
                <input
                  type="number"
                  name="senderId"
                  value={formData.senderId}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter sender ID"
                />
              </div>

              <div className="col-md-12">
                <label className="form-label fw-semibold">Message</label>
                <select
                  name="messageId"
                  value={formData.messageId ?? ""}
                  onChange={handleChange}
                  required
                  className="form-select"
                >
                  <option value="">Select a message</option>
                  {messages.map((msg) => (
                    <option key={msg.id} value={msg.id}>
                      {msg.subject
                        ? `${msg.subject} - ${msg.content.slice(0, 30)}...`
                        : msg.content.slice(0, 50)}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className={`btn w-100 mt-4 ${
                editingId ? "btn-warning" : "btn-success"
              }`}
            >
              {loading
                ? "Processing..."
                : editingId
                ? "Update Inbox"
                : "Create Inbox"}
            </button>
          </form>
        </div>
      </div>

      {/* ✅ Table Section */}
      <div className="card shadow-sm border-0">
        <div className="card-body p-0">
          <table className="table table-hover table-bordered mb-0">
            <thead className="table-success text-center">
              <tr>
                <th>ID</th>
                <th>Sender ID</th>
                <th>Message</th>
                <th>Sent At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {inboxes.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted p-3">
                    No inbox messages found.
                  </td>
                </tr>
              ) : (
                inboxes.map((inbox) => (
                  <tr key={inbox.id} className="align-middle">
                    <td>{inbox.id}</td>
                    <td>{inbox.senderId}</td>
                    <td>{inbox.message?.content ?? "No message linked"}</td>
                    <td>
                      {inbox.message?.sentAt
                        ? new Date(inbox.message.sentAt).toLocaleString()
                        : "—"}
                    </td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEdit(inbox)}
                        className="btn btn-sm btn-outline-warning me-2"
                      >
                        ✏️ Edit
                      </button>
                      <button
                        onClick={() => handleDelete(inbox.id)}
                        className="btn btn-sm btn-outline-danger"
                      >
                        🗑️ Delete
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
