"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaCode,
  FaLaptopCode,
  FaDatabase,
  FaTools,
  FaCloud,
  FaArrowUp,
} from "react-icons/fa";

export default function AboutPage() {
  const [showScroll, setShowScroll] = useState(false);

  useEffect(() => {
    AOS.init({
      duration: 900,
      once: true,
      easing: "ease-in-out",
    });

    const handleScroll = () => {
      setShowScroll(window.scrollY > 300);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div
      className="about-page"
      style={{
        fontFamily: "Inter, sans-serif",
        background: "linear-gradient(to bottom right, #f8fafc, #e2e8f0)",
        minHeight: "100vh",
      }}
    >
      {/* ===== Hero Section ===== */}
      <section
        className="text-center text-white py-5 position-relative overflow-hidden"
        style={{
          background:
            "linear-gradient(135deg, rgba(37,99,235,0.9), rgba(30,58,138,0.9)), url('https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=1600') center/cover no-repeat",
        }}
        data-aos="fade-down"
      >
        <div className="container py-5">
          <h1
            className="fw-bold display-4 mb-3"
            data-aos="zoom-in"
            data-aos-delay="200"
          >
            About <span className="text-warning">Our Team</span>
          </h1>
          <p
            className="lead mx-auto"
            style={{ maxWidth: "700px" }}
            data-aos="fade-up"
            data-aos-delay="400"
          >
            We are a passionate group of developers dedicated to crafting
            elegant, scalable, and efficient software solutions that empower
            businesses and people alike.
          </p>
        </div>
      </section>

      {/* ===== Who We Are ===== */}
      <section className="container py-5" data-aos="fade-up">
        <div className="row align-items-center">
          <div className="col-md-6 mb-4 mb-md-0" data-aos="zoom-in-right">
            <img
              src="https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=800"
              alt="Team collaboration"
              className="img-fluid rounded-4 shadow-lg"
            />
          </div>
          <div className="col-md-6" data-aos="fade-left" data-aos-delay="200">
            <h2 className="fw-bold mb-3">Who We Are</h2>
            <p className="text-muted">
              Our team blends creativity and technical expertise to deliver
              next-generation web applications. From full-stack development to
              cloud integration, we transform ideas into digital reality with
              precision and care.
            </p>
            <ul className="list-unstyled mt-3">
              <li className="mb-2">✅ Experienced in .NET Core & React</li>
              <li className="mb-2">✅ Focused on scalable architectures</li>
              <li className="mb-2">✅ Committed to continuous learning</li>
            </ul>
          </div>
        </div>
      </section>

      {/* ===== Animated Counters ===== */}
      <section
        className="py-5 text-center text-white"
        style={{
          background: "linear-gradient(135deg, #1e3a8a, #2563eb)",
        }}
      >
        <div className="container">
          <div className="row g-4">
            {[
              { count: "50+", label: "Projects Completed" },
              { count: "20+", label: "Happy Clients" },
              { count: "5+", label: "Years of Experience" },
              { count: "10+", label: "Technologies Mastered" },
            ].map((item, i) => (
              <div className="col-6 col-md-3" key={i} data-aos="zoom-in">
                <h2 className="fw-bold display-5 text-warning mb-1">
                  {item.count}
                </h2>
                <p className="text-light mb-0">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Expertise Section ===== */}
      <section
        className="py-5 text-center"
        style={{ backgroundColor: "#f8fafc" }}
      >
        <div className="container">
          <h2 className="fw-bold mb-5" data-aos="fade-up">
            Our Expertise
          </h2>

          <div className="row g-4">
            {[
              {
                icon: <FaCode size={40} color="#2563eb" />,
                title: "Full Stack Development",
                desc: "Building scalable web apps using .NET, React, and modern APIs.",
              },
              {
                icon: <FaDatabase size={40} color="#16a34a" />,
                title: "Database Design",
                desc: "Expert in SQL, Entity Framework, and data-driven architectures.",
              },
              {
                icon: <FaLaptopCode size={40} color="#f59e0b" />,
                title: "Frontend Engineering",
                desc: "Crafting pixel-perfect, responsive, and interactive UIs.",
              },
              {
                icon: <FaCloud size={40} color="#0ea5e9" />,
                title: "Cloud & Deployment",
                desc: "Deploying and scaling apps using Azure, Docker, and CI/CD.",
              },
              {
                icon: <FaTools size={40} color="#9333ea" />,
                title: "DevOps & Automation",
                desc: "Automating pipelines for seamless code delivery and testing.",
              },
            ].map((item, i) => (
              <div
                className="col-sm-6 col-lg-4"
                key={i}
                data-aos="flip-left"
                data-aos-delay={100 * i}
              >
                <div
                  className="card border-0 h-100 rounded-4 p-3 shadow-lg text-center glass-card transition-all"
                  style={{
                    backdropFilter: "blur(10px)",
                    background: "rgba(255, 255, 255, 0.85)",
                  }}
                >
                  <div className="mb-3">{item.icon}</div>
                  <h5 className="fw-bold mb-2">{item.title}</h5>
                  <p className="text-muted mb-0">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== Scroll To Top Button ===== */}
      {showScroll && (
        <button
          className="btn btn-primary rounded-circle shadow position-fixed"
          onClick={scrollToTop}
          style={{
            bottom: "30px",
            right: "30px",
            width: "48px",
            height: "48px",
            zIndex: 1050,
          }}
          data-aos="zoom-in"
        >
          <FaArrowUp />
        </button>
      )}

      {/* ===== Footer ===== */}
      <footer className="text-center py-4 text-muted small">
        © {new Date().getFullYear()} SS App | Built with ❤️ using Next.js & .NET
      </footer>
    </div>
  );
}
