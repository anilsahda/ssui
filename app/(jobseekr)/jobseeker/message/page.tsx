"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  subject: string;
  body: string;
  sentDate: string; // ISO string
}

export default function MessagesPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [formData, setFormData] = useState<Message>({
    id: 0,
    senderId: 0,
    receiverId: 0,
    subject: "",
    body: "",
    sentDate: new Date().toISOString().slice(0, 10),
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all messages
  const fetchMessages = async () => {
    try {
      const res = await axios.get(`${API_BASE}/Message`);
      setMessages(res.data);
    } catch (err) {
      console.error("Error fetching messages:", err);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // Handle input change
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
      setFormData({
        id: 0,
        senderId: 0,
        receiverId: 0,
        subject: "",
        body: "",
        sentDate: new Date().toISOString().slice(0, 10),
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
  const handleEdit = (message: Message) => {
    setFormData(message);
    setEditingId(message.id);
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
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        ✉️ Messages
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Sender ID</label>
            <input
              type="number"
              name="senderId"
              value={formData.senderId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
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
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div>
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

          <div>
            <label className="block font-medium mb-1">Sent Date</label>
            <input
              type="date"
              name="sentDate"
              value={formData.sentDate.slice(0, 10)}
              onChange={handleChange}
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Body</label>
            <textarea
              name="body"
              value={formData.body}
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
          {editingId ? "Update Message" : "Create Message"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Sender ID</th>
            <th className="p-3 border-b">Receiver ID</th>
            <th className="p-3 border-b">Subject</th>
            <th className="p-3 border-b">Body</th>
            <th className="p-3 border-b">Sent Date</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center p-4 text-gray-500">
                No messages found.
              </td>
            </tr>
          ) : (
            messages.map((msg) => (
              <tr key={msg.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{msg.id}</td>
                <td className="p-3 border-b">{msg.senderId}</td>
                <td className="p-3 border-b">{msg.receiverId}</td>
                <td className="p-3 border-b">{msg.subject}</td>
                <td className="p-3 border-b">{msg.body}</td>
                <td className="p-3 border-b">
                  {new Date(msg.sentDate).toLocaleDateString()}
                </td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(msg)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(msg.id)}
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
