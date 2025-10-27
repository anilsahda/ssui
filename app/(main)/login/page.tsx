"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import { FiLock, FiMail } from "react-icons/fi";
import API from "@/api";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 900, once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auths/login", { email, password });
      login(res.data.user, res.data.token);

      if (res.data.role === "Super Admin") router.push("/superadmin");
      else if (res.data.role === "Admin") router.push("/admin");
      else if (res.data.role === "Company") router.push("/company");
      else if (res.data.role === "Job Seeker") router.push("/jobseeker");
      else router.push("/student");
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="vh-100 d-flex justify-content-center align-items-center position-relative"
      style={{
        background: "linear-gradient(135deg, #007bff, #6610f2)",
        overflow: "hidden",
      }}
    >
      {/* Decorative Glowing Circles */}
      <div className="position-absolute top-0 start-0 w-25 h-25 bg-white opacity-25 rounded-circle translate-middle"></div>
      <div className="position-absolute bottom-0 end-0 w-25 h-25 bg-white opacity-25 rounded-circle translate-middle"></div>

      {/* Login Card */}
      <div
        className="card shadow-lg border-0 p-4 text-center"
        data-aos="zoom-in"
        style={{
          width: "390px",
          borderRadius: "18px",
          background: "rgba(255, 255, 255, 0.92)",
          backdropFilter: "blur(10px)",
          transition: "transform 0.3s ease",
        }}
      >
        <h3 className="fw-bold mb-2 text-primary" data-aos="fade-down">
          Welcome Back 👋
        </h3>
        <p className="text-muted mb-4" data-aos="fade-up">
          Sign in to continue to your dashboard
        </p>

        <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
          {/* Email */}
          <div className="mb-3 text-start position-relative">
            <label className="form-label fw-semibold">
              <FiMail className="me-2 text-primary" /> Email
            </label>
            <input
              type="email"
              className="form-control shadow-sm"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{ paddingLeft: "40px" }}
            />
            <FiMail
              className="position-absolute text-primary"
              style={{
                left: "12px",
                top: "57%",
                transform: "translateY(-50%)",
                opacity: 0.6,
              }}
            />
          </div>

          {/* Password */}
          <div className="mb-3 text-start position-relative">
            <label className="form-label fw-semibold">
              <FiLock className="me-2 text-primary" /> Password
            </label>
            <input
              type={showPassword ? "text" : "password"}
              className="form-control shadow-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{ paddingLeft: "40px", paddingRight: "40px" }}
            />
            <FiLock
              className="position-absolute text-primary"
              style={{
                left: "12px",
                top: "57%",
                transform: "translateY(-50%)",
                opacity: 0.6,
              }}
            />
            <button
              type="button"
              className="btn position-absolute border-0 bg-transparent"
              onClick={() => setShowPassword(!showPassword)}
              style={{
                right: "8px",
                top: "57%",
                transform: "translateY(-50%)",
              }}
            >
              {showPassword ? (
                <FaEyeSlash className="text-secondary" />
              ) : (
                <FaEye className="text-secondary" />
              )}
            </button>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-primary w-100 py-2 fw-semibold shadow-sm mt-2"
            disabled={loading}
            data-aos="fade-up"
            data-aos-delay="150"
            style={{
              transition: "all 0.3s ease",
              boxShadow: loading
                ? "inset 0 0 5px rgba(0,0,0,0.2)"
                : "0 4px 10px rgba(0, 123, 255, 0.3)",
            }}
          >
            {loading ? (
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
            ) : null}
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Social Logins */}
        <div
          className="mt-4 d-flex justify-content-center gap-3"
          data-aos="fade-up"
          data-aos-delay="250"
        >
          <button
            type="button"
            className="btn btn-outline-light shadow-sm bg-white rounded-circle p-2 hover-shadow"
            title="Login with Google"
          >
            <FaGoogle size={20} className="text-danger" />
          </button>
          <button
            type="button"
            className="btn btn-outline-light shadow-sm bg-white rounded-circle p-2 hover-shadow"
            title="Login with Facebook"
          >
            <FaFacebook size={20} className="text-primary" />
          </button>
          <button
            type="button"
            className="btn btn-outline-light shadow-sm bg-white rounded-circle p-2 hover-shadow"
            title="Login with LinkedIn"
          >
            <FaLinkedin size={20} className="text-info" />
          </button>
        </div>

        <p className="mt-4 mb-0 small text-muted" data-aos="fade-up">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-primary fw-semibold text-decoration-none"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
