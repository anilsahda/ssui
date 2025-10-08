"use client";

import Link from "next/link";
import { MdDashboard, MdHelpOutline, MdOutlineFeedback } from "react-icons/md";
import {
  FaUserEdit,
  FaSignOutAlt,
  FaUserGraduate,
  FaBuilding,
  FaBriefcase,
} from "react-icons/fa";
import {
  FiSearch,
  FiBell,
  FiMoon,
  FiMessageSquare,
  FiInbox,
  FiSend,
} from "react-icons/fi";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function JobseekerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-light"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      <header className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white border-bottom">
        <h1
          className="m-0 text-primary"
          style={{ fontSize: "1.6rem", fontWeight: 600 }}
        >
          SS JobSeekerPage
        </h1>
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
              className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
              style={{ fontSize: "0.65rem" }}
            >
              5
            </span>
          </div>

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
                  type="button"
                >
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="d-flex flex-grow-1">
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
                  href="/jobseeker"
                  className="nav-link d-flex align-items-center gap-2 sidebar-link active"
                >
                  <MdDashboard size={18} className="text-info" /> Dashboard
                </Link>
              </li>

              <li>
                <Link
                  href="/jobseeker/jobseekerprofile"
                  className="nav-link d-flex align-items-center gap-2 sidebar-link"
                >
                  <FaBriefcase size={18} className="text-success" /> JobSeeker
                  Profile
                </Link>
              </li>
              <li>
                <Link
                  href="/jobseeker/jobmatches"
                  className="nav-link d-flex align-items-center gap-2 sidebar-link"
                >
                  <FaBriefcase size={18} className="text-success" /> Job Matches
                </Link>
              </li>
              <li>
                <Link
                  href="/jobseeker/message"
                  className="nav-link d-flex align-items-center gap-2 sidebar-link"
                >
                  <FiMessageSquare size={18} className="text-warning" /> Message
                </Link>
              </li>
              <li>
                <Link
                  href="/jobseeker/inbox"
                  className="nav-link d-flex align-items-center gap-2 sidebar-link"
                >
                  <FiInbox size={18} className="text-danger" /> Inbox
                </Link>
              </li>
              <li>
                <Link
                  href="/jobseeker/sent"
                  className="nav-link d-flex align-items-center gap-2 sidebar-link"
                >
                  <FiSend size={18} className="text-secondary" /> Sent
                </Link>
              </li>
            </ul>
          </nav>
          <div className="mt-auto pt-3 border-top border-secondary text-center">
            <small style={{ color: "#94a3b8" }}>© 2025 SS App</small>
          </div>
        </aside>
        <main className="flex-grow-1 p-4 bg-light">{children}</main>
      </div>
    </div>
  );
}
