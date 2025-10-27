"use client";

import Link from "next/link";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";
import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 600, once: true });
  }, []);

  return (
    <div className="d-flex flex-column min-vh-100 bg-light">
      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark bg-primary shadow-sm sticky-top"
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
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link href="/" className="nav-link px-3 fw-semibold">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/about" className="nav-link px-3 fw-semibold">
                  About
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/service" className="nav-link px-3 fw-semibold">
                  Services
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contact" className="nav-link px-3 fw-semibold">
                  Contact Us
                </Link>
              </li>
            </ul>

            <div className="d-flex align-items-center gap-2">
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
              <a
                href="#"
                className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center text-danger shadow-sm"
              >
                <FaGoogle />
              </a>
              <a
                href="#"
                className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center text-primary shadow-sm"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="btn btn-light btn-sm rounded-circle d-flex align-items-center justify-content-center text-primary shadow-sm"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero / Main Content */}
      <main className="container mt-5 flex-grow-1" data-aos="fade-up">
        {children}
      </main>

      {/* Footer */}
      <footer
        className="bg-primary text-light mt-auto py-3 shadow-sm"
        data-aos="fade-up"
        data-aos-delay="100"
      >
        <div className="container d-flex flex-column flex-md-row justify-content-between align-items-center">
          <div>© 2025 SS App. All rights reserved.</div>
          <div className="d-flex gap-2 mt-2 mt-md-0">
            <a href="#" className="text-light">
              <FaGoogle />
            </a>
            <a href="#" className="text-light">
              <FaFacebook />
            </a>
            <a href="#" className="text-light">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
