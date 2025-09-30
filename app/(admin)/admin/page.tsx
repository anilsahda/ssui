"use client";

import React, { useState } from "react";
import Head from "next/head";

const DashboardPage: React.FC = () => {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <>
      <Head>
        <title>Admin Dashboard</title>
        {/* Bootstrap Icons CDN */}
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css"
        />
      </Head>

      <div
        className={
          darkMode ? "bg-dark text-white min-vh-100" : "bg-light min-vh-100"
        }
      >
        <div className="container py-5">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold">Admin Dashboard</h2>
            <button
              className={`btn btn-${darkMode ? "light" : "dark"}`}
              onClick={() => setDarkMode(!darkMode)}
            >
              <i className={`bi bi-${darkMode ? "sun" : "moon"}`}></i>{" "}
              {darkMode ? "Light" : "Dark"} Mode
            </button>
          </div>

          {/* Overview Cards */}
          <div className="row g-4">
            <div className="col-md-3">
              <div
                className={`card shadow-sm ${
                  darkMode ? "bg-secondary text-white" : ""
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-book-fill me-2 text-primary"></i>
                    Total Books
                  </h5>
                  <p className="display-6 fw-bold">1,245</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className={`card shadow-sm ${
                  darkMode ? "bg-secondary text-white" : ""
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-people-fill me-2 text-success"></i>
                    Students
                  </h5>
                  <p className="display-6 fw-bold">342</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className={`card shadow-sm ${
                  darkMode ? "bg-secondary text-white" : ""
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-exclamation-circle-fill me-2 text-danger"></i>
                    Issues
                  </h5>
                  <p className="display-6 fw-bold">67</p>
                </div>
              </div>
            </div>
            <div className="col-md-3">
              <div
                className={`card shadow-sm ${
                  darkMode ? "bg-secondary text-white" : ""
                }`}
              >
                <div className="card-body">
                  <h5 className="card-title">
                    <i className="bi bi-cash-coin me-2 text-warning"></i>
                    Penalties
                  </h5>
                  <p className="display-6 fw-bold">₹1,430</p>
                </div>
              </div>
            </div>
          </div>

          {/* Welcome Section */}
          <div
            className={`mt-5 p-4 rounded ${
              darkMode ? "bg-secondary text-white" : "bg-white shadow-sm"
            }`}
          >
            <h4 className="mb-3">🎉 Welcome, Admin!</h4>
            <p>
              Use the navigation menu to manage books, students, issues,
              returns, reports, and view overall statistics. This dashboard
              gives you quick insights into what's happening in your digital
              library.
            </p>
            <a href="/" className={`btn btn-${darkMode ? "light" : "primary"}`}>
              Go to Home
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPage;
