"use client";

import Link from "next/link";
import { MdDashboard, MdHelpOutline, MdOutlineFeedback } from "react-icons/md";
import {
  FaUserEdit,
  FaSignOutAlt,
  FaUserCog,
  FaUserGraduate,
  FaBuilding,
  FaBars,
} from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiSun } from "react-icons/fi";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [activeLink, setActiveLink] = useState("/admin");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 700, once: true });
  }, []);

  const sidebarLinks = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <MdDashboard size={18} className="text-info" />,
    },
    {
      href: "/admin/jobseekerreport",
      label: "Job Seeker Report",
      icon: <FaUserGraduate size={18} className="text-primary" />,
    },
    {
      href: "/admin/companyreport",
      label: "Company Report",
      icon: <FaBuilding size={18} className="text-success" />,
    },
    {
      href: "/admin/feedbackreport",
      label: "Feedback Report",
      icon: <MdOutlineFeedback size={18} className="text-warning" />,
    },
  ];

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-white text-dark"
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header
        className={`d-flex justify-content-between align-items-center px-4 py-2 shadow-sm sticky-top ${
          darkMode ? "bg-dark border-secondary" : "bg-white border-bottom"
        }`}
        data-aos="fade-down"
      >
        {/* Left: Brand + Toggle */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-primary rounded-circle border-0"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          >
            <FaBars />
          </button>
          <h1
            className="m-0 fw-bold"
            style={{
              fontSize: "1.5rem",
              color: darkMode ? "#0dcaf0" : "#0d6efd",
            }}
          >
            SS Admin
          </h1>
        </div>

        {/* Center: Search */}
        <div className="flex-grow-1 px-4 d-none d-md-block">
          <div
            className="position-relative mx-auto"
            style={{ width: "55%", maxWidth: "400px" }}
          >
            <FiSearch
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <input
              type="text"
              className={`form-control rounded-pill ps-5 ${
                darkMode ? "bg-secondary text-light border-0" : "shadow-sm"
              }`}
              placeholder="Search..."
              style={{ transition: "0.3s" }}
            />
          </div>
        </div>

        {/* Right: Actions */}
        <div className="d-flex align-items-center gap-3">
          {/* Dark mode */}
          <button
            className="btn btn-light rounded-circle shadow-sm p-2"
            title="Toggle Theme"
            onClick={() => setDarkMode(!darkMode)}
          >
            {darkMode ? (
              <FiSun className="text-warning" />
            ) : (
              <FiMoon className="text-dark" />
            )}
          </button>

          {/* Notifications */}
          <div className="position-relative">
            <button
              className="btn btn-light rounded-circle shadow-sm p-2"
              title="Notifications"
            >
              <FiBell size={18} />
            </button>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.65rem" }}
            >
              3
            </span>
          </div>

          {/* Profile Dropdown */}
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
                className="rounded-circle border border-2 border-light"
                width="40"
                height="40"
              />
            </button>

            <ul
              className={`dropdown-menu dropdown-menu-end shadow border-0 rounded-3 p-0 overflow-hidden ${
                darkMode ? "bg-dark text-light" : "bg-white"
              }`}
              aria-labelledby="dropdownUser"
              style={{ minWidth: "220px" }}
            >
              <li className="p-3 border-bottom text-center bg-light">
                <small className="text-muted">Admin Panel</small>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  href="/admin/adminprofile"
                >
                  <FaUserEdit /> Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  href="/admin/account"
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
                >
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Main Layout */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={`d-flex flex-column p-3 shadow-sm sidebar ${
            darkMode ? "bg-dark text-light" : ""
          } ${isSidebarOpen ? "d-block" : "d-none d-md-flex"}`}
          style={{
            width: 230,
            background: darkMode
              ? "linear-gradient(180deg, #0f172a, #1e293b)"
              : "linear-gradient(180deg, #f8fafc, #e2e8f0)",
            transition: "all 0.3s ease",
          }}
          data-aos="fade-right"
        >
          <nav>
            <ul className="nav nav-pills flex-column gap-2">
              {sidebarLinks.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`nav-link d-flex align-items-center gap-2 fw-semibold ${
                      activeLink === href
                        ? "active bg-primary text-white"
                        : darkMode
                        ? "text-light"
                        : "text-dark"
                    }`}
                    onClick={() => setActiveLink(href)}
                    style={{
                      borderRadius: "12px",
                      padding: "8px 12px",
                      transition: "0.3s",
                    }}
                  >
                    {icon} {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-3 border-top text-center">
            <small className="opacity-75">© 2025 SS App</small>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className={`flex-grow-1 p-4 ${
            darkMode ? "bg-secondary bg-opacity-25" : "bg-light"
          }`}
          data-aos="fade-up"
          data-aos-delay={200}
          style={{ minHeight: "85vh", transition: "0.3s ease" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
