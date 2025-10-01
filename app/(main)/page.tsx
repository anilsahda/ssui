"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import AOS from "aos";
import "aos/dist/aos.css";

const HomePage: React.FC = () => {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100 px-3"
      style={{
        background: "linear-gradient(135deg, #e0eafc 0%, #cfdef3 100%)",
      }}
    >
      <style>
        {`
          .btn-hover {
            transition: all 0.3s ease;
          }

          .btn-hover:hover {
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
          }
        `}
      </style>

      <div
        className="bg-white rounded-4 shadow-lg text-center p-5"
        style={{ maxWidth: "700px", width: "100%" }}
        data-aos="fade-up"
      >
        <h1
          className="display-4 fw-bold text-primary mb-3"
          data-aos="fade-down"
          data-aos-delay="200"
        >
          Welcome to <span className="text-dark">Dhakad Infotech</span>!
        </h1>

        <p
          className="lead text-muted mb-4"
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Empowering digital transformation through innovative technology
          solutions tailored to your needs.
        </p>

        <div
          className="d-flex justify-content-center gap-3"
          data-aos="zoom-in"
          data-aos-delay="600"
        >
          <Link
            href="/about"
            className="btn btn-outline-primary btn-lg btn-hover px-4"
          >
            Learn More
          </Link>
          <Link
            href="/contact"
            className="btn btn-primary btn-lg btn-hover px-4"
          >
            Contact Us
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
