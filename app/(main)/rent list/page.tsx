"use client";

import React, { useEffect, useState } from "react";
import { FaMapMarkerAlt, FaHome, FaMoneyBillWave } from "react-icons/fa";

type RentHouse = {
  id: string;
  name: string;
  location: string;
  rentAmount: number;
  status: "Available" | "Occupied";
};

export default function RentListPage() {
  const [rentHouses, setRentHouses] = useState<RentHouse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRentHouses = async () => {
      try {
        const res = await fetch("/api/rent-houses");
        if (!res.ok) throw new Error("Failed to fetch rent houses.");
        const data = await res.json();
        setRentHouses(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchRentHouses();
  }, []);

  const filteredHouses = rentHouses.filter(
    (house) =>
      house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h1 className="text-center fw-bold text-primary mb-4">
        🏘️ Rent House List
      </h1>
      <p className="text-center text-muted mb-5">
        View all available and occupied rental properties.
      </p>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="search"
            className="form-control form-control-lg"
            placeholder="Search by name or location..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : filteredHouses.length === 0 ? (
        <div className="text-center text-muted">No rent houses found.</div>
      ) : (
        <div className="row g-4">
          {filteredHouses.map((house) => (
            <div className="col-md-6 col-lg-4" key={house.id}>
              <div className="card shadow-sm border-0 h-100">
                <div className="card-body">
                  <h5 className="card-title d-flex align-items-center gap-2 text-primary">
                    <FaHome /> {house.name}
                  </h5>
                  <p className="card-text mb-1">
                    <FaMapMarkerAlt className="text-danger me-2" />
                    {house.location}
                  </p>
                  <p className="card-text mb-2">
                    <FaMoneyBillWave className="text-success me-2" />₹
                    {house.rentAmount.toLocaleString()}
                  </p>
                  <span
                    className={`badge bg-${
                      house.status === "Available" ? "success" : "secondary"
                    } rounded-pill`}
                  >
                    {house.status}
                  </span>
                </div>
                <div className="card-footer bg-white border-0 text-end">
                  <button
                    className="btn btn-outline-primary btn-sm"
                    disabled={house.status !== "Available"}
                  >
                    {house.status === "Available"
                      ? "Book Now"
                      : "Not Available"}
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
