"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaUsers, FaTasks, FaChartBar, FaDollarSign } from "react-icons/fa";

export default function AdminDashboard() {
  const [counts, setCounts] = useState({
    users: 0,
    tasks: 0,
    performance: 0,
    revenue: 0,
  });

  useEffect(() => {
    AOS.init({ duration: 800, once: true });

    // Smooth animated counters
    const animateCounter = (
      target: number,
      key: keyof typeof counts,
      duration = 1000
    ) => {
      let start = 0;
      const increment = target / (duration / 16);
      const timer = setInterval(() => {
        start += increment;
        setCounts((prev) => ({
          ...prev,
          [key]: Math.min(Math.floor(start), target),
        }));
        if (start >= target) clearInterval(timer);
      }, 16);
    };

    animateCounter(1245, "users");
    animateCounter(320, "tasks");
    animateCounter(87, "performance");
    animateCounter(45, "revenue");
  }, []);

  return (
    <div className="container-fluid py-4">
      {/* Page Title */}
      <div className="text-center mb-4" data-aos="fade-down">
        <h1 className="fw-bold text-primary display-6 mb-2">Admin Dashboard</h1>
        <p className="text-muted">
          Overview of system statistics and activities
        </p>
      </div>

      {/* Stats Section */}
      <div className="row g-4" data-aos="fade-up">
        {[
          {
            icon: <FaUsers />,
            title: "Users",
            value: counts.users,
            subtitle: "Active this month",
            color: "linear-gradient(135deg,#2563eb,#1e40af)",
          },
          {
            icon: <FaTasks />,
            title: "Tasks",
            value: counts.tasks,
            subtitle: "Completed today",
            color: "linear-gradient(135deg,#16a34a,#065f46)",
          },
          {
            icon: <FaChartBar />,
            title: "Performance",
            value: counts.performance + "%",
            subtitle: "Efficiency rate",
            color: "linear-gradient(135deg,#9333ea,#6b21a8)",
          },
          {
            icon: <FaDollarSign />,
            title: "Revenue",
            value: "$" + counts.revenue + "K",
            subtitle: "Monthly earnings",
            color: "linear-gradient(135deg,#f59e0b,#b45309)",
          },
        ].map((card, i) => (
          <div
            className="col-md-3 col-sm-6"
            key={i}
            data-aos="zoom-in"
            data-aos-delay={i * 100}
          >
            <div
              className="card shadow-sm border-0 rounded-4 dashboard-card h-100 text-center text-white position-relative overflow-hidden"
              style={{ background: card.color }}
            >
              <div className="position-absolute top-0 end-0 p-2 opacity-10 fs-1">
                {card.icon}
              </div>
              <div className="card-body position-relative">
                <div className="mb-2 fs-3">{card.icon}</div>
                <h5 className="fw-semibold mb-0">{card.title}</h5>
                <h3 className="fw-bold mt-1 mb-0">{card.value}</h3>
                <small>{card.subtitle}</small>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Activity Section */}
      <div className="row mt-5 g-4">
        {/* Recent Activities */}
        <div className="col-lg-8" data-aos="fade-up">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-0 d-flex justify-content-between align-items-center">
              <h5 className="fw-semibold text-primary mb-0">
                Recent Activities
              </h5>
              <span className="badge bg-light text-dark">Today</span>
            </div>
            <div className="card-body">
              <ul className="list-unstyled timeline">
                {[
                  { text: "New user registered", time: "2 mins ago" },
                  { text: "Task 'Frontend UI' completed", time: "10 mins ago" },
                  { text: "New feedback received", time: "30 mins ago" },
                  { text: "Server backup completed", time: "1 hour ago" },
                ].map((item, i) => (
                  <li key={i} className="mb-3 position-relative ps-4">
                    <span
                      className="position-absolute top-0 start-0 translate-middle rounded-circle bg-primary"
                      style={{ width: 10, height: 10 }}
                    ></span>
                    <div className="fw-semibold">{item.text}</div>
                    <small className="text-muted">{item.time}</small>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* System Status */}
        <div className="col-lg-4" data-aos="fade-left" data-aos-delay="150">
          <div className="card border-0 shadow-sm rounded-4 h-100">
            <div className="card-header bg-white border-0">
              <h5 className="fw-semibold text-primary mb-0">System Status</h5>
            </div>
            <div className="card-body">
              {[
                { label: "Server Uptime", value: 95, color: "bg-success" },
                { label: "Database Usage", value: 72, color: "bg-warning" },
                { label: "API Response", value: 88, color: "bg-info" },
              ].map((item, i) => (
                <div key={i} className="mb-3">
                  <p className="mb-1 fw-medium">{item.label}</p>
                  <div className="progress" style={{ height: "8px" }}>
                    <div
                      className={`progress-bar ${item.color}`}
                      role="progressbar"
                      style={{ width: `${item.value}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .dashboard-card {
          transition: all 0.3s ease-in-out;
        }
        .dashboard-card:hover {
          transform: translateY(-6px) scale(1.02);
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
        }
        .timeline::before {
          content: "";
          position: absolute;
          left: 4px;
          top: 0;
          bottom: 0;
          width: 2px;
          background: #dee2e6;
        }
      `}</style>
    </div>
  );
}
