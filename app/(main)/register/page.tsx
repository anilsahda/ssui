"use client";

import { useEffect } from "react";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

export default function Register() {
  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, []);

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{
        background:
          "linear-gradient(135deg, #007bff, #6610f2, #00c6ff, #0072ff)",
        backgroundSize: "400% 400%",
        animation: "gradientMove 12s ease infinite",
        overflow: "hidden",
      }}
    >
      {/* Decorative Floating Circles */}
      <div className="position-absolute top-0 start-0 w-25 h-25 bg-white opacity-25 rounded-circle translate-middle"></div>
      <div className="position-absolute bottom-0 end-0 w-25 h-25 bg-white opacity-25 rounded-circle translate-middle"></div>

      {/* Register Card */}
      <div
        className="card shadow-lg border-0 p-4 text-center"
        data-aos="zoom-in"
        style={{
          width: "400px",
          borderRadius: "18px",
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(10px)",
          transition: "transform 0.3s ease",
        }}
      >
        <h3 className="fw-bold mb-2 text-primary" data-aos="fade-down">
          Create Account 📝
        </h3>
        <p className="text-muted mb-4" data-aos="fade-up">
          Join us and start your journey today!
        </p>

        <form data-aos="fade-up" data-aos-delay="100">
          {/* Name */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Mobile */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Mobile</label>
            <input
              type="text"
              className="form-control shadow-sm"
              placeholder="Enter your mobile number"
              required
            />
          </div>

          {/* Email */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control shadow-sm"
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3 text-start">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              placeholder="Create a password"
              required
            />
          </div>

          {/* Register Button */}
          <a
            href="/admin"
            className="btn btn-primary w-100 py-2 fw-semibold shadow-sm mt-2"
            data-aos="fade-up"
            data-aos-delay="200"
          >
            Register
          </a>
        </form>

        {/* Social Signup */}
        <div
          className="mt-4 d-flex justify-content-center gap-3"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <button
            type="button"
            className="btn btn-outline-light shadow-sm bg-white rounded-circle p-2 hover-shadow"
            title="Sign up with Google"
          >
            <FaGoogle size={20} className="text-danger" />
          </button>
          <button
            type="button"
            className="btn btn-outline-light shadow-sm bg-white rounded-circle p-2 hover-shadow"
            title="Sign up with Facebook"
          >
            <FaFacebook size={20} className="text-primary" />
          </button>
          <button
            type="button"
            className="btn btn-outline-light shadow-sm bg-white rounded-circle p-2 hover-shadow"
            title="Sign up with LinkedIn"
          >
            <FaLinkedin size={20} className="text-info" />
          </button>
        </div>

        <p className="mt-4 mb-0 small text-muted" data-aos="fade-up">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary fw-semibold text-decoration-none"
          >
            Login
          </a>
        </p>
      </div>

      {/* Keyframe animation for background */}
      <style jsx>{`
        @keyframes gradientMove {
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
        .hover-shadow:hover {
          transform: translateY(-4px);
          transition: all 0.3s ease-in-out;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15) !important;
        }
        .card:hover {
          transform: translateY(-5px);
          transition: all 0.3s ease-in-out;
          box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2) !important;
        }
      `}</style>
    </div>
  );
}
