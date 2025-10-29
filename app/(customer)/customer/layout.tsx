"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { MdDashboard, MdHelpOutline } from "react-icons/md";
import { FaUsers, FaUserEdit, FaSignOutAlt, FaBars } from "react-icons/fa";
import { FiSearch, FiBell, FiMoon } from "react-icons/fi";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function CustomerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-light"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* HEADER */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white border-bottom sticky-top"
        data-aos="fade-down"
      >
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light rounded-circle shadow-sm border me-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <FaBars />
          </button>
          <h1
            className="m-0 text-primary fw-bold"
            style={{ fontSize: "1.5rem" }}
          >
            SS App
          </h1>
        </div>

        {/* Search bar */}
        <div
          className="flex-grow-1 px-4 d-none d-md-block"
          data-aos="fade-left"
        >
          <div className="position-relative mx-auto" style={{ width: "55%" }}>
            <FiSearch
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <input
              type="text"
              className="form-control rounded-pill ps-5 shadow-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-3" data-aos="fade-left">
          <button className="btn btn-light rounded-circle shadow-sm p-2">
            <FiMoon size={18} />
          </button>
          <button className="btn btn-light rounded-circle shadow-sm p-2">
            <MdHelpOutline size={18} />
          </button>
          <div className="position-relative">
            <button className="btn btn-light rounded-circle shadow-sm p-2">
              <FiBell size={18} />
            </button>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.65rem" }}
            >
              5
            </span>
          </div>

          {/* User Dropdown */}
          <div className="dropdown">
            <button
              id="dropdownUser"
              className="btn p-0 d-flex align-items-center gap-2 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
              type="button"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=0d6efd&color=fff&rounded=true"
                alt="profile"
                className="rounded-circle border border-2 border-primary shadow-sm"
                width="42"
                height="42"
              />
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 p-0 overflow-hidden"
              aria-labelledby="dropdownUser"
              style={{ minWidth: "220px" }}
            >
              <li className="bg-primary text-white p-3 border-bottom text-center">
                <small className="d-block fw-semibold">Customer</small>
                <small className="text-light">Admin User</small>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  href="/customer/customerprofile"
                >
                  <FaUserEdit /> Edit Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              <li>
                <a
                  href="/"
                  className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
                  type="button"
                >
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* BODY LAYOUT */}
      <div className="d-flex flex-grow-1">
        {/* SIDEBAR */}
        <aside
          className={`d-flex flex-column p-3 shadow-lg transition-all ${
            sidebarOpen ? "show" : "d-none d-md-flex"
          }`}
          style={{
            width: sidebarOpen ? 240 : 0,
            background: "linear-gradient(180deg, #1e293b, #0f172a)",
            color: "#f8fafc",
            transition: "width 0.4s ease",
          }}
          data-aos="fade-right"
        >
          <nav>
            <ul className="nav nav-pills flex-column gap-2 mt-3">
              <li>
                <Link
                  href="/customer"
                  className="nav-link d-flex align-items-center gap-2 py-2 px-3 text-white sidebar-link active"
                  style={{
                    borderRadius: "10px",
                    transition: "all 0.3s",
                  }}
                >
                  <MdDashboard size={18} className="text-info" /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/bookings"
                  className="nav-link d-flex align-items-center gap-2 py-2 px-3 text-white sidebar-link"
                  style={{
                    borderRadius: "10px",
                    transition: "all 0.3s",
                  }}
                >
                  <FaUsers size={16} className="text-warning" /> Bookings
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-auto pt-3 border-top border-secondary text-center">
            <small style={{ color: "#94a3b8" }}>
              © {new Date().getFullYear()} SS App
            </small>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <main
          className="flex-grow-1 p-4 bg-light"
          data-aos="fade-up"
          style={{
            background: "#f8fafc",
            minHeight: "100vh",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
