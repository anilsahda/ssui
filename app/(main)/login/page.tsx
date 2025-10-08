"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import API from "@/api";
import useAuthStore from "@/store/useAuthStore";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await API.post("/auths/login", { email, password });
      login(res.data.user, res.data.token);

      // Role-based redirect
      switch (res.data.role) {
        case "Super Admin":
          router.push("/superadmin");
          break;
        case "Admin":
          router.push("/admin");
          break;
        case "Company":
          router.push("/company");
          break;
        case "Job Seeker":
          router.push("/jobseeker");
          break;
        default:
          router.push("/student");
      }
    } catch (err: any) {
      setErrorMsg(
        err.response?.data?.error || "Login failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-gradient"
      style={{ background: "linear-gradient(135deg,#667eea,#764ba2)" }}
    >
      <div
        className="card shadow-lg p-4"
        style={{ width: "360px", borderRadius: "16px" }}
        data-aos="zoom-in"
      >
        <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back!</h3>
        <p className="text-center text-muted mb-4" data-aos="fade-up">
          Sign in to access your account
        </p>

        {errorMsg && (
          <div className="alert alert-danger text-center" data-aos="fade-down">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSubmit} data-aos="fade-up" data-aos-delay="100">
          <div className="form-floating mb-3">
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <label htmlFor="email">Email</label>
          </div>
          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <label htmlFor="password">Password</label>
          </div>

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3 shadow-sm"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div
          className="text-center mb-3"
          data-aos="fade-up"
          data-aos-delay="200"
        >
          <span className="text-muted">Or login with</span>
        </div>
        <div
          className="d-flex justify-content-center gap-3 mb-3"
          data-aos="fade-up"
          data-aos-delay="300"
        >
          <button
            type="button"
            className="btn btn-outline-light rounded-circle shadow-sm p-2"
            title="Login with Google"
          >
            <FaGoogle className="text-danger" size={20} />
          </button>
          <button
            type="button"
            className="btn btn-outline-light rounded-circle shadow-sm p-2"
            title="Login with Facebook"
          >
            <FaFacebook className="text-primary" size={20} />
          </button>
          <button
            type="button"
            className="btn btn-outline-light rounded-circle shadow-sm p-2"
            title="Login with LinkedIn"
          >
            <FaLinkedin className="text-info" size={20} />
          </button>
        </div>

        <div className="text-center" data-aos="fade-up" data-aos-delay="400">
          <p className="mb-0">
            Don't have an account?{" "}
            <a href="/register" className="text-primary fw-bold">
              Register
            </a>
          </p>
          <p>
            <a href="/forgot-password" className="text-secondary small">
              Forgot Password?
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
