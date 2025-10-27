"use client";

import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 700, once: true });
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Form submitted successfully!");
  };

  return (
    <div className="bg-light min-vh-100">
      {/* Hero Section */}
      <section
        className="py-5 bg-primary text-light text-center"
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead mt-3">
            We’d love to hear from you! Reach out for support or inquiries.
          </p>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-5" data-aos="fade-up">
        <div className="container">
          <div className="row g-4 mb-5">
            <div className="col-md-4" data-aos="zoom-in">
              <div className="text-center p-4 bg-white shadow-sm rounded-3">
                <h5 className="fw-bold">📍 Address</h5>
                <p className="text-muted">123 SS Street, City, Country</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="100">
              <div className="text-center p-4 bg-white shadow-sm rounded-3">
                <h5 className="fw-bold">📞 Phone</h5>
                <p className="text-muted">+91 12345 67890</p>
              </div>
            </div>
            <div className="col-md-4" data-aos="zoom-in" data-aos-delay="200">
              <div className="text-center p-4 bg-white shadow-sm rounded-3">
                <h5 className="fw-bold">✉️ Email</h5>
                <p className="text-muted">support@ssapp.com</p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="row justify-content-center">
            <div className="col-lg-8">
              <div className="card shadow-sm rounded-3 p-4" data-aos="fade-up">
                <h3 className="fw-bold mb-4 text-center">Send us a Message</h3>
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Your Name"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      className="form-control"
                      placeholder="Your Email"
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Message</label>
                    <textarea
                      className="form-control"
                      rows={5}
                      placeholder="Type your message..."
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="btn btn-primary px-5 rounded-pill fw-bold"
                    >
                      Send Message
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
