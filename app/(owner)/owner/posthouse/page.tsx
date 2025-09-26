"use client";

import React, { useState, useEffect, FormEvent } from "react";

interface PostHouse {
  _id: string;
  title: string;
  address: string;
  ownerId: { _id: string; name: string } | string;
  createdAt: string;
  updatedAt: string;
}

export default function PostHousesAdmin() {
  const [houses, setHouses] = useState<PostHouse[]>([]);
  const [title, setTitle] = useState("");
  const [address, setAddress] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchHouses = async () => {
    const res = await fetch("http//localhost:5000/api/post-houses");
    const data = await res.json();
    if (data.success) setHouses(data.data);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const resetForm = () => {
    setTitle("");
    setAddress("");
    setOwnerId("");
    setEditId(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!title.trim() || !address.trim() || !ownerId.trim()) {
      setError("All fields are required");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `http//localhost:5000/api/post-houses/${editId}`
      : "http//localhost:5000/api/post-houses";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, address, ownerId }),
      });
      if (!res.ok) throw new Error("Failed to save house");
      await fetchHouses();
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (house: PostHouse) => {
    setEditId(house._id);
    setTitle(house.title);
    setAddress(house.address);
    setOwnerId(
      typeof house.ownerId === "string" ? house.ownerId : house.ownerId._id
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this house?")) return;
    try {
      await fetch(`http//localhost:5000/api/post-houses/${id}`, {
        method: "DELETE",
      });
      await fetchHouses();
    } catch {
      setError("Failed to delete house");
    }
  };

  return (
    <div className="container my-4">
      <h1>Post Houses Admin</h1>

      {error && (
        <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>
      )}

      <form onSubmit={handleSubmit} style={{ marginBottom: "2rem" }}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
        />
        <input
          type="text"
          placeholder="Owner ID"
          value={ownerId}
          onChange={(e) => setOwnerId(e.target.value)}
          style={{ display: "block", marginBottom: "0.5rem", width: "300px" }}
        />
        <button type="submit">{editId ? "Update House" : "Add House"}</button>
        {editId && (
          <button
            type="button"
            onClick={resetForm}
            style={{ marginLeft: "1rem" }}
          >
            Cancel
          </button>
        )}
      </form>

      <table
        border={1}
        cellPadding={5}
        cellSpacing={0}
        style={{ width: "100%" }}
      >
        <thead>
          <tr>
            <th>Title</th>
            <th>Address</th>
            <th>Owner ID</th>
            <th>Created At</th>
            <th>Updated At</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {houses.map((house) => (
            <tr key={house._id}>
              <td>{house.title}</td>
              <td>{house.address}</td>
              <td>
                {typeof house.ownerId === "string"
                  ? house.ownerId
                  : house.ownerId?.name || "N/A"}
              </td>
              <td>{new Date(house.createdAt).toLocaleString()}</td>
              <td>{new Date(house.updatedAt).toLocaleString()}</td>
              <td>
                <button onClick={() => handleEdit(house)}>Edit</button>
                <button
                  onClick={() => handleDelete(house._id)}
                  style={{ marginLeft: "1rem" }}
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
