"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaEnvelope,
  FaMapMarkerAlt,
  FaPhoneAlt,
  FaPaperPlane,
  FaUser,
} from "react-icons/fa";

export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  return (
    <div
      className="min-vh-100 d-flex flex-column justify-content-center align-items-center py-5 px-3"
      style={{
        background: "linear-gradient(135deg, #e0f7fa, #f0f9ff, #ffffff)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Heading Section */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="fw-bold text-primary display-5 mb-3">
          <FaPaperPlane className="me-2 text-info" />
          Contact Us
        </h1>
        <p className="text-muted fs-5">
          We'd love to hear from you! Reach out for any queries, feedback, or
          collaboration opportunities.
        </p>
      </div>

      {/* Contact Information */}
      <div className="container mb-5">
        <div className="row g-4 text-center">
          <div className="col-md-4" data-aos="zoom-in">
            <div className="card border-0 shadow-lg rounded-4 py-4 hover-card">
              <FaMapMarkerAlt size={32} className="text-danger mb-3" />
              <h5 className="fw-semibold mb-1">Address</h5>
              <p className="text-muted mb-0">123 Business Street, New Delhi</p>
            </div>
          </div>

          <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
            <div className="card border-0 shadow-lg rounded-4 py-4 hover-card">
              <FaEnvelope size={32} className="text-primary mb-3" />
              <h5 className="fw-semibold mb-1">Email</h5>
              <p className="text-muted mb-0">support@company.com</p>
            </div>
          </div>

          <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
            <div className="card border-0 shadow-lg rounded-4 py-4 hover-card">
              <FaPhoneAlt size={32} className="text-success mb-3" />
              <h5 className="fw-semibold mb-1">Phone</h5>
              <p className="text-muted mb-0">+91 98765 43210</p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="container" data-aos="fade-up">
        <div className="row justify-content-center">
          <div className="col-lg-8">
            <div className="card border-0 shadow-lg rounded-4 p-4 p-md-5 bg-white">
              <h4 className="text-center mb-4 fw-bold text-primary">
                Send Us a Message
              </h4>
              <form>
                <div className="row g-3">
                  <div className="col-md-6" data-aos="fade-right">
                    <label className="form-label fw-semibold">
                      <FaUser className="me-2 text-primary" />
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter your name"
                      required
                    />
                  </div>
                  <div className="col-md-6" data-aos="fade-left">
                    <label className="form-label fw-semibold">
                      <FaEnvelope className="me-2 text-primary" />
                      Email
                    </label>
                    <input
                      type="email"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter your email"
                      required
                    />
                  </div>
                  <div className="col-12" data-aos="fade-up">
                    <label className="form-label fw-semibold">
                      <FaPhoneAlt className="me-2 text-primary" />
                      Phone
                    </label>
                    <input
                      type="tel"
                      className="form-control form-control-lg rounded-3"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  <div className="col-12" data-aos="fade-up">
                    <label className="form-label fw-semibold">
                      <FaPaperPlane className="me-2 text-primary" />
                      Message
                    </label>
                    <textarea
                      className="form-control form-control-lg rounded-3"
                      rows={5}
                      placeholder="Type your message..."
                      required
                    ></textarea>
                  </div>
                  <div className="col-12 text-center mt-4" data-aos="zoom-in">
                    <button
                      type="submit"
                      className="btn btn-primary btn-lg rounded-pill px-5 shadow-sm"
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="text-center mt-5" data-aos="fade-up">
        <hr />
        <p className="text-muted mb-0">
          © {new Date().getFullYear()} <strong>Company Name</strong> — Built
          with ❤️ using Bootstrap & AOS.
        </p>
      </footer>

      {/* Custom CSS */}
      <style jsx>{`
        .hover-card {
          transition: all 0.3s ease;
          background-color: #ffffff;
        }
        .hover-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
        }
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.25);
        }
      `}</style>
    </div>
  );
}
