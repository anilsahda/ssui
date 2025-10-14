"use client";

import Link from "next/link";
import {
  FaFacebookF,
  FaGoogle,
  FaLinkedinIn,
  FaSearch,
  FaSun,
  FaMoon,
  FaUserCircle,
} from "react-icons/fa";
import { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    document.body.setAttribute("data-theme", newTheme);
  };

  // Persist theme
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme") as "light" | "dark";
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <div className={`bg-${theme} text-${theme === "light" ? "dark" : "light"}`}>
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg navbar-${
          theme === "light" ? "light bg-white" : "dark bg-primary"
        } shadow-sm sticky-top`}
        data-aos="fade-down"
      >
        <div className="container-fluid">
          <Link href="/" className="navbar-brand fw-bold fs-4">
            🌐 SS App
          </Link>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            {/* Left Menu */}
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/service", label: "Services" },
                { href: "/contact", label: "Contact" },
              ].map((item, idx) => (
                <li
                  key={item.href}
                  className="nav-item"
                  data-aos="fade-right"
                  data-aos-delay={100 * (idx + 1)}
                >
                  <Link
                    href={item.href}
                    className={`nav-link px-3 fw-semibold ${
                      item.href === "/service" ? "dropdown-toggle" : ""
                    }`}
                    {...(item.href === "/service"
                      ? {
                          id: "servicesDropdown",
                          role: "button",
                          "data-bs-toggle": "dropdown",
                          "aria-expanded": false,
                        }
                      : {})}
                  >
                    {item.label}
                  </Link>
                  {item.href === "/service" && (
                    <ul
                      className="dropdown-menu"
                      aria-labelledby="servicesDropdown"
                    >
                      <li>
                        <Link href="/service/web" className="dropdown-item">
                          Web Development
                        </Link>
                      </li>
                      <li>
                        <Link href="/service/mobile" className="dropdown-item">
                          Mobile Development
                        </Link>
                      </li>
                      <li>
                        <Link href="/service/uiux" className="dropdown-item">
                          UI/UX Design
                        </Link>
                      </li>
                    </ul>
                  )}
                </li>
              ))}
            </ul>

            {/* Right Menu */}
            <div className="d-flex align-items-center gap-2">
              {/* Search */}
              <div
                className="input-group me-2 d-none d-lg-flex"
                data-aos="zoom-in"
                data-aos-delay="500"
              >
                <input
                  type="text"
                  className="form-control form-control-sm rounded-pill"
                  placeholder="Search..."
                />
                <span className="input-group-text bg-primary text-white rounded-pill">
                  <FaSearch />
                </span>
              </div>

              {/* Theme toggle */}
              <button
                className="btn btn-sm btn-outline-secondary rounded-circle me-2 hover-scale"
                onClick={toggleTheme}
                data-aos="zoom-in"
                data-aos-delay="600"
              >
                {theme === "light" ? <FaMoon /> : <FaSun />}
              </button>

              {/* Auth buttons */}
              <Link
                href="/login"
                className="btn btn-light btn-sm rounded-pill px-3 fw-bold hover-scale"
                data-aos="fade-up"
                data-aos-delay="700"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-outline-light btn-sm rounded-pill px-3 fw-bold hover-scale"
                data-aos="fade-up"
                data-aos-delay="800"
              >
                Register
              </Link>

              {/* Social icons */}
              <div
                className="d-flex gap-1"
                data-aos="fade-left"
                data-aos-delay="900"
              >
                <a
                  href="#"
                  className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center text-danger hover-scale"
                >
                  <FaGoogle />
                </a>
                <a
                  href="#"
                  className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center text-primary hover-scale"
                >
                  <FaFacebookF />
                </a>
                <a
                  href="#"
                  className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center text-info hover-scale"
                >
                  <FaLinkedinIn />
                </a>
              </div>

              {/* Profile dropdown */}
              <div
                className="dropdown ms-2"
                data-aos="fade-left"
                data-aos-delay="1000"
              >
                <button
                  className="btn btn-light btn-sm rounded-circle dropdown-toggle hover-scale"
                  type="button"
                  id="profileDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <FaUserCircle size={20} />
                </button>
                <ul
                  className="dropdown-menu dropdown-menu-end shadow"
                  aria-labelledby="profileDropdown"
                >
                  <li>
                    <Link href="/profile" className="dropdown-item">
                      Profile
                    </Link>
                  </li>
                  <li>
                    <Link href="/settings" className="dropdown-item">
                      Settings
                    </Link>
                  </li>
                  <li>
                    <hr className="dropdown-divider" />
                  </li>
                  <li>
                    <Link href="/logout" className="dropdown-item text-danger">
                      Logout
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container mt-4" data-aos="fade-up" data-aos-delay="500">
        {children}
      </main>

      {/* Custom styles */}
      <style jsx>{`
        .hover-scale:hover {
          transform: scale(1.2);
          transition: transform 0.2s;
        }
        [data-theme="dark"] {
          background-color: #0d1b2a;
          color: #f1f1f1;
        }
        .navbar-dark .dropdown-menu {
          background-color: #1b2a44;
        }
        .navbar-light .dropdown-menu {
          background-color: #fff;
        }
        .dropdown-menu a:hover {
          background-color: rgba(0, 123, 255, 0.1);
        }
      `}</style>
    </div>
  );
}
