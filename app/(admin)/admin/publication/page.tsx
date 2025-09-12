"use client";
import React, { useState, useEffect } from "react";
import axios from "axios";

// ✅ Match backend Publication class
interface Publication {
  id: number;
  name: string;
}

function PublicationPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [newPublication, setNewPublication] = useState<string>("");
  const [editId, setEditId] = useState<number | null>(null);

  // 🔹 Replace this with your deployed backend URL
  const API_URL = "https://localhost:7293/api/Publications";

  // Fetch publications
  useEffect(() => {
    fetchPublications();
  }, []);

  const fetchPublications = async () => {
    try {
      const res = await axios.get<Publication[]>(API_URL+"/GetPublications");
      setPublications(res.data);
    } catch (error) {
      console.error("Error fetching publications:", error);
    }
  };

  // Add or Update Publication
  const savePublication = async () => {
    if (!newPublication.trim()) return;

    try {
      if (editId) {
        // Update
        await axios.put(API_URL+"/UpdatePublication", {
          id: editId,
          name: newPublication,
        });
        setEditId(null);
      } else {
        // Add
        const newId =
          publications.length > 0
            ? Math.max(...publications.map((p) => p.id)) + 1
            : 1;

        await axios.post(API_URL+"/AddPublication", {
          id: newId,
          name: newPublication,
        });
      }
      setNewPublication("");
      fetchPublications();
    } catch (error) {
      console.error("Error saving publication:", error);
    }
  };

  // Delete Publication
  const deletePublication = async (id: number) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchPublications();
    } catch (error) {
      console.error("Error deleting publication:", error);
    }
  };

  // Start Editing
  const startEdit = (id: number, name: string) => {
    setNewPublication(name);
    setEditId(id);
  };

  return (
    <div className="container mt-4">
      <h2>Manage Publication</h2>

      {/* Input + Button */}
      <div className="mb-3">
        <input
          type="text"
          placeholder="Enter Publication Name"
          className="form-control"
          value={newPublication}
          onChange={(e) => setNewPublication(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <button onClick={savePublication} className="btn btn-primary me-2">
          {editId ? "Update Publication" : "Add Publication"}
        </button>
        {editId && (
          <button
            onClick={() => {
              setEditId(null);
              setNewPublication("");
            }}
            className="btn btn-secondary"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Publication Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {publications.length > 0 ? (
            publications.map((pub) => (
              <tr key={pub.id}>
                <td>{pub.id}</td>
                <td>{pub.name}</td>
                <td>
                  <button
                    className="btn btn-warning me-1"
                    onClick={() => startEdit(pub.id, pub.name)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger me-1"
                    onClick={() => deletePublication(pub.id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-success">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No publications found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default PublicationPage;
