"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
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

export default function SuperAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(true);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");

    // Load theme from localStorage
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) {
      setIsDarkMode(savedTheme === "true");
    }

    // Close sidebar on small screens
    const handleResize = () => {
      setSidebarOpen(window.innerWidth >= 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode((prev) => {
      localStorage.setItem("darkMode", String(!prev));
      return !prev;
    });
  };

  const toggleSidebar = () => setSidebarOpen((prev) => !prev);

  const navItems = [
    {
      href: "/admin",
      label: "Dashboard",
      icon: <MdDashboard size={18} className="text-info" />,
    },
    {
      href: "/superadmin/user",
      label: "Users",
      icon: <FaUsers size={16} className="text-warning" />,
    },
    {
      href: "/superadmin/role",
      label: "Role",
      icon: <FaUserShield size={16} className="text-success" />,
    },
    {
      href: "/superadmin/userrole",
      label: "User Role",
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
      {/* Header */}
      <header
        className={`d-flex justify-content-between align-items-center px-3 px-md-4 py-2 shadow-sm ${
          isDarkMode ? "bg-secondary" : "bg-white"
        } border-bottom sticky-top`}
      >
        <div className="d-flex align-items-center gap-3">
          {/* Sidebar Toggle for Small Screens */}
          <button
            className="btn btn-outline-primary d-md-none"
            onClick={toggleSidebar}
          >
            ☰
          </button>
          <h1 className="m-0 text-primary fs-4 fw-bold">Super Admin Panel</h1>
        </div>

        {/* Search Bar */}
        <div className="flex-grow-1 px-3 d-none d-md-block">
          <div className="position-relative mx-auto" style={{ width: "60%" }}>
            <FiSearch
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <input
              type="text"
              className="form-control rounded-pill ps-5 shadow-sm"
              placeholder="Search users, roles..."
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="d-flex align-items-center gap-3">
          {/* Theme Toggle */}
          <button
            className="btn btn-light rounded-circle p-2"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          {/* Help */}
          <button className="btn btn-light rounded-circle p-2">
            <MdHelpOutline size={18} />
          </button>

          {/* Notification */}
          <div className="position-relative">
            <button
              className="btn btn-light rounded-circle p-2"
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <FiBell size={18} />
            </button>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
            </span>
            {showNotifications && (
              <div
                className="position-absolute end-0 mt-2 bg-white border shadow rounded p-2"
                style={{ width: 250, zIndex: 999 }}
              >
                <strong>Notifications</strong>
                <ul className="list-unstyled small mt-2 mb-0">
                  <li>🔔 New user registered</li>
                  <li>📦 Role updated</li>
                  <li>⚙️ Settings changed</li>
                </ul>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown">
            <button
              className="btn p-0 d-flex align-items-center gap-2 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://ui-avatars.com/api/?name=Super+Admin&background=0d6efd&color=fff&rounded=true"
                alt="profile"
                className="rounded-circle border shadow-sm"
                width="40"
                height="40"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 p-0 overflow-hidden">
              <li className="bg-light p-3 border-bottom text-center">
                <strong className="d-block">Super Admin</strong>
                <small className="text-muted">Full Access</small>
              </li>
              <li>
                <Link
                  href="/superadmin/profile"
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                >
                  <FaUserEdit /> Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/superadmin/account"
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

      {/* Layout Content */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        {isSidebarOpen && (
          <aside
            className="d-flex flex-column p-3 shadow-sm"
            style={{
              width: 230,
              background: isDarkMode
                ? "linear-gradient(180deg, #1e293b, #0f172a)"
                : "#f8f9fa",
              color: isDarkMode ? "#f1f5f9" : "#1f2937",
            }}
          >
            <nav>
              <ul className="nav nav-pills flex-column gap-1">
                {navItems.map(({ href, label, icon }) => {
                  const isActive = pathname?.startsWith(href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`nav-link d-flex align-items-center gap-2 ${
                          isActive
                            ? "active bg-info text-white"
                            : isDarkMode
                            ? "text-light"
                            : "text-dark"
                        }`}
                        style={{ fontSize: "0.9rem" }}
                      >
                        {icon} {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-auto pt-3 border-top text-center">
              <small style={{ color: "#94a3b8" }}>
                © {new Date().getFullYear()} SS App
              </small>
            </div>
          </aside>
        )}

        {/* Main Content */}
        <main className="flex-grow-1 p-4">{children}</main>
      </div>
    </div>
  );
}
