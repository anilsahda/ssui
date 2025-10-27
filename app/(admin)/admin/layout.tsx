"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";

import {
  MdDashboard,
  MdHelpOutline,
  MdOutlineMenu,
  MdOutlineClose,
} from "react-icons/md";
import {
  FaUsers,
  FaUserEdit,
  FaSignOutAlt,
  FaUserCog,
  FaTasks,
} from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiSun } from "react-icons/fi";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 700, once: true, easing: "ease-in-out" });

    const storedTheme = localStorage.getItem("theme");
    if (storedTheme === "dark") setDarkMode(true);
  }, []);

  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  const isActive = (path: string) =>
    pathname === path
      ? "active bg-gradient text-white shadow-sm"
      : darkMode
      ? "text-light"
      : "text-secondary";

  return (
    <div
      className={`d-flex flex-column min-vh-100 transition-all ${
        darkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ fontFamily: "Inter, sans-serif", transition: "all 0.4s ease" }}
    >
      {/* ===== HEADER ===== */}
      <header
        data-aos="fade-down"
        className={`d-flex justify-content-between align-items-center px-4 py-2 shadow-sm sticky-top ${
          darkMode ? "bg-secondary bg-opacity-50 backdrop-blur" : "bg-white"
        }`}
        style={{
          backdropFilter: "blur(10px)",
          borderBottom: darkMode ? "1px solid #444" : "1px solid #e2e8f0",
          zIndex: 1000,
        }}
      >
        <div className="d-flex align-items-center gap-3">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className={`btn btn-sm rounded-circle shadow-sm ${
              darkMode ? "btn-outline-light" : "btn-outline-secondary"
            }`}
            data-aos="zoom-in"
          >
            {sidebarOpen ? (
              <MdOutlineClose size={20} />
            ) : (
              <MdOutlineMenu size={20} />
            )}
          </button>
          <h1
            className={`m-0 fw-bold ${
              darkMode ? "text-warning" : "text-primary"
            }`}
            style={{ fontSize: "1.5rem" }}
          >
            SS Admin
          </h1>
        </div>

        {/* Search Bar */}
        <div
          className="flex-grow-1 px-4 d-none d-md-block"
          data-aos="zoom-in"
          data-aos-delay="150"
        >
          <div className="position-relative mx-auto" style={{ width: "55%" }}>
            <FiSearch
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <input
              type="text"
              className={`form-control rounded-pill ps-5 shadow-sm ${
                darkMode ? "bg-dark text-light border-secondary" : ""
              }`}
              placeholder="Search anything..."
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="d-flex align-items-center gap-3">
          <button
            className={`btn rounded-circle shadow-sm p-2 ${
              darkMode ? "btn-outline-light" : "btn-light"
            }`}
            onClick={toggleTheme}
            title="Toggle Dark Mode"
            data-bs-toggle="tooltip"
            data-bs-placement="bottom"
            data-aos="zoom-in"
          >
            {darkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Notification */}
          <div className="position-relative" data-aos="zoom-in">
            <button
              className={`btn rounded-circle shadow-sm p-2 ${
                darkMode ? "btn-outline-light" : "btn-light"
              }`}
              title="Notifications"
            >
              <FiBell size={18} />
            </button>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
            </span>
          </div>

          {/* User Dropdown */}
          <div className="dropdown" data-aos="zoom-in">
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
                className="rounded-circle border border-light shadow-sm"
                width="40"
                height="40"
              />
            </button>

            <ul
              className={`dropdown-menu dropdown-menu-end shadow border-0 rounded-3 overflow-hidden ${
                darkMode ? "bg-dark text-light" : ""
              }`}
              aria-labelledby="dropdownUser"
            >
              <li className={`p-3 border-bottom text-center`}>
                <div className="fw-semibold">Admin User</div>
                <small className="text-muted">Administrator</small>
              </li>
              <li>
                <Link
                  href="/admin/profile"
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                >
                  <FaUserEdit /> Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/account"
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
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

      {/* ===== BODY ===== */}
      <div className="d-flex flex-grow-1">
        {/* ===== SIDEBAR ===== */}
        <aside
          data-aos="fade-right"
          className={`d-flex flex-column p-3 shadow-sm position-relative transition-all ${
            sidebarOpen ? "sidebar-open" : "sidebar-collapsed"
          }`}
          style={{
            width: sidebarOpen ? 240 : 70,
            background: darkMode
              ? "linear-gradient(180deg, #0f172a, #1e293b)"
              : "linear-gradient(180deg, #1e293b, #0f172a)",
            color: "#f8fafc",
            transition: "width 0.3s ease",
            overflow: "hidden",
          }}
        >
          <nav>
            <ul className="nav nav-pills flex-column gap-2 mt-2">
              <li data-aos="fade-right" data-aos-delay="100">
                <Link
                  href="/admin"
                  className={`nav-link d-flex align-items-center gap-2 ${isActive(
                    "/admin"
                  )}`}
                >
                  <MdDashboard size={20} className="text-info" />
                  {sidebarOpen && <span>Dashboard</span>}
                </Link>
              </li>

              <li data-aos="fade-right" data-aos-delay="150">
                <Link
                  href="/admin/task"
                  className={`nav-link d-flex align-items-center gap-2 ${isActive(
                    "/admin/task"
                  )}`}
                >
                  <FaTasks size={18} className="text-warning" />
                  {sidebarOpen && <span>Manage Tasks</span>}
                </Link>
              </li>

              {/* <li data-aos="fade-right" data-aos-delay="200">
                <Link
                  href="/admin/users"
                  className={`nav-link d-flex align-items-center gap-2 ${isActive(
                    "/admin/users"
                  )}`}
                >
                  <FaUsers size={18} className="text-success" />
                  {sidebarOpen && <span>Manage Users</span>}
                </Link>
              </li> */}
            </ul>
          </nav>

          {/* Footer */}
          <div
            className="mt-auto pt-3 text-center small border-top border-secondary"
            data-aos="fade-up"
          >
            {sidebarOpen && <div>© 2025 SS Admin</div>}
          </div>
        </aside>

        {/* ===== MAIN CONTENT ===== */}
        <main
          data-aos="fade-up"
          className={`flex-grow-1 p-4 ${
            darkMode ? "bg-dark text-light" : "bg-light text-dark"
          }`}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
