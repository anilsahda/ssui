"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();
  const loginUrl = "https://localhost:7024/api/Auths/login";

  useEffect(() => {
    document.getElementById("email")?.focus();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      setError("Please enter both email and password.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const res = await fetch(loginUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Invalid login credentials");
      }

      const data = await res.json();
      const { token, user, role } = data;

      // Save token and user info securely
      localStorage.setItem("token", token);
      localStorage.setItem("role", role?.name || role);
      localStorage.setItem("user", JSON.stringify(user));

      // Role-based navigation
      const roleName = role?.name || role;
      if (roleName === "Super Admin") {
        router.push("/superadmin");
      } else if (roleName === "Admin") {
        router.push("/admin");
      } else if (roleName === "Customer") {
        router.push("/customer");
      } else {
        router.push("/"); // fallback
      }
    } catch (err: any) {
      console.error("Login failed:", err);
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !loading) {
      handleSubmit(e as unknown as React.FormEvent);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-100 bg-light"
      onKeyDown={handleKeyDown}
    >
      <div
        className="card shadow-lg border-0 p-4"
        style={{ width: "28rem", borderRadius: "1rem", background: "white" }}
      >
        {/* Header */}
        <div className="text-center mb-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="Login"
            width="60"
            className="mb-2"
          />
          <h3 className="fw-bold">Login</h3>
          <p className="text-muted">Enter your credentials to continue</p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger text-center py-2" role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold">
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control rounded-pill"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
            />
          </div>

          <div className="mb-3 position-relative">
            <label htmlFor="password" className="form-label fw-semibold">
              Password
            </label>
            <div className="input-group">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control rounded-start-pill"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <button
                type="button"
                className="btn btn-outline-secondary rounded-end-pill"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 rounded-pill fw-semibold"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-4">
          <hr className="flex-grow-1" />
          <span className="px-2 text-muted small">OR</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Social Login */}
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-danger" title="Login with Google">
            <FaGoogle />
          </button>
          <button
            className="btn btn-outline-primary"
            title="Login with Facebook"
          >
            <FaFacebook />
          </button>
          <button className="btn btn-outline-info" title="Login with Twitter">
            <FaTwitter />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-4 mb-0 text-muted">
          Don’t have an account?{" "}
          <a href="/signup" className="text-decoration-none fw-semibold">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}
