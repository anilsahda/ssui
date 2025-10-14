"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBuilding,
  FaUsers,
  FaClipboardList,
  FaChartLine,
} from "react-icons/fa";

export default function CompanyDashboard() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="p-4" style={{ fontFamily: "Inter, sans-serif" }}>
      <h2 className="mb-4 fw-bold text-primary" data-aos="fade-down">
        Company Dashboard
      </h2>

      {/* Statistic Cards */}
      <div className="row g-4 mb-4">
        {[
          {
            title: "Total Employees",
            value: 320,
            icon: <FaUsers />,
            bg: "bg-primary",
          },
          {
            title: "Open Positions",
            value: 15,
            icon: <FaClipboardList />,
            bg: "bg-warning",
          },
          {
            title: "Total Companies",
            value: 25,
            icon: <FaBuilding />,
            bg: "bg-success",
          },
          {
            title: "Performance Score",
            value: "87%",
            icon: <FaChartLine />,
            bg: "bg-danger",
          },
        ].map((card, idx) => (
          <div className="col-12 col-md-6 col-lg-3" key={idx}>
            <div
              className={`card text-white ${card.bg} shadow-lg hover-shadow`}
              style={{ borderRadius: "12px", cursor: "pointer" }}
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

      {/* Recent Job Postings */}
      <div
        className="card shadow-sm mb-4"
        data-aos="fade-up"
        style={{ borderRadius: "12px" }}
      >
        <div className="card-header bg-white">
          <h5 className="m-0 fw-bold">Recent Job Postings</h5>
        </div>
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Job Title</th>
                <th>Applicants</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  id: 1,
                  title: "Frontend Developer",
                  applicants: 12,
                  status: "Open",
                },
                {
                  id: 2,
                  title: "Backend Developer",
                  applicants: 8,
                  status: "Closed",
                },
                {
                  id: 3,
                  title: "UI/UX Designer",
                  applicants: 5,
                  status: "Open",
                },
                {
                  id: 4,
                  title: "Project Manager",
                  applicants: 3,
                  status: "Open",
                },
              ].map((job) => (
                <tr key={job.id}>
                  <td>{job.id}</td>
                  <td>{job.title}</td>
                  <td>{job.applicants}</td>
                  <td>
                    <span
                      className={`badge ${
                        job.status === "Open" ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {job.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Performance Chart Placeholder */}
      <div
        className="card shadow-sm"
        data-aos="fade-up"
        style={{ borderRadius: "12px", minHeight: "250px" }}
      >
        <div className="card-body d-flex justify-content-center align-items-center text-muted">
          <p>
            Performance Chart Placeholder (Integrate with Recharts / Chart.js)
          </p>
        </div>
      </div>

      {/* Styles */}
      <style jsx>{`
        .hover-shadow:hover {
          transform: translateY(-5px);
          box-shadow: 0 0.5rem 1rem rgba(0, 0, 0, 0.15) !important;
          transition: all 0.3s ease-in-out;
        }
        table th,
        table td {
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}
