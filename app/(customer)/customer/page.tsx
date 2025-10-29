"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaShoppingCart,
  FaWallet,
  FaUserFriends,
  FaStar,
  FaBell,
  FaChartLine,
} from "react-icons/fa";

export default function CustomerDashboard() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className="min-vh-100 py-5 px-3"
      style={{
        background: "linear-gradient(135deg, #e0f2fe, #f0f9ff, #e0f7fa)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Header */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h2 className="fw-bold text-primary display-6 mb-2">
          <FaChartLine className="me-2 text-info" />
          Welcome to Customer Dashboard
        </h2>
        <p className="text-muted fs-5">
          Here’s an overview of your recent activities and performance.
        </p>
      </div>

      {/* Stat Cards */}
      <div className="container">
        <div className="row g-4 mb-5">
          <div className="col-md-3 col-sm-6" data-aos="zoom-in">
            <div className="card border-0 shadow-lg rounded-4 text-center p-4 bg-white h-100 hover-card">
              <div className="text-primary mb-3">
                <FaShoppingCart size={32} />
              </div>
              <h5 className="fw-semibold mb-1">Orders</h5>
              <h3 className="fw-bold text-dark">128</h3>
              <small className="text-muted">+12% since last month</small>
            </div>
          </div>

          <div
            className="col-md-3 col-sm-6"
            data-aos="zoom-in"
            data-aos-delay="100"
          >
            <div className="card border-0 shadow-lg rounded-4 text-center p-4 bg-white h-100 hover-card">
              <div className="text-success mb-3">
                <FaWallet size={32} />
              </div>
              <h5 className="fw-semibold mb-1">Wallet Balance</h5>
              <h3 className="fw-bold text-dark">$2,540</h3>
              <small className="text-muted">Updated just now</small>
            </div>
          </div>

          <div
            className="col-md-3 col-sm-6"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            <div className="card border-0 shadow-lg rounded-4 text-center p-4 bg-white h-100 hover-card">
              <div className="text-warning mb-3">
                <FaUserFriends size={32} />
              </div>
              <h5 className="fw-semibold mb-1">Active Friends</h5>
              <h3 className="fw-bold text-dark">54</h3>
              <small className="text-muted">3 joined this week</small>
            </div>
          </div>

          <div
            className="col-md-3 col-sm-6"
            data-aos="zoom-in"
            data-aos-delay="300"
          >
            <div className="card border-0 shadow-lg rounded-4 text-center p-4 bg-white h-100 hover-card">
              <div className="text-danger mb-3">
                <FaStar size={32} />
              </div>
              <h5 className="fw-semibold mb-1">Rating</h5>
              <h3 className="fw-bold text-dark">4.8 / 5</h3>
              <small className="text-muted">Based on 1,240 reviews</small>
            </div>
          </div>
        </div>

        {/* Notifications Table */}
        <div className="card border-0 shadow-lg rounded-4" data-aos="fade-up">
          <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
            <h5 className="mb-0">Recent Notifications</h5>
            <FaBell size={20} />
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table align-middle mb-0 table-hover">
                <thead className="table-light text-center">
                  <tr>
                    <th>#</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody className="text-center">
                  <tr data-aos="fade-right">
                    <td>1</td>
                    <td>Order #1234 has been shipped</td>
                    <td>Oct 28, 2025</td>
                    <td>
                      <span className="badge bg-success">Delivered</span>
                    </td>
                  </tr>
                  <tr data-aos="fade-right" data-aos-delay="100">
                    <td>2</td>
                    <td>Your wallet has been credited with $50</td>
                    <td>Oct 27, 2025</td>
                    <td>
                      <span className="badge bg-info text-dark">Success</span>
                    </td>
                  </tr>
                  <tr data-aos="fade-right" data-aos-delay="200">
                    <td>3</td>
                    <td>New friend request from Jane</td>
                    <td>Oct 25, 2025</td>
                    <td>
                      <span className="badge bg-warning text-dark">
                        Pending
                      </span>
                    </td>
                  </tr>
                  <tr data-aos="fade-right" data-aos-delay="300">
                    <td>4</td>
                    <td>Your review was liked by 20 users</td>
                    <td>Oct 24, 2025</td>
                    <td>
                      <span className="badge bg-primary">New</span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer className="text-center mt-5" data-aos="fade-up">
          <hr />
          <p className="text-muted mb-0">
            © {new Date().getFullYear()} <strong>Customer Dashboard</strong> —
            Built with ❤️ using Bootstrap & AOS.
          </p>
        </footer>
      </div>

      {/* Custom Hover Style */}
      <style jsx>{`
        .hover-card {
          transition: all 0.3s ease;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
