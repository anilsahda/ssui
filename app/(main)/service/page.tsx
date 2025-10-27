"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaBook,
  FaUserGraduate,
  FaLaptopCode,
  FaChalkboardTeacher,
  FaTools,
  FaLayerGroup,
} from "react-icons/fa";

export default function ServicePage() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const services = [
    {
      icon: <FaBook size={40} />,
      title: "Library Automation",
      desc: "Automate issuance, returns, and penalties for efficient library management.",
    },
    {
      icon: <FaUserGraduate size={40} />,
      title: "Student Portal",
      desc: "Empower students with personalized dashboards and real-time book records.",
    },
    {
      icon: <FaChalkboardTeacher size={40} />,
      title: "Faculty Tools",
      desc: "Enable instructors to suggest, review, and manage academic materials effortlessly.",
    },
    {
      icon: <FaLaptopCode size={40} />,
      title: "Digital Resources",
      desc: "Store, access, and share eBooks, PDFs, and academic content seamlessly.",
    },
    {
      icon: <FaLayerGroup size={40} />,
      title: "Multi-Branch Support",
      desc: "Centrally manage libraries across multiple branches or campuses efficiently.",
    },
    {
      icon: <FaTools size={40} />,
      title: "Admin Dashboard",
      desc: "Monitor every aspect of the system with full control and smart analytics.",
    },
  ];

  return (
    <div
      style={{
        fontFamily: "'Inter', sans-serif",
        backgroundColor: "#f8f9fa",
        overflowX: "hidden",
      }}
    >
      {/* Hero Section */}
      <section
        className="text-white text-center py-5 position-relative"
        style={{
          background: "linear-gradient(135deg, #141e30, #243b55, #3b82f6)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 10s ease infinite",
        }}
      >
        <div className="container" data-aos="fade-down">
          <h1 className="display-4 fw-bold text-warning">Our Services</h1>
          <p className="lead text-light mt-3">
            Comprehensive, intelligent tools to revolutionize your digital
            library experience.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="container py-5">
        <div className="row g-4">
          {services.map((service, idx) => (
            <div
              className="col-md-6 col-lg-4"
              key={idx}
              data-aos="flip-left"
              data-aos-delay={idx * 100}
            >
              <div className="card h-100 border-0 shadow-lg glass-card p-4 text-center rounded-4">
                <div className="icon-wrapper mx-auto mb-4 text-primary">
                  {service.icon}
                </div>
                <h5 className="fw-bold mb-2">{service.title}</h5>
                <p className="text-muted">{service.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section
        className="text-white text-center py-5 position-relative"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6610f2, #3b82f6)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 8s ease infinite",
        }}
      >
        <div className="container" data-aos="zoom-in">
          <h3 className="fw-bold mb-3 display-6">
            Ready to Transform Your Library?
          </h3>
          <p className="lead mb-4">
            Let's bring modern efficiency and innovation to your institution.
          </p>
          <a
            href="/contact"
            className="btn btn-light btn-lg fw-semibold rounded-pill shadow-sm px-4 py-2"
            data-aos="fade-up"
          >
            <i className="bi bi-send-fill me-2"></i> Contact Us
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-3 bg-dark text-light small">
        &copy; 2025 Digital Library — All Rights Reserved.
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
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

        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          transition: all 0.4s ease;
          border: 1px solid rgba(255, 255, 255, 0.3);
          position: relative;
        }

        .glass-card::before {
          content: "";
          position: absolute;
          top: -2px;
          left: -2px;
          right: -2px;
          bottom: -2px;
          border-radius: 1rem;
          background: linear-gradient(45deg, #0d6efd, #6610f2, #ffc107);
          z-index: -1;
          opacity: 0;
          transition: opacity 0.4s ease;
        }

        .glass-card:hover::before {
          opacity: 0.3;
        }

        .glass-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 1.5rem 2rem rgba(0, 0, 0, 0.15);
        }

        .icon-wrapper {
          width: 70px;
          height: 70px;
          border-radius: 50%;
          background: rgba(13, 110, 253, 0.1);
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.4s ease;
        }

        .icon-wrapper:hover {
          background: rgba(13, 110, 253, 0.3);
          transform: scale(1.1);
          box-shadow: 0 0 20px rgba(13, 110, 253, 0.4);
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
