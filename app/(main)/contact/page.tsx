"use client";

import React, { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "aos/dist/aos.css";
import AOS from "aos";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaPaperPlane,
} from "react-icons/fa";

export default function ContactPage() {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div
      className="container-fluid py-5"
      style={{
        fontFamily: "Inter, sans-serif",
        minHeight: "100vh",
        background:
          "linear-gradient(135deg, #f8fafc 0%, #e0f2fe 50%, #c7d2fe 100%)",
      }}
    >
      {/* ===== Header Section ===== */}
      <div className="text-center mb-5" data-aos="fade-down">
        <h1 className="fw-bold text-primary display-5">Get in Touch</h1>
        <p className="text-muted mt-2" style={{ fontSize: "1.1rem" }}>
          Have questions or a project in mind? Let’s start the conversation.
        </p>
        <hr className="w-25 mx-auto border-3 border-primary opacity-75" />
      </div>

      {/* ===== Contact Info Section ===== */}
      <div className="row justify-content-center g-4 mb-5">
        {[
          {
            icon: <FaPhoneAlt size={28} />,
            title: "Call Us",
            text: "+91 98765 43210",
            color: "primary",
          },
          {
            icon: <FaEnvelope size={28} />,
            title: "Email Us",
            text: "support@ssapp.com",
            color: "success",
          },
          {
            icon: <FaMapMarkerAlt size={28} />,
            title: "Visit Us",
            text: "Indore, Madhya Pradesh, India",
            color: "warning",
          },
        ].map((info, index) => (
          <div
            key={index}
            className="col-md-4 col-sm-10"
            data-aos="zoom-in-up"
            data-aos-delay={index * 150}
          >
            <div
              className={`card border-0 shadow-lg rounded-4 text-center p-4 bg-${info.color} text-white position-relative`}
              style={{
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
            >
              <div className="mb-3 fs-2">{info.icon}</div>
              <h5 className="fw-semibold mb-1">{info.title}</h5>
              <p className="small mb-0">{info.text}</p>
              <div
                className="position-absolute top-0 start-0 w-100 h-100 rounded-4"
                style={{
                  boxShadow: `0 0 25px rgba(0,0,0,0.15) inset`,
                  pointerEvents: "none",
                }}
              ></div>
            </div>
          </div>
        ))}
      </div>

      {/* ===== Contact Form & Map Section ===== */}
      <div
        className="row align-items-center justify-content-center g-5"
        data-aos="fade-up"
      >
        {/* Form Section */}
        <div className="col-lg-6 col-md-10">
          <div
            className="card border-0 rounded-4 shadow-lg p-4 backdrop-blur"
            style={{
              background: "rgba(255,255,255,0.8)",
              boxShadow: "0 8px 32px rgba(31, 38, 135, 0.15)",
            }}
          >
            <h3 className="fw-bold text-primary mb-3 text-center">
              Send Us a Message
            </h3>
            <p className="text-muted text-center mb-4">
              Fill in your details and we’ll reach out as soon as possible.
            </p>

            <form>
              <div className="mb-3">
                <label className="form-label fw-semibold">Name</label>
                <input
                  type="text"
                  className="form-control form-control-lg rounded-3 shadow-sm"
                  placeholder="Enter your name"
                  data-aos="fade-right"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Email</label>
                <input
                  type="email"
                  className="form-control form-control-lg rounded-3 shadow-sm"
                  placeholder="Enter your email"
                  data-aos="fade-right"
                  data-aos-delay="100"
                />
              </div>
              <div className="mb-3">
                <label className="form-label fw-semibold">Message</label>
                <textarea
                  rows={4}
                  className="form-control form-control-lg rounded-3 shadow-sm"
                  placeholder="Type your message..."
                  data-aos="fade-right"
                  data-aos-delay="200"
                ></textarea>
              </div>

              <div className="text-center">
                <button
                  type="submit"
                  className="btn btn-primary btn-lg rounded-pill shadow px-5 mt-3"
                  data-aos="zoom-in"
                >
                  <FaPaperPlane className="me-2" />
                  Send Message
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Google Map Section */}
        <div
          className="col-lg-6 col-md-10"
          data-aos="fade-left"
          data-aos-delay="300"
        >
          <div
            className="rounded-4 shadow-lg overflow-hidden border border-3 border-primary"
            style={{ height: "420px" }}
          >
            <iframe
              title="Google Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3650.805481681589!2d75.85772541498117!3d22.71956888510486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3962fc9bfc9a8c5b%3A0x3e4b169e2d3c6e7a!2sIndore%2C%20Madhya%20Pradesh!5e0!3m2!1sen!2sin!4v1700000000000"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            ></iframe>
          </div>
        </div>
      </div>

      {/* ===== Footer Section ===== */}
      <div className="text-center mt-5 text-muted" data-aos="fade-up">
        <p>
          © {new Date().getFullYear()}{" "}
          <span className="fw-semibold text-primary">SS App</span> — All Rights
          Reserved.
        </p>
      </div>
    </div>
  );
}
