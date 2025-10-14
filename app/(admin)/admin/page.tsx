"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUsers, FaBuilding, FaFileAlt, FaTasks } from "react-icons/fa";

export default function AdminDashboard() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="p-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <h1 className="mb-4 fw-bold" data-aos="fade-down">
        Welcome to Admin Dashboard
      </h1>

      {/* Statistic Cards */}
      <div className="row g-4 mb-4">
        {[
          {
            title: "Total Users",
            value: 1250,
            icon: <FaUsers />,
            bg: "bg-primary",
          },
          {
            title: "Companies",
            value: 230,
            icon: <FaBuilding />,
            bg: "bg-success",
          },
          {
            title: "Job Posts",
            value: 540,
            icon: <FaFileAlt />,
            bg: "bg-warning",
          },
          {
            title: "Tasks Pending",
            value: 12,
            icon: <FaTasks />,
            bg: "bg-danger",
          },
        ].map((card, idx) => (
          <div className="col-12 col-md-6 col-lg-3" key={idx}>
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

      {/* Recent Activity / Table */}
      <div className="card shadow-sm" data-aos="fade-up">
        <div className="card-header bg-white">
          <h5 className="m-0">Recent Activity</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>User</th>
                <th>Action</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: 1,
                  user: "John Doe",
                  action: "Posted a job",
                  date: "2025-10-08",
                },
                {
                  id: 2,
                  user: "Alice Smith",
                  action: "Registered",
                  date: "2025-10-07",
                },
                {
                  id: 3,
                  user: "Bob Johnson",
                  action: "Applied for a job",
                  date: "2025-10-07",
                },
                {
                  id: 4,
                  user: "Jane Williams",
                  action: "Updated profile",
                  date: "2025-10-06",
                },
              ].map((item) => (
                <tr key={item.id}>
                  <td>{item.id}</td>
                  <td>{item.user}</td>
                  <td>{item.action}</td>
                  <td>{item.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Placeholder for Charts */}
      <div
        className="card mt-4 shadow-sm"
        data-aos="fade-up"
        style={{ borderRadius: "12px", minHeight: "250px" }}
      >
        <div className="card-body d-flex justify-content-center align-items-center text-muted">
          <p> Charts Placeholder (Use Recharts / Chart.js)</p>
        </div>
      </div>
    </div>
  );
}
