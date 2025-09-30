"use client";

import Link from "next/link";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import { useEffect } from "react";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  return (
    <div
      className="d-flex flex-column min-vh-100"
      style={{
        fontFamily: "Inter, sans-serif",
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #0f172a 50%, #1e3a8a 100%)",
        color: "#f8f9fa",
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg sticky-top shadow-lg"
        style={{
          background: "rgba(23, 42, 69, 0.85)", // semi-transparent navy
          backdropFilter: "blur(10px)",
        }}
      >
        <div className="container-fluid px-lg-5">
          <Link href="/" className="navbar-brand fw-bold fs-3 text-warning">
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
              style={{ filter: "invert(1)" }}
            />
          </button>

          <div
            className="collapse navbar-collapse justify-content-between"
            id="navbarNav"
          >
            {/* Left nav links */}
            <ul className="navbar-nav fw-semibold fs-6">
              {[
                { href: "/", label: "Home" },
                { href: "/about", label: "About" },
                { href: "/service", label: "Services" },
                { href: "/contact", label: "Contact Us" },
              ].map(({ href, label }) => (
                <li className="nav-item" key={label}>
                  <Link href={href} className="nav-link text-light px-3">
                    <span className="position-relative">
                      {label}
                      <span className="underline-effect"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right actions */}
            <div className="d-flex align-items-center gap-3">
              <Link
                href="/login"
                className="btn btn-outline-warning btn-sm rounded-pill px-4 fw-semibold"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-warning btn-sm rounded-pill px-4 fw-semibold text-dark"
              >
                Register
              </Link>

              {/* Social Icons */}
              {[
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
              ].map(({ icon: Icon, href, title, color }, i) => (
                <a
                  key={i}
                  href={href}
                  className="btn btn-light btn-sm rounded-circle d-flex justify-content-center align-items-center shadow-sm"
                  style={{
                    width: "36px",
                    height: "36px",
                    transition: "all 0.3s",
                  }}
                  title={title}
                  target="_blank"
                  rel="noopener noreferrer"
                  onMouseEnter={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = "scale(1.15)";
                    target.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)";
                  }}
                  onMouseLeave={(e) => {
                    const target = e.currentTarget;
                    target.style.transform = "scale(1)";
                    target.style.boxShadow = "none";
                  }}
                >
                  <Icon className={`${color} fs-5`} />
                </a>
              ))}
            </div>
          </div>
        </div>
      </nav>

      {/* Main content */}
      <main className="container flex-grow-1 py-4 px-3 px-lg-5">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-3"
        style={{
          background:
            "linear-gradient(135deg, #1e3a8a 0%, #0f172a 50%, #1e3a8a 100%)",
          color: "#f8f9fa",
          boxShadow: "inset 0 1px 5px rgba(255,255,255,0.1)",
          fontSize: "0.9rem",
        }}
      >
        <div className="mb-2">
          {/* Optional footer social icons */}
          {[
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
          ].map(({ icon: Icon, href, title, color }, i) => (
            <a
              key={i}
              href={href}
              title={title}
              className={`${color} mx-2 fs-4`}
              target="_blank"
              rel="noopener noreferrer"
              style={{ transition: "color 0.3s" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#ffc107")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "")}
            >
              <Icon />
            </a>
          ))}
        </div>
        <small>© 2025 Digital Library. All rights reserved.</small>
      </footer>

      <style jsx>{`
        .nav-link {
          position: relative;
          transition: color 0.3s ease;
        }
        .nav-link:hover,
        .nav-link:focus {
          color: #ffc107 !important; /* Bootstrap warning color */
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
}
