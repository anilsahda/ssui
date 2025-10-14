"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
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
  sentAt: string; // ISO string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState<Message>({
    id: 0,
    senderId: 0,
    receiverId: 0,
    subject: "",
    content: "",
    sentAt: new Date().toISOString().slice(0, 10),
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch messages from API
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Message`);
      const data = Array.isArray(res.data) ? res.data : [];
      setMessages(data);
    } catch (err) {
      console.error("Error fetching messages:", err);
      setMessages([]); // fallback to empty array
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["senderId", "receiverId"].includes(name) ? Number(value) : value,
    });
  };

  // Handle form submit
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/Message/${editingId}`, formData);
        alert("Message updated successfully!");
      } else {
        await axios.post(`${API_BASE}/Message`, formData);
        alert("Message created successfully!");
      }

      // Reset form
      setFormData({
        id: 0,
        senderId: 0,
        receiverId: 0,
        subject: "",
        content: "",
        sentAt: new Date().toISOString().slice(0, 10),
      });
      setEditingId(null);
      fetchMessages();
    } catch (err) {
      console.error("Error saving message:", err);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Edit message
  const handleEdit = (msg: Message) => {
    setFormData(msg);
    setEditingId(msg.id);
  };

  // Delete message
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this message?")) return;
    try {
      await axios.delete(`${API_BASE}/Message/${id}`);
      alert("Message deleted successfully!");
      fetchMessages();
    } catch (err) {
      console.error("Error deleting message:", err);
      alert("Failed to delete message.");
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary fw-bold mb-5">
        ✉️ Messages Management
      </h1>

      {/* Form */}
      <div className="card shadow-sm mb-5 rounded-4">
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Sender ID</label>
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
              <div className="col-md-6">
                <label className="form-label">Receiver ID</label>
                <input
                  type="number"
                  name="receiverId"
                  value={formData.receiverId}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter receiver ID"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Subject</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Enter subject"
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Sent Date</label>
                <input
                  type="date"
                  name="sentDate"
                  value={formData.sentAt.slice(0, 10)}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
              <div className="col-12">
                <label className="form-label">Body</label>
                <textarea
                  name="content"
                  value={formData.content}
                  onChange={handleChange}
                  required
                  className="form-control"
                  placeholder="Type your message"
                />
              </div>
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`btn btn-primary w-100 mt-4 ${
                loading ? "disabled" : ""
              }`}
            >
              {editingId ? "Update Message" : "Create Message"}
            </button>
          </form>
        </div>
      </div>

      {/* Messages Table */}
      <div className="card shadow-sm rounded-4">
        <div className="card-body p-0">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Sender ID</th>
                <th>Receiver ID</th>
                <th>Subject</th>
                <th>Body</th>
                <th>Sent Date</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(messages) && messages.length > 0 ? (
                messages.map((msg) => (
                  <tr key={msg.id}>
                    <td>{msg.id}</td>
                    <td>{msg.senderId}</td>
                    <td>{msg.receiverId}</td>
                    <td>{msg.subject}</td>
                    <td>{msg.content}</td>
                    <td>{new Date(msg.sentAt).toLocaleDateString()}</td>
                    <td className="text-center">
                      <button
                        onClick={() => handleEdit(msg)}
                        className="btn btn-sm btn-warning me-2"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(msg.id)}
                        className="btn btn-sm btn-danger"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center p-4 text-muted">
                    No messages found.
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
