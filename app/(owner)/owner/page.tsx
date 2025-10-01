"use client";

import React, { useEffect, useState } from "react";
import { FaHome, FaUsers, FaTools, FaMoneyBillWave } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

type Stat = {
  title: string;
  count: number;
  icon: React.ReactNode;
};

export default function HouseOwnerDashboard() {
  const [stats, setStats] = useState<Stat[]>([]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Simulate fetching data (replace with API)
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
      {/* Header */}
      <div
        className="mb-5 text-center"
        data-aos="fade-down"
        data-aos-delay="100"
      >
        <h2 className="fw-bold text-primary"> House Owner Dashboard</h2>
        <p className="text-muted">
          Get insights into your properties, tenants, and maintenance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="row g-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className="col-12 col-sm-6 col-lg-3"
            data-aos="fade-up"
            data-aos-delay={index * 100 + 100}
          >
            <div className="card border-0 shadow-sm h-100 text-center p-4 rounded-4 bg-white hover-shadow">
              <div className="mb-3">{stat.icon}</div>
              <h6 className="fw-semibold text-secondary mb-1">{stat.title}</h6>
              <h2 className="fw-bold text-dark">{stat.count}</h2>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
