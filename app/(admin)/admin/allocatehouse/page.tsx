"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { useAllocateHouseStore } from "../store/allocatehouse";

const API_BASE = "https://localhost:7115/api";

export default function AllocateHousePage() {
  const {
    allocations,
    houses,
    members,
    formData,
    editingId,
    loading,
    setAllocations,
    setHouses,
    setMembers,
    setFormData,
    setEditingId,
    setLoading,
    resetForm,
  } = useAllocateHouseStore();

  // Fetch allocations
  const fetchAllocations = async () => {
    try {
      const res = await axios.get(`${API_BASE}/AllocateHouse`);
      setAllocations(res.data);
    } catch (err) {
      console.error("Error fetching allocations:", err);
      setAllocations([]);
    }
  };

  // Fetch houses and members
  const fetchHousesAndMembers = async () => {
    try {
      const [housesRes, membersRes] = await Promise.all([
        axios.get(`${API_BASE}/House`),
        axios.get(`${API_BASE}/Member`),
      ]);
      setHouses(housesRes.data);
      setMembers(membersRes.data);
    } catch (err) {
      console.error("Error fetching houses or members:", err);
    }
  };

  useEffect(() => {
    fetchAllocations();
    fetchHousesAndMembers();
  }, []);

  const handleChange = (
    e: ChangeEvent<HTMLSelectElement | HTMLInputElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name.includes("Id") ? Number(value) : value,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/AllocateHouse/${editingId}`, formData);
        alert("✅ Allocation updated successfully!");
      } else {
        await axios.post(`${API_BASE}/AllocateHouse`, formData);
        alert("✅ Allocation created successfully!");
      }
      resetForm();
      fetchAllocations();
    } catch (err) {
      console.error("Error saving allocation:", err);
      alert("❌ Failed to save allocation.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (allocation: any) => {
    setFormData({
      id: allocation.id,
      houseId: allocation.houseId,
      memberId: allocation.memberId,
      allocationDate: allocation.allocationDate.substring(0, 10),
      releaseDate: allocation.releaseDate?.substring(0, 10) || "",
    });
    setEditingId(allocation.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this allocation?")) return;
    try {
      await axios.delete(`${API_BASE}/AllocateHouse/${id}`);
      alert("🗑️ Allocation deleted successfully!");
      fetchAllocations();
    } catch (err) {
      console.error("Error deleting allocation:", err);
      alert("❌ Failed to delete allocation.");
    }
  };

  return (
    <div className="container py-5">
      <h2 className="mb-4 text-center text-primary fw-bold">
        🏠 Allocate House Management
      </h2>

      {/* Form */}
      <div className="card mb-4 shadow-sm border-0">
        <div className="card-header bg-primary text-white">
          {editingId ? "✏️ Edit Allocation" : "➕ Add New Allocation"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label fw-semibold">House</label>
                <select
                  name="houseId"
                  value={formData.houseId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value={0}>Select House</option>
                  {houses.map((house) => (
                    <option key={house.id} value={house.id}>
                      {house.houseNumber} - {house.address}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Member</label>
                <select
                  name="memberId"
                  value={formData.memberId}
                  onChange={handleChange}
                  className="form-select"
                  required
                >
                  <option value={0}>Select Member</option>
                  {members.map((member) => (
                    <option key={member.id} value={member.id}>
                      {member.fullName} ({member.email})
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">
                  Allocation Date
                </label>
                <input
                  type="date"
                  name="allocationDate"
                  value={formData.allocationDate}
                  onChange={handleChange}
                  className="form-control"
                  required
                />
              </div>

              <div className="col-md-6">
                <label className="form-label fw-semibold">Release Date</label>
                <input
                  type="date"
                  name="releaseDate"
                  value={formData.releaseDate || ""}
                  onChange={handleChange}
                  className="form-control"
                />
              </div>
            </div>

            <button
              type="submit"
              className="btn btn-success w-100 mt-4"
              disabled={loading}
            >
              {loading
                ? "⏳ Processing..."
                : editingId
                ? "Update Allocation"
                : "Create Allocation"}
            </button>
          </form>
        </div>
      </div>

      {/* Table */}
      <div className="card shadow-sm border-0">
        <div className="card-header bg-light fw-bold">📋 Allocations List</div>
        <div className="card-body p-0">
          <table className="table table-striped table-hover mb-0 text-center">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>House</th>
                <th>Member</th>
                <th>Allocation Date</th>
                <th>Release Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {allocations.length > 0 ? (
                allocations.map((allocation) => (
                  <tr key={allocation.id}>
                    <td>{allocation.id}</td>
                    <td>
                      {allocation.house
                        ? `${allocation.house.houseNumber} - ${allocation.house.address}`
                        : "N/A"}
                    </td>
                    <td>{allocation.member?.fullName || "N/A"}</td>
                    <td>{allocation.allocationDate.substring(0, 10)}</td>
                    <td>{allocation.releaseDate?.substring(0, 10) || "N/A"}</td>
                    <td>
                      <button
                        className="btn btn-warning btn-sm me-2"
                        onClick={() => handleEdit(allocation)}
                      >
                        ✏️
                      </button>
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => handleDelete(allocation.id)}
                      >
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-3 text-muted">
                    No allocations found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
