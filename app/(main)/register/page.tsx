"use client";

import { useEffect, useState } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import Swal from "sweetalert2";
import {
  FaUser,
  FaEnvelope,
  FaLock,
  FaPhoneAlt,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";

// ✅ API Setup using Axios
const API = axios.create({
  baseURL: "https://localhost:7115/api", // 🔹 Change to your API base URL
});

export default function Register() {
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
    import("bootstrap/dist/js/bootstrap.bundle.min.js");
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await API.post("/users/register", formData);
      Swal.fire({
        title: "🎉 Success!",
        text: res.data?.message || "User registered successfully.",
        icon: "success",
        confirmButtonColor: "#0d6efd",
      });
      setFormData({ name: "", mobile: "", email: "", password: "" });
    } catch (err: any) {
      Swal.fire({
        title: "❌ Error!",
        text: err.response?.data?.message || "Something went wrong!",
        icon: "error",
        confirmButtonColor: "#dc3545",
      });
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2, #6f42c1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        className="card shadow-lg p-4 p-md-5 border-0"
        data-aos="zoom-in"
        style={{
          width: "400px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.95)",
          backdropFilter: "blur(10px)",
        }}
      >
        <h2
          className="text-center fw-bold mb-4"
          style={{ color: "#0d6efd", letterSpacing: "0.5px" }}
        >
          Create Account
        </h2>

        <form onSubmit={handleRegister}>
          {/* Name */}
          <div className="mb-3 position-relative" data-aos="fade-right">
            <label className="form-label fw-semibold">Full Name</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaUser className="text-primary" />
              </span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control border-start-0 rounded-end"
                placeholder="Enter your full name"
                required
              />
            </div>
          </div>

          {/* Mobile */}
          <div className="mb-3 position-relative" data-aos="fade-left">
            <label className="form-label fw-semibold">Mobile</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaPhoneAlt className="text-primary" />
              </span>
              <input
                type="text"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="form-control border-start-0 rounded-end"
                placeholder="Enter mobile number"
                required
              />
            </div>
          </div>

          {/* Email */}
          <div className="mb-3 position-relative" data-aos="fade-right">
            <label className="form-label fw-semibold">Email</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaEnvelope className="text-primary" />
              </span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="form-control border-start-0 rounded-end"
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          {/* Password */}
          <div className="mb-4 position-relative" data-aos="fade-left">
            <label className="form-label fw-semibold">Password</label>
            <div className="input-group">
              <span className="input-group-text bg-white border-end-0">
                <FaLock className="text-primary" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="form-control border-start-0 rounded-end"
                placeholder="Enter your password"
                required
              />
              <span
                className="input-group-text bg-white border-start-0"
                style={{ cursor: "pointer" }}
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <FaEyeSlash className="text-secondary" />
                ) : (
                  <FaEye className="text-secondary" />
                )}
              </span>
            </div>
          </div>

          {/* Register Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold rounded-pill shadow-sm"
            data-aos="zoom-in"
          >
            Register Now
          </button>
        </form>

        {/* Login Redirect */}
        <p className="text-center mt-3 mb-0 text-muted">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-primary fw-semibold text-decoration-none"
          >
            Login here
          </a>
        </p>
      </div>

      <style jsx>{`
        .form-control:focus {
          border-color: #0d6efd;
          box-shadow: 0 0 0 0.2rem rgba(13, 110, 253, 0.2);
        }
        .input-group-text {
          transition: all 0.3s ease;
        }
        .input-group:focus-within .input-group-text {
          background-color: #e7f1ff;
        }
        button.btn:hover {
          transform: translateY(-2px);
          transition: 0.3s ease;
          box-shadow: 0 5px 15px rgba(13, 110, 253, 0.3);
        }
      `}</style>
    </div>
  );
}
