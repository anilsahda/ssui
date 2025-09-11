"use client";

import React, { useEffect, useState } from "react";
import { FaHome, FaUsers, FaTools, FaMoneyBillWave } from "react-icons/fa";

type Stat = {
  title: string;
  count: number;
  icon: React.ReactNode;
};

export default function HouseOwnerDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    // Simulate fetching data (replace with real API call)
    const data: Stat[] = [
      {
        title: "Owned Houses",
        count: 4,
        icon: <FaHome size={28} className="text-primary" />,
      },
      {
        title: "Tenants",
        count: 12,
        icon: <FaUsers size={28} className="text-success" />,
      },
      {
        title: "Maintenance Requests",
        count: 3,
        icon: <FaTools size={28} className="text-warning" />,
      },
      {
        title: "Pending Payments",
        count: 2,
        icon: <FaMoneyBillWave size={28} className="text-danger" />,
      },
    ];

    setStats(data);
  }, []);

  return (
    <div className="container py-5">
      <div className="mb-5 text-center">
        <h2 className="fw-bold text-primary">House Owner Dashboard</h2>
        <p className="text-muted">Overview of your properties and tenants.</p>
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
