"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { MdDashboard, MdHelpOutline } from "react-icons/md";
import {
  FaUsers,
  FaUserEdit,
  FaSignOutAlt,
  FaUserCog,
  FaUserShield,
} from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiUserCheck } from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  // Load Bootstrap JS only on client side
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        require("bootstrap/dist/js/bootstrap.bundle.min.js");
      } catch (err) {
        console.error("Bootstrap JS failed to load:", err);
      }
    }
  }, []);

  const isActive = (path: string) => (pathname === path ? "active" : "");

  // Dummy logout handler
  const handleLogout = () => {
    console.log("Logging out...");
    // Replace this with actual logout logic
  };

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-light"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white border-bottom">
        <h1
          className="m-0 text-primary"
          style={{ fontSize: "1.6rem", fontWeight: 600 }}
        >
          SS House Admin
        </h1>

        {/* Search Bar */}
        <div className="flex-grow-1 px-4 d-none d-md-block">
          <div className="position-relative mx-auto" style={{ width: "50%" }}>
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

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light rounded-circle shadow-sm p-2"
            aria-label="Toggle Dark Mode"
          >
            <FiMoon size={18} />
          </button>
          <button
            className="btn btn-light rounded-circle shadow-sm p-2"
            aria-label="Help"
          >
            <MdHelpOutline size={18} />
          </button>

          {/* Notifications */}
          <div className="position-relative">
            <button
              className="btn btn-light rounded-circle shadow-sm p-2"
              aria-label="Notifications"
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
                <div className="fw-semibold">Admin User</div>
                <small className="text-muted">Administrator</small>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  href="/admin/profile"
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
                <button
                  className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger"
                  type="button"
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Body */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className="d-flex flex-column p-3 shadow-sm"
          style={{
            width: 230,
            background: "linear-gradient(180deg, #1e293b, #0f172a)",
            color: "#f1f5f9",
          }}
        >
          <nav>
            <ul className="nav nav-pills flex-column gap-1">
              <li>
                <Link
                  href="/superadmin"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/superadmin"
                  )}`}
                >
                  <MdDashboard size={18} className="text-info" /> Dashboard
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/society"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/society"
                  )}`}
                >
                  <FaUsers size={16} className="text-warning" /> Society
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/house"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/house"
                  )}`}
                >
                  <FaUserShield size={16} className="text-success" /> House
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/housereport"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/housereport"
                  )}`}
                >
                  <FiUserCheck size={16} className="text-primary" /> House
                  Report
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/allocatehouse"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/allocatehouse"
                  )}`}
                >
                  <FiUserCheck size={16} className="text-primary" /> Allocate
                  House
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/member"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/member"
                  )}`}
                >
                  <FaUserShield size={16} className="text-success" /> Member
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/memberreport"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/memberreport"
                  )}`}
                >
                  <FaUserShield size={16} className="text-success" /> Member
                  Report
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/complain"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/complain"
                  )}`}
                >
                  <FaUserShield size={16} className="text-success" /> Complain
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/sellhousereport"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/sellhousereport"
                  )}`}
                >
                  <FaUserShield size={16} className="text-success" /> Sell House
                  Report
                </Link>
              </li>
              <li>
                <Link
                  href="/admin/renthousereport"
                  className={`nav-link d-flex align-items-center gap-2 sidebar-link ${isActive(
                    "/admin/renthousereport"
                  )}`}
                >
                  <FaUserShield size={16} className="text-success" /> Rent House
                  Report
                </Link>
              </li>
            </ul>
          </nav>

          <div className="mt-auto pt-3 border-top border-secondary text-center">
            <small style={{ color: "#94a3b8" }}>© 2025 SS App</small>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-4 bg-light">{children}</main>
      </div>
    </div>
  );
}
