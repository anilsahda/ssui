"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaFacebook,
  FaGoogle,
  FaLinkedin,
  FaSun,
  FaMoon,
} from "react-icons/fa";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  // Toggle dark mode class on body
  useEffect(() => {
    document.body.classList.toggle("bg-dark", darkMode);
    document.body.classList.toggle("text-light", darkMode);
  }, [darkMode]);

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/about", label: "About" },
    { href: "/service", label: "Services" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <div>
      {/* Navbar */}
      <nav
        className={`navbar navbar-expand-lg sticky-top shadow-sm ${
          darkMode ? "navbar-dark bg-dark" : "navbar-dark"
        }`}
        style={{
          background: darkMode
            ? "linear-gradient(90deg, #121212, #1e1e1e)"
            : "linear-gradient(90deg, #007bff, #6f42c1, #00c6ff)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 12s ease infinite",
          transition: "background 0.5s ease",
        }}
        data-aos="fade-down"
      >
        <div className="container-fluid py-2">
          <Link
            href="/"
            className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
          >
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {navLinks.map((link, index) => (
                <li
                  className="nav-item"
                  key={index}
                  data-aos="fade-down"
                  data-aos-delay={index * 80}
                >
                  <Link
                    href={link.href}
                    className={`nav-link px-3 fw-semibold ${
                      pathname === link.href
                        ? "active text-warning border-bottom border-warning"
                        : darkMode
                        ? "text-light"
                        : "text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Right Buttons */}
            <div
              className="d-flex align-items-center gap-2"
              data-aos="fade-left"
              data-aos-delay="400"
            >
              <Link
                href="/login"
                className="btn btn-light btn-sm rounded-pill px-3 fw-bold shadow-sm"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-outline-light btn-sm rounded-pill px-3 fw-bold shadow-sm"
              >
                Register
              </Link>

              {/* Social Icons */}
              {[
                { icon: <FaGoogle />, color: "text-danger", title: "Google" },
                {
                  icon: <FaFacebook />,
                  color: "text-primary",
                  title: "Facebook",
                },
                { icon: <FaLinkedin />, color: "text-info", title: "LinkedIn" },
              ].map((item, idx) => (
                <a
                  href="#"
                  key={idx}
                  className={`btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center icon-hover ${item.color}`}
                  title={item.title}
                >
                  {item.icon}
                </a>
              ))}

              {/* Dark Mode Toggle */}
              <button
                onClick={() => setDarkMode(!darkMode)}
                className="btn btn-sm btn-outline-light rounded-circle ms-2 shadow-sm"
                title={darkMode ? "Light Mode" : "Dark Mode"}
              >
                {darkMode ? <FaSun /> : <FaMoon />}
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Page Content */}
      <main
        className={`container py-5 ${darkMode ? "text-light" : "text-dark"}`}
        data-aos="fade-up"
      >
        {children}
      </main>

      {/* Footer */}
      <footer
        className={`text-center py-4 mt-5 ${
          darkMode ? "bg-dark text-light" : "bg-light text-muted"
        }`}
        data-aos="fade-up"
        style={{ transition: "all 0.3s ease" }}
      >
        <div className="container">
          <small>
            © {new Date().getFullYear()} <b>SS App</b> — Built with ❤️ using
            Next.js, Bootstrap, and AOS.
          </small>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .nav-link {
          position: relative;
          transition: color 0.3s ease, transform 0.3s ease;
        }
        .nav-link::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0%;
          height: 2px;
          background-color: #ffc107;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-link:hover::after {
          width: 60%;
        }

        .icon-hover {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        .icon-hover:hover {
          transform: scale(1.2);
          box-shadow: 0 4px 12px rgba(255, 255, 255, 0.3);
        }

        body {
          transition: background-color 0.5s ease, color 0.5s ease;
        }
      `}</style>
    </div>
  );
}
