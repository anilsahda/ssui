"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Owner {
  id: number;
  name: string;
}

interface Message {
  id: number;
  text: string;
  sentAt: string; // ISO string
  ownerId: number;
  owner?: Owner;
}

const MessagesManager: React.FC = () => {
  const API_BASE = "/api/Messages";
  const OWNERS_API = "/api/Owners"; // for fetching owners for dropdown

  const [messages, setMessages] = useState<Message[]>([]);
  const [owners, setOwners] = useState<Owner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<Partial<Message>>({
    text: "",
    ownerId: undefined,
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchMessages();
    fetchOwners();
  }, []);

  const fetchMessages = async () => {
    setLoading(true);
    try {
      const resp = await fetch(API_BASE);
      if (!resp.ok) throw new Error(`Could not fetch messages: ${resp.status}`);
      const data = (await resp.json()) as Message[];
      setMessages(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error fetching messages");
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const resp = await fetch(OWNERS_API);
      if (!resp.ok) throw new Error(`Could not fetch owners: ${resp.status}`);
      const data = (await resp.json()) as Owner[];
      setOwners(data);
    } catch (err) {
      console.error("Error loading owners:", err);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    let val: any = value;
    if (name === "ownerId") {
      val = value === "" ? undefined : parseInt(value, 10);
    }
    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Basic validation
    if (!form.text || form.ownerId == null) {
      alert("Please provide message text and select an owner.");
      return;
    }

    try {
      let resp: Response;
      if (isEditing && form.id !== undefined) {
        resp = await fetch(`${API_BASE}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: form.id,
            text: form.text,
            ownerId: form.ownerId,
            sentAt: form.sentAt, // in update you may include existing sentAt or server may ignore
          }),
        });
      } else {
        resp = await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            text: form.text,
            ownerId: form.ownerId,
          }),
        });
      }

      if (!resp.ok) {
        const errText = await resp.text();
        throw new Error(`Request failed: ${resp.status} ${errText}`);
      }

      resetForm();
      await fetchMessages();
    } catch (err: any) {
      alert(err.message || "Submission failed");
    }
  };

  const handleEdit = (msg: Message) => {
    setForm({
      id: msg.id,
      text: msg.text,
      ownerId: msg.ownerId,
      sentAt: msg.sentAt,
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure to delete this message?")) return;

    try {
      const resp = await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        throw new Error(`Delete failed: ${resp.status}`);
      }
      await fetchMessages();
    } catch (err: any) {
      alert(err.message || "Delete error");
    }
  };

  const resetForm = () => {
    setForm({ text: "", ownerId: undefined });
    setIsEditing(false);
  };

  return (
    <div className="container mt-4">
      <h2>Messages Manager</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <form onSubmit={handleSubmit} className="border p-4 mb-4 bg-light">
        <h5>{isEditing ? "Edit Message" : "New Message"}</h5>

        <div className="mb-3">
          <label htmlFor="ownerId" className="form-label">
            Owner
          </label>
          <select
            id="ownerId"
            name="ownerId"
            className="form-select"
            value={form.ownerId ?? ""}
            onChange={handleChange}
            required
          >
            <option value="">-- Select Owner --</option>
            {owners.map((o) => (
              <option key={o.id} value={o.id}>
                {o.name}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-3">
          <label htmlFor="text" className="form-label">
            Message Text
          </label>
          <textarea
            id="text"
            name="text"
            className="form-control"
            rows={3}
            value={form.text ?? ""}
            onChange={handleChange}
            required
          ></textarea>
        </div>

        <button type="submit" className="btn btn-primary me-2">
          {isEditing ? "Update" : "Create"}
        </button>
        {isEditing && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Cancel
          </button>
        )}
      </form>

      <h5>All Messages</h5>
      {loading ? (
        <p>Loading messages...</p>
      ) : messages.length === 0 ? (
        <p>No messages found.</p>
      ) : (
        <table className="table table-striped table-bordered">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Owner</th>
              <th>Text</th>
              <th>Sent At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {messages.map((m) => (
              <tr key={m.id}>
                <td>{m.id}</td>
                <td>{m.owner?.name ?? `#${m.ownerId}`}</td>
                <td>{m.text}</td>
                <td>{new Date(m.sentAt).toLocaleString()}</td>
                <td>
                  <button
                    className="btn btn-sm btn-info me-2"
                    onClick={() => handleEdit(m)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(m.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MessagesManager;
