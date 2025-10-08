"use client";

import React, { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaMapMarkerAlt,
  FaFacebook,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

export default function ContactPage() {
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [success, setSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate form submission
    console.log("Form submitted:", form);
    setSuccess(true);
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div>
      {/* Hero Section */}
      <section
        className="bg-primary text-white text-center py-5"
        data-aos="fade-down"
      >
        <div className="container">
          <h1 className="display-4 fw-bold">Contact Us</h1>
          <p className="lead mt-3">
            We’d love to hear from you. Get in touch with our team.
          </p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-5">
        <div className="container">
          <div className="row text-center mb-5">
            <div className="col-md-4 mb-3" data-aos="fade-up">
              <FaPhoneAlt size={30} className="text-primary mb-2" />
              <h5 className="fw-bold">Phone</h5>
              <p>+91 12345 67890</p>
            </div>
            <div
              className="col-md-4 mb-3"
              data-aos="fade-up"
              data-aos-delay={100}
            >
              <FaEnvelope size={30} className="text-primary mb-2" />
              <h5 className="fw-bold">Email</h5>
              <p>support@ssjobportal.com</p>
            </div>
            <div
              className="col-md-4 mb-3"
              data-aos="fade-up"
              data-aos-delay={200}
            >
              <FaMapMarkerAlt size={30} className="text-primary mb-2" />
              <h5 className="fw-bold">Location</h5>
              <p>Mandsaur, Madhya Pradesh, India</p>
            </div>
          </div>

          {/* Contact Form */}
          <div className="row justify-content-center">
            <div className="col-md-8">
              <h2 className="text-center fw-bold mb-4" data-aos="fade-up">
                Send Us a Message
              </h2>
              {success && (
                <div
                  className="alert alert-success"
                  role="alert"
                  data-aos="fade-down"
                >
                  Your message has been sent successfully!
                </div>
              )}
              <form onSubmit={handleSubmit} data-aos="fade-up">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Your Name"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="email"
                    className="form-control"
                    placeholder="Your Email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Subject"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    placeholder="Your Message"
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    required
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="btn btn-primary btn-lg rounded-pill px-4"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
          </div>

          {/* Social Links */}
          <div className="row mt-5">
            <div className="col text-center" data-aos="fade-up">
              <h5 className="fw-bold mb-3">Follow Us</h5>
              <a
                href="#"
                className="btn btn-outline-primary btn-sm rounded-circle me-2"
              >
                <FaFacebook />
              </a>
              <a
                href="#"
                className="btn btn-outline-primary btn-sm rounded-circle me-2"
              >
                <FaTwitter />
              </a>
              <a
                href="#"
                className="btn btn-outline-primary btn-sm rounded-circle"
              >
                <FaLinkedin />
              </a>
            </div>
          </div>
        </div>
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
