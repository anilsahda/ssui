"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

import { MdDashboard, MdHelpOutline } from "react-icons/md";
import {
  FaUsers,
  FaUserEdit,
  FaSignOutAlt,
  FaUserCog,
  FaUserShield,
} from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiSun, FiUserCheck } from "react-icons/fi";

export default function StudentLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 700, easing: "ease-in-out" });
  }, []);

  const toggleTheme = () => setIsDarkMode((prev) => !prev);

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <MdDashboard size={18} className="text-info" />,
    },
    {
      href: "/student/studentprofile",
      label: "My Account",
      icon: <FaUsers size={16} className="text-warning" />,
    },
    {
      href: "/student/bookreport",
      label: "Book Report",
      icon: <FaUserShield size={16} className="text-success" />,
    },
    {
      href: "/student/penaltyreport",
      label: "Penalty Report",
      icon: <FiUserCheck size={16} className="text-primary" />,
    },
  ];

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${
        isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* ================= Header ================= */}
      <header
        data-aos="fade-down"
        className={`d-flex justify-content-between align-items-center px-4 py-2 shadow-sm sticky-top ${
          isDarkMode ? "bg-secondary" : "bg-white"
        } border-bottom`}
      >
        <h1 className="m-0 text-primary fs-4 fw-bold">Student Portal</h1>

        {/* Search Bar */}
        <div className="flex-grow-1 px-4 d-none d-md-block">
          <div
            className="position-relative mx-auto"
            style={{ width: "60%" }}
            data-aos="zoom-in"
          >
            <FiSearch
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <input
              type="text"
              className="form-control rounded-pill ps-5 shadow-sm border-0"
              placeholder="Search books, reports..."
              style={{ backgroundColor: isDarkMode ? "#1f2937" : "#f8f9fa" }}
            />
          </div>
        </div>

        {/* Header Actions */}
        <div className="d-flex align-items-center gap-3" data-aos="fade-left">
          {/* Theme Toggle */}
          <button
            className={`btn btn-${
              isDarkMode ? "light" : "dark"
            } rounded-circle p-2`}
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Help */}
          <button
            className={`btn btn-${
              isDarkMode ? "light" : "outline-secondary"
            } rounded-circle p-2`}
            title="Help"
          >
            <MdHelpOutline size={18} />
          </button>

          {/* Notifications */}
          <div className="position-relative">
            <button
              className={`btn btn-${
                isDarkMode ? "light" : "outline-secondary"
              } rounded-circle p-2`}
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
              className="btn p-0 d-flex align-items-center gap-2 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://ui-avatars.com/api/?name=Student+User&background=0d6efd&color=fff&rounded=true"
                alt="profile"
                className="rounded-circle border shadow-sm"
                width="40"
                height="40"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 overflow-hidden">
              <li className="bg-light p-3 border-bottom text-center">
                <strong className="d-block">Student</strong>
                <small className="text-muted">Library Access</small>
              </li>
              <li>
                <Link
                  href="/student/profile"
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                >
                  <FaUserEdit /> Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/student/account"
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                >
                  <FaUserCog /> Account Settings
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              <li>
                <Link
                  href="/"
                  className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
                >
                  <FaSignOutAlt /> Logout
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* ================= Sidebar + Main ================= */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          data-aos="fade-right"
          className="d-flex flex-column p-3 shadow-sm sticky-top"
          style={{
            width: 230,
            background: isDarkMode
              ? "linear-gradient(180deg, #1e293b, #0f172a)"
              : "linear-gradient(180deg, #ffffff, #f1f5f9)",
            color: isDarkMode ? "#f8fafc" : "#1f2937",
            transition: "all 0.4s ease",
            height: "100vh",
          }}
        >
          <nav>
            <ul className="nav nav-pills flex-column gap-1">
              {navItems.map(({ href, label, icon }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className={`nav-link d-flex align-items-center gap-2 sidebar-link rounded-3 ${
                      pathname === href
                        ? "active bg-info text-white fw-semibold"
                        : isDarkMode
                        ? "text-light"
                        : "text-dark"
                    }`}
                    style={{
                      fontSize: "0.9rem",
                      transition: "background 0.2s ease",
                    }}
                  >
                    {icon} {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Sidebar Footer */}
          <div className="mt-auto pt-3 border-top text-center small">
            <small style={{ color: isDarkMode ? "#94a3b8" : "#6b7280" }}>
              © {new Date().getFullYear()} SS App
            </small>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-grow-1 p-4"
          data-aos="fade-up"
          data-aos-delay="100"
          style={{
            backgroundColor: isDarkMode ? "#0f172a" : "#f8fafc",
            transition: "background-color 0.3s ease",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
