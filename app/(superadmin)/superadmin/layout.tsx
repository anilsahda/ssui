"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
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
    AOS.init({ duration: 800, once: true });
    const savedTheme = localStorage.getItem("darkMode");
    if (savedTheme) setIsDarkMode(savedTheme === "true");

    const handleResize = () => setSidebarOpen(window.innerWidth >= 768);
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

  const navItems = [
    { href: "/admin", label: "Dashboard", icon: <MdDashboard size={18} /> },
    { href: "/superadmin/user", label: "Users", icon: <FaUsers size={16} /> },
    {
      href: "/superadmin/role",
      label: "Role",
      icon: <FaUserShield size={16} />,
    },
    {
      href: "/superadmin/userrole",
      label: "User Role",
      icon: <FiUserCheck size={16} />,
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
        className={`d-flex justify-content-between align-items-center px-3 px-md-4 py-3 sticky-top glass-header ${
          isDarkMode ? "bg-gradient-dark" : "bg-white"
        }`}
        data-aos="fade-down"
      >
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-outline-primary d-md-none"
            onClick={() => setSidebarOpen((prev) => !prev)}
          >
            ☰
          </button>
          <h1 className="m-0 fw-bold text-gradient fs-4">Super Admin Panel</h1>
        </div>

        {/* Search Bar */}
        <div className="d-none d-md-block flex-grow-1 px-3">
          <div className="position-relative mx-auto" style={{ width: "60%" }}>
            <FiSearch
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <input
              type="text"
              className="form-control rounded-pill ps-5 shadow-sm search-input"
              placeholder="Search users, roles..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          <button
            className={`btn btn-${
              isDarkMode ? "secondary" : "light"
            } rounded-circle p-2 shadow-sm ripple`}
            onClick={toggleTheme}
            title="Toggle Theme"
            data-aos="zoom-in"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button
            className={`btn btn-${
              isDarkMode ? "secondary" : "light"
            } rounded-circle p-2 shadow-sm ripple`}
            title="Help"
            data-aos="zoom-in"
          >
            <MdHelpOutline size={18} />
          </button>

          {/* Notifications */}
          <div className="position-relative" data-aos="zoom-in">
            <button
              className={`btn btn-${
                isDarkMode ? "secondary" : "light"
              } rounded-circle p-2 shadow-sm ripple`}
              onClick={() => setShowNotifications((prev) => !prev)}
            >
              <FiBell size={18} />
            </button>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              3
            </span>
            {showNotifications && (
              <div
                className="position-absolute end-0 mt-2 bg-white border shadow rounded-4 p-3 fade-in"
                style={{ width: 250, zIndex: 1000 }}
              >
                <strong>Recent Updates</strong>
                <ul className="list-unstyled small mt-2 mb-0">
                  <li>🔔 New user registered</li>
                  <li>👑 Role privileges updated</li>
                  <li>⚙️ Settings changed</li>
                </ul>
              </div>
            )}
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown" data-aos="zoom-in">
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
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-4 overflow-hidden glass-menu">
              <li className="p-3 border-bottom text-center">
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

      {/* Sidebar + Main */}
      <div className="d-flex flex-grow-1">
        {isSidebarOpen && (
          <aside
            className={`sidebar p-3 shadow-sm ${
              isDarkMode ? "bg-gradient-dark text-light" : "glass-sidebar"
            }`}
            style={{ width: 240 }}
            data-aos="fade-right"
          >
            <nav>
              <ul className="nav flex-column gap-1">
                {navItems.map(({ href, label, icon }) => {
                  const isActive = pathname?.startsWith(href);
                  return (
                    <li key={href}>
                      <Link
                        href={href}
                        className={`nav-link d-flex align-items-center gap-2 px-3 py-2 fw-medium rounded-3 ${
                          isActive ? "active-link" : "text-reset"
                        }`}
                      >
                        {icon} {label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
            <div className="mt-auto pt-3 border-top text-center small opacity-75">
              © {new Date().getFullYear()} SS App
            </div>
          </aside>
        )}

        <main className="flex-grow-1 p-4 fade-in" data-aos="fade-up">
          {children}
        </main>
      </div>

      <style jsx>{`
        .text-gradient {
          background: linear-gradient(90deg, #0d6efd, #6f42c1);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
        }
        .glass-header {
          backdrop-filter: blur(8px);
          transition: box-shadow 0.3s ease;
        }
        .glass-sidebar {
          background: rgba(255, 255, 255, 0.75);
          backdrop-filter: blur(10px);
          border-right: 1px solid rgba(0, 0, 0, 0.05);
        }
        .glass-menu {
          backdrop-filter: blur(10px);
          background: rgba(255, 255, 255, 0.9);
        }
        .active-link {
          background: linear-gradient(90deg, #0d6efd, #6f42c1);
          color: #fff !important;
          box-shadow: 0 0 15px rgba(13, 110, 253, 0.3);
        }
        .nav-link {
          transition: all 0.3s ease;
        }
        .nav-link:hover {
          transform: translateX(5px);
          background: rgba(13, 110, 253, 0.08);
        }
        .ripple {
          position: relative;
          overflow: hidden;
        }
        .ripple::after {
          content: "";
          position: absolute;
          border-radius: 50%;
          transform: scale(0);
          animation: ripple 0.6s linear;
          background: rgba(255, 255, 255, 0.7);
        }
        @keyframes ripple {
          to {
            transform: scale(4);
            opacity: 0;
          }
        }
        .fade-in {
          animation: fadeIn 0.5s ease-in-out;
        }
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
        @media (max-width: 768px) {
          .sidebar {
            position: absolute;
            height: 100%;
            z-index: 1050;
          }
        }
      `}</style>
    </div>
  );
}
