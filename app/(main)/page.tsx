"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";

export default function Page() {
  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  return (
    <div className="bg-light min-vh-100 d-flex flex-column justify-content-center align-items-center text-center p-4">
      <h1 className="display-4 fw-bold text-primary mb-3" data-aos="fade-down">
        Welcome to the Public Site
      </h1>
      <p
        className="lead text-secondary mb-4"
        data-aos="fade-up"
        data-aos-delay="200"
      >
        Explore our services and manage your resources efficiently. Our platform
        is designed to provide a seamless and user-friendly experience.
      </p>
      <div data-aos="zoom-in" data-aos-delay="400">
        <a href="/register" className="btn btn-primary btn-lg me-3 shadow-sm">
          Get Started
        </a>
        <a href="/about" className="btn btn-outline-primary btn-lg shadow-sm">
          Learn More
        </a>
      </div>
      <div className="mt-5" data-aos="fade-up" data-aos-delay="600">
        <img
          src="https://via.placeholder.com/600x300"
          alt="Hero Illustration"
          className="img-fluid rounded shadow-sm"
        />
      </div>
    </div>
  );
}
