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
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const pathname = usePathname();
  const [theme, setTheme] = useState<"light" | "dark">("dark");

  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
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
      ? "linear-gradient(135deg, #0f172a 0%, #1e3a8a 40%, #0f172a 100%)"
      : "linear-gradient(135deg, #f8f9fa 0%, #dee2e6 50%, #f8f9fa 100%)",
    color: isDark ? "#f8f9fa" : "#212529",
    transition: "all 0.5s ease-in-out",
    fontFamily: "Inter, sans-serif",
  };

  const navBackground = isDark
    ? "rgba(15, 23, 42, 0.85)"
    : "rgba(255, 255, 255, 0.9)";

  return (
    <div
      className="d-flex flex-column min-vh-100 position-relative"
      style={backgroundStyle}
      data-theme={theme}
    >
      {/* Subtle Background Glow Animation */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          background:
            "radial-gradient(circle at 20% 30%, rgba(255,255,255,0.08) 0%, transparent 60%)",
          zIndex: 0,
          animation: "moveGlow 15s infinite alternate ease-in-out",
        }}
      ></div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg sticky-top shadow-sm"
        style={{
          background: navBackground,
          backdropFilter: "blur(12px)",
          zIndex: 10,
        }}
        data-aos="fade-down"
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
            <ul className="navbar-nav fw-semibold fs-6" data-aos="fade-right">
              {navLinks.map(({ href, label }) => {
                const active = pathname === href;
                return (
                  <li key={label} className="nav-item mx-2">
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
                      <span className="position-relative d-inline-block link-hover">
                        {label}
                        <span className="underline-effect"></span>
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>

            {/* Right Side Buttons */}
            <div
              className="d-flex align-items-center gap-3"
              data-aos="fade-left"
            >
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
                style={{ width: "38px", height: "38px" }}
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
                  style={{
                    width: "38px",
                    height: "38px",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.2)";
                    e.currentTarget.style.boxShadow =
                      "0 4px 16px rgba(255,255,255,0.5)";
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
      <main
        className="container flex-grow-1 py-4 px-3 px-lg-5"
        data-aos="fade-up"
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 mt-auto"
        style={{
          background: navBackground,
          color: isDark ? "#ccc" : "#333",
          boxShadow: "inset 0 1px 5px rgba(0,0,0,0.1)",
          backdropFilter: "blur(6px)",
        }}
        data-aos="fade-up"
      >
        <div className="mb-3">
          {socialIcons.map(({ icon: Icon, href, title, color }, i) => (
            <a
              key={i}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              title={title}
              className={`${color} mx-3 fs-4`}
              style={{ transition: "transform 0.3s" }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.3)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            >
              <Icon />
            </a>
          ))}
        </div>
        <small>
          © {new Date().getFullYear()} <b>Digital Library</b> — All rights
          reserved.
        </small>
      </footer>

      {/* Extra Styling */}
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
          transition: width 0.4s ease;
          border-radius: 2px;
        }
        .nav-link:hover .underline-effect {
          width: 100%;
        }

        @keyframes moveGlow {
          0% {
            transform: translate(0, 0);
          }
          100% {
            transform: translate(-50px, 50px);
          }
        }
      `}</style>
    </div>
  );
};

export default Layout;
