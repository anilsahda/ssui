"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
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
import { FiSearch, FiBell, FiMoon, FiUserCheck } from "react-icons/fi";

import "bootstrap/dist/css/bootstrap.min.css";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  useEffect(() => {
    AOS.init({
      duration: 700,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  const isActive = (path: string) => (pathname === path ? "active" : "");

  const handleLogout = () => {
    console.log("Logging out...");
    // TODO: integrate actual logout
  };

  return (
    <div
      className="d-flex flex-column min-vh-100 bg-light"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Header */}
      <header
        className="d-flex justify-content-between align-items-center px-4 py-2 bg-white border-bottom shadow-sm sticky-top"
        data-aos="fade-down"
      >
        <h1 className="m-0 text-primary fw-bold fs-4">SS House Admin</h1>

        {/* Search bar - hidden on small */}
        <div className="d-none d-md-block flex-grow-1 px-4">
          <div
            className="position-relative mx-auto"
            style={{ width: "60%", maxWidth: 500 }}
          >
            <FiSearch
              size={18}
              className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
            />
            <input
              type="text"
              className="form-control ps-5 rounded-pill shadow-sm"
              placeholder="Search..."
              data-aos="fade-up"
              data-aos-delay={100}
            />
          </div>
        </div>

        {/* Icons */}
        <div className="d-flex align-items-center gap-3">
          <button
            className="btn btn-light rounded-circle p-2 shadow-sm"
            title="Toggle Dark Mode"
            data-aos="zoom-in"
          >
            <FiMoon size={18} />
          </button>

          <button
            className="btn btn-light rounded-circle p-2 shadow-sm"
            title="Help"
            data-aos="zoom-in"
            data-aos-delay={50}
          >
            <MdHelpOutline size={18} />
          </button>

          <div className="position-relative">
            <button
              className="btn btn-light rounded-circle p-2 shadow-sm position-relative"
              title="Notifications"
              data-aos="zoom-in"
              data-aos-delay={100}
              style={{ zIndex: 1 }}
            >
              <FiBell size={18} />
              <span
                className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger"
                style={{ fontSize: "0.65rem" }}
              >
                5<span className="visually-hidden">unread messages</span>
              </span>
            </button>
          </div>

          {/* Profile Dropdown */}
          <div className="dropdown" data-aos="fade-up" data-aos-delay={150}>
            <button
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
            <ul className="dropdown-menu dropdown-menu-end shadow border-0 rounded-3 p-0 overflow-hidden">
              <li className="bg-light text-center p-3 border-bottom">
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
                  onClick={handleLogout}
                >
                  <FaSignOutAlt /> Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <div className="d-flex flex-grow-1">
        {/* Sidebar */}
        <aside
          className="d-flex flex-column p-3 shadow-sm"
          style={{
            width: 230,
            background: "linear-gradient(180deg, #1e293b, #0f172a)",
            color: "#f8fafc",
          }}
          data-aos="fade-right"
        >
          <nav>
            <ul className="nav nav-pills flex-column gap-2">
              {[
                {
                  href: "/superadmin",
                  label: "Dashboard",
                  icon: (
                    <MdDashboard
                      size={18}
                      className="text-info"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/society",
                  label: "Society",
                  icon: (
                    <FaUsers
                      size={16}
                      className="text-warning"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/house",
                  label: "House",
                  icon: (
                    <FaUserShield
                      size={16}
                      className="text-success"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/housereport",
                  label: "House Report",
                  icon: (
                    <FiUserCheck
                      size={16}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/allocatehouse",
                  label: "Allocate House",
                  icon: (
                    <FiUserCheck
                      size={16}
                      className="text-primary"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/member",
                  label: "Member",
                  icon: (
                    <FaUserShield
                      size={16}
                      className="text-success"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/memberreport",
                  label: "Member Report",
                  icon: (
                    <FaUserShield
                      size={16}
                      className="text-success"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/complain",
                  label: "Complain",
                  icon: (
                    <FaUserShield
                      size={16}
                      className="text-success"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/sellhousereport",
                  label: "Sell House Report",
                  icon: (
                    <FaUserShield
                      size={16}
                      className="text-success"
                      aria-hidden="true"
                    />
                  ),
                },
                {
                  href: "/admin/renthousereport",
                  label: "Rent House Report",
                  icon: (
                    <FaUserShield
                      size={16}
                      className="text-success"
                      aria-hidden="true"
                    />
                  ),
                },
              ].map(({ href, label, icon }, idx) => (
                <li
                  key={href}
                  data-aos="fade-up"
                  data-aos-delay={200 + idx * 80}
                  style={{ transition: "all 0.3s ease" }}
                >
                  <Link
                    href={href}
                    className={`nav-link d-flex align-items-center gap-2 px-3 py-2 rounded ${
                      isActive(href)
                        ? "active bg-white text-dark fw-semibold shadow-sm"
                        : "text-light"
                    }`}
                    style={{
                      transition: "all 0.3s ease-in-out",
                      boxShadow: isActive(href)
                        ? "0 0 10px rgba(0, 123, 255, 0.4)"
                        : "none",
                    }}
                    aria-current={isActive(href) ? "page" : undefined}
                  >
                    {icon} {label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div
            className="mt-auto pt-3 border-top border-secondary text-center"
            data-aos="fade-up"
            data-aos-delay={1000}
          >
            <small className="text-muted">© 2025 SS App</small>
          </div>
        </aside>

        {/* Main Content */}
        <main
          className="flex-grow-1 p-4 bg-light"
          data-aos="fade-up"
          data-aos-delay={100}
          style={{ minHeight: "100vh" }}
        >
          {children}
        </main>
      </div>
    </div>
  );
}
