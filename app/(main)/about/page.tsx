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
    AOS.init({ duration: 1000 });
  }, []);

  const features = [
    {
      icon: <FaBookReader size={32} className="text-primary" />,
      title: "Centralized Resources",
      desc: "Access books, journals, and research materials — all in one intuitive platform.",
    },
    {
      icon: <FaUsers size={32} className="text-success" />,
      title: "Student-Centric Design",
      desc: "Crafted for seamless use by students, educators, and administrators.",
    },
    {
      icon: <FaLaptopCode size={32} className="text-warning" />,
      title: "Powered by Tech",
      desc: "Built on modern tech stack for speed, scalability, and performance.",
    },
    {
      icon: <FaCheckCircle size={32} className="text-info" />,
      title: "Smart Management",
      desc: "Advanced dashboards, analytics, and automated workflows.",
    },
    {
      icon: <FaRocket size={32} className="text-danger" />,
      title: "Lightning Performance",
      desc: "Instant search, real-time tracking, and zero-lag interfaces.",
    },
    {
      icon: <FaShieldAlt size={32} className="text-secondary" />,
      title: "Built-In Security",
      desc: "Role-based access and data protection baked into the system.",
    },
  ];

  return (
    <div
      className="bg-light text-dark"
      style={{ fontFamily: "Inter, sans-serif" }}
    >
      {/* Hero */}
      <section
        className="py-5 text-center text-white"
        style={{ background: "linear-gradient(to right, #0d6efd, #6610f2)" }}
      >
        <div className="container">
          <h1 className="display-4 fw-bold mb-3" data-aos="fade-up">
            About Digital Library
          </h1>
          <p
            className="lead mx-auto"
            style={{ maxWidth: "700px" }}
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Revolutionizing education with a smarter, faster, and more efficient
            digital library system.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-5">
        <div className="container">
          <div className="text-center mb-5" data-aos="fade-up">
            <h2 className="fw-bold">Why Choose Digital Library?</h2>
            <p className="text-muted">
              Discover the features that set us apart in the digital education
              space.
            </p>
          </div>

          <div className="row g-4">
            {features.map((feature, i) => (
              <div
                key={i}
                className="col-md-4"
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="bg-white p-4 rounded-4 shadow-sm h-100 border-start border-4 border-primary transition">
                  <div className="mb-3">{feature.icon}</div>
                  <h5 className="fw-semibold">{feature.title}</h5>
                  <p className="text-muted">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Image and Info Section */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="row align-items-center g-5">
            <div className="col-md-6" data-aos="fade-right">
              <img
                src="https://images.unsplash.com/photo-1581091870622-2c52f34af9f2"
                alt="Students using digital library"
                className="img-fluid rounded-4 shadow border"
              />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h3 className="fw-bold mb-3">Bridging Students with Knowledge</h3>
              <p className="text-muted">
                We’re on a mission to empower educational institutions with an
                intelligent, robust, and user-friendly library management
                system.
              </p>
              <ul className="list-unstyled">
                <li className="mb-2">✅ Streamlined book issue and return</li>
                <li className="mb-2">✅ Real-time analytics and reporting</li>
                <li className="mb-2">✅ Campus-wide branch management</li>
              </ul>
              <a
                href="/contact"
                className="btn btn-primary mt-3 rounded-pill px-4 shadow"
              >
                Contact Our Team
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-5 text-center text-white"
        style={{ background: "#212529" }}
      >
        <div className="container" data-aos="fade-up">
          <h4 className="fw-bold mb-3">Ready to Transform Your Library?</h4>
          <p className="text-muted mb-4">
            Join hundreds of institutions upgrading to digital solutions.
          </p>
          <a
            href="/register"
            className="btn btn-outline-light btn-lg rounded-pill px-5 me-3"
          >
            Register Now
          </a>
          <a href="/login" className="btn btn-light btn-lg rounded-pill px-5">
            Login
          </a>
        </div>
      </section>
    </div>
  );
}
