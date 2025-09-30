"use client";
import { useEffect, useState } from "react";

type Branch = {
  id: number;
  name: string;
  location: string;
};

type BranchDto = Omit<Branch, "id">;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [formData, setFormData] = useState<BranchDto>({
    name: "",
    location: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Load branches on page load
  useEffect(() => {
    loadBranches();
  }, []);

  const loadBranches = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/Branch`);
      const data = await res.json();
      setBranches(data);
    } catch (err) {
      setError("Failed to load branches.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editId
      ? `${API_BASE}/api/Branch/${editId}`
      : `${API_BASE}/api/Branch`;
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Failed to save branch.");
      return;
    }

    setFormData({ name: "", location: "" });
    setEditId(null);
    await loadBranches();
  };

  const handleEdit = (branch: Branch) => {
    setFormData({ name: branch.name, location: branch.location });
    setEditId(branch.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this branch?")) return;

    const res = await fetch(`${API_BASE}/api/Branch/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete failed.");
      return;
    }

    await loadBranches();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Branch Manager</h2>

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-header">
          {editId ? "Edit Branch" : "Add Branch"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Branch Name</label>
              <input
                type="text"
                name="name"
                className="form-control"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                className="form-control"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setFormData({ name: "", location: "" });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* TABLE */}
      <h4>All Branches</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <p>Loading branches...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Location</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {branches.length > 0 ? (
              branches.map((branch) => (
                <tr key={branch.id}>
                  <td>{branch.id}</td>
                  <td>{branch.name}</td>
                  <td>{branch.location}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(branch)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(branch.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="text-center text-muted">
                  No branches available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
