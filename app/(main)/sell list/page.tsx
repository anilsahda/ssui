"use client";

import React, { useEffect, useState } from "react";
import { FaSearch, FaMapMarkerAlt, FaHome, FaDollarSign } from "react-icons/fa";

type SellHouse = {
  id: string;
  name: string;
  location: string;
  price: number;
  status: "For Sale" | "Sold";
};

const SellListPage = () => {
  const [houses, setHouses] = useState<SellHouse[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchHouses = async () => {
      try {
        const res = await fetch("/api/sell-houses");
        if (!res.ok) throw new Error("Failed to fetch data");
        const data = await res.json();
        setHouses(data);
      } catch (err: any) {
        setError(err.message || "An error occurred");
      } finally {
        setLoading(false);
      }
    };

    fetchHouses();
  }, []);

  const filteredHouses = houses.filter(
    (house) =>
      house.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      house.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary fw-bold mb-4">
        🏘️ Sell House Listings
      </h1>
      <p className="text-center text-muted mb-5">
        Browse available houses for sale or check recently sold properties.
      </p>

      {/* Search */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-primary text-white">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Search by name or location..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : filteredHouses.length === 0 ? (
        <div className="text-center text-muted">
          No matching properties found.
        </div>
      ) : (
        <div className="row g-4">
          {filteredHouses.map((house) => (
            <div className="col-md-6 col-lg-4" key={house.id}>
              <div className="card border-0 shadow-sm h-100">
                <div className="card-body">
                  <h5 className="card-title text-primary d-flex align-items-center gap-2 mb-2">
                    <FaHome /> {house.name}
                  </h5>
                  <p className="card-text text-muted mb-1">
                    <FaMapMarkerAlt className="text-danger me-2" />
                    {house.location}
                  </p>
                  <p className="card-text mb-1">
                    <FaDollarSign className="text-success me-2" />₹
                    {house.price.toLocaleString()}
                  </p>
                  <span
                    className={`badge bg-${
                      house.status === "For Sale" ? "success" : "secondary"
                    }`}
                  >
                    {house.status}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellListPage;
