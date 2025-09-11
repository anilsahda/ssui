"use client";

import React, { useEffect, useState } from "react";
import { FaUsers, FaUserShield, FaCogs, FaChartBar } from "react-icons/fa";

type Stat = {
  title: string;
  count: number;
  icon: React.ReactNode;
};

export default function AdminDashboardPage() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    // Simulate API data (replace with real API call if needed)
    const data: Stat[] = [
      {
        title: "Total Users",
        count: 1500,
        icon: <FaUsers size={28} className="text-primary" />,
      },
      {
        title: "Roles Assigned",
        count: 340,
        icon: <FaUserShield size={28} className="text-success" />,
      },
      {
        title: "System Settings",
        count: 28,
        icon: <FaCogs size={28} className="text-warning" />,
      },
      {
        title: "Activity Logs",
        count: 1025,
        icon: <FaChartBar size={28} className="text-info" />,
      },
    ];

    setStats(data);
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-5 text-center">
        <h2 className="fw-bold text-primary">Admin Dashboard</h2>
        <p className="text-muted">
          Monitor and manage your entire system from one place.
        </p>
      </div>

      <div className="row g-4">
        {stats.map((stat, index) => (
          <div className="col-md-6 col-lg-3" key={index}>
            <div className="card border-0 shadow-sm h-100 text-center p-4">
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
