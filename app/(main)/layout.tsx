"use client";

import Link from "next/link";
import { useEffect } from "react";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    AOS.init({
      duration: 900,
      easing: "ease-in-out-back",
      once: true,
      offset: 60,
    });
  }, []);

  return (
    <div
      className="bg-gradient-to-br min-vh-100"
      style={{
        background: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
      }}
    >
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark sticky-top shadow-lg"
        style={{
          backdropFilter: "blur(16px)",
          backgroundColor: "rgba(0, 123, 255, 0.7)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
        data-aos="fade-down"
      >
        <div className="container">
          <Link
            href="/"
            className="navbar-brand fw-bold fs-4 d-flex align-items-center gap-2"
          >
            <span
              className="emoji-wave"
              aria-label="globe"
              role="img"
              style={{
                fontSize: "1.6rem",
                transform: "rotate(15deg)",
                transition: "transform 0.3s",
              }}
            >
              🌐
            </span>
            SS App
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
            <span className="navbar-toggler-icon" />
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {["Home", "About", "Contact", "Service"].map((item, index) => (
                <li
                  className="nav-item position-relative"
                  key={index}
                  data-aos="fade-right"
                  data-aos-delay={index * 150}
                >
                  <Link
                    href={`/${
                      item.toLowerCase() === "home" ? "" : item.toLowerCase()
                    }`}
                    className="nav-link fw-semibold px-3 text-white link-animated"
                  >
                    {item}
                    <span className="underline" />
                  </Link>
                </li>
              ))}
            </ul>

            <div
              className="d-flex align-items-center gap-3"
              data-aos="zoom-in"
              data-aos-delay="650"
            >
              {/* Auth Buttons */}
              <Link
                href="/login"
                className="btn btn-light btn-sm px-4 rounded-pill fw-semibold shadow-sm hover-glow"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-outline-light btn-sm px-4 rounded-pill fw-semibold shadow-sm hover-glow"
              >
                Register
              </Link>

              {/* Social Icons */}
              <div className="d-flex align-items-center gap-3 ms-3 social-icons">
                <a
                  href="#"
                  className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm social-icon bounce"
                  title="Login with Google"
                  data-aos="zoom-in"
                  data-aos-delay="750"
                >
                  <FaGoogle size={18} />
                </a>
                <a
                  href="#"
                  className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm social-icon bounce"
                  title="Login with Facebook"
                  data-aos="zoom-in"
                  data-aos-delay="850"
                >
                  <FaFacebook size={18} />
                </a>
                <a
                  href="#"
                  className="btn btn-outline-light btn-sm rounded-circle d-flex align-items-center justify-content-center shadow-sm social-icon bounce"
                  title="Login with LinkedIn"
                  data-aos="zoom-in"
                  data-aos-delay="950"
                >
                  <FaLinkedin size={18} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container py-5" data-aos="fade-up" data-aos-delay="300">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="text-center py-4 text-white-50"
        style={{
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(0,0,0,0.2)",
        }}
        data-aos="fade-in"
        data-aos-delay="400"
      >
        <small>© {new Date().getFullYear()} SS App. All rights reserved.</small>
      </footer>

      {/* Styles */}
      <style jsx>{`
        .hover-glow:hover {
          box-shadow: 0 0 15px rgba(255, 255, 255, 0.6);
          transform: translateY(-3px);
          transition: 0.4s ease-in-out;
        }

        .link-animated {
          position: relative;
          transition: color 0.3s ease;
        }
        .link-animated:hover {
          color: #ffd700;
        }

        /* Underline animation */
        .underline {
          position: absolute;
          bottom: 4px;
          left: 0;
          width: 0%;
          height: 2px;
          background: #ffd700;
          transition: width 0.3s ease;
          border-radius: 2px;
        }
        .link-animated:hover .underline {
          width: 100%;
        }

        /* Social icons bounce */
        @keyframes bounceAnimation {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-6px);
          }
        }
        .bounce {
          animation: bounceAnimation 3s infinite ease-in-out;
        }
        .bounce:hover {
          animation-play-state: paused;
          box-shadow: 0 0 10px #fff;
          transform: scale(1.1);
          transition: 0.3s ease;
        }

        .social-icon:hover {
          background-color: rgba(255, 255, 255, 0.15);
          transition: background-color 0.3s ease;
        }

        .emoji-wave:hover {
          transform: rotate(0deg) scale(1.1);
        }

        /* Responsive Navbar Collapse */
        @media (max-width: 768px) {
          .navbar-collapse {
            background-color: rgba(0, 123, 255, 0.9);
            padding: 1rem 1.5rem;
            border-radius: 0.75rem;
            margin-top: 0.5rem;
          }
          .social-icons {
            justify-content: center;
            margin-top: 0.75rem;
          }
        }
      `}</style>
    </div>
  );
}
