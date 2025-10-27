"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import { MdDashboard, MdHelpOutline } from "react-icons/md";
import {
  FaUserEdit,
  FaSignOutAlt,
  FaUserCog,
  FaBook,
  FaBuilding,
  FaUserGraduate,
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
    AOS.init({ duration: 600, easing: "ease-in-out", once: true });
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  const navItems = [
    {
      label: "Dashboard",
      icon: <MdDashboard />,
      href: "/admin",
      color: "text-info",
    },
    {
      label: "Add Publication",
      icon: <BsFileEarmarkPlus />,
      href: "/admin/publication",
      color: "text-primary",
    },
    {
      label: "Add Book",
      icon: <FaBook />,
      href: "/admin/book",
      color: "text-success",
    },
    {
      label: "Book Report",
      icon: <TbReportAnalytics />,
      href: "/admin/bookreport",
      color: "text-warning",
    },
    {
      label: "Add Branch",
      icon: <FaBuilding />,
      href: "/admin/branch",
      color: "text-danger",
    },
    {
      label: "Add Student",
      icon: <FaUserGraduate />,
      href: "/admin/student",
      color: "text-info",
    },
    {
      label: "Issue Book",
      icon: <RiBookOpenLine />,
      href: "/admin/issuebook",
      color: "text-success",
    },
    {
      label: "Issue Report",
      icon: <BsFileEarmarkText />,
      href: "/admin/issuereport",
      color: "text-warning",
    },
    {
      label: "Return Book",
      icon: <FaUndo />,
      href: "/admin/returnbook",
      color: "text-primary",
    },
    {
      label: "Penalty",
      icon: <FaMoneyBillWave />,
      href: "/admin/penalty",
      color: "text-danger",
    },
  ];

  return (
    <div
      className={`d-flex flex-column min-vh-100 ${
        isDarkMode ? "bg-dark text-light" : "bg-light text-dark"
      }`}
      style={{
        fontFamily: "Inter, sans-serif",
        transition: "background 0.3s ease",
      }}
    >
      {/* Header */}
      <header
        className={`d-flex justify-content-between align-items-center px-4 py-2 shadow-sm sticky-top ${
          isDarkMode ? "bg-gradient bg-secondary" : "bg-white border-bottom"
        }`}
        data-aos="fade-down"
      >
        <h1
          className={`m-0 fs-4 fw-bold ${
            isDarkMode ? "text-info" : "text-primary"
          }`}
        >
          📚 Digital Library Admin
        </h1>

        {/* Search Bar */}
        <div className="d-none d-md-block w-50 px-3">
          <div
            className="position-relative"
            data-aos="fade-down"
            data-aos-delay="200"
          >
            <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input
              type="text"
              className="form-control rounded-pill ps-5 shadow-sm border-0"
              placeholder="Search anything..."
              style={{
                background: isDarkMode ? "#1e293b" : "#f1f5f9",
                color: isDarkMode ? "#f8fafc" : "#0f172a",
              }}
            />
          </div>
        </div>

        {/* Header Controls */}
        <div className="d-flex align-items-center gap-3">
          {/* Theme Toggle */}
          <button
            className={`btn rounded-circle p-2 shadow-sm ${
              isDarkMode ? "btn-light" : "btn-dark"
            }`}
            onClick={toggleTheme}
            title="Toggle Theme"
            data-aos="fade-left"
            data-aos-delay="200"
          >
            {isDarkMode ? <FiSun /> : <FiMoon />}
          </button>

          {/* Help */}
          <button
            className="btn btn-outline-secondary rounded-circle p-2 shadow-sm"
            title="Help"
            data-aos="fade-left"
            data-aos-delay="300"
          >
            <MdHelpOutline />
          </button>

          {/* Notifications */}
          <div
            className="position-relative"
            data-aos="fade-left"
            data-aos-delay="400"
          >
            <button className="btn btn-outline-danger rounded-circle p-2 shadow-sm">
              <FiBell />
            </button>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.65rem" }}
            >
              5
            </span>
          </div>

          {/* Profile */}
          <div className="dropdown" data-aos="fade-left" data-aos-delay="500">
            <button
              className="btn p-0 dropdown-toggle d-flex align-items-center"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              <img
                src="https://ui-avatars.com/api/?name=Admin+User&background=0d6efd&color=fff&rounded=true"
                className="rounded-circle shadow border border-2 border-light"
                width={40}
                height={40}
                alt="Admin"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow p-0 overflow-hidden animate__animated animate__fadeIn">
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
                  className="dropdown-item d-flex align-items-center gap-2 text-danger fw-semibold"
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
          data-aos="fade-right"
          style={{
            width: isSidebarCollapsed ? "72px" : "240px",
            background: isDarkMode
              ? "linear-gradient(180deg, #1e293b, #0f172a)"
              : "linear-gradient(180deg, #f8fafc, #e2e8f0)",
            color: isDarkMode ? "#f1f5f9" : "#1f2937",
            transition: "all 0.3s ease",
          }}
        >
          <div className="d-flex justify-content-end mb-3">
            <button
              className={`btn btn-sm ${
                isDarkMode ? "btn-outline-light" : "btn-outline-dark"
              }`}
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              title="Toggle Sidebar"
            >
              ☰
            </button>
          </div>

          <nav>
            <ul className="nav nav-pills flex-column gap-1">
              {navItems.map((item, index) => (
                <li
                  key={item.href}
                  data-aos="fade-up"
                  data-aos-delay={index * 80}
                >
                  <Link
                    href={item.href}
                    className={`nav-link d-flex align-items-center gap-2 ${
                      pathname === item.href
                        ? "active bg-gradient text-white shadow-sm"
                        : isDarkMode
                        ? "text-light"
                        : "text-dark"
                    }`}
                    style={{
                      fontSize: "0.9rem",
                      borderRadius: "10px",
                      transition: "all 0.3s ease",
                    }}
                  >
                    <span className={`${item.color}`}>{item.icon}</span>
                    {!isSidebarCollapsed && <span>{item.label}</span>}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="mt-auto pt-3 border-top text-center small opacity-75">
            {!isSidebarCollapsed && (
              <div className="fw-light">
                © {new Date().getFullYear()} SS App
              </div>
            )}
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-grow-1 p-4"
          data-aos="fade-up"
          data-aos-delay="200"
          style={{
            background: isDarkMode
              ? "linear-gradient(180deg, #0f172a, #1e293b)"
              : "#f8fafc",
            transition: "background 0.3s ease",
          }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
