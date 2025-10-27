"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";

export default function AboutPage() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div
      className="container-fluid py-5 px-lg-5"
      style={{
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 40%, #bae6fd 100%)",
      }}
    >
      {/* ===== Header Section ===== */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="fw-bold text-primary display-5">About Us</h1>
        <p className="text-muted mt-2" style={{ fontSize: "1.1rem" }}>
          Discover who we are, what we do, and why we’re passionate about
          creating impactful digital experiences.
        </p>
        <div
          className="mx-auto mt-3"
          style={{
            width: "80px",
            height: "4px",
            backgroundColor: "#0d6efd",
            borderRadius: "10px",
          }}
        ></div>
      </div>

      {/* ===== Content Section ===== */}
      <div className="row align-items-center g-5 mb-5">
        {/* Left Side — Image */}
        <div className="col-md-6" data-aos="zoom-in-right">
          <div className="position-relative overflow-hidden rounded-4 shadow-lg">
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=900"
              alt="Our Team"
              className="img-fluid rounded-4 transition-transform"
              style={{
                transform: "scale(1)",
                transition: "transform 0.6s ease",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.transform = "scale(1.05)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.transform = "scale(1)")
              }
            />
            <div
              className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
              style={{
                background:
                  "linear-gradient(135deg, rgba(13,110,253,0.15), rgba(0,0,0,0.35))",
              }}
            ></div>
          </div>
        </div>

        {/* Right Side — Text */}
        <div className="col-md-6" data-aos="fade-left">
          <h2 className="fw-semibold text-dark mb-3">
            Building Innovative Digital Experiences
          </h2>
          <p className="text-muted">
            We are a team of passionate developers and designers dedicated to
            crafting modern web applications, scalable APIs, and interactive
            interfaces that blend technology with creativity. Our goal is to
            deliver impactful digital solutions that drive business success and
            user satisfaction.
          </p>

          {/* Skills Progress Bars */}
          <div className="mt-4">
            <h5 className="fw-semibold mb-3 text-primary">Our Expertise</h5>
            {[
              { label: "Frontend Development", value: 95, color: "primary" },
              { label: "Backend Development", value: 90, color: "success" },
              { label: "UI/UX Design", value: 85, color: "warning" },
            ].map((skill, idx) => (
              <div key={idx} className="mb-3">
                <div className="d-flex justify-content-between">
                  <span className="small fw-semibold text-muted">
                    {skill.label}
                  </span>
                  <span className="small text-muted">{skill.value}%</span>
                </div>
                <div
                  className="progress"
                  style={{
                    height: "8px",
                    backgroundColor: "#e2e8f0",
                    borderRadius: "10px",
                  }}
                >
                  <div
                    className={`progress-bar bg-${skill.color}`}
                    role="progressbar"
                    style={{
                      width: `${skill.value}%`,
                      transition: "width 1s ease-in-out",
                    }}
                    data-aos="zoom-in-right"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ===== Mission Section ===== */}
      <section
        className="py-5 rounded-4 shadow-sm"
        data-aos="fade-up"
        style={{
          background: "linear-gradient(135deg, #0d6efd, #2563eb)",
          color: "white",
        }}
      >
        <div className="container text-center px-md-5">
          <h3 className="fw-bold mb-4">Our Mission</h3>
          <p className="lead opacity-75">
            To empower businesses through innovative software solutions that
            transform ideas into scalable, reliable, and impactful products. We
            combine creativity, strategy, and technology to help our clients
            lead in the digital era.
          </p>
        </div>
      </section>

      {/* ===== Stats Section ===== */}
      <div
        className="row text-center mt-5 g-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        {[
          { title: "Projects Completed", count: 120, color: "text-primary" },
          { title: "Happy Clients", count: 90, color: "text-success" },
          { title: "Years of Experience", count: 5, color: "text-warning" },
        ].map((stat, index) => (
          <div className="col-md-4" key={index}>
            <div
              className="p-4 bg-white rounded-4 shadow-sm h-100 border-0"
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.boxShadow =
                  "0 10px 20px rgba(0,0,0,0.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0)";
                e.currentTarget.style.boxShadow = "0 5px 10px rgba(0,0,0,0.1)";
              }}
            >
              <h2
                className={`${stat.color} fw-bold display-5 mb-1 counter`}
                data-aos="zoom-in"
                data-aos-delay={100 * index}
              >
                {stat.count}+
              </h2>
              <p className="text-muted fw-semibold">{stat.title}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
