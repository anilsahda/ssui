"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaUsers,
  FaChartLine,
  FaClipboardList,
  FaCogs,
  FaSignOutAlt,
} from "react-icons/fa";

export default function AdminDashboard() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const stats = [
    {
      icon: <FaUsers size={40} className="text-primary" />,
      title: "Active Users",
      value: "1,245",
      delay: 100,
    },
    {
      icon: <FaChartLine size={40} className="text-success" />,
      title: "Monthly Growth",
      value: "+15%",
      delay: 200,
    },
    {
      icon: <FaClipboardList size={40} className="text-warning" />,
      title: "Tasks Completed",
      value: "786",
      delay: 300,
    },
    {
      icon: <FaCogs size={40} className="text-info" />,
      title: "System Health",
      value: "99.9%",
      delay: 400,
    },
  ];

  return (
    <div
      className="min-vh-100 d-flex flex-column"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2, #20c997)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 12s ease infinite",
        color: "#fff",
      }}
    >
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-transparent py-3 px-4 shadow-sm">
        <div className="container-fluid">
          <h3 className="fw-bold mb-0">⚙️ Admin Dashboard</h3>
          <button className="btn btn-outline-light rounded-pill px-3 fw-semibold">
            <FaSignOutAlt className="me-2" />
            Logout
          </button>
        </div>
      </nav>

      {/* Main Dashboard */}
      <div className="container py-5 flex-grow-1">
        <div className="text-center mb-5" data-aos="fade-down">
          <h2 className="fw-bold">Welcome Back, Admin 👋</h2>
          <p className="text-light">
            Here’s what’s happening in your system today.
          </p>
        </div>

        <div className="row g-4 justify-content-center">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="col-md-3 col-sm-6"
              data-aos="fade-up"
              data-aos-delay={stat.delay}
            >
              <div
                className="card text-center border-0 shadow-lg p-4 h-100 stat-card"
                style={{
                  borderRadius: "15px",
                  background: "rgba(255, 255, 255, 0.95)",
                  backdropFilter: "blur(12px)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
              >
                <div className="mb-3">{stat.icon}</div>
                <h6 className="fw-bold text-dark">{stat.title}</h6>
                <h3 className="fw-bolder text-gradient">{stat.value}</h3>
              </div>
            </div>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="mt-5" data-aos="fade-up">
          <h4 className="fw-bold text-center mb-4">Quick Actions</h4>
          <div className="d-flex flex-wrap justify-content-center gap-3">
            {[
              "Manage Users",
              "View Reports",
              "System Settings",
              "Backup Data",
            ].map((action, index) => (
              <button
                key={index}
                className="btn btn-light btn-lg rounded-pill shadow-sm px-4 fw-semibold"
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className="text-center text-light py-3 small"
        data-aos="fade-up"
        data-aos-delay="500"
      >
        © {new Date().getFullYear()} SS Admin Panel — Powered by Next.js &
        Bootstrap.
      </footer>

      {/* Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .stat-card:hover {
          transform: translateY(-10px);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.3);
        }

        .text-gradient {
          background: linear-gradient(90deg, #0d6efd, #20c997);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        button {
          transition: all 0.3s ease;
        }

        button:hover {
          transform: translateY(-3px);
        }
      `}</style>
    </div>
  );
}
