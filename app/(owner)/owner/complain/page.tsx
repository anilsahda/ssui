"use client";

import React, { useEffect, useState } from "react";
import {
  FaUser,
  FaClock,
  FaExclamationTriangle,
  FaCheckCircle,
} from "react-icons/fa";

type Complaint = {
  id: string;
  title: string;
  description: string;
  user: string;
  status: "Pending" | "Resolved" | "In Review";
  createdAt: string;
};

export default function ComplainPage() {
  const [complaints, setComplaints] = useState<Complaint[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchComplaints = async () => {
      try {
        const res = await fetch("/api/complaints");
        if (!res.ok) {
          throw new Error(`Failed to fetch: ${res.status}`);
        }
        const data: Complaint[] = await res.json();
        // Optionally sort by date descending
        data.sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setComplaints(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Something went wrong");
      } finally {
        setLoading(false);
      }
    };

    fetchComplaints();
  }, []);

  const filtered = complaints.filter(
    (c) =>
      c.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const formatDate = (iso: string) => {
    const d = new Date(iso);
    return d.toLocaleDateString(undefined, {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const statusBadge = (status: Complaint["status"]) => {
    switch (status) {
      case "Resolved":
        return (
          <span className="badge bg-success">
            <FaCheckCircle className="me-1" /> Resolved
          </span>
        );
      case "In Review":
        return (
          <span className="badge bg-warning text-dark">
            <FaClock className="me-1" /> In Review
          </span>
        );
      case "Pending":
      default:
        return (
          <span className="badge bg-danger">
            <FaExclamationTriangle className="me-1" /> Pending
          </span>
        );
    }
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5">
        <h1 className="fw-bold text-primary">🚨 Complaints</h1>
        <p className="text-muted fs-5">
          See all user complaints, status, and details below.
        </p>
      </div>

      <div className="row justify-content-center mb-4">
        <div className="col-md-6">
          <input
            type="search"
            className="form-control form-control-lg shadow-sm"
            placeholder="Search by title or user..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading complaints...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center">{error}</div>
      ) : filtered.length === 0 ? (
        <div className="text-center text-muted">
          No complaints found matching your search.
        </div>
      ) : (
        <div className="row g-4">
          {filtered.map((c) => (
            <div key={c.id} className="col-md-6 col-lg-4">
              <div className="card shadow-sm h-100 border-0">
                <div className="card-body d-flex flex-column">
                  <h5 className="card-title fw-semibold text-primary mb-2">
                    {c.title}
                  </h5>
                  <p
                    className="card-text text-muted mb-2"
                    style={{ flexGrow: 1 }}
                  >
                    {c.description}
                  </p>
                  <div className="d-flex justify-content-between align-items-center flex-wrap small text-muted mb-2">
                    <div>
                      <FaUser className="me-1" /> {c.user}
                    </div>
                    <div>
                      <FaClock className="me-1" /> {formatDate(c.createdAt)}
                    </div>
                  </div>
                  <div>{statusBadge(c.status)}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
