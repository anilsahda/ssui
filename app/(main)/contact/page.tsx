"use client";

import React, { useState, useEffect } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(null);
    setError(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: { "Content-Type": "application/json" },
      });

      if (!res.ok) throw new Error("Something went wrong. Please try again.");

      setSuccess("✅ Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div
      className="py-5 px-3 min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        background: "linear-gradient(135deg, #1f1c2c, #928dab)",
      }}
    >
      <style>
        {`
          .contact-card {
            background: rgba(255, 255, 255, 0.1);
            border-radius: 20px;
            backdrop-filter: blur(15px);
            -webkit-backdrop-filter: blur(15px);
            box-shadow: 0 12px 30px rgba(0, 0, 0, 0.25);
            transition: transform 0.3s ease;
          }

          .contact-card:hover {
            transform: scale(1.01);
          }

          .form-control {
            background-color: rgba(255, 255, 255, 0.8);
            border-radius: 10px;
            border: none;
          }

          .form-control:focus {
            box-shadow: 0 0 0 4px rgba(0, 123, 255, 0.2);
          }

          .contact-icon {
            font-size: 1.8rem;
            margin-bottom: 0.5rem;
            padding: 10px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.1);
          }

          .btn-animated {
            transition: all 0.3s ease;
          }

          .btn-animated:hover {
            transform: translateY(-3px);
            box-shadow: 0 10px 20px rgba(0, 123, 255, 0.3);
          }

          .glass-border {
            border: 1px solid rgba(255, 255, 255, 0.3);
          }

          .animated-label {
            font-weight: 500;
          }
        `}
      </style>

      <div className="container">
        <div className="row justify-content-center">
          <div
            className="col-lg-9 contact-card glass-border p-5 text-white"
            data-aos="zoom-in"
          >
            {/* Title */}
            <h1
              className="fw-bold mb-3 text-center"
              data-aos="fade-up"
              data-aos-delay="100"
            >
              Contact <span className="text-info">Dhakad Infotech</span>
            </h1>
            <p
              className="text-light text-center mb-5 fs-5"
              data-aos="fade-up"
              data-aos-delay="200"
            >
              Let's connect and build something amazing. We'd love to hear from
              you!
            </p>

            {/* Contact Info */}
            <div
              className="row text-center mb-4"
              data-aos="fade-up"
              data-aos-delay="300"
            >
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="contact-icon text-info">
                  <FaEnvelope />
                </div>
                <h6 className="mt-2">Email</h6>
                <p className="text-light small">support@dhakadinfotech.com</p>
              </div>
              <div className="col-md-4 mb-3 mb-md-0">
                <div className="contact-icon text-success">
                  <FaPhone />
                </div>
                <h6 className="mt-2">Phone</h6>
                <p className="text-light small">+91 98765 43210</p>
              </div>
              <div className="col-md-4">
                <div className="contact-icon text-danger">
                  <FaMapMarkerAlt />
                </div>
                <h6 className="mt-2">Location</h6>
                <p className="text-light small">Indore, India</p>
              </div>
            </div>

            {/* Contact Form */}
            <form
              onSubmit={handleSubmit}
              data-aos="fade-up"
              data-aos-delay="400"
            >
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3" data-aos="fade-right" data-aos-delay="500">
                <label htmlFor="name" className="form-label animated-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3" data-aos="fade-left" data-aos-delay="600">
                <label htmlFor="email" className="form-label animated-label">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-4" data-aos="fade-right" data-aos-delay="700">
                <label htmlFor="message" className="form-label animated-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows={4}
                  placeholder="Let's build something together!"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-info btn-lg w-100 btn-animated"
                disabled={submitting}
                data-aos="fade-up"
                data-aos-delay="800"
              >
                {submitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
