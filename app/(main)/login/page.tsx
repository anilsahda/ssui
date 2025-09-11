"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

interface LoginResponse {
  token?: string;
  role?: string;
  message?: string;
}

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("https://localhost:7024/api/Auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      const data: LoginResponse = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Login failed");
      }

      // Save token to localStorage or cookie
      if (data.token) {
        localStorage.setItem("token", data.token);
      }

      // Redirect dynamically based on role
      if (data.role === "Super Admin") {
        router.push("/superadmin");
      } else if (data.role === "Admin") {
        router.push("/admin");
      } else {
        router.push("/");
      }
    } catch (error: any) {
      setErrorMsg(error.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100"
      style={{ background: "#eef2f7" }}
    >
      <div
        className="card shadow p-4"
        style={{ width: "360px", borderRadius: "16px" }}
      >
        <h3 className="text-center mb-4 fw-bold text-primary">Welcome Back</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label fw-semibold">Email</label>
            <input
              type="email"
              className="form-control"
              placeholder="example@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label fw-semibold">Password</label>
            <input
              type="password"
              className="form-control"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {errorMsg && (
            <div className="alert alert-danger text-center py-2">
              {errorMsg}
            </div>
          )}

          <button
            type="submit"
            className="btn btn-primary w-100 mb-3"
            disabled={loading}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        <div className="d-flex align-items-center mb-3">
          <hr className="flex-grow-1" />
          <span className="px-2 text-muted small">or continue with</span>
          <hr className="flex-grow-1" />
        </div>

        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-danger rounded-circle shadow-sm p-2">
            <FaGoogle size={18} />
          </button>
          <button className="btn btn-outline-primary rounded-circle shadow-sm p-2">
            <FaFacebook size={18} />
          </button>
          <button className="btn btn-outline-info rounded-circle shadow-sm p-2">
            <FaLinkedin size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
