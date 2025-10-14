"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import { useHouseStore, House } from "../store/house";

const API_BASE = "https://localhost:7255/api/House";

const HousesManager: React.FC = () => {
  const {
    houses,
    loading,
    error,
    form,
    isEditing,
    setHouses,
    setLoading,
    setError,
    setForm,
    setIsEditing,
    resetForm,
  } = useHouseStore();

  // ✅ Fetch houses
  const fetchHouses = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      const data: House[] = await res.json();
      setHouses(Array.isArray(data) ? data : []);
      setError(null);
    } catch (err: any) {
      setHouses([]);
      setError(err.message || "Failed to load houses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  // ✅ Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    let val: any = type === "checkbox" ? checked : value;
    if (type === "number") val = value === "" ? undefined : parseInt(value, 10);
    setForm({ ...form, [name]: val });
  };

  // ✅ Submit form (Add / Update)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!form.houseNumber || !form.societyId || !form.address) {
      Swal.fire("Validation", "All required fields must be filled", "warning");
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${API_BASE}/${form.id}` : API_BASE;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!res.ok) throw new Error(await res.text());

      Swal.fire({
        icon: "success",
        title: isEditing ? "Updated successfully" : "Added successfully",
        timer: 1500,
        showConfirmButton: false,
      });

      fetchHouses();
      resetForm();
    } catch (err: any) {
      Swal.fire("Error", err.message, "error");
    }
  };

  // ✅ Edit house
  const handleEdit = (house: House) => {
    setForm(house);
    setIsEditing(true);
  };

  // ✅ Delete house
  const handleDelete = async (id?: number) => {
    if (!id) return;

    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You cannot undo this action!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      const res = await fetch(`${API_BASE}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error(await res.text());

      Swal.fire("Deleted!", "House has been removed.", "success");
      fetchHouses();
    } catch (err: any) {
      Swal.fire("Error", err.message, "error");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">🏠 Houses Manager</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="border rounded p-4 mb-4 bg-light"
          >
            <h4 className="mb-4">
              {isEditing ? "Edit House" : "Add New House"}
            </h4>

            <div className="row g-3">
              <div className="col-md-4">
                <label className="form-label fw-semibold">House Number *</label>
                <input
                  type="text"
                  name="houseNumber"
                  className="form-control"
                  value={form.houseNumber ?? ""}
                  onChange={handleChange}
                  placeholder="e.g. A-101"
                />
              </div>

              <div className="col-md-4">
                <label className="form-label fw-semibold">Society ID *</label>
                <input
                  type="number"
                  name="societyId"
                  className="form-control"
                  value={form.societyId ?? ""}
                  onChange={handleChange}
                  placeholder="e.g. 1"
                />
              </div>

              <div className="col-md-4 d-flex align-items-center">
                <div className="form-check mt-4">
                  <input
                    type="checkbox"
                    className="form-check-input"
                    name="isAllocated"
                    checked={form.isAllocated ?? false}
                    onChange={handleChange}
                  />
                  <label className="form-check-label">Is Allocated</label>
                </div>
              </div>

              <div className="col-12">
                <label className="form-label fw-semibold">Address *</label>
                <textarea
                  name="address"
                  className="form-control"
                  rows={2}
                  value={form.address ?? ""}
                  onChange={handleChange}
                  placeholder="Full house address"
                />
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary me-2">
                {isEditing ? "Update" : "Create"}
              </button>
              {isEditing && (
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  onClick={resetForm}
                >
                  Cancel
                </button>
              )}
            </div>
          </form>

          {/* Table */}
          <h4 className="mb-3">🏘️ All Houses</h4>
          {loading ? (
            <p>Loading...</p>
          ) : (
            <table className="table table-bordered table-hover">
              <thead className="table-dark">
                <tr>
                  <th>ID</th>
                  <th>House No</th>
                  <th>Society ID</th>
                  <th>Address</th>
                  <th>Allocated</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {houses.length > 0 ? (
                  houses.map((house) => (
                    <tr key={house.id}>
                      <td>{house.id}</td>
                      <td>{house.houseNumber}</td>
                      <td>{house.societyId}</td>
                      <td>{house.address}</td>
                      <td>
                        {house.isAllocated ? (
                          <span className="badge bg-success">Yes</span>
                        ) : (
                          <span className="badge bg-secondary">No</span>
                        )}
                      </td>
                      <td>
                        <button
                          className="btn btn-sm btn-warning me-2"
                          onClick={() => handleEdit(house)}
                        >
                          <i className="bi bi-pencil-square"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleDelete(house.id)}
                        >
                          <i className="bi bi-trash"></i>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-center text-muted">
                      No houses found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  );
};

export default HousesManager;
