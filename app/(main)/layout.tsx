"use client";

import Link from "next/link";
import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaFacebook, FaGoogle, FaLinkedin } from "react-icons/fa";

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div
      style={{
        fontFamily: "Poppins, sans-serif",
        background: "linear-gradient(180deg, #f8fafc, #e2e8f0)",
        minHeight: "100vh",
      }}
    >
      {/* ================== NAVBAR ================== */}
      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
        style={{
          background: "linear-gradient(90deg, #0d6efd, #6610f2)",
          backdropFilter: "blur(10px)",
        }}
        data-aos="fade-down"
      >
        <div className="container-fluid px-4">
          <Link
            href="/"
            className="navbar-brand fw-bold fs-4 d-flex align-items-center"
          >
            <span className="me-2">🌐</span> SS Hotel App
          </Link>

          {/* Toggler for mobile */}
          <button
            className="navbar-toggler border-0"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navbar Links */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0 mx-auto">
              {["Home", "About", "Rooms", "Contact"].map((item, index) => (
                <li
                  key={item}
                  className="nav-item position-relative"
                  data-aos="fade-down"
                  data-aos-delay={index * 100}
                >
                  <Link
                    href={`/${
                      item.toLowerCase() === "home" ? "" : item.toLowerCase()
                    }`}
                    className="nav-link text-white fw-semibold px-3 nav-underline"
                    style={{ fontSize: "1rem", letterSpacing: "0.5px" }}
                  >
                    {item}
                  </Link>
                </li>
              ))}
            </ul>

            {/* Action Buttons */}
            <div
              className="d-flex align-items-center gap-2"
              data-aos="fade-left"
              data-aos-delay="300"
            >
              <Link
                href="/login"
                className="btn btn-light btn-sm rounded-pill px-3 fw-bold shadow-sm hover-scale"
              >
                Login
              </Link>
              <Link
                href="/register"
                className="btn btn-outline-light btn-sm rounded-pill px-3 fw-bold shadow-sm hover-scale"
              >
                Register
              </Link>

              {/* Social Icons */}
              <div className="d-flex align-items-center gap-2 ms-2">
                <a
                  href="#"
                  className="btn btn-light btn-sm rounded-circle text-danger shadow-sm d-flex align-items-center justify-content-center hover-glow"
                  title="Google"
                >
                  <FaGoogle />
                </a>
                <a
                  href="#"
                  className="btn btn-light btn-sm rounded-circle text-primary shadow-sm d-flex align-items-center justify-content-center hover-glow"
                  title="Facebook"
                >
                  <FaFacebook />
                </a>
                <a
                  href="#"
                  className="btn btn-light btn-sm rounded-circle text-primary shadow-sm d-flex align-items-center justify-content-center hover-glow"
                  title="LinkedIn"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* ================== HERO SECTION ================== */}
      <section
        className="text-center py-5 hero-section"
        data-aos="zoom-in-up"
        style={{
          background:
            "linear-gradient(135deg, rgba(13,110,253,0.1), rgba(102,16,242,0.1))",
        }}
      >
        <h1
          className="fw-bold display-5 text-primary mb-3"
          style={{ textShadow: "0 1px 3px rgba(0,0,0,0.1)" }}
        >
          Welcome to SS App
        </h1>
        <p
          className="text-muted fs-5 mb-4"
          style={{ maxWidth: "700px", margin: "0 auto" }}
        >
          Explore a seamless experience of rooms, bookings, and services — built
          with modern technology for your comfort and ease.
        </p>

        <Link
          href="/rooms"
          className="btn btn-primary rounded-pill px-4 py-2 fw-bold shadow-lg hover-lift"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          Explore Rooms
        </Link>
      </section>

      {/* ================== PAGE CONTENT ================== */}
      <main className="container my-5" data-aos="fade-up">
        {children}
      </main>

      {/* ================== FOOTER ================== */}
      <footer
        className="text-center py-4 border-top bg-white shadow-sm"
        data-aos="fade-up"
      >
        <p className="mb-1 text-muted">
          © {new Date().getFullYear()} <strong>SS App</strong> — Crafted with ❤️
          using Bootstrap & AOS.
        </p>
        <div className="d-flex justify-content-center gap-3 mt-2">
          <a href="#" className="text-primary hover-glow">
            <FaFacebook size={20} />
          </a>
          <a href="#" className="text-danger hover-glow">
            <FaGoogle size={20} />
          </a>
          <a href="#" className="text-primary hover-glow">
            <FaLinkedin size={20} />
          </a>
        </div>
      </footer>

      {/* ================== CUSTOM STYLES ================== */}
      <style jsx>{`
        .nav-underline::after {
          content: "";
          position: absolute;
          bottom: 0;
          left: 50%;
          width: 0;
          height: 2px;
          background: #fff;
          transition: all 0.3s ease;
          transform: translateX(-50%);
        }
        .nav-underline:hover::after {
          width: 50%;
        }
        .hover-scale {
          transition: transform 0.2s ease-in-out;
        }
        .hover-scale:hover {
          transform: scale(1.08);
        }
        .hover-lift {
          transition: all 0.25s ease;
        }
        .hover-lift:hover {
          transform: translateY(-3px);
          box-shadow: 0 6px 18px rgba(13, 110, 253, 0.25);
        }
        .hover-glow {
          transition: all 0.3s ease;
        }
        .hover-glow:hover {
          text-shadow: 0 0 10px rgba(13, 110, 253, 0.8);
          transform: scale(1.1);
        }
        .hero-section {
          position: relative;
          overflow: hidden;
          background-size: cover;
          animation: floatHero 5s ease-in-out infinite alternate;
        }
        @keyframes floatHero {
          0% {
            background-position: 0 0;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  );
}
