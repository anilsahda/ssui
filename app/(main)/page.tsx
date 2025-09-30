"use client";

import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaBookOpen,
  FaSignInAlt,
  FaUserPlus,
  FaRocket,
  FaSyncAlt,
  FaShieldAlt,
} from "react-icons/fa";

export default function Page() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="min-vh-100 d-flex align-items-center text-white position-relative"
      style={{
        background: "linear-gradient(135deg, #0f172a, #1e3a8a)",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Background Overlay */}
      <div
        className="position-absolute top-0 start-0 w-100 h-100"
        style={{
          backgroundImage:
            "radial-gradient(circle at 20% 40%, rgba(255,255,255,0.05), transparent 60%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Main Content */}
      <div className="container py-5 position-relative" style={{ zIndex: 2 }}>
        <div className="row align-items-center gy-5">
          {/* Hero Text */}
          <div
            className="col-lg-6 text-center text-lg-start"
            data-aos="fade-right"
          >
            <h1 className="display-4 fw-bold mb-3">
              Welcome to <span className="text-warning">Digital Library</span>
            </h1>
            <p className="lead text-light mb-4">
              Explore, manage, and access educational resources — faster,
              smarter, and more securely.
            </p>

            <div className="d-flex flex-wrap justify-content-center justify-content-lg-start gap-3">
              <a
                href="/login"
                className="btn btn-warning btn-lg rounded-pill d-flex align-items-center gap-2 px-4 shadow-sm hover-scale"
                data-aos="fade-up"
                data-aos-delay="200"
              >
                <FaSignInAlt /> Login
              </a>
              <a
                href="/register"
                className="btn btn-outline-light btn-lg rounded-pill d-flex align-items-center gap-2 px-4 shadow-sm hover-scale"
                data-aos="fade-up"
                data-aos-delay="300"
              >
                <FaUserPlus /> Register
              </a>
            </div>
          </div>

          {/* Features Card */}
          <div className="col-lg-6" data-aos="fade-left">
            <div className="card border-0 shadow-lg glass-card p-4 rounded-4">
              <h4 className="fw-bold mb-4 text-primary d-flex align-items-center">
                <FaRocket className="me-2 text-warning" /> Why Choose Us?
              </h4>
              <div className="row gy-3">
                <div
                  className="col-12 d-flex align-items-start"
                  data-aos="fade-up"
                  data-aos-delay="100"
                >
                  <FaBookOpen className="text-success fs-4 me-3 mt-1" />
                  <div>
                    <strong>Vast Collection</strong>
                    <div className="text-muted">
                      Thousands of books, journals & digital assets at your
                      fingertips.
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 d-flex align-items-start"
                  data-aos="fade-up"
                  data-aos-delay="200"
                >
                  <FaSyncAlt className="text-danger fs-4 me-3 mt-1" />
                  <div>
                    <strong>Real-Time Sync</strong>
                    <div className="text-muted">
                      Instantly updates issuance & return logs across devices.
                    </div>
                  </div>
                </div>
                <div
                  className="col-12 d-flex align-items-start"
                  data-aos="fade-up"
                  data-aos-delay="300"
                >
                  <FaShieldAlt className="text-info fs-4 me-3 mt-1" />
                  <div>
                    <strong>Secure & Scalable</strong>
                    <div className="text-muted">
                      Powered by .NET Core backend and Next.js frontend with
                      role-based access.
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="text-center mt-5 pt-4 border-top border-light border-opacity-25">
          <small className="text-light-50">
            &copy; 2025 Digital Library. All rights reserved.
          </small>
        </div>
      </div>

      {/* Custom Styles */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(15px);
        }

        .hover-scale {
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .hover-scale:hover {
          transform: translateY(-4px) scale(1.03);
          box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
        }

        @media (max-width: 768px) {
          .glass-card {
            backdrop-filter: none;
            background: #fff;
          }
        }
      `}</style>
    </div>
  );
}
