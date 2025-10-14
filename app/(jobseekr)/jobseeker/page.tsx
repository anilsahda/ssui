"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUserGraduate,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
} from "react-icons/fa";

export default function JobseekerAdmin() {
  const [jobseekers, setJobseekers] = useState([
    {
      id: 1,
      name: "John Doe",
      email: "john@example.com",
      applied: "Frontend Developer",
      status: "Verified",
    },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane@example.com",
      applied: "Backend Developer",
      status: "Pending",
    },
    {
      id: 3,
      name: "Alice Johnson",
      email: "alice@example.com",
      applied: "UI/UX Designer",
      status: "Verified",
    },
    {
      id: 4,
      name: "Bob Brown",
      email: "bob@example.com",
      applied: "Project Manager",
      status: "Pending",
    },
  ]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const filteredJobseekers = jobseekers.filter(
    (j) =>
      j.name.toLowerCase().includes(search.toLowerCase()) ||
      j.email.toLowerCase().includes(search.toLowerCase()) ||
      j.applied.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="p-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <h2 className="mb-4 fw-bold text-primary" data-aos="fade-down">
        Manage Jobseekers
      </h2>

      {/* Statistic Cards */}
      <div className="row g-4 mb-4">
        {[
          {
            title: "Total Jobseekers",
            value: jobseekers.length,
            icon: <FaUserGraduate />,
            bg: "bg-primary",
          },
          {
            title: "Verified",
            value: jobseekers.filter((j) => j.status === "Verified").length,
            icon: <FaCheckCircle />,
            bg: "bg-success",
          },
          {
            title: "Pending Verification",
            value: jobseekers.filter((j) => j.status !== "Verified").length,
            icon: <FaCalendarAlt />,
            bg: "bg-warning text-dark",
          },
        ].map((card, idx) => (
          <div className="col-12 col-md-4" key={idx}>
            <div
              className={`card text-white ${card.bg} shadow-lg`}
              style={{ borderRadius: "12px" }}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="card-body d-flex align-items-center gap-3">
                <div className="fs-2">{card.icon}</div>
                <div>
                  <h5 className="card-title mb-1">{card.title}</h5>
                  <p className="card-text fs-5 fw-bold">{card.value}</p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Search Input */}
      <div className="mb-3" data-aos="fade-up">
        <input
          type="text"
          className="form-control shadow-sm"
          placeholder="Search jobseekers by name, email or position..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Jobseeker Table */}
      <div
        className="card shadow-sm mb-4"
        data-aos="fade-up"
        style={{ borderRadius: "12px" }}
      >
        <div className="card-header bg-white">
          <h5 className="m-0">Jobseeker List</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0 align-middle">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Email</th>
                <th>Applied Position</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredJobseekers.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-muted">
                    No jobseekers found.
                  </td>
                </tr>
              ) : (
                filteredJobseekers.map((js) => (
                  <tr key={js.id}>
                    <td>{js.id}</td>
                    <td>{js.name}</td>
                    <td>{js.email}</td>
                    <td>{js.applied}</td>
                    <td>
                      <span
                        className={`badge ${
                          js.status === "Verified"
                            ? "bg-success"
                            : "bg-warning text-dark"
                        }`}
                      >
                        {js.status}
                      </span>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Analytics / Charts Placeholder */}
      <div
        className="card mt-4 shadow-sm"
        data-aos="fade-up"
        style={{ borderRadius: "12px", minHeight: "200px" }}
      >
        <div className="card-body d-flex justify-content-center align-items-center text-muted">
          <p>📊 Analytics & Charts Placeholder (Use Chart.js / Recharts)</p>
        </div>
      </div>
    </div>
  );
}
