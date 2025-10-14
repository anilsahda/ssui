"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

import API from "@/api";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post("/auths/login", { email, password });
      login(res.data.user, res.data.token);

      if (res.data.role === "Super Admin") router.push("/superadmin");
      else if (res.data.role === "Admin") router.push("/admin");
      else if (res.data.role === "Doctor") router.push("/doctor");
      else router.push("/student");
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
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #0f172a 70%, #1e3a8a 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        className="card p-5 shadow-lg"
        data-aos="zoom-in"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          color: "#f8f9fa",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.18)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold" data-aos="fade-down">
          Welcome Back
        </h3>

        <form onSubmit={handleSubmit} autoComplete="off" data-aos="fade-up">
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email address
            </label>
            <input
              id="email"
              type="email"
              className="form-control form-control-lg"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#f8f9fa",
                border: "none",
              }}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <input
              id="password"
              type="password"
              className="form-control form-control-lg"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                background: "rgba(255,255,255,0.15)",
                color: "#f8f9fa",
                border: "none",
              }}
            />
          </div>

          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 fw-semibold shadow"
            disabled={loading}
            style={{ letterSpacing: "1px" }}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Logging in...
              </>
            ) : (
              "Login"
            )}
          </button>
        </form>

        <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <div
          className="text-center mb-3 text-muted"
          data-aos="fade-right"
          data-aos-delay="100"
        >
          Or login with
        </div>

        <div
          className="d-flex justify-content-center gap-3"
          data-aos="fade-left"
          data-aos-delay="200"
        >
          {[
            {
              icon: FaGoogle,
              label: "Google",
              color: "text-danger",
              onClick: () => alert("Google login not implemented"),
            },
            {
              icon: FaFacebook,
              label: "Facebook",
              color: "text-primary",
              onClick: () => alert("Facebook login not implemented"),
            },
            {
              icon: FaLinkedin,
              label: "LinkedIn",
              color: "text-info",
              onClick: () => alert("LinkedIn login not implemented"),
            },
          ].map(({ icon: Icon, label, color, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="btn btn-outline-light rounded-circle shadow-sm"
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              title={`Login with ${label}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2)";
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(255,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              <Icon className={`${color} fs-5`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
