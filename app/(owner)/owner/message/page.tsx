"use client";

import React, { useEffect, useState, FormEvent } from "react";

type Owner = {
  _id: string;
  // assume Owner has a name or something
  name?: string;
};

type Message = {
  _id: string;
  text: string;
  sentAt: string;
  ownerId: Owner | string;
};

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  // If you have an API to fetch owners, you can fetch owners list for dropdown
  // For simplicity, here I assume ownerId is entered as string manually

  const fetchMessages = async () => {
    try {
      const res = await fetch("http//localhost:5000/api/messages");
      const json = await res.json();
      setMessages(json.data || []);
    } catch (err: any) {
      console.error("Fetch messages error:", err);
      setError("Failed to load messages");
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const resetForm = () => {
    setText("");
    setOwnerId("");
    setEditId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!text.trim() || !ownerId.trim()) {
      setError("Text and Owner ID are required");
      return;
    }

    try {
      const url = editId
        ? `http//localhost:5000/api/messages/${editId}`
        : `http//localhost:5000/api/messages`;
      const method = editId ? "PUT" : "POST";
      const body: any = { text, ownerId };
      // optionally allow editing sentAt
      // if you want to allow date editing, include sentAt in body

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to save message");
      }

      await fetchMessages();
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (msg: Message) => {
    setEditId(msg._id);
    setText(msg.text);
    setOwnerId(typeof msg.ownerId === "string" ? msg.ownerId : msg.ownerId._id);
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      const res = await fetch(`/api/messages/${id}`, { method: "DELETE" });
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to delete");
      }
      await fetchMessages();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <div className="container my-4">
      <h2>Messages</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="mb-4">
        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Text
          </label>
          <textarea
            id="text"
            className="form-control"
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="ownerId" className="form-label">
            Owner ID
          </label>
          <input
            id="ownerId"
            className="form-control"
            value={ownerId}
            onChange={(e) => setOwnerId(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {editId ? "Update Message" : "Create Message"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => resetForm()}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Text</th>
            <th>Owner</th>
            <th>Sent At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {messages.map((msg) => (
            <tr key={msg._id}>
              <td>{msg._id}</td>
              <td>{msg.text}</td>
              <td>
                {typeof msg.ownerId === "string"
                  ? msg.ownerId
                  : msg.ownerId.name ?? msg.ownerId._id}
              </td>
              <td>{new Date(msg.sentAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-sm btn-warning me-2"
                  onClick={() => handleEdit(msg)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(msg._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MessagesPage;
