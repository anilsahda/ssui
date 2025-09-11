"use client";

import React from "react";
import { FaUsers, FaUserShield, FaCogs, FaChartBar } from "react-icons/fa";

export default function SuperAdminDashboard() {
  const stats = [
    {
      title: "Total Users",
      count: 1250,
      icon: <FaUsers size={28} className="text-primary" />,
      bg: "primary",
    },
    {
      title: "Roles Assigned",
      count: 320,
      icon: <FaUserShield size={28} className="text-success" />,
      bg: "success",
    },
    {
      title: "System Settings",
      count: 24,
      icon: <FaCogs size={28} className="text-warning" />,
      bg: "warning",
    },
    {
      title: "Activity Logs",
      count: 985,
      icon: <FaChartBar size={28} className="text-info" />,
      bg: "info",
    },
  ];

  return (
    <div className="container py-5">
      <div className="mb-5 text-center">
        <h2 className="fw-bold text-primary">Super Admin Dashboard</h2>
        <p className="text-muted">
          Monitor and manage your entire system from a single interface.
        </p>
      </div>

      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className={`card border-0 shadow-sm h-100 text-center p-4`}>
              <div className="mb-2">{stat.icon}</div>
              <h6 className="fw-semibold mb-1">{stat.title}</h6>
              <h3 className="fw-bold text-dark">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
