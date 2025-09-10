"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

import API from "@/api";
import useAuthStore from "@/store/useAuthStore";

export default function Login() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await API.post("/auths/login", { email, password });

      // Save user + token in persistent Zustand
      login(res.data.user, res.data.token);

      // Redirect based on role
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
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Login</h3>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password */}
          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {/* Login Button */}
          <button type="submit" className="btn btn-primary w-100 mb-3" disabled={loading}>
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center mb-3">
          <hr className="flex-grow-1" />
          <span className="px-2 text-muted">or</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Social Login */}
        <div className="d-flex justify-content-center gap-3">
          <button type="button" className="btn btn-outline-secondary rounded-circle">
            <FaGoogle className="text-danger" />
          </button>
          <button type="button" className="btn btn-outline-secondary rounded-circle">
            <FaFacebook className="text-primary" />
          </button>
          <button type="button" className="btn btn-outline-secondary rounded-circle">
            <FaLinkedin className="text-info" />
          </button>
        </div>
      </div>
    </div>
  );
}
