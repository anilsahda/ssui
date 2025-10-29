"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  FaGoogle,
  FaFacebook,
  FaLinkedin,
  FaEye,
  FaEyeSlash,
} from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";

import API from "@/api";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true, easing: "ease-in-out" });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auths/login", { email, password });
      login(res.data.user, res.data.token);

      // Role-based navigation
      switch (res.data.role) {
        case "Super Admin":
          router.push("/superadmin");
          break;
        case "Admin":
          router.push("/admin");
          break;
        case "Doctor":
          router.push("/doctor");
          break;
        default:
          router.push("/student");
      }
    } catch (err: any) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background: "linear-gradient(135deg, #1e3a8a, #2563eb, #3b82f6)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Glassmorphism Card */}
      <div
        className="card shadow-lg p-4"
        data-aos="zoom-in"
        style={{
          width: "380px",
          borderRadius: "20px",
          backdropFilter: "blur(12px)",
          background: "rgba(255, 255, 255, 0.15)",
          border: "1px solid rgba(255, 255, 255, 0.2)",
          color: "#fff",
        }}
      >
        <h2 className="text-center fw-bold mb-3" data-aos="fade-down">
          Welcome Back 👋
        </h2>
        <p className="text-center text-light mb-4" data-aos="fade-up">
          Sign in to continue your journey
        </p>

        {/* Login Form */}
        <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control shadow-sm border-0 py-2"
              style={{ borderRadius: "10px" }}
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3 position-relative">
            <label className="form-label fw-semibold">Password</label>
            <input
              type={showPass ? "text" : "password"}
              className="form-control shadow-sm border-0 py-2"
              style={{ borderRadius: "10px" }}
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <span
              onClick={() => setShowPass(!showPass)}
              className="position-absolute top-50 end-0 translate-middle-y me-3 text-muted"
              style={{ cursor: "pointer" }}
            >
              {showPass ? <FaEyeSlash /> : <FaEye />}
            </span>
          </div>

          <div className="d-flex justify-content-between align-items-center mb-3">
            <div>
              <input
                type="checkbox"
                id="remember"
                className="form-check-input me-2"
              />
              <label htmlFor="remember" className="form-check-label small">
                Remember me
              </label>
            </div>
            <a href="#" className="text-warning small text-decoration-none">
              Forgot Password?
            </a>
          </div>

          <button
            type="submit"
            className="btn btn-warning w-100 fw-semibold py-2 shadow-sm"
            disabled={loading}
            style={{ borderRadius: "10px" }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="text-center my-3 text-light">
          <hr className="border-light opacity-25" />
          <span className="bg-transparent px-2 small">OR</span>
          <hr className="border-light opacity-25" />
        </div>

        {/* Social Logins */}
        <div
          className="d-flex justify-content-center gap-3"
          data-aos="fade-up"
          data-aos-delay="150"
        >
          <button
            type="button"
            className="btn btn-outline-light rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{ transition: "0.3s" }}
          >
            <FaGoogle size={20} className="text-danger" />
          </button>
          <button
            type="button"
            className="btn btn-outline-light rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{ transition: "0.3s" }}
          >
            <FaFacebook size={20} className="text-primary" />
          </button>
          <button
            type="button"
            className="btn btn-outline-light rounded-circle p-3 d-flex align-items-center justify-content-center shadow-sm"
            style={{ transition: "0.3s" }}
          >
            <FaLinkedin size={20} className="text-info" />
          </button>
        </div>

        <p className="text-center text-light mt-4 mb-0 small">
          Don’t have an account?{" "}
          <a
            href="/register"
            className="text-warning fw-semibold text-decoration-none"
          >
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
