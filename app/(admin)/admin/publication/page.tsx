"use client";
import { useEffect, useState } from "react";

type Publication = {
  id: number;
  name: string;
  address: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    address: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    loadPublications();
  }, []);

  async function loadPublications() {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/Publication`);
      if (!res.ok) throw new Error("Failed to fetch publications");
      const data = await res.json();
      setPublications(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error loading data");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim()) {
      alert("Name is required");
      return;
    }
    if (!formData.address.trim()) {
      alert("Address is required");
      return;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/api/Publication/${editId}`
        : `${API_BASE}/api/Publication`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server responded with ${res.status}: ${text}`);
      }

      setFormData({ name: "", address: "" });
      setEditId(null);
      await loadPublications();
    } catch (err: any) {
      alert("Failed to save publication: " + err.message);
    }
  };

  const handleEdit = (pub: Publication) => {
    setEditId(pub.id);
    setFormData({ name: pub.name, address: pub.address });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete this publication?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/Publication/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error(`Delete failed with status ${res.status}`);
      await loadPublications();
    } catch (err: any) {
      alert("Failed to delete publication: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Publications</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-4">
        <div className="card-header">
          {editId ? `Edit Publication #${editId}` : "Add Publication"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="name" className="form-label">
                Name
              </label>
              <input
                id="name"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="address" className="form-label">
                Address
              </label>
              <input
                id="address"
                name="address"
                className="form-control"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {editId ? "Update" : "Add"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setFormData({ name: "", address: "" });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {publications.length === 0 ? (
              <tr>
                <td colSpan={4} className="text-center">
                  No publications found.
                </td>
              </tr>
            ) : (
              publications.map((pub) => (
                <tr key={pub.id}>
                  <td>{pub.id}</td>
                  <td>{pub.name}</td>
                  <td>{pub.address}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(pub)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(pub.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
