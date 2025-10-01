"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { BsHouseDoor, BsEnvelopeFill } from "react-icons/bs";
import AOS from "aos";
import "aos/dist/aos.css";

const AboutPage: React.FC = () => {
  useEffect(() => {
    AOS.init({
      duration: 1200,
      easing: "ease-in-out",
      once: true,
    });
  }, []);

  return (
    <div
      className="d-flex justify-content-center align-items-center min-vh-100 px-3"
      style={{
        background: "linear-gradient(135deg, #1e3c72, #2a5298)",
        backgroundSize: "400% 400%",
        animation: "gradientAnimation 15s ease infinite",
      }}
    >
      <style>
        {`
          @keyframes gradientAnimation {
            0% { background-position: 0% 50%; }
            50% { background-position: 100% 50%; }
            100% { background-position: 0% 50%; }
          }

          .glass-card {
            background: rgba(255, 255, 255, 0.15);
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            border-radius: 20px;
            border: 1px solid rgba(255, 255, 255, 0.25);
            box-shadow: 0 8px 32px 0 rgba(31, 38, 135, 0.37);
          }

          .btn-custom {
            transition: all 0.3s ease;
          }

          .btn-custom:hover {
            transform: translateY(-4px);
            box-shadow: 0 10px 18px rgba(0, 0, 0, 0.25);
          }

          .gradient-divider {
            height: 3px;
            background: linear-gradient(90deg, #6B73FF, #000DFF);
            border-radius: 999px;
            margin: 1.5rem 0 2rem;
            border: none;
          }
        `}
      </style>

      <div
        className="glass-card p-5 text-center text-white"
        style={{ maxWidth: "720px", width: "100%" }}
      >
        <h1
          className="fw-bold mb-3"
          style={{ fontSize: "3.2rem", letterSpacing: "-1px" }}
          data-aos="fade-down"
        >
          About Our App
        </h1>

        <hr
          className="gradient-divider"
          data-aos="zoom-in"
          data-aos-delay="200"
        />

        <p
          className="fs-5 mb-4"
          style={{ color: "#e0e0e0" }}
          data-aos="fade-up"
          data-aos-delay="400"
        >
          Welcome to our world of innovation and creativity. This page is
          designed to give you insight into who we are and what we aim to
          achieve. Our mission is to deliver top-notch user experience with
          elegant UI and robust performance.
        </p>

        <div
          className="d-flex flex-wrap justify-content-center gap-3 mt-4"
          data-aos="fade-up"
          data-aos-delay="600"
        >
          <Link href="/" passHref legacyBehavior>
            <a
              className="btn btn-outline-light btn-lg btn-custom d-flex align-items-center gap-2"
              aria-label="Go to Home"
            >
              <BsHouseDoor size={22} />
              Home
            </a>
          </Link>
          <Link href="/contact" passHref legacyBehavior>
            <a
              className="btn btn-light btn-lg btn-custom d-flex align-items-center gap-2 text-primary"
              aria-label="Contact Us"
            >
              <BsEnvelopeFill size={22} />
              Contact
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
