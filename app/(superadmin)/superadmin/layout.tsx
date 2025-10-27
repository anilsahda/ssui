"use client";

import Link from "next/link";
import { MdDashboard, MdHelpOutline, MdMenu } from "react-icons/md";
import {
  FaUsers,
  FaUserEdit,
  FaSignOutAlt,
  FaUserCog,
  FaUserShield,
} from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiUserCheck } from "react-icons/fi";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "#f8fafc",
        overflowX: "hidden",
      }}
    >
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm sticky-top"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          zIndex: 1050,
        }}
        data-aos="fade-down"
      >
        {/* Left Side */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-primary d-md-none rounded-circle p-2"
            onClick={() => setSidebarOpen(!sidebarOpen)}
          >
            <MdMenu size={20} />
          </button>
          <h1
            className="m-0 fw-bold text-primary"
            style={{ fontSize: "1.6rem" }}
          >
            SS Admin
          </h1>
        </div>

        {/* Search Bar */}
        <div
          className="d-none d-md-block flex-grow-1 px-5"
          data-aos="fade-right"
        >
          <div
            className="position-relative mx-auto"
            style={{ maxWidth: "450px" }}
          >
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

        {/* Right Controls */}
        <div className="d-flex align-items-center gap-3" data-aos="fade-left">
          <button className="btn btn-light rounded-circle shadow-sm p-2">
            <FiMoon size={18} />
          </button>
          <button className="btn btn-light rounded-circle shadow-sm p-2">
            <MdHelpOutline size={18} />
          </button>

          {/* Notifications */}
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
                className="rounded-circle shadow-sm border border-2 border-light"
                width="40"
                height="40"
              />
            </button>

            <ul
              className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 p-0 overflow-hidden"
              aria-labelledby="dropdownUser"
              style={{ minWidth: "220px" }}
            >
              <li className="bg-light p-3 border-bottom text-center">
                <small className="text-muted">Super Administrator</small>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  href="/superadmin/profile"
                >
                  <FaUserEdit /> Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  href="/superadmin/account"
                >
                  <FaUserCog /> Account Settings
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

      {/* Overlay for mobile */}
      {sidebarOpen && (
        <div
          className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-md-none"
          style={{ zIndex: 1040 }}
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}

      {/* Sidebar + Main Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`position-fixed position-md-static top-0 start-0 h-100 p-3 shadow-sm ${
            sidebarOpen ? "translate-x-0" : "-translate-x-100"
          }`}
          style={{
            width: 240,
            background: "linear-gradient(180deg, #1e293b, #0f172a)",
            color: "#f1f5f9",
            transition: "transform 0.3s ease-in-out",
            zIndex: 1051,
          }}
          data-aos="fade-right"
        >
          <nav className="pt-4">
            <ul className="nav nav-pills flex-column gap-2">
              <li>
                <Link
                  href="/superadmin"
                  className="nav-link text-white d-flex align-items-center gap-2 sidebar-link px-3 py-2 rounded-3"
                >
                  <MdDashboard size={18} className="text-info" /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/superadmin/user"
                  className="nav-link text-white d-flex align-items-center gap-2 sidebar-link px-3 py-2 rounded-3"
                >
                  <FaUsers size={16} className="text-warning" /> Users
                </Link>
              </li>
              <li>
                <Link
                  href="/superadmin/role"
                  className="nav-link text-white d-flex align-items-center gap-2 sidebar-link px-3 py-2 rounded-3"
                >
                  <FaUserShield size={16} className="text-success" /> Role
                </Link>
              </li>
              <li>
                <Link
                  href="/superadmin/userrole"
                  className="nav-link text-white d-flex align-items-center gap-2 sidebar-link px-3 py-2 rounded-3"
                >
                  <FiUserCheck size={16} className="text-primary" /> User Role
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto pt-3 border-top border-secondary text-center">
            <small style={{ color: "#94a3b8" }}>© 2025 SS App</small>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-grow-1 p-4"
          style={{
            backgroundColor: "#f8fafc",
            animation: "fadeIn 0.5s ease-in",
            marginLeft: "240px",
          }}
          data-aos="fade-up"
        >
          {children}
        </main>
      </div>

      {/* Custom CSS */}
      <style jsx>{`
        .sidebar-link:hover {
          background-color: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
          transition: all 0.25s ease-in-out;
        }
        @media (max-width: 767px) {
          aside {
            transform: translateX(-100%);
          }
          aside.translate-x-0 {
            transform: translateX(0);
          }
          main {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
}
