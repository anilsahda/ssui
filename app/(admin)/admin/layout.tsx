"use client";

import Link from "next/link";
import { MdDashboard, MdHelpOutline } from "react-icons/md";
import {
  FaUsers,
  FaUserEdit,
  FaSignOutAlt,
  FaUserCog,
  FaUserShield,
} from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiSun, FiMenu } from "react-icons/fi";
import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [darkMode, setDarkMode] = useState(false);
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({
      duration: 800,
      once: true,
      easing: "ease-in-out",
    });
  }, []);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle("bg-dark");
  };

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{
        fontFamily: "Inter, sans-serif",
        transition: "background-color 0.3s ease, color 0.3s ease",
      }}
    >
      {/* ======= HEADER ======= */}
      <header
        className={`d-flex justify-content-between align-items-center px-4 py-2 shadow-sm ${
          darkMode
            ? "bg-dark border-bottom border-secondary"
            : "bg-white border-bottom"
        }`}
        data-aos="fade-down"
      >
        <div className="d-flex align-items-center gap-3">
          {/* Sidebar toggle (for small screens) */}
          <button
            className={`btn shadow-sm d-md-none ${
              darkMode ? "btn-outline-light" : "btn-light"
            }`}
            onClick={() => setCollapsed(!collapsed)}
          >
            <FiMenu size={20} />
          </button>

          <h1
            className={`m-0 ${
              darkMode ? "text-info" : "text-primary"
            } fw-bold d-flex align-items-center gap-2`}
            style={{ fontSize: "1.6rem" }}
          >
            <FaUserShield />
            SS Admin
          </h1>
        </div>

        {/* ======= SEARCH BAR ======= */}
        <div className="flex-grow-1 px-4 d-none d-md-block">
          <div
            className="position-relative mx-auto"
            style={{ width: "60%", maxWidth: "480px" }}
          >
            <FiSearch
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <input
              type="text"
              className={`form-control rounded-pill ps-5 shadow-sm ${
                darkMode ? "bg-secondary text-light border-0" : "bg-white"
              }`}
              placeholder="Search anything..."
            />
          </div>
        </div>

        {/* ======= ACTION BUTTONS ======= */}
        <div className="d-flex align-items-center gap-3">
          {/* Dark Mode Toggle */}
          <button
            className={`btn rounded-circle shadow-sm p-2 ${
              darkMode ? "btn-outline-light" : "btn-light"
            }`}
            onClick={toggleDarkMode}
            title="Toggle Dark Mode"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Help */}
          <button
            className={`btn rounded-circle shadow-sm p-2 ${
              darkMode ? "btn-outline-light" : "btn-light"
            }`}
            title="Help"
          >
            <MdHelpOutline size={18} />
          </button>

          {/* Notifications */}
          <div
            className="position-relative"
            data-bs-toggle="tooltip"
            title="Notifications"
          >
            <button
              className={`btn rounded-circle shadow-sm p-2 ${
                darkMode ? "btn-outline-light" : "btn-light"
              }`}
            >
              <FiBell size={18} />
            </button>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.65rem" }}
            >
              5
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
                className="rounded-circle shadow-sm border border-2 border-light"
                width="42"
                height="42"
              />
            </button>

            <ul
              className={`dropdown-menu dropdown-menu-end shadow border-0 rounded-3 p-0 overflow-hidden ${
                darkMode ? "bg-dark text-light" : "bg-white"
              }`}
              aria-labelledby="dropdownUser"
              style={{ minWidth: "220px" }}
            >
              <li className="p-3 border-bottom text-center">
                <small className="text-muted">Admin</small>
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

      {/* ======= SIDEBAR & MAIN ======= */}
      <div className="d-flex flex-grow-1">
        <aside
          className={`d-flex flex-column p-3 shadow-sm ${
            collapsed ? "d-none d-md-flex" : ""
          }`}
          style={{
            width: 240,
            background: darkMode
              ? "linear-gradient(180deg, #0f172a, #1e293b)"
              : "linear-gradient(180deg, #1e293b, #0f172a)",
            color: "#f1f5f9",
            transition: "all 0.3s ease-in-out",
          }}
          data-aos="fade-right"
        >
          <nav>
            <ul className="nav nav-pills flex-column gap-1">
              {[
                {
                  href: "/admin",
                  label: "Dashboard",
                  icon: <MdDashboard />,
                  color: "#2563eb",
                },
                {
                  href: "/admin/bookings",
                  label: "Bookings",
                  icon: <FaUsers />,
                  color: "#f59e0b",
                },
                {
                  href: "/admin/manageusers",
                  label: "Manage Users",
                  icon: <FaUserCog />,
                  color: "#38bdf8",
                },
                {
                  href: "/admin/roles",
                  label: "Roles & Permissions",
                  icon: <FaUserShield />,
                  color: "#22c55e",
                },
              ].map((item, i) => (
                <li key={i}>
                  <Link
                    href={item.href}
                    className="nav-link d-flex align-items-center gap-2 text-light px-3 py-2"
                    style={{
                      borderRadius: "0.6rem",
                      transition: "0.3s",
                    }}
                    onMouseEnter={(e) => (
                      (e.currentTarget.style.backgroundColor = item.color),
                      (e.currentTarget.style.color = "#fff")
                    )}
                    onMouseLeave={(e) => (
                      (e.currentTarget.style.backgroundColor = ""),
                      (e.currentTarget.style.color = "#f1f5f9")
                    )}
                  >
                    {item.icon} {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-3 border-top border-secondary text-center">
            <small style={{ color: "#94a3b8" }}>© 2025 SS App</small>
          </div>
        </aside>

        {/* ======= MAIN CONTENT ======= */}
        <main
          className={`flex-grow-1 p-4 ${
            darkMode ? "bg-dark text-light" : "bg-light"
          }`}
          data-aos="fade-up"
        >
          {children}
        </main>
      </div>
    </div>
  );
}
