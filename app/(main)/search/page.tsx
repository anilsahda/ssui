"use client";

import React, { useEffect, useState } from "react";
import { FaSearch, FaHome, FaMapMarkerAlt } from "react-icons/fa";

// Type for search results (e.g., houses, listings, etc.)
type SearchItem = {
  id: string;
  title: string;
  description: string;
  location: string;
};

const SearchPage: React.FC = () => {
  const [items, setItems] = useState<SearchItem[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate API fetch
    const fetchData = async () => {
      try {
        const response = await fetch("/api/search-items");
        if (!response.ok) throw new Error("Failed to load search results");
        const data = await response.json();
        setItems(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filteredItems = items.filter(
    (item) =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container py-5">
      <div className="text-center mb-4">
        <h1 className="text-primary fw-bold">🔍 Search Listings</h1>
        <p className="text-muted">
          Search through available listings by title, location, or keywords.
        </p>
      </div>

      {/* Search Input */}
      <div className="row justify-content-center mb-4">
        <div className="col-md-8">
          <div className="input-group input-group-lg shadow-sm">
            <span className="input-group-text bg-primary text-white">
              <FaSearch />
            </span>
            <input
              type="text"
              className="form-control"
              placeholder="Type to search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Content */}
      {loading ? (
        <div className="text-center">
          <div className="spinner-border text-primary" role="status"></div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : filteredItems.length === 0 ? (
        <div className="text-center text-muted">No results found.</div>
      ) : (
        <div className="row g-4">
          {filteredItems.map((item) => (
            <div className="col-md-6 col-lg-4" key={item.id}>
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body">
                  <h5 className="card-title text-primary d-flex align-items-center gap-2">
                    <FaHome /> {item.title}
                  </h5>
                  <p className="card-text text-muted">{item.description}</p>
                  <p className="card-text">
                    <FaMapMarkerAlt className="text-danger me-2" />
                    {item.location}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchPage;
