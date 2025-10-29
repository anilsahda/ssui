"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaGlobe, FaUsers, FaShieldAlt, FaRocket } from "react-icons/fa";

export default function Page() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="text-center text-white d-flex align-items-center justify-content-center vh-100"
        style={{
          background: "linear-gradient(135deg, #2563eb, #1e40af)",
          backgroundSize: "cover",
        }}
        data-aos="fade-up"
      >
        <div>
          <h1 className="display-4 fw-bold mb-3" data-aos="zoom-in">
            Welcome to the Public Site 🌍
          </h1>
          <p className="lead mb-4" data-aos="fade-up" data-aos-delay="200">
            Experience modern design, animations, and seamless performance.
          </p>
          <a
            href="#features"
            className="btn btn-light rounded-pill px-4 py-2 fw-semibold"
            data-aos="fade-up"
            data-aos-delay="400"
          >
            Explore Features
          </a>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-5 bg-white" data-aos="fade-up">
        <div className="container">
          <h2 className="fw-bold text-center text-dark mb-5">Why Choose Us?</h2>
          <div className="row g-4">
            {[
              {
                icon: <FaGlobe size={32} />,
                title: "Global Reach",
                desc: "Our platform scales globally with optimized performance and CDN integration.",
              },
              {
                icon: <FaUsers size={32} />,
                title: "User Friendly",
                desc: "Clean, intuitive design ensures seamless navigation and accessibility.",
              },
              {
                icon: <FaShieldAlt size={32} />,
                title: "Secure & Reliable",
                desc: "Enterprise-grade protection and reliability to safeguard your data.",
              },
              {
                icon: <FaRocket size={32} />,
                title: "Fast & Modern",
                desc: "Built using Next.js, Bootstrap, and AOS for speed and smooth animations.",
              },
            ].map((feature, index) => (
              <div
                className="col-md-6 col-lg-3"
                key={index}
                data-aos="zoom-in"
                data-aos-delay={index * 150}
              >
                <div
                  className="card border-0 shadow-lg rounded-4 text-center p-4 h-100 feature-card"
                  style={{
                    background: "linear-gradient(145deg, #ffffff, #f1f5f9)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  }}
                >
                  <div className="text-primary mb-3">{feature.icon}</div>
                  <h5 className="fw-bold">{feature.title}</h5>
                  <p className="text-muted mb-0">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call To Action Section */}
      <section
        className="text-center text-white py-5"
        style={{
          background: "linear-gradient(135deg, #2563eb, #1e40af)",
        }}
        data-aos="fade-up"
      >
        <div className="container">
          <h2 className="fw-bold mb-3">Join Our Community Today 🚀</h2>
          <p className="lead mb-4">
            Sign up now to get early access, exclusive updates, and premium
            features.
          </p>
          <a
            href="#signup"
            className="btn btn-light rounded-pill px-4 py-2 fw-semibold"
          >
            Get Started
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="text-center py-4 text-muted small" data-aos="fade-up">
        © {new Date().getFullYear()} Public Web Platform | Built with ❤️ using
        Next.js & Bootstrap
      </footer>

      {/* Hover Animations */}
      <style jsx>{`
        .feature-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
      `}</style>
    </div>
  );
}
