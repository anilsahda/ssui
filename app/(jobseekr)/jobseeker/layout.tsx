"use client";

import Link from "next/link";
import { MdDashboard, MdHelpOutline } from "react-icons/md";
import { FaUserEdit, FaSignOutAlt, FaBriefcase } from "react-icons/fa";
import {
  FiSearch,
  FiBell,
  FiMoon,
  FiMessageSquare,
  FiInbox,
  FiSend,
} from "react-icons/fi";
import { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import clsx from "clsx";

export default function JobseekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(true);

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const navLinks = [
    { href: "/jobseeker", icon: <MdDashboard size={18} />, label: "Dashboard" },
    {
      href: "/jobseeker/jobseekerprofile",
      icon: <FaBriefcase size={18} />,
      label: "JobSeeker Profile",
    },
    {
      href: "/jobseeker/jobmatches",
      icon: <FaBriefcase size={18} />,
      label: "Job Matches",
    },
    {
      href: "/jobseeker/message",
      icon: <FiMessageSquare size={18} />,
      label: "Message",
    },
    { href: "/jobseeker/inbox", icon: <FiInbox size={18} />, label: "Inbox" },
    { href: "/jobseeker/sent", icon: <FiSend size={18} />, label: "Sent" },
  ];

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
          <h1 className="m-0 text-primary fw-bold fs-5">SS JobSeeker</h1>
        </div>

        {/* Search */}
        <div className="flex-grow-1 px-4 d-none d-md-block">
          <div className="position-relative mx-auto" style={{ width: "50%" }}>
            <FiSearch className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input
              type="text"
              className="form-control rounded-pill ps-5 shadow-sm"
              placeholder="Search..."
            />
          </div>
        </div>

        {/* Actions */}
        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn">
            <FiMoon />
          </button>
          <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn">
            <MdHelpOutline />
          </button>
          <div className="position-relative">
            <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn">
              <FiBell />
            </button>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
              5
            </span>
          </div>

          {/* User Dropdown */}
          <div className="dropdown">
            <button
              className="btn p-0 d-flex align-items-center gap-2 dropdown-toggle"
              data-bs-toggle="dropdown"
            >
              <img
                src="https://ui-avatars.com/api/?name=JobSeeker+User&background=0d6efd&color=fff&rounded=true"
                alt="profile"
                className="rounded-circle shadow-sm border border-2 border-light"
                width="40"
                height="40"
              />
            </button>
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 p-0">
              <li className="bg-light p-3 border-bottom text-center">
                <small className="text-muted">Job Seeker</small>
              </li>
              <li>
                <Link
                  className="dropdown-item d-flex align-items-center gap-2 py-2"
                  href="/jobseeker/jobseekerprofile"
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
              {navLinks.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="nav-link d-flex align-items-center gap-2 sidebar-link text-white rounded-md px-3 py-2"
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

      <style jsx>{`
        .sidebar-link:hover {
          background: rgba(255, 255, 255, 0.1);
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
