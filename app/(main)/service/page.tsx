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
    AOS.init({ duration: 1000 });
  }, []);

  const services = [
    {
      icon: <FaBook size={36} />,
      title: "Library Automation",
      desc: "Automate issuance, returns, and penalties for efficient library management.",
    },
    {
      icon: <FaUserGraduate size={36} />,
      title: "Student Portal",
      desc: "Empower students with personalized dashboards and real-time book records.",
    },
    {
      icon: <FaChalkboardTeacher size={36} />,
      title: "Faculty Tools",
      desc: "Enable instructors to suggest, review, and manage academic materials.",
    },
    {
      icon: <FaLaptopCode size={36} />,
      title: "Digital Resources",
      desc: "Store, access, and share eBooks, PDFs, and academic content seamlessly.",
    },
    {
      icon: <FaLayerGroup size={36} />,
      title: "Multi-Branch Support",
      desc: "Centrally manage libraries across multiple branches or campuses.",
    },
    {
      icon: <FaTools size={36} />,
      title: "Admin Dashboard",
      desc: "Monitor every aspect of the system with full control and smart analytics.",
    },
  ];

  return (
    <div className="bg-light" style={{ fontFamily: "Inter, sans-serif" }}>
      {/* Hero Section */}
      <section
        className="text-white text-center py-5 mb-4"
        style={{
          background: "linear-gradient(to right, #141e30, #243b55)",
        }}
      >
        <div className="container" data-aos="fade-down">
          <h1 className="display-4 fw-bold">Our Services</h1>
          <p className="lead text-light mt-2">
            Comprehensive tools designed to elevate your library system.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="container py-5">
        <div className="row g-4">
          {services.map((service, idx) => (
            <div
              className="col-md-6 col-lg-4"
              key={idx}
              data-aos="zoom-in"
              data-aos-delay={idx * 100}
            >
              <div className="card h-100 shadow-sm border-0 glass-card">
                <div className="card-body text-center p-4">
                  <div className="mb-3 text-primary">{service.icon}</div>
                  <h5 className="fw-bold">{service.title}</h5>
                  <p className="text-muted">{service.desc}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section
        className="py-5 text-white text-center"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #6610f2)",
        }}
      >
        <div className="container" data-aos="fade-up">
          <h3 className="fw-bold mb-3">Ready to Transform Your Library?</h3>
          <p className="lead">
            Let’s bring modern efficiency and intelligence to your campus
            library.
          </p>
          <a
            href="/contact"
            className="btn btn-light px-4 py-2 fw-semibold rounded-pill mt-3 shadow-sm"
          >
            Contact Us
          </a>
        </div>
      </section>

      {/* Custom Styles */}
      <style jsx>{`
        .glass-card {
          background: rgba(255, 255, 255, 0.9);
          backdrop-filter: blur(10px);
          border-radius: 12px;
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }

        .glass-card:hover {
          transform: translateY(-6px);
          box-shadow: 0 20px 30px rgba(0, 0, 0, 0.1);
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
