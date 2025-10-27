"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import {
  FaBookReader,
  FaUsers,
  FaLaptopCode,
  FaCheckCircle,
  FaRocket,
  FaShieldAlt,
} from "react-icons/fa";

export default function AboutPage() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const features = [
    {
      icon: <FaBookReader size={28} />,
      color: "primary",
      title: "Centralized Resources",
      desc: "Access books, journals, and research materials — all in one intuitive platform.",
    },
    {
      icon: <FaUsers size={28} />,
      color: "success",
      title: "Student-Centric Design",
      desc: "Crafted for seamless use by students, educators, and administrators.",
    },
    {
      icon: <FaLaptopCode size={28} />,
      color: "warning",
      title: "Powered by Tech",
      desc: "Built on a modern tech stack for speed, scalability, and performance.",
    },
    {
      icon: <FaCheckCircle size={28} />,
      color: "info",
      title: "Smart Management",
      desc: "Advanced dashboards, analytics, and automated workflows.",
    },
    {
      icon: <FaRocket size={28} />,
      color: "danger",
      title: "Lightning Performance",
      desc: "Instant search, real-time tracking, and zero-lag interfaces.",
    },
    {
      icon: <FaShieldAlt size={28} />,
      color: "secondary",
      title: "Built-In Security",
      desc: "Role-based access and data protection baked into the system.",
    },
  ];

  return (
    <div
      className="text-dark"
      style={{ fontFamily: "Inter, sans-serif", overflowX: "hidden" }}
    >
      {/* Hero Section */}
      <section
        className="py-5 text-center text-white position-relative overflow-hidden"
        style={{
          background: "linear-gradient(120deg, #0d6efd, #6610f2, #d63384)",
          backgroundSize: "300% 300%",
          animation: "gradientMove 10s ease infinite",
        }}
      >
        <div
          className="container position-relative"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          <h1 className="display-4 fw-bold mb-3 animate__animated animate__fadeInDown">
            About <span className="text-warning">Digital Library</span>
          </h1>
          <p
            className="lead mx-auto mb-4"
            style={{ maxWidth: "720px", color: "#f8f9fa" }}
          >
            Revolutionizing education with a smarter, faster, and more efficient
            digital library ecosystem.
          </p>
          <a
            href="/register"
            className="btn btn-light btn-lg rounded-pill px-4 fw-semibold shadow-sm me-3"
            data-aos="fade-up"
          >
            Get Started
          </a>
          <a
            href="/contact"
            className="btn btn-outline-light btn-lg rounded-pill px-4 fw-semibold shadow-sm"
            data-aos="fade-up"
            data-aos-delay="150"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5 bg-light position-relative">
        <div className="container">
          <div
            className="text-center mb-5"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            <h2 className="fw-bold display-6 text-primary">
              Why Choose Digital Library?
            </h2>
            <p className="text-muted mb-0">
              Discover features that redefine how institutions manage knowledge.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="col-sm-6 col-lg-4"
                data-aos="zoom-in"
                data-aos-delay={index * 120}
              >
                <div
                  className="card border-0 shadow-lg p-4 rounded-4 h-100 position-relative feature-card"
                  style={{
                    backdropFilter: "blur(8px)",
                    background: "rgba(255, 255, 255, 0.9)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div
                    className={`icon-circle bg-${feature.color} text-white mb-3 d-flex align-items-center justify-content-center`}
                    style={{
                      width: 56,
                      height: 56,
                      borderRadius: "50%",
                      boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
                    }}
                  >
                    {feature.icon}
                  </div>
                  <h5 className="fw-semibold">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Info Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6" data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1581091870622-2c52f34af9f2?w=1000"
                alt="Students using digital library"
                className="img-fluid rounded-4 shadow-lg border border-light"
              />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h3 className="fw-bold mb-3 text-primary">
                Bridging Students with Knowledge
              </h3>
              <p className="text-muted fs-6">
                We empower institutions with a robust, intelligent, and
                user-friendly library management system that enhances access and
                engagement across campuses.
              </p>
              <ul className="list-unstyled fs-6 text-dark">
                <li className="mb-2">✅ Streamlined book issue and return</li>
                <li className="mb-2">✅ Real-time analytics and reports</li>
                <li className="mb-2">✅ Multi-branch management support</li>
              </ul>
              <a
                href="/contact"
                className="btn btn-primary mt-3 rounded-pill px-4 shadow-sm"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="py-5 text-center text-white position-relative"
        style={{
          background:
            "linear-gradient(135deg, #6610f2 0%, #0d6efd 50%, #6f42c1 100%)",
        }}
      >
        <div className="container" data-aos="fade-up">
          <h3 className="fw-bold mb-3">Ready to Transform Your Library?</h3>
          <p className="mb-4 text-light">
            Join hundreds of institutions upgrading to digital excellence.
          </p>
          <a
            href="/register"
            className="btn btn-light btn-lg rounded-pill px-5 fw-semibold me-3"
          >
            Register Now
          </a>
          <a
            href="/login"
            className="btn btn-outline-light btn-lg rounded-pill px-5 fw-semibold"
          >
            Login
          </a>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx global>{`
        @keyframes gradientMove {
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

        .feature-card:hover {
          transform: translateY(-6px) scale(1.03);
          box-shadow: 0 12px 25px rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
}
