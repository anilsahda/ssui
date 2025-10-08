"use client";

import { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBriefcase, FaUsers, FaClipboardList } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import Link from "next/link";

export default function Page() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-primary text-white py-5" data-aos="fade-down">
        <div className="container text-center">
          <h1 className="display-4 fw-bold">Welcome to SS Job Portal</h1>
          <p className="lead mt-3">
            Find your dream job or the perfect candidate in minutes.
          </p>
          <div className="mt-4">
            <Link
              href="/register"
              className="btn btn-light btn-lg rounded-pill px-4 me-2"
            >
              Get Started
            </Link>
            <Link
              href="/jobs"
              className="btn btn-outline-light btn-lg rounded-pill px-4"
            >
              Browse Jobs
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <div className="container">
          <h2 className="text-center mb-5" data-aos="fade-up">
            Our Features
          </h2>
          <div className="row text-center">
            <div
              className="col-md-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              <div className="card border-0 shadow-sm p-4 h-100">
                <FaBriefcase size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Job Search</h5>
                <p>Quickly search jobs matching your skills and preferences.</p>
              </div>
            </div>
            <div
              className="col-md-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              <div className="card border-0 shadow-sm p-4 h-100">
                <FaUsers size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Recruiters</h5>
                <p>Hire top talent easily using our platform and tools.</p>
              </div>
            </div>
            <div
              className="col-md-4 mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="card border-0 shadow-sm p-4 h-100">
                <FaClipboardList size={50} className="text-primary mb-3" />
                <h5 className="fw-bold">Profile Matching</h5>
                <p>Get matched to jobs that fit your profile perfectly.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs Section */}
      <section className="bg-light py-5">
        <div className="container">
          <h2 className="text-center mb-5" data-aos="fade-up">
            Featured Jobs
          </h2>
          <div className="row">
            {Array.from({ length: 4 }).map((_, i) => (
              <div
                className="col-md-3 mb-4"
                key={i}
                data-aos="zoom-in"
                data-aos-delay={i * 100}
              >
                <div className="card shadow-sm h-100">
                  <div className="card-body">
                    <h5 className="card-title">Frontend Developer</h5>
                    <p className="card-text">Company: TechCorp</p>
                    <p className="card-text">Location: Remote</p>
                    <Link href="/jobs/1" className="btn btn-primary btn-sm">
                      Apply Now
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call-to-action Section */}
      <section className="py-5 text-center" data-aos="fade-up">
        <h2 className="fw-bold mb-3">
          Ready to take your career to the next level?
        </h2>
        <p className="mb-4">
          Join thousands of job seekers and companies today!
        </p>
        <Link
          href="/register"
          className="btn btn-lg btn-primary rounded-pill px-4 me-2"
        >
          Sign Up
        </Link>
        <Link
          href="/jobs"
          className="btn btn-lg btn-outline-primary rounded-pill px-4"
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
