"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface House {
  id: number;
  houseNumber: string;
  societyId: number;
  address: string;
  isAllocated: boolean;
}

const API_BASE = "https://localhost:7255/api/House";

const HousesManager: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isEditing, setIsEditing] = useState(false);

  const [form, setForm] = useState<Partial<House>>({
    houseNumber: "",
    societyId: undefined,
    address: "",
    isAllocated: false,
  });

  const fetchHouses = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE);

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      // We're no longer using this data, but fetch to ensure API is working
      await response.json();
      setError(null);
    } catch (err: any) {
      console.error("Fetch error:", err);
      setError(err.message || "Failed to fetch houses");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target;
    let val: any = type === "checkbox" ? checked : value;

    if (type === "number") {
      val = value === "" ? undefined : parseInt(value, 10);
    }

    setForm((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.houseNumber || form.societyId == null || !form.address) {
      alert("House number, Society ID, and address are required.");
      return;
    }

    try {
      const method = isEditing ? "PUT" : "POST";
      const url = isEditing ? `${API_BASE}/${form.id}` : API_BASE;

      const response = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errText = await response.text();
        throw new Error(`${response.status} - ${errText}`);
      }

      await fetchHouses();
      resetForm();
    } catch (err: any) {
      alert(err.message || "Submission failed.");
    }
  };

  const resetForm = () => {
    setForm({
      houseNumber: "",
      societyId: undefined,
      address: "",
      isAllocated: false,
    });
    setIsEditing(false);
  };

  return (
    <div className="container my-5">
      <div className="card shadow-sm">
        <div className="card-body">
          <h2 className="card-title text-center mb-4">Houses Manager</h2>

          {error && <div className="alert alert-danger">{error}</div>}

          {/* Form */}
          <form
            onSubmit={handleSubmit}
            className="border rounded p-4 mb-4 bg-light"
            noValidate
          >
            <h4 className="mb-4">
              {isEditing ? "Edit House" : "Add New House"}
            </h4>

            <div className="row g-3">
              <div className="col-md-4">
                <label htmlFor="houseNumber" className="form-label fw-semibold">
                  House Number <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="houseNumber"
                  name="houseNumber"
                  value={form.houseNumber ?? ""}
                  onChange={handleChange}
                  required
                  placeholder="e.g. A-101"
                />
              </div>

              <div className="col-md-4">
                <label htmlFor="societyId" className="form-label fw-semibold">
                  Society ID <span className="text-danger">*</span>
                </label>
                <input
                  type="number"
                  className="form-control"
                  id="societyId"
                  name="societyId"
                  value={form.societyId ?? ""}
                  onChange={handleChange}
                  required
                  placeholder="e.g. 5"
                />
              </div>

              <div className="col-md-4 d-flex align-items-center">
                <div className="form-check mt-4">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isAllocated"
                    name="isAllocated"
                    checked={form.isAllocated ?? false}
                    onChange={handleChange}
                  />
                  <label
                    htmlFor="isAllocated"
                    className="form-check-label fw-semibold"
                  >
                    Is Allocated
                  </label>
                </div>
              </div>

              <div className="col-12">
                <label htmlFor="address" className="form-label fw-semibold">
                  Address <span className="text-danger">*</span>
                </label>
                <textarea
                  className="form-control"
                  id="address"
                  name="address"
                  rows={2}
                  value={form.address ?? ""}
                  onChange={handleChange}
                  required
                  placeholder="Full house address"
                />
              </div>
            </div>

            <div className="mt-4">
              <button type="submit" className="btn btn-primary me-2">
                {isEditing ? (
                  <>
                    <i className="bi bi-pencil-square me-1"></i> Update
                  </>
                ) : (
                  <>
                    <i className="bi bi-plus-circle me-1"></i> Create
                  </>
                )}
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

          {/* Removed: House List/Table */}
        </div>
      </div>

      {/* Bootstrap Icons */}
      <link
        rel="stylesheet"
        href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
      />
    </div>
  );
};

export default HousesManager;
