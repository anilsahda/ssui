"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaUsers,
  FaHotel,
  FaDollarSign,
  FaChartLine,
  FaBell,
  FaCog,
  FaBars,
  FaHome,
  FaSignOutAlt,
  FaChevronUp,
} from "react-icons/fa";

export default function AdminDashboard() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    window.addEventListener("scroll", () => {
      setShowScroll(window.scrollY > 200);
    });
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="bg-light min-vh-100 d-flex">
      {/* Sidebar */}
      <aside
        className="bg-primary text-white p-4 shadow-lg position-fixed h-100 rounded-end-4"
        style={{ width: "250px", top: 0, left: 0 }}
        data-aos="fade-right"
      >
        <div className="d-flex align-items-center mb-4">
          <FaBars className="me-2 fs-4" />
          <h4 className="fw-bold mb-0">Admin Panel</h4>
        </div>
        <ul className="nav flex-column">
          <li className="nav-item mb-3">
            <a href="#" className="nav-link text-white fw-semibold">
              <FaHome className="me-2" /> Dashboard
            </a>
          </li>
          <li className="nav-item mb-3">
            <a href="#" className="nav-link text-white fw-semibold">
              <FaUsers className="me-2" /> Users
            </a>
          </li>
          <li className="nav-item mb-3">
            <a href="#" className="nav-link text-white fw-semibold">
              <FaHotel className="me-2" /> Bookings
            </a>
          </li>
          <li className="nav-item mb-3">
            <a href="#" className="nav-link text-white fw-semibold">
              <FaDollarSign className="me-2" /> Revenue
            </a>
          </li>
          <li className="nav-item mt-5">
            <a href="#" className="nav-link text-warning fw-semibold">
              <FaSignOutAlt className="me-2" /> Logout
            </a>
          </li>
        </ul>
      </aside>

      {/* Main Content */}
      <div className="flex-grow-1 ms-5 ms-md-0" style={{ marginLeft: "270px" }}>
        {/* Top Navbar */}
        <nav
          className="navbar navbar-expand-lg navbar-light bg-white shadow-sm sticky-top p-3 rounded-bottom-4"
          data-aos="fade-down"
        >
          <div className="container-fluid">
            <h5 className="fw-bold text-primary m-0">
              Welcome, <span className="text-dark">Admin 👋</span>
            </h5>
            <div className="d-flex align-items-center">
              <FaBell className="me-3 text-warning fs-5" />
              <FaCog className="text-secondary fs-5" />
            </div>
          </div>
        </nav>

        {/* Dashboard Header */}
        <div className="text-center my-5" data-aos="fade-up">
          <h1 className="fw-bold text-primary mb-2">
            <i className="bi bi-speedometer2 me-2"></i>Admin Dashboard
          </h1>
          <p className="text-muted fs-5">
            System Overview & Insights for{" "}
            <span className="fw-semibold text-dark">October 2025</span>.
          </p>
        </div>

        {/* Statistic Cards */}
        <div className="container">
          <div className="row g-4 mb-5">
            {[
              {
                title: "Total Users",
                value: "1,245",
                icon: <FaUsers size={24} />,
                color: "primary",
              },
              {
                title: "Total Bookings",
                value: "320",
                icon: <FaHotel size={24} />,
                color: "success",
              },
              {
                title: "Revenue",
                value: "$12,540",
                icon: <FaDollarSign size={24} />,
                color: "warning text-dark",
              },
              {
                title: "Growth Rate",
                value: "+18%",
                icon: <FaChartLine size={24} />,
                color: "danger",
              },
            ].map((card, index) => (
              <div
                key={index}
                className="col-md-3"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                <div className="card border-0 shadow-lg rounded-4 p-3 bg-white hover-scale">
                  <div className="d-flex align-items-center">
                    <div
                      className={`rounded-circle bg-${card.color} text-white p-3 me-3`}
                    >
                      {card.icon}
                    </div>
                    <div>
                      <h6 className="text-muted mb-1">{card.title}</h6>
                      <h4 className="fw-bold">{card.value}</h4>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Recent Activity */}
          <div
            className="card border-0 shadow-lg rounded-4 mb-5"
            data-aos="fade-up"
          >
            <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center rounded-top-4">
              <h5 className="mb-0">Recent Activities</h5>
              <button className="btn btn-light btn-sm rounded-pill px-3">
                <FaCog className="me-1" /> Manage
              </button>
            </div>
            <div className="card-body">
              <div className="table-responsive">
                <table className="table align-middle table-hover mb-0">
                  <thead className="table-light">
                    <tr>
                      <th>#</th>
                      <th>Activity</th>
                      <th>User</th>
                      <th>Date</th>
                      <th>Status</th>
                      <th>Notification</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        id: 1,
                        activity: "New booking added",
                        user: "John Doe",
                        date: "Oct 29, 2025",
                        status: "Completed",
                        badge: "success",
                      },
                      {
                        id: 2,
                        activity: "User account created",
                        user: "Jane Smith",
                        date: "Oct 28, 2025",
                        status: "Active",
                        badge: "info text-dark",
                      },
                      {
                        id: 3,
                        activity: "Room updated",
                        user: "Michael Lee",
                        date: "Oct 27, 2025",
                        status: "Pending",
                        badge: "warning text-dark",
                      },
                      {
                        id: 4,
                        activity: "Payment received",
                        user: "Olivia Brown",
                        date: "Oct 26, 2025",
                        status: "Confirmed",
                        badge: "primary",
                      },
                    ].map((row, index) => (
                      <tr
                        key={row.id}
                        data-aos="fade-right"
                        data-aos-delay={index * 100}
                      >
                        <td>{row.id}</td>
                        <td>{row.activity}</td>
                        <td>{row.user}</td>
                        <td>{row.date}</td>
                        <td>
                          <span className={`badge bg-${row.badge}`}>
                            {row.status}
                          </span>
                        </td>
                        <td>
                          <FaBell className="text-warning" />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="text-center text-muted py-4 bg-white shadow-sm rounded-top-4"
          data-aos="fade-up"
        >
          <p className="mb-0">
            © {new Date().getFullYear()} <strong>Admin Dashboard</strong> —
            Built with ❤️ using Bootstrap & AOS.
          </p>
        </footer>
      </div>

      {/* Scroll to Top Button */}
      {showScroll && (
        <button
          className="btn btn-primary rounded-circle shadow-lg position-fixed"
          style={{ bottom: "30px", right: "30px", zIndex: 1050 }}
          onClick={scrollToTop}
          data-aos="fade-left"
        >
          <FaChevronUp />
        </button>
      )}
    </div>
  );
}
