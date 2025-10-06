"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "dark" ? "light" : "dark"));
  };

  const isDark = theme === "dark";

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/service", label: "Services" },
    { href: "/contact", label: "Contact Us" },
  ];

  const socialIcons = [
    {
      icon: FaGoogle,
      href: "#",
      title: "Login with Google",
      color: "text-danger",
    },
    {
      icon: FaFacebook,
      href: "#",
      title: "Visit Facebook",
      color: "text-primary",
    },
    {
      icon: FaLinkedin,
      href: "#",
      title: "Connect on LinkedIn",
      color: "text-info",
    },
  ];

  const backgroundStyle = {
    background: isDark
      ? "linear-gradient(135deg, #1e3a8a, #0f172a, #1e3a8a)"
      : "linear-gradient(135deg, #f8f9fa, #e9ecef, #f8f9fa)",
    color: isDark ? "#f8f9fa" : "#212529",
    transition: "all 0.4s ease-in-out",
    fontFamily: "Inter, sans-serif",
  };

  const navBackground = isDark
    ? "rgba(23, 42, 69, 0.85)"
    : "rgba(255, 255, 255, 0.9)";

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={backgroundStyle}
      data-theme={theme}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg sticky-top shadow-sm"
        style={{
          background: navBackground,
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container-fluid px-lg-5">
          <Link
            href="/"
            className={`navbar-brand fs-3 fw-bold ${
              isDark ? "text-warning" : "text-primary"
            }`}
          >
            Digital Library
          </Link>

          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span
              className="navbar-toggler-icon"
              style={{ filter: isDark ? "invert(1)" : "none" }}
            />
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            {/* Nav Links */}
            <ul className="navbar-nav fw-semibold fs-6">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={label} className="nav-item">
                    <Link
                      href={href}
                      className={`nav-link px-3 ${
                        active
                          ? isDark
                            ? "text-warning"
                            : "text-primary"
                          : isDark
                          ? "text-light"
                          : "text-dark"
                      }`}
                    >
                      <span className="position-relative">
                        {label}
                        <span className="underline-effect"></span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Actions */}
            <div className="d-flex align-items-center gap-3">
              <Link
                href="/login"
                className={`btn btn-outline-${
                  isDark ? "warning" : "primary"
                } btn-sm rounded-pill px-4 fw-semibold`}
              >
                Login
              </Link>

              <Link
                href="/register"
                className={`btn btn-${
                  isDark ? "warning" : "primary"
                } btn-sm rounded-pill px-4 fw-semibold ${
                  isDark ? "text-dark" : "text-light"
                }`}
              >
                Register
              </Link>

              <button
                className="btn btn-light btn-sm rounded-circle shadow-sm"
                style={{ width: "36px", height: "36px" }}
                onClick={toggleTheme}
                title="Toggle Theme"
              >
                {isDark ? <FaSun className="text-warning" /> : <FaMoon />}
              </button>

              {socialIcons.map(({ icon: Icon, href, title, color }, i) => (
                <a
                  key={i}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={title}
                  className="btn btn-light btn-sm rounded-circle d-flex justify-content-center align-items-center shadow-sm"
                  style={{ width: "36px", height: "36px" }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.15)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 12px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <Icon className={`${color} fs-5`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container flex-grow-1 py-4 px-3 px-lg-5">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-3 mt-auto"
        style={{
          background: navBackground,
          color: isDark ? "#ccc" : "#333",
          boxShadow: "inset 0 1px 5px rgba(0,0,0,0.1)",
        }}
      >
        <div className="mb-2">
          {socialIcons.map(({ icon: Icon, href, title, color }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={title}
              className={`${color} mx-2 fs-4`}
              style={{ transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffc107")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              <Icon />
            </a>
          ))}
        </div>
        <small>
          © {new Date().getFullYear()} Digital Library. All rights reserved.
        </small>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }

        .nav-link:hover,
        .nav-link:focus {
          color: #ffc107 !important;
          text-decoration: none;
        }

        .underline-effect {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 2px;
          width: 0;
          background-color: #ffc107;
          transition: width 0.3s ease;
          border-radius: 2px;
        }

        .nav-link:hover .underline-effect,
        .nav-link:focus .underline-effect {
          width: 100%;
        }
      `}</style>
    </div>
  );
};

export default Layout;
