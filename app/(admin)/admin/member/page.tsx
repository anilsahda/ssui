"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface Member {
  id: number;
  fullName: string;
  email: string;
  phoneNumber: string;
}

const MembersManager: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [form, setForm] = useState<Partial<Member>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_BASE = "https://localhost:7293/api/Members";

  useEffect(() => {
    fetchMembers();
  }, []);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      setMembers(data);
    } catch (err) {
      console.error("Failed to fetch members", err);
      setError("Failed to load members.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName || !form.email || !form.phoneNumber) {
      setError("Please fill all fields.");
      return;
    }

    const payload = {
      fullName: form.fullName,
      email: form.email,
      phoneNumber: form.phoneNumber,
    };

    try {
      if (isEditing && form.id !== undefined) {
        await fetch(`${API_BASE}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...form }),
        });
      } else {
        await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }

      resetForm();
      fetchMembers();
    } catch (err) {
      console.error("Error saving member", err);
      setError("Failed to save member.");
    }
  };

  const handleEdit = (member: Member) => {
    setForm(member);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await fetch(`${API_BASE}/${id}`, {
        method: "DELETE",
      });
      fetchMembers();
    } catch (err) {
      console.error("Delete failed", err);
      setError("Failed to delete member.");
    }
  };

  const resetForm = () => {
    setForm({});
    setIsEditing(false);
    setError(null);
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="text-center"> Member Management</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-4 p-4 border rounded bg-light shadow-sm"
      >
        <h5 className="mb-3">
          {isEditing ? " Edit Member" : " Add New Member"}
        </h5>

        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        <div className="row g-3">
          <div className="col-md-4">
            <label htmlFor="fullName" className="form-label">
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              className="form-control"
              value={form.fullName ?? ""}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="email" className="form-label">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              value={form.email ?? ""}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <div className="col-md-4">
            <label htmlFor="phoneNumber" className="form-label">
              Phone Number
            </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              className="form-control"
              value={form.phoneNumber ?? ""}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        <div className="mt-4">
          <button type="submit" className="btn btn-success me-2">
            <i
              className={`bi ${
                isEditing ? "bi-pencil-square" : "bi-plus-circle"
              }`}
            ></i>{" "}
            {isEditing ? "Update Member" : "Add Member"}
          </button>
          {isEditing && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={resetForm}
            >
              <i className="bi bi-x-circle"></i> Cancel
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
          <p className="mt-2">Fetching members...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>#ID</th>
                <th>Full Name</th>
                <th>Email</th>
                <th>Phone</th>
                <th className="text-center" style={{ width: "160px" }}>
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {members.map((m) => (
                <tr key={m.id}>
                  <td>
                    <span className="badge bg-secondary">{m.id}</span>
                  </td>
                  <td>{m.fullName}</td>
                  <td>{m.email}</td>
                  <td>{m.phoneNumber}</td>
                  <td className="text-center">
                    <button
                      className="btn btn-sm btn-outline-primary me-2"
                      onClick={() => handleEdit(m)}
                    >
                      <i className="bi bi-pencil-fill"></i>
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(m.id)}
                    >
                      <i className="bi bi-trash-fill"></i>
                    </button>
                  </td>
                </tr>
              ))}
              {members.length === 0 && (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No members found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MembersManager;
