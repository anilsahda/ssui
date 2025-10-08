"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { FaUsers, FaBriefcase, FaGlobe, FaAward } from "react-icons/fa";

export default function AboutPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-primary text-white text-center py-5"
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-4 fw-bold">About SS Job Portal</h1>
          <p className="lead mt-3">
            Connecting job seekers with top companies seamlessly.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6 mb-4 mb-md-0" data-aos="fade-right">
              <img
                src="/about-illustration.svg"
                alt="About illustration"
                className="img-fluid rounded shadow-sm"
              />
            </div>
            <div className="col-md-6" data-aos="fade-left">
              <h2 className="fw-bold mb-3">Our Mission</h2>
              <p className="mb-4">
                To provide an innovative platform where job seekers and
                companies connect efficiently, fostering growth and career
                opportunities.
              </p>
              <h2 className="fw-bold mb-3">Our Vision</h2>
              <p>
                To become the leading job portal that bridges talent and
                opportunity globally.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics Section */}
      <section className="bg-light py-5 text-center" data-aos="fade-up">
        <div className="container">
          <h2 className="fw-bold mb-5">Our Impact</h2>
          <div className="row">
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="100"
            >
              <FaUsers size={50} className="text-primary mb-2" />
              <h3 className="fw-bold">10k+</h3>
              <p>Job Seekers</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="200"
            >
              <FaBriefcase size={50} className="text-primary mb-2" />
              <h3 className="fw-bold">5k+</h3>
              <p>Jobs Posted</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="300"
            >
              <FaGlobe size={50} className="text-primary mb-2" />
              <h3 className="fw-bold">50+</h3>
              <p>Companies</p>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="zoom-in"
              data-aos-delay="400"
            >
              <FaAward size={50} className="text-primary mb-2" />
              <h3 className="fw-bold">95%</h3>
              <p>Successful Placements</p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            Meet Our Team
          </h2>
          <div className="row">
            {["Alice Johnson", "Bob Smith", "Carol Lee", "David Brown"].map(
              (name, i) => (
                <div
                  className="col-md-3 mb-4"
                  key={i}
                  data-aos="fade-up"
                  data-aos-delay={i * 100}
                >
                  <div className="card shadow-sm h-100 text-center p-3">
                    <img
                      src={`/team${i + 1}.jpg`}
                      alt={name}
                      className="rounded-circle mb-3"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                      }}
                    />
                    <h5 className="fw-bold">{name}</h5>
                    <p className="text-muted">Team Member</p>
                  </div>
                </div>
              )
            )}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section
        className="bg-primary text-white text-center py-5"
        data-aos="fade-up"
      >
        <h2 className="fw-bold mb-3">Ready to Find Your Dream Job?</h2>
        <p className="mb-4">
          Join thousands of job seekers and companies today!
        </p>
        <a
          href="/register"
          className="btn btn-light btn-lg rounded-pill px-4 me-2"
        >
          Sign Up
        </a>
        <a
          href="/jobs"
          className="btn btn-outline-light btn-lg rounded-pill px-4"
        >
          Browse Jobs
        </a>
      </section>
    </div>
  );
}
