"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import clsx from "clsx";
import { MdDashboard, MdHelpOutline, MdOutlineFeedback } from "react-icons/md";
import {
  FaUserEdit,
  FaSignOutAlt,
  FaBuilding,
  FaSuitcase,
} from "react-icons/fa";
import { FiSearch, FiBell, FiMoon } from "react-icons/fi";
import { HiOutlineClipboardList } from "react-icons/hi";
import { RiProfileLine } from "react-icons/ri";
import { TbChecklist } from "react-icons/tb";

export default function CompanyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white border-bottom sticky-top">
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light d-md-none p-2 rounded-circle shadow-sm"
            onClick={toggleSidebar}
          >
            <FiMoon size={18} />
          </button>
          <h1
            className="m-0 text-primary fw-bold"
            style={{ fontSize: "1.6rem" }}
          >
            SS App
          </h1>
        </div>

        <div className="flex-grow-1 px-4 d-none d-md-block">
          <div className="position-relative mx-auto" style={{ width: "50%" }}>
            <FiSearch
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
              size={18}
            />
            <input
              type="text"
              className="form-control rounded-pill ps-5 shadow-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn">
            <FiMoon size={18} />
          </button>
          <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn">
            <MdHelpOutline size={18} />
          </button>
          <div className="position-relative">
            <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn">
              <FiBell size={18} />
            </button>
            <span
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger animate-bounce"
              style={{ fontSize: "0.65rem" }}
            >
              5
            </span>
          </div>

          {/* User Profile Dropdown */}
          <div className="dropdown">
            <button
              id="dropdownUser"
              className="btn p-0 d-flex align-items-center gap-2 dropdown-toggle"
              data-bs-toggle="dropdown"
              aria-expanded="false"
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
                <small className="text-muted">Company</small>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  href="/company/companyprofile"
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
                >
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {/* Sidebar & Main */}
      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className={clsx(
            "d-flex flex-column p-3 shadow-sm transition-all",
            sidebarOpen ? "translate-x-0" : "-translate-x-full",
            "d-md-flex"
          )}
          style={{
            width: 230,
            background: "linear-gradient(180deg, #1e293b, #0f172a)",
            color: "#f1f5f9",
            transition: "all 0.3s ease-in-out",
          }}
        >
          <nav>
            <ul className="nav nav-pills flex-column gap-1">
              {[
                {
                  href: "/company",
                  icon: <MdDashboard size={18} className="text-info" />,
                  label: "Dashboard",
                },
                {
                  href: "/company/companyprofile",
                  icon: <FaBuilding size={18} className="text-primary" />,
                  label: "Company Profile",
                },
                {
                  href: "/company/postjob",
                  icon: <FaSuitcase size={18} className="text-success" />,
                  label: "Post Jobs",
                },
                {
                  href: "/company/postedjob",
                  icon: (
                    <HiOutlineClipboardList
                      size={18}
                      className="text-warning"
                    />
                  ),
                  label: "Posted Jobs",
                },
                {
                  href: "/company/profilematch",
                  icon: <RiProfileLine size={18} className="text-danger" />,
                  label: "Profile Match",
                },
                {
                  href: "/company/appliedjob",
                  icon: <TbChecklist size={18} className="text-secondary" />,
                  label: "Applied Jobs",
                },
              ].map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link d-flex align-items-center gap-2 sidebar-link text-white rounded-md px-3 py-2 hover-bg-light transition"
                  >
                    {link.icon} {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto pt-3 border-top border-secondary text-center">
            <small style={{ color: "#94a3b8" }}>© 2025 SS App</small>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-grow-1 p-4 bg-light">{children}</main>
      </div>

      {/* Styles */}
      <style jsx>{`
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.1);
        }
        .hover-bg-light:hover {
          background: rgba(255, 255, 255, 0.15) !important;
        }
        .action-btn:hover {
          transform: scale(1.1);
          transition: all 0.3s ease-in-out;
        }
        @media (max-width: 768px) {
          aside {
            position: absolute;
            z-index: 1000;
            height: 100%;
          }
        }
      `}</style>
    </div>
  );
}
