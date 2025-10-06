"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";

import { MdDashboard, MdHelpOutline } from "react-icons/md";
import {
  FaUserEdit,
  FaSignOutAlt,
  FaUserCog,
  FaBook,
  FaBuilding,
  FaUserGraduate,
  FaClipboardList,
  FaUndo,
  FaMoneyBillWave,
} from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiSun } from "react-icons/fi";
import { BsFileEarmarkPlus, BsFileEarmarkText } from "react-icons/bs";
import { TbReportAnalytics } from "react-icons/tb";
import { RiBookOpenLine } from "react-icons/ri";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <MdDashboard size={18} />,
      href: "/admin",
      color: "text-info",
    },
    {
      label: "Add Publication",
      icon: <BsFileEarmarkPlus size={16} />,
      href: "/admin/publication",
      color: "text-primary",
    },
    {
      label: "Add Book",
      icon: <FaBook size={16} />,
      href: "/admin/book",
      color: "text-success",
    },
    {
      label: "Book Report",
      icon: <TbReportAnalytics size={16} />,
      href: "/admin/bookreport",
      color: "text-warning",
    },
    {
      label: "Add Branch",
      icon: <FaBuilding size={16} />,
      href: "/admin/branch",
      color: "text-danger",
    },
    {
      label: "Add Student",
      icon: <FaUserGraduate size={16} />,
      href: "/admin/student",
      color: "text-info",
    },
    {
      label: "Student Report",
      icon: <FaClipboardList size={16} />,
      href: "/admin/studentreport",
      color: "text-secondary",
    },
    {
      label: "Issue Book",
      icon: <RiBookOpenLine size={16} />,
      href: "/admin/issuebook",
      color: "text-success",
    },
    {
      label: "Issue Report",
      icon: <BsFileEarmarkText size={16} />,
      href: "/admin/issuereport",
      color: "text-warning",
    },
    {
      label: "Return Book",
      icon: <FaUndo size={16} />,
      href: "/admin/returnbook",
      color: "text-primary",
    },
    {
      label: "Penalty",
      icon: <FaMoneyBillWave size={16} />,
      href: "/admin/penalty",
      color: "text-danger",
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
        className={`d-flex justify-content-between align-items-center px-4 py-2 ${
          isDarkMode ? "bg-secondary" : "bg-white"
        } border-bottom shadow-sm sticky-top`}
      >
        <h1 className="m-0 text-primary fs-4 fw-bold">Digital Library Admin</h1>

        <div className="d-none d-md-block w-50 px-3">
          <div className="position-relative">
            <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input
              type="text"
              className="form-control rounded-pill ps-5 shadow-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light rounded-circle p-2"
            onClick={toggleTheme}
            title="Toggle Theme"
          >
            {isDarkMode ? <FiSun size={18} /> : <FiMoon size={18} />}
          </button>

          <button className="btn btn-light rounded-circle p-2">
            <MdHelpOutline size={18} />
          </button>

          <div className="position-relative">
            <button className="btn btn-light rounded-circle p-2">
              <FiBell size={18} />
            </button>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.65rem" }}
            >
              5
            </span>
          </div>

          <div className="dropdown">
            <button
              className="btn p-0 dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=0d6efd&color=fff&rounded=true"
                className="rounded-circle shadow border border-2"
                width={40}
                height={40}
                alt="Admin"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow p-0 overflow-hidden">
              <li className="bg-light p-3 border-bottom text-center">
                <div className="fw-semibold">Admin User</div>
                <small className="text-muted">Administrator</small>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2"
                  href="/admin/profile"
                >
                  <FaUserEdit /> Edit Profile
                </Link>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2"
                  href="/admin/account"
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
                  className="dropdown-item d-flex align-items-center gap-2 text-danger"
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
        {/* Sidebar */}
        <aside
          className="d-flex flex-column p-3 shadow-sm"
          style={{
            width: isSidebarCollapsed ? "72px" : "240px",
            background: isDarkMode
              ? "linear-gradient(180deg, #1e293b, #0f172a)"
              : "#f8f9fa",
            color: isDarkMode ? "#f1f5f9" : "#1f2937",
            transition: "width 0.3s ease",
          }}
        >
          <div className="d-flex justify-content-end mb-3">
            <button
              className="btn btn-sm btn-outline-light"
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title="Toggle Sidebar"
            >
              ☰
            </button>
          </div>

          <nav>
            <ul className="nav nav-pills flex-column gap-1">
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={`nav-link d-flex align-items-center gap-2 sidebar-link ${
                      pathname === item.href
                        ? "active bg-info text-white"
                        : isDarkMode
                        ? "text-light"
                        : "text-dark"
                    }`}
                    style={{
                      fontSize: "0.9rem",
                      transition: "background 0.2s ease",
                    }}
                  >
                    <span className={item.color}>{item.icon}</span>
                    {!isSidebarCollapsed && item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-3 border-top text-center">
            {!isSidebarCollapsed && (
              <small style={{ color: isDarkMode ? "#94a3b8" : "#6c757d" }}>
                © {new Date().getFullYear()} SS App
              </small>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-4">{children}</main>
      </div>
    </div>
  );
}
