"use client";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUsers,
  FaTasks,
  FaChartLine,
  FaUserShield,
  FaArrowUp,
} from "react-icons/fa";

export default function AdminDashboard() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="container-fluid py-5"
      style={{
        background:
          "linear-gradient(135deg, #f8f9fa 0%, #e0f7fa 50%, #f0f4f8 100%)",
        minHeight: "100vh",
      }}
    >
      {/* Dashboard Header */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h2 className="fw-bold text-primary display-6">Admin Dashboard</h2>
        <p className="text-muted fs-5">
          Welcome back, <strong>Admin</strong> 👋 — here’s a quick system
          overview.
        </p>
      </div>

      {/* Statistic Cards */}
      <div className="row g-4 px-4">
        {[
          {
            title: "Total Users",
            value: "1,245",
            color: "primary",
            icon: <FaUsers size={40} />,
            delay: 0,
          },
          {
            title: "Active Tasks",
            value: "87",
            color: "success",
            icon: <FaTasks size={40} />,
            delay: 100,
          },
          {
            title: "Growth Rate",
            value: "+24%",
            color: "warning",
            icon: <FaChartLine size={40} />,
            delay: 200,
          },
          {
            title: "Admin Roles",
            value: "5",
            color: "danger",
            icon: <FaUserShield size={40} />,
            delay: 300,
          },
        ].map((card, index) => (
          <div
            key={index}
            className="col-lg-3 col-md-6 col-sm-12"
            data-aos="zoom-in"
            data-aos-delay={card.delay}
          >
            <div
              className={`card border-0 shadow-lg rounded-4 text-center card-hover bg-white`}
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div className="card-body py-4">
                <div
                  className={`mb-3 text-${card.color}`}
                  style={{ fontSize: "2rem" }}
                >
                  {card.icon}
                </div>
                <h6 className="fw-semibold text-secondary">{card.title}</h6>
                <h3 className="fw-bold text-dark mb-0">{card.value}</h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* System Progress Section */}
      <div className="mt-5 px-4" data-aos="fade-up" data-aos-delay="100">
        <div className="card shadow-lg border-0 rounded-4">
          <div className="card-header bg-gradient bg-primary text-white rounded-top-4">
            <h5 className="mb-0">System Overview</h5>
          </div>
          <div className="card-body">
            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>User Engagement</span>
                <span className="fw-bold">80%</span>
              </div>
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar bg-success"
                  role="progressbar"
                  style={{ width: "80%" }}
                ></div>
              </div>
            </div>

            <div className="mb-3">
              <div className="d-flex justify-content-between">
                <span>Task Completion</span>
                <span className="fw-bold">60%</span>
              </div>
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar bg-warning"
                  role="progressbar"
                  style={{ width: "60%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="d-flex justify-content-between">
                <span>System Stability</span>
                <span className="fw-bold">95%</span>
              </div>
              <div className="progress" style={{ height: "10px" }}>
                <div
                  className="progress-bar bg-info"
                  role="progressbar"
                  style={{ width: "95%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Activity Section */}
      <div
        className="card mt-5 mx-4 shadow-lg border-0 rounded-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        <div className="card-header bg-primary text-white rounded-top-4 d-flex justify-content-between align-items-center">
          <h5 className="mb-0">Recent Activities</h5>
          <small>
            <FaArrowUp className="me-1" /> Updated 5 mins ago
          </small>
        </div>
        <div className="card-body">
          <ul className="list-group list-group-flush">
            <li className="list-group-item">
              ✅ User <strong>John Doe</strong> updated profile information.
            </li>
            <li className="list-group-item">
              🔒 Role <strong>Super Admin</strong> granted to{" "}
              <strong>Philip</strong>.
            </li>
            <li className="list-group-item">
              🗑️ Admin <strong>Paul</strong> removed inactive users.
            </li>
            <li className="list-group-item">
              📈 Monthly report generated successfully.
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}
