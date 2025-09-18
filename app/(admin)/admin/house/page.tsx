"use client";
import React, { useEffect, useState, ChangeEvent, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type House = {
  id: number;
  houseNumber: string;
  societyId: number;
  address: string;
  isAllocated: boolean;
};

const HousesPage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Partial<House>>({});
  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchHouses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://localhost:7255/api/House");
      if (!res.ok) throw new Error("Failed to fetch houses");

      const response = await res.json();
      const housesArray = Array.isArray(response)
        ? response
        : Array.isArray(response.data)
        ? response.data
        : [];

      if (!Array.isArray(housesArray)) {
        throw new Error("Invalid API response: expected array");
      }

      setHouses(housesArray);
    } catch (err: any) {
      setError(err.message);
      setHouses([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const openAddModal = () => {
    setFormData({});
    setIsEditing(false);
    setShowModal(true);
  };

  const openEditModal = (house: House) => {
    setFormData(house);
    setIsEditing(true);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setFormData({});
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const payload = {
      houseNumber: formData.houseNumber || "",
      societyId: formData.societyId || 0,
      address: formData.address || "",
      isAllocated: formData.isAllocated || false,
    };

    try {
      const url = isEditing
        ? `https://localhost:7255/api/House/${formData.id}`
        : "https://localhost:7255/api/House";
      const method = isEditing ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Failed to save house");

      await fetchHouses();
      closeModal();
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this house?")) return;

    try {
      const res = await fetch(`https://localhost:7255/api/House/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete house");

      await fetchHouses();
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="container mt-4">
      <h1 className="mb-4">Houses Management</h1>

      {error && <div className="alert alert-danger">{error}</div>}

      <button className="btn btn-primary mb-3" onClick={openAddModal}>
        Add New House
      </button>

      {loading ? (
        <p>Loading...</p>
      ) : houses.length === 0 ? (
        <p>No houses found.</p>
      ) : (
        <div className="alert alert-info">
          {/* Optionally, you can list house count or just leave a message */}
          {houses.length} house(s) fetched. Table view has been removed.
        </div>
      )}

      {/* Modal */}
      {showModal && (
        <div
          className="modal show fade d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog" role="document">
            <form onSubmit={handleSubmit} className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {isEditing ? "Edit House" : "Add New House"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={closeModal}
                  aria-label="Close"
                />
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label htmlFor="houseNumber" className="form-label">
                    House Number
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="houseNumber"
                    name="houseNumber"
                    value={formData.houseNumber || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="societyId" className="form-label">
                    Society ID
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="societyId"
                    name="societyId"
                    value={formData.societyId || ""}
                    onChange={handleInputChange}
                    required
                    min={1}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="address" className="form-label">
                    Address
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="address"
                    name="address"
                    value={formData.address || ""}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id="isAllocated"
                    name="isAllocated"
                    checked={formData.isAllocated || false}
                    onChange={handleInputChange}
                  />
                  <label className="form-check-label" htmlFor="isAllocated">
                    Allocated
                  </label>
                </div>
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={closeModal}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  {isEditing ? "Update" : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default HousesPage;
