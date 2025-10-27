"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaBook,
  FaUserGraduate,
  FaChartLine,
  FaBell,
  FaCalendarAlt,
} from "react-icons/fa";

export default function StudentDashboard() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="dashboard-container py-5">
      {/* Header Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="fw-bold text-gradient mb-3">
          🎓 Welcome to Student Dashboard
        </h1>
        <p className="lead text-light-emphasis">
          Manage your academics, explore courses, and track your performance.
        </p>
        <div className="d-flex justify-content-center">
          <div className="divider"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row g-4">
        <div className="col-md-3" data-aos="zoom-in">
          <div className="card glass-card text-center p-4 hover-up">
            <div className="icon-circle bg-primary bg-opacity-10 mb-3 mx-auto">
              <FaUserGraduate size={40} className="text-primary" />
            </div>
            <h5 className="fw-semibold mb-2">Profile</h5>
            <p className="text-muted small">
              View and update your student details.
            </p>
            <button className="btn btn-primary btn-sm rounded-pill px-3 shadow-sm">
              View Profile
            </button>
          </div>
        </div>

        <div className="col-md-3" data-aos="zoom-in" data-aos-delay="100">
          <div className="card glass-card text-center p-4 hover-up">
            <div className="icon-circle bg-success bg-opacity-10 mb-3 mx-auto">
              <FaBook size={40} className="text-success" />
            </div>
            <h5 className="fw-semibold mb-2">Courses</h5>
            <p className="text-muted small">
              Browse enrolled and available courses.
            </p>
            <button className="btn btn-success btn-sm rounded-pill px-3 shadow-sm">
              View Courses
            </button>
          </div>
        </div>

        <div className="col-md-3" data-aos="zoom-in" data-aos-delay="200">
          <div className="card glass-card text-center p-4 hover-up">
            <div className="icon-circle bg-warning bg-opacity-10 mb-3 mx-auto">
              <FaChartLine size={40} className="text-warning" />
            </div>
            <h5 className="fw-semibold mb-2">Performance</h5>
            <p className="text-muted small">
              Analyze your grades and progress reports.
            </p>
            <button className="btn btn-warning btn-sm rounded-pill px-3 shadow-sm">
              View Stats
            </button>
          </div>
        </div>

        <div className="col-md-3" data-aos="zoom-in" data-aos-delay="300">
          <div className="card glass-card text-center p-4 hover-up">
            <div className="icon-circle bg-danger bg-opacity-10 mb-3 mx-auto">
              <FaBell size={40} className="text-danger" />
            </div>
            <h5 className="fw-semibold mb-2">Notifications</h5>
            <p className="text-muted small">
              Stay informed with the latest alerts.
            </p>
            <button className="btn btn-danger btn-sm rounded-pill px-3 shadow-sm">
              View Alerts
            </button>
          </div>
        </div>
      </div>

      {/* Calendar Section */}
      <div
        className="text-center mt-5 p-4 bg-light rounded-4 shadow-sm"
        data-aos="fade-up"
      >
        <FaCalendarAlt size={40} className="text-primary mb-3" />
        <h5 className="fw-semibold">Upcoming Events</h5>
        <p className="text-muted small mb-0">
          Stay updated with assignments, exams, and college events.
        </p>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5 text-light small" data-aos="fade-up">
        <p className="mb-0">
          © 2025 Student Portal | Built with ❤️ using Bootstrap & AOS
        </p>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        .dashboard-container {
          min-height: 100vh;
          background: linear-gradient(
            135deg,
            #eef2ff,
            #dbeafe,
            #e0f2fe,
            #f0f9ff
          );
          background-size: 400% 400%;
          animation: gradientShift 10s ease infinite;
        }

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

        .text-gradient {
          background: linear-gradient(90deg, #007bff, #6610f2);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }

        .divider {
          width: 100px;
          height: 4px;
          background: linear-gradient(90deg, #007bff, #6610f2);
          border-radius: 5px;
        }

        .glass-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(10px);
          border: none;
          border-radius: 1rem;
          transition: all 0.3s ease;
        }

        .hover-up {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-up:hover {
          transform: translateY(-10px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }

        .icon-circle {
          width: 70px;
          height: 70px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
      `}</style>
    </div>
  );
}
