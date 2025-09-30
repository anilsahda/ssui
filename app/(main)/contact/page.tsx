"use client";

import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  // Basic validation
  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Email is invalid";
    }
    if (!form.message.trim()) errs.message = "Message cannot be empty";
    return errs;
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitted) setErrors(validate());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      // Simulate async form submit
      setSubmitted(true);
      setTimeout(() => {
        alert("✅ Message sent successfully!");
        setForm({ name: "", email: "", phone: "", message: "" });
        setSubmitted(false);
      }, 1000);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #0f172a 50%, #1e3a8a 100%)",
        color: "#f0f0f0",
        paddingTop: "3rem",
        paddingBottom: "3rem",
      }}
    >
      <div className="container">
        <div className="row gx-5 align-items-center">
          {/* Contact Info Section */}
          <div className="col-lg-5 mb-5 mb-lg-0" data-aos="fade-right">
            <h1 className="display-5 fw-bold mb-4 text-warning">Contact Us</h1>
            <p className="lead mb-4 text-light">
              We would love to hear from you! Reach out with any questions or
              feedback.
            </p>
            <div className="d-flex align-items-start mb-4">
              <FaMapMarkerAlt size={28} className="text-warning me-3 mt-1" />
              <div>
                <h5 className="fw-semibold">Address</h5>
                <p className="mb-0 text-muted">
                  123 Digital Library Ave, Knowledge City, 45678
                </p>
              </div>
            </div>
            <div className="d-flex align-items-start mb-4">
              <FaEnvelope size={28} className="text-warning me-3 mt-1" />
              <div>
                <h5 className="fw-semibold">Email</h5>
                <p className="mb-0 text-muted">support@digitallibrary.com</p>
              </div>
            </div>
            <div className="d-flex align-items-start">
              <FaPhoneAlt size={28} className="text-warning me-3 mt-1" />
              <div>
                <h5 className="fw-semibold">Phone</h5>
                <p className="mb-0 text-muted">+1 (234) 567-8901</p>
              </div>
            </div>
          </div>

          {/* Contact Form Section */}
          <div
            className="col-lg-7"
            data-aos="fade-left"
            style={{
              background: "rgba(255,255,255,0.05)",
              borderRadius: "1rem",
            }}
          >
            <form
              noValidate
              onSubmit={handleSubmit}
              className="p-4 p-md-5"
              style={{ backdropFilter: "blur(10px)" }}
            >
              <div className="mb-4">
                <label htmlFor="name" className="form-label fw-semibold">
                  Name <span className="text-warning">*</span>
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  className={`form-control ${errors.name ? "is-invalid" : ""}`}
                  placeholder="Your full name"
                  value={form.name}
                  onChange={handleChange}
                  disabled={submitted}
                />
                {errors.name && (
                  <div className="invalid-feedback">{errors.name}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="email" className="form-label fw-semibold">
                  Email <span className="text-warning">*</span>
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  disabled={submitted}
                />
                {errors.email && (
                  <div className="invalid-feedback">{errors.email}</div>
                )}
              </div>

              <div className="mb-4">
                <label htmlFor="phone" className="form-label fw-semibold">
                  Phone
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  className="form-control"
                  placeholder="+1 234 567 8901"
                  value={form.phone}
                  onChange={handleChange}
                  disabled={submitted}
                />
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="form-label fw-semibold">
                  Message <span className="text-warning">*</span>
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  className={`form-control ${
                    errors.message ? "is-invalid" : ""
                  }`}
                  placeholder="Write your message here"
                  value={form.message}
                  onChange={handleChange}
                  disabled={submitted}
                />
                {errors.message && (
                  <div className="invalid-feedback">{errors.message}</div>
                )}
              </div>

              <button
                type="submit"
                className="btn btn-warning fw-semibold w-100 rounded-pill py-3"
                disabled={submitted}
              >
                {submitted ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>

        <footer className="text-center mt-5 text-light-50">
          &copy; 2025 Digital Library. All rights reserved.
        </footer>
      </div>
    </div>
  );
}
