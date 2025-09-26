"use client";

import React, { useEffect, useState, FormEvent } from "react";

type Owner = {
  _id: string;
  name: string;
};

export default function OwnersPage() {
  const [owners, setOwners] = useState<Owner[]>([]);
  const [name, setName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchOwners = async () => {
    const res = await fetch("http//localhost:5000/api/owners");
    const data = await res.json();
    setOwners(data.data || []);
  };

  useEffect(() => {
    fetchOwners();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http//localhost:5000/api/owners/${editId}`
      : `http//localhost:5000/api/owners`;

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });
      if (!res.ok) throw new Error("Failed to save owner");

      await fetchOwners();
      setName("");
      setEditId(null);
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (owner: Owner) => {
    setEditId(owner._id);
    setName(owner.name);
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this owner?")) return;

    try {
      await fetch(`http//localhost:5000/api/owners/${id}`, {
        method: "DELETE",
      });
      await fetchOwners();
    } catch (err) {
      setError("Delete failed");
    }
  };

  return (
    <div className="container my-4">
      <h2>Owners Management</h2>

      <form onSubmit={handleSubmit} className="mb-3">
        {error && <div className="alert alert-danger">{error}</div>}
        <input
          type="text"
          className="form-control mb-2"
          placeholder="Owner Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <button className="btn btn-primary me-2" type="submit">
          {editId ? "Update Owner" : "Add Owner"}
        </button>
        {editId && (
          <button
            type="button"
            className="btn btn-secondary"
            onClick={() => {
              setEditId(null);
              setName("");
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Owner Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner._id}>
              <td>{owner.name}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  onClick={() => handleEdit(owner)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(owner._id)}
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
