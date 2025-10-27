"use client";

import React, { useState, useEffect } from "react";
import { FaMapMarkerAlt, FaEnvelope, FaPhoneAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

export default function ContactPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState({});
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const validate = () => {
    const errs: any = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) {
      errs.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(form.email)) {
      errs.email = "Email is invalid";
    }
    if (!form.message.trim()) errs.message = "Message cannot be empty";
    return errs;
  };

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    if (submitted) setErrors(validate());
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const errs = validate();
    setErrors(errs);

    if (Object.keys(errs).length === 0) {
      setSubmitted(true);
      setTimeout(() => {
        setShowModal(true);
        setForm({ name: "", email: "", phone: "", message: "" });
        setSubmitted(false);
      }, 1200);
    }
  };

  return (
    <div
      className="min-vh-100 d-flex align-items-center position-relative"
      style={{
        fontFamily: "'Inter', sans-serif",
        background:
          "linear-gradient(135deg, #0f172a, #1e3a8a, #3b82f6, #60a5fa)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 10s ease infinite",
        color: "#f0f0f0",
        overflowX: "hidden",
      }}
    >
      <div className="container py-5">
        {/* Header */}
        <div className="text-center mb-5" data-aos="zoom-in">
          <h1 className="fw-bold text-warning display-5 mb-3">
            Get in Touch ✉️
          </h1>
          <p className="lead text-light opacity-75">
            We'd love to hear from you! Drop us a message or connect via our
            contact info.
          </p>
        </div>

        {/* Layout */}
        <div className="row gx-5 align-items-center">
          {/* Info Section */}
          <div className="col-lg-5 mb-5 mb-lg-0" data-aos="flip-right">
            <div className="card border-0 shadow-lg glass-effect text-light p-4 rounded-4">
              <div className="d-flex align-items-start mb-4">
                <FaMapMarkerAlt size={28} className="text-warning me-3 mt-1" />
                <div>
                  <h5 className="fw-semibold mb-1">Address</h5>
                  <p className="mb-0 text-light opacity-75">
                    123 Digital Library Ave, Knowledge City, 45678
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-start mb-4">
                <FaEnvelope size={28} className="text-warning me-3 mt-1" />
                <div>
                  <h5 className="fw-semibold mb-1">Email</h5>
                  <p className="mb-0 text-light opacity-75">
                    support@digitallibrary.com
                  </p>
                </div>
              </div>
              <div className="d-flex align-items-start">
                <FaPhoneAlt size={28} className="text-warning me-3 mt-1" />
                <div>
                  <h5 className="fw-semibold mb-1">Phone</h5>
                  <p className="mb-0 text-light opacity-75">
                    +1 (234) 567-8901
                  </p>
                </div>
              </div>
            </div>
            <div
              className="mt-4 text-center small opacity-75"
              data-aos="fade-up"
            >
              <i className="bi bi-clock text-warning me-1"></i> Open Mon - Fri,
              9 AM - 6 PM
            </div>
          </div>

          {/* Form Section */}
          <div className="col-lg-7" data-aos="fade-left">
            <div
              className="p-4 p-md-5 shadow-lg glass-effect rounded-4"
              style={{
                background: "rgba(255,255,255,0.05)",
                backdropFilter: "blur(15px)",
              }}
            >
              <form noValidate onSubmit={handleSubmit}>
                {["name", "email", "phone"].map((field) => (
                  <div className="form-floating mb-4" key={field}>
                    <input
                      id={field}
                      name={field}
                      type={field === "email" ? "email" : "text"}
                      className={`form-control ${
                        errors[field as keyof typeof errors] ? "is-invalid" : ""
                      }`}
                      placeholder={field}
                      value={form[field as keyof typeof form]}
                      onChange={handleChange}
                      disabled={submitted}
                    />
                    <label htmlFor={field} className="text-dark">
                      {field.charAt(0).toUpperCase() + field.slice(1)}
                      {field !== "phone" && (
                        <span className="text-warning ms-1">*</span>
                      )}
                    </label>
                    {errors[field as keyof typeof errors] && (
                      <div className="invalid-feedback">
                        {errors[field as keyof typeof errors]}
                      </div>
                    )}
                  </div>
                ))}

                <div className="mb-4">
                  <label htmlFor="message" className="form-label fw-semibold">
                    Message <span className="text-warning">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className={`form-control form-control-lg ${
                      errors.message ? "is-invalid" : ""
                    }`}
                    placeholder="Write your message here..."
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
                  className="btn btn-warning fw-semibold w-100 rounded-pill py-3 shadow-lg"
                  disabled={submitted}
                >
                  {submitted ? (
                    <>
                      <span
                        className="spinner-border spinner-border-sm me-2"
                        role="status"
                      ></span>
                      Sending...
                    </>
                  ) : (
                    <>
                      <i className="bi bi-send-fill me-2"></i> Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="text-center mt-5 text-light-50 opacity-75 small"
          data-aos="zoom-in"
        >
          &copy; 2025 Digital Library. All rights reserved.
        </footer>
      </div>

      {/* Success Modal */}
      {showModal && (
        <div
          className="modal fade show d-block bg-dark bg-opacity-75"
          tabIndex={-1}
          role="dialog"
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
            data-aos="zoom-in"
          >
            <div className="modal-content text-center p-4 rounded-4 border-0 shadow-lg">
              <div className="modal-body">
                <h4 className="text-success fw-bold mb-3">
                  <i className="bi bi-check-circle-fill me-2"></i> Message Sent!
                </h4>
                <p className="text-muted mb-4">
                  Thank you for reaching out. We'll get back to you soon.
                </p>
                <button
                  className="btn btn-outline-success rounded-pill px-4"
                  onClick={() => setShowModal(false)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .glass-effect {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          transition: all 0.3s ease-in-out;
        }

        .glass-effect:hover {
          transform: translateY(-6px);
          box-shadow: 0 1rem 2rem rgba(0, 0, 0, 0.4);
        }

        .form-control {
          background: rgba(255, 255, 255, 0.08);
          border: 1px solid rgba(255, 255, 255, 0.2);
          color: #f0f0f0;
        }

        .form-control:focus {
          border-color: #facc15;
          box-shadow: 0 0 0 0.25rem rgba(250, 204, 21, 0.3);
        }

        textarea {
          resize: none;
        }

        button.btn-warning:hover {
          transform: scale(1.03);
          box-shadow: 0 1rem 1.5rem rgba(250, 204, 21, 0.3);
        }
      `}</style>
    </div>
  );
}
