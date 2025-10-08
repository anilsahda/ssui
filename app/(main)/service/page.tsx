"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaSearch,
  FaUserTie,
  FaClipboardCheck,
  FaRocket,
} from "react-icons/fa";
import Link from "next/link";

export default function ServicePage() {
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
          <h1 className="display-4 fw-bold">Our Services</h1>
          <p className="lead mt-3">
            Empowering job seekers and companies with advanced recruitment
            solutions.
          </p>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            What We Offer
          </h2>
          <div className="row text-center">
            <div
              className="col-md-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="card border-0 shadow-sm p-4 h-100">
                <FaSearch size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Job Search</h5>
                <p>
                  Find the perfect job opportunities that match your skills and
                  goals.
                </p>
              </div>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card border-0 shadow-sm p-4 h-100">
                <FaUserTie size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Recruiter Services</h5>
                <p>
                  Post jobs, review applications, and hire top talent
                  efficiently.
                </p>
              </div>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="card border-0 shadow-sm p-4 h-100">
                <FaClipboardCheck size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Profile Matching</h5>
                <p>
                  Get matched with jobs that fit your skills, experience, and
                  preferences.
                </p>
              </div>
            </div>
            <div
              className="col-md-3 mb-4"
              data-aos="fade-up"
              data-aos-delay="400"
            >
              <div className="card border-0 shadow-sm p-4 h-100">
                <FaRocket size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Career Growth</h5>
                <p>
                  Access tools, resources, and guidance to boost your career
                  trajectory.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center fw-bold mb-5" data-aos="fade-up">
            How It Works
          </h2>
          <div className="row text-center">
            {[
              {
                step: 1,
                title: "Sign Up",
                desc: "Create your account as a job seeker or recruiter.",
              },
              {
                step: 2,
                title: "Create Profile",
                desc: "Add your skills, experience, and company details.",
              },
              {
                step: 3,
                title: "Find Jobs / Candidates",
                desc: "Browse, search, and get matched instantly.",
              },
              {
                step: 4,
                title: "Apply & Hire",
                desc: "Apply to jobs or hire the best candidates easily.",
              },
            ].map((item, i) => (
              <div
                className="col-md-3 mb-4"
                key={i}
                data-aos="fade-up"
                data-aos-delay={i * 150}
              >
                <div className="card shadow-sm h-100 p-4">
                  <div className="display-4 text-primary fw-bold mb-3">
                    {item.step}
                  </div>
                  <h5 className="fw-bold">{item.title}</h5>
                  <p>{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <section className="py-5 text-center" data-aos="fade-up">
        <h2 className="fw-bold mb-3">Ready to Get Started?</h2>
        <p className="mb-4">
          Join thousands of job seekers and companies and take your career
          forward!
        </p>
        <Link
          href="/register"
          className="btn btn-primary btn-lg rounded-pill px-4 me-2"
        >
          Sign Up
        </Link>
        <Link
          href="/jobs"
          className="btn btn-outline-primary btn-lg rounded-pill px-4"
        >
          Browse Jobs
        </Link>
      </section>

      {/* Footer */}
      <footer className="bg-dark text-white py-4 mt-5" data-aos="fade-up">
        <div className="container text-center">
          <p>
            © {new Date().getFullYear()} SS Job Portal. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
