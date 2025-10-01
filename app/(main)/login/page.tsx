"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { FaFacebook, FaGoogle, FaTwitter } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";

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
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true });
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

      localStorage.setItem("token", token);
      localStorage.setItem("role", role?.name || role);
      localStorage.setItem("user", JSON.stringify(user));

      const roleName = role?.name || role;
      if (roleName === "Super Admin") {
        router.push("/superadmin");
      } else if (roleName === "Admin") {
        router.push("/admin");
      } else if (roleName === "Customer") {
        router.push("/customer");
      } else {
        router.push("/");
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
      className="d-flex justify-content-center align-items-center vh-100 bg-gradient"
      onKeyDown={handleKeyDown}
    >
      <div
        className="card shadow-lg border-0 p-5"
        style={{
          width: "28rem",
          borderRadius: "1.25rem",
          backdropFilter: "blur(12px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.18)",
        }}
        data-aos="fade-up"
      >
        {/* Header */}
        <div className="text-center mb-4">
          <img
            src="http://cdn-icons-png.flaticon.com/512/295/295128.png"
            alt="Login"
            width="60"
            className="mb-3"
            style={{ filter: "drop-shadow(0 0 3px rgba(0,0,0,0.2))" }}
          />
          <h3 className="fw-bold text-white">Welcome Back</h3>
          <p className="text-white-50">Enter your credentials to continue</p>
        </div>

        {/* Error */}
        {error && (
          <div className="alert alert-danger text-center py-2" role="alert">
            {error}
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="email"
              className="form-label fw-semibold text-white"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              className="form-control rounded-pill bg-transparent text-white border-light"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              aria-required="true"
              style={{ boxShadow: "inset 0 0 6px rgba(255,255,255,0.2)" }}
            />
          </div>

          <div className="mb-4 position-relative">
            <label
              htmlFor="password"
              className="form-label fw-semibold text-white"
            >
              Password
            </label>
            <div className="input-group shadow-sm">
              <input
                type={showPassword ? "text" : "password"}
                id="password"
                className="form-control rounded-start-pill bg-transparent text-white border-light"
                placeholder="Enter password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ boxShadow: "inset 0 0 6px rgba(255,255,255,0.2)" }}
              />
              <button
                type="button"
                className="btn btn-outline-light rounded-end-pill fw-semibold"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? "Hide password" : "Show password"}
                title={showPassword ? "Hide password" : "Show password"}
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-100 rounded-pill fw-semibold shadow-lg"
            style={{
              boxShadow:
                "0 0 20px rgba(13, 110, 253, 0.7), inset 0 0 10px rgba(13, 110, 253, 0.6)",
              transition: "transform 0.3s ease",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1.05)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLButtonElement).style.transform =
                "scale(1)";
            }}
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-4 text-white-50">
          <hr className="flex-grow-1" />
          <span className="px-3 small">OR</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Social Login */}
        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-outline-danger rounded-circle p-3 shadow-sm social-btn"
            title="Login with Google"
            aria-label="Login with Google"
          >
            <FaGoogle size={22} />
          </button>
          <button
            className="btn btn-outline-primary rounded-circle p-3 shadow-sm social-btn"
            title="Login with Facebook"
            aria-label="Login with Facebook"
          >
            <FaFacebook size={22} />
          </button>
          <button
            className="btn btn-outline-info rounded-circle p-3 shadow-sm social-btn"
            title="Login with Twitter"
            aria-label="Login with Twitter"
          >
            <FaTwitter size={22} />
          </button>
        </div>

        {/* Footer */}
        <p className="text-center mt-4 mb-0 text-white-50">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-decoration-none fw-semibold text-white"
          >
            Sign up
          </a>
        </p>

        <style jsx>{`
          .bg-gradient {
            background: linear-gradient(135deg, #1f4037, #99f2c8);
          }

          input::placeholder {
            color: rgba(255, 255, 255, 0.6);
          }

          input:focus {
            border-color: #0d6efd !important;
            box-shadow: 0 0 8px #0d6efd !important;
            background-color: rgba(255, 255, 255, 0.1) !important;
            color: white !important;
          }

          .social-btn:hover {
            transform: scale(1.15);
            box-shadow: 0 0 15px rgba(255, 255, 255, 0.8);
            transition: all 0.3s ease;
          }

          .social-btn:focus {
            outline: none;
            box-shadow: 0 0 12px rgba(255, 255, 255, 0.9);
          }

          button:disabled {
            opacity: 0.6;
            cursor: not-allowed;
          }
        `}</style>
      </div>
    </div>
  );
}
