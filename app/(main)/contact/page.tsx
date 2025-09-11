"use client";

import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

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

      setSuccess("Thank you! Your message has been sent.");
      setFormData({ name: "", email: "", message: "" });
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="bg-white shadow-sm rounded p-5">
            <h1 className="text-primary fw-bold mb-4 text-center">
              Contact Dhakad Infotech
            </h1>
            <p className="text-muted text-center mb-5">
              We'd love to hear from you! Fill out the form below or reach us
              directly.
            </p>

            {/* Contact Info */}
            <div className="row text-center mb-4">
              <div className="col-md-4">
                <FaEnvelope className="text-primary mb-2" size={20} />
                <h6>Email</h6>
                <p className="text-muted">support@dhakadinfotech.com</p>
              </div>
              <div className="col-md-4">
                <FaPhone className="text-success mb-2" size={20} />
                <h6>Phone</h6>
                <p className="text-muted">+91 98765 43210</p>
              </div>
              <div className="col-md-4">
                <FaMapMarkerAlt className="text-danger mb-2" size={20} />
                <h6>Location</h6>
                <p className="text-muted">Indore, India</p>
              </div>
            </div>

            {/* Contact Form */}
            <form onSubmit={handleSubmit}>
              {success && <div className="alert alert-success">{success}</div>}
              {error && <div className="alert alert-danger">{error}</div>}

              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Your Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Enter your name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="mb-3">
                <label htmlFor="message" className="form-label">
                  Your Message
                </label>
                <textarea
                  className="form-control"
                  id="message"
                  rows={4}
                  placeholder="Write your message here"
                  value={formData.message}
                  onChange={handleChange}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="btn btn-primary w-100"
                disabled={submitting}
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
