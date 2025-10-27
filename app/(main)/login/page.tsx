"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

import API from "@/api";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 800, once: true, easing: "ease-in-out" });
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
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
        fontFamily: "Inter, sans-serif",
        overflow: "hidden",
      }}
    >
      {/* Animated Background Circles */}
      <div
        className="position-absolute rounded-circle bg-primary opacity-25"
        style={{ width: 300, height: 300, top: "-100px", left: "-100px" }}
        data-aos="zoom-in"
        data-aos-delay="100"
      ></div>
      <div
        className="position-absolute rounded-circle bg-warning opacity-25"
        style={{ width: 200, height: 200, bottom: "-80px", right: "-80px" }}
        data-aos="zoom-in"
        data-aos-delay="300"
      ></div>

      {/* Login Card */}
      <div
        className="card p-5 shadow-lg border-0"
        data-aos="fade-up"
        data-aos-delay="200"
        style={{
          width: "100%",
          maxWidth: "420px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          color: "#f8f9fa",
          boxShadow:
            "0 0 20px rgba(0,0,0,0.2), inset 0 0 1px rgba(255,255,255,0.3)",
          transition: "transform 0.3s ease",
        }}
      >
        <h2
          className="text-center mb-4 fw-bold text-uppercase"
          data-aos="fade-down"
        >
          Welcome Back 👋
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off">
          {/* Floating Email Input */}
          <div className="form-floating mb-3">
            <input
              id="email"
              type="email"
              className="form-control bg-transparent text-light border-light"
              placeholder="name@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoComplete="email"
              style={{
                borderRadius: "10px",
                background: "rgba(255,255,255,0.15)",
              }}
            />
            <label htmlFor="email" className="text-light">
              Email address
            </label>
          </div>

          {/* Floating Password Input */}
          <div className="form-floating mb-4">
            <input
              id="password"
              type="password"
              className="form-control bg-transparent text-light border-light"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete="current-password"
              style={{
                borderRadius: "10px",
                background: "rgba(255,255,255,0.15)",
              }}
            />
            <label htmlFor="password" className="text-light">
              Password
            </label>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 fw-semibold shadow-sm border-0"
            disabled={loading}
            style={{
              borderRadius: "10px",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 20px rgba(255,193,7,0.7)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.boxShadow = "none")}
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

        {/* Divider */}
        <div className="d-flex align-items-center my-4">
          <hr className="flex-grow-1 border-light opacity-25" />
          <span className="mx-2 text-light-50">OR</span>
          <hr className="flex-grow-1 border-light opacity-25" />
        </div>

        {/* Social Login */}
        <div
          className="text-center mb-3 fw-semibold text-light"
          data-aos="fade-up"
        >
          Login with
        </div>
        <div className="d-flex justify-content-center gap-4">
          {[
            {
              icon: FaGoogle,
              color: "#db4437",
              label: "Google",
            },
            {
              icon: FaFacebook,
              color: "#1877f2",
              label: "Facebook",
            },
            {
              icon: FaLinkedin,
              color: "#0077b5",
              label: "LinkedIn",
            },
          ].map(({ icon: Icon, color, label }) => (
            <button
              key={label}
              type="button"
              className="btn rounded-circle shadow-sm border-0"
              onClick={() => alert(`${label} login not implemented`)}
              style={{
                width: "50px",
                height: "50px",
                background: "rgba(255,255,255,0.1)",
                backdropFilter: "blur(10px)",
                transition: "all 0.3s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.background = color;
                e.currentTarget.style.transform = "scale(1.15)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.background = "rgba(255,255,255,0.1)";
                e.currentTarget.style.transform = "scale(1)";
              }}
              data-aos="zoom-in"
            >
              <Icon className="fs-4 text-white" />
            </button>
          ))}
        </div>

        {/* Footer */}
        <div
          className="text-center mt-4 small text-light opacity-75"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          © {new Date().getFullYear()} YourApp | Secure Login Portal
        </div>
      </div>
    </div>
  );
}
