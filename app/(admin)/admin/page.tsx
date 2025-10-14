"use client";

import React, { useEffect } from "react";
import { FaUsers, FaUserShield, FaCogs, FaChartBar } from "react-icons/fa";
import { useDashboardStore, Stat } from "./store/usedashbord";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AdminDashboardPage() {
  const { stats, setStats } = useDashboardStore();

  useEffect(() => {
    AOS.init({
      duration: 800,
      easing: "ease-in-out",
      once: true,
    });

    // Simulated API fetch (replace with real API)
    const data: Stat[] = [
      {
        title: "Total Users",
        count: 1500,
        icon: <FaUsers size={28} />,
        color: "text-primary",
      },
      {
        title: "Roles Assigned",
        count: 340,
        icon: <FaUserShield size={28} />,
        color: "text-success",
      },
      {
        title: "System Settings",
        count: 28,
        icon: <FaCogs size={28} />,
        color: "text-warning",
      },
      {
        title: "Activity Logs",
        count: 1025,
        icon: <FaChartBar size={28} />,
        color: "text-info",
      },
    ];
    setStats(data);
  }, [setStats]);

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="mb-5 text-center" data-aos="fade-down">
        <h2 className="fw-bold text-primary">Admin Dashboard</h2>
        <p className="text-muted">
          Monitor and manage your entire system efficiently from one place.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="row g-4">
        {stats.map((stat, idx) => (
          <div
            className="col-md-6 col-lg-3"
            key={idx}
            data-aos="fade-up"
            data-aos-delay={idx * 150}
          >
            <div className="card border-0 shadow-sm h-100 p-4 text-center hover-scale transition">
              <div className={`mb-3 ${stat.color || "text-primary"}`}>
                {stat.icon}
              </div>
              <h6 className="fw-semibold mb-1">{stat.title}</h6>
              <h3 className="fw-bold">{stat.count}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Custom hover animation */}
      <style jsx>{`
        .hover-scale {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .hover-scale:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
        }
      `}</style>
    </div>
  );
}
