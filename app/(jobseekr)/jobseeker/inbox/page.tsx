"use client";

import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import axios from "axios";

// 🌐 Backend API URL
const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface Message {
  id: number;
  content: string;
}

interface Inbox {
  id: number;
  sender: string;
  receiver: string;
  subject: string;
  messageId?: number;
  message?: Message;
}

export default function InboxPage() {
  const [inboxes, setInboxes] = useState<Inbox[]>([]);
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState<Inbox>({
    id: 0,
    sender: "",
    receiver: "",
    subject: "",
    messageId: undefined,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all inbox records
  const fetchInboxes = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Inbox`);
      setInboxes(res.data);
    } catch (err) {
      console.error("Error fetching inboxes:", err);
    }
  };

  // Fetch all messages (for dropdown)
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Message`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchInboxes();
    fetchMessages();
  }, []);

  // Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "messageId" ? Number(value) : value,
    });
  };

  // Create or update record
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
      setFormData({
        id: 0,
        sender: "",
        receiver: "",
        subject: "",
        messageId: undefined,
      });
      setEditingId(null);
      fetchInboxes();
    } catch (err) {
      console.error("Error saving inbox:", err);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Edit existing inbox
  const handleEdit = (inbox: Inbox) => {
    setFormData({
      id: inbox.id,
      sender: inbox.sender,
      receiver: inbox.receiver,
      subject: inbox.subject,
      messageId: inbox.messageId,
    });
    setEditingId(inbox.id);
  };

  // Delete inbox
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this inbox message?")) return;
    try {
      await axios.delete(`${API_BASE}/Inbox/${id}`);
      alert("Inbox deleted successfully!");
      fetchInboxes();
    } catch (err) {
      console.error("Error deleting inbox:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-2xl font-bold mb-4 text-center">
        📥 Inbox Management
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 mb-6 border border-gray-200"
      >
        <div className="mb-3">
          <label className="block font-medium mb-1">Sender</label>
          <input
            type="text"
            name="sender"
            value={formData.sender}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-3">
          <label className="block font-medium mb-1">Receiver</label>
          <input
            type="text"
            name="receiver"
            value={formData.receiver}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
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
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
          />
        </div>

        <div className="mb-4">
          <label className="block font-medium mb-1">Message</label>
          <select
            name="messageId"
            value={formData.messageId ?? ""}
            onChange={handleChange}
            required
            className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
          >
            <option value="">Select a message</option>
            {messages.map((msg) => (
              <option key={msg.id} value={msg.id}>
                {msg.content.length > 50
                  ? msg.content.slice(0, 50) + "..."
                  : msg.content}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 px-4 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Inbox" : "Create Inbox"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-lg overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Sender</th>
            <th className="p-3 border-b">Receiver</th>
            <th className="p-3 border-b">Subject</th>
            <th className="p-3 border-b">Message</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {inboxes.length === 0 ? (
            <tr>
              <td colSpan={6} className="text-center p-4 text-gray-500">
                No inbox messages found.
              </td>
            </tr>
          ) : (
            inboxes.map((inbox) => (
              <tr key={inbox.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{inbox.id}</td>
                <td className="p-3 border-b">{inbox.sender}</td>
                <td className="p-3 border-b">{inbox.receiver}</td>
                <td className="p-3 border-b">{inbox.subject}</td>
                <td className="p-3 border-b">
                  {inbox.message?.content ?? "No message linked"}
                </td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(inbox)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(inbox.id)}
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
