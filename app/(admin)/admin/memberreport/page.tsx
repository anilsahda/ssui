"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useMemberStore } from "../store/member";

const API_BASE = "https://localhost:7255/api/Member";

const MembersManager: React.FC = () => {
  const {
    members,
    form,
    isEditing,
    loading,
    error,
    setMembers,
    setForm,
    setIsEditing,
    setLoading,
    setError,
    resetForm,
  } = useMemberStore();

  // ✅ Fetch Members
  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();

      const safeMembers = Array.isArray(data.members)
        ? data.members
        : Array.isArray(data)
        ? data
        : [];
      setMembers(safeMembers);
    } catch (err: any) {
      console.error("Failed to fetch members", err);
      setError("Failed to load members.");
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ✅ Handle input change
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  // ✅ Submit form (Add / Update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!form.fullName || !form.email || !form.phoneNumber) {
      setError("Please fill all fields.");
      return;
    }

    try {
      if (isEditing && form.id !== undefined) {
        await fetch(`${API_BASE}/${form.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      } else {
        await fetch(API_BASE, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(form),
        });
      }

      resetForm();
      fetchMembers();
    } catch (err) {
      console.error("Error saving member", err);
      setError("Failed to save member.");
    }
  };

  // ✅ Edit member
  const handleEdit = (member: any) => {
    setForm(member);
    setIsEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Delete member
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    try {
      await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      fetchMembers();
    } catch (err) {
      console.error("Delete failed", err);
      setError("Failed to delete member.");
    }
  };

  return (
    <div className="container py-4">
      <div className="mb-4">
        <h2 className="text-center">Member Management</h2>
      </div>

      <form
        onSubmit={handleSubmit}
        className="mb-4 p-4 border rounded bg-light shadow-sm"
      >
        <h5 className="mb-3">{isEditing ? "Edit Member" : "Add New Member"}</h5>

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

      {!loading && members.length > 0 && (
        <div className="alert alert-info">
          {members.length} member(s) available in the system.
        </div>
      )}
    </div>
  );
};

export default MembersManager;
