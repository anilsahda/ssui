"use client";

import React, { useEffect, useState, FormEvent } from "react";

interface OwnerComplain {
  _id: string;
  content: string;
  createdAt: string;
  ownerId: {
    _id: string;
    name: string;
  };
}

export default function OwnerComplainsPage() {
  const [complains, setComplains] = useState<OwnerComplain[]>([]);
  const [content, setContent] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchComplains = async () => {
    const res = await fetch("http//localhost:5000/api/owner-complains");
    const data = await res.json();
    setComplains(data.data || []);
  };

  useEffect(() => {
    fetchComplains();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!content.trim() || !ownerId) {
      setError("Content and Owner ID are required.");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http//localhost:5000/api/owner-complains/${editId}`
      : `http//localhost:5000/api/owner-complains`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content, ownerId }),
      });
      if (!res.ok) throw new Error("Failed to save complaint");
      await fetchComplains();
      setContent("");
      setOwnerId("");
      setEditId(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (complain: OwnerComplain) => {
    setEditId(complain._id);
    setContent(complain.content);
    setOwnerId(complain.ownerId._id);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this complaint?")) return;

    try {
      await fetch(`http//localhost:5000/api/owner-complains/${id}`, {
        method: "DELETE",
      });
      await fetchComplains();
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div className="container my-4">
      <h2>Owner Complaints</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        {error && <div className="alert alert-danger">{error}</div>}
        <textarea
          className="form-control mb-2"
          placeholder="Complaint content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Owner ID"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
        />
        <button type="submit" className="btn btn-primary me-2">
          {editId ? "Update" : "Submit"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setEditId(null);
              setContent("");
              setOwnerId("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Content</th>
            <th>Owner</th>
            <th>Created At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {complains.map((complain) => (
            <tr key={complain._id}>
              <td>{complain.content}</td>
              <td>{complain.ownerId?.name || "Unknown"}</td>
              <td>{new Date(complain.createdAt).toLocaleString()}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(complain)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(complain._id)}
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
}
