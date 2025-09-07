"use client";

import Link from "next/link";
import { MdDashboard, MdHelpOutline } from "react-icons/md";
import { FaUsers, FaUserEdit, FaSignOutAlt, FaUserCog, FaUserShield, FaUserCircle, FaHistory } from "react-icons/fa";
import { FiSearch, FiBell, FiMoon, FiUserCheck } from "react-icons/fi";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { AiOutlineFileAdd } from "react-icons/ai";
import { BsClockHistory, BsListCheck } from "react-icons/bs";

export default function CustomerLayout({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light" style={{ fontFamily: "Inter, sans-serif" }}>
      <header className="d-flex justify-content-between align-items-center px-4 py-2 shadow-sm bg-white border-bottom">
        <h1 className="m-0 text-primary" style={{ fontSize: "1.6rem", fontWeight: 600 }}>SS App</h1>
        <div className="flex-grow-1 px-4 d-none d-md-block">
          <div className="position-relative mx-auto" style={{ width: "50%" }}>
            <FiSearch size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
            <input type="text" className="form-control rounded-pill ps-5 shadow-sm" placeholder="Search..." />
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn"><FiMoon size={18} /></button>
          <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn"><MdHelpOutline size={18} /></button>
          <div className="position-relative">
            <button className="btn btn-light rounded-circle shadow-sm p-2 action-btn"><FiBell size={18} /></button>
            <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger" style={{ fontSize: "0.65rem" }}>5</span>
          </div>

          <div className="dropdown">
            <button id="dropdownUser" className="btn p-0 d-flex align-items-center gap-2 dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false" type="button">
              <img src="https://ui-avatars.com/api/?name=Admin+User&background=0d6efd&color=fff&rounded=true" alt="profile" className="rounded-circle shadow-sm border border-2 border-light" width="40" height="40" />
            </button>

            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 p-0 overflow-hidden" aria-labelledby="dropdownUser" style={{ minWidth: "220px" }}>
              <li className="bg-light p-3 border-bottom text-center">
                <small className="text-muted">Customer</small>
              </li>
              <li>
                <Link className="dropdown-item d-flex align-items-center gap-2 py-2" href="/admin/customerprofile">
                  <FaUserEdit /> Edit Profile
                </Link>
              </li>
              <li>
                <hr className="dropdown-divider m-0" />
              </li>
              <li>
                <a href="/" className="dropdown-item d-flex align-items-center gap-2 py-2 text-danger" type="button">
                  <FaSignOutAlt /> Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="d-flex flex-grow-1">
        <aside className="d-flex flex-column p-3 shadow-sm" style={{ width: 230, background: "linear-gradient(180deg, #1e293b, #0f172a)", color: "#f1f5f9" }}>
        <nav>
            <ul className="nav nav-pills flex-column gap-1">
                <li>
                <Link href="/customer" className="nav-link d-flex align-items-center gap-2 sidebar-link active">
                    <MdDashboard size={18} className="text-info" /> Dashboard
                </Link>
                </li>
                <li>
                <Link href="/customer/customerprofile" className="nav-link d-flex align-items-center gap-2 sidebar-link">
                    <FaUserCircle size={18} className="text-primary" /> My Profile
                </Link>
                </li>
                <li>
                <Link href="/customer/fileclaim" className="nav-link d-flex align-items-center gap-2 sidebar-link">
                    <AiOutlineFileAdd size={18} className="text-success" /> File Claim
                </Link>
                </li>
                <li>
                <Link href="/customer/claimlist" className="nav-link d-flex align-items-center gap-2 sidebar-link">
                    <BsListCheck size={18} className="text-warning" /> Claim List
                </Link>
                </li>
                <li>
                <Link href="/customer/pendinglist" className="nav-link d-flex align-items-center gap-2 sidebar-link">
                    <BsClockHistory size={18} className="text-danger" /> Pending List
                </Link>
                </li>
                <li>
                <Link href="/customer/history" className="nav-link d-flex align-items-center gap-2 sidebar-link">
                    <FaHistory size={18} className="text-secondary" /> History
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