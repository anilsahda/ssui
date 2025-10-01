"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";

export default function RegisterPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });

  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    type: "success" | "danger";
    message: string;
  } | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-out-cubic", once: true });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setAlert(null);

    try {
      const res = await fetch("https://localhost:7024/api/Users/AddUser", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        setAlert({ type: "success", message: "✅ Registration successful!" });
        setForm({ name: "", email: "", password: "", mobile: "" });
      } else {
        setAlert({
          type: "danger",
          message: `❌ ${data.message || "Registration failed"}`,
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      setAlert({
        type: "danger",
        message: "Something went wrong. Please try again later.",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-gradient">
      <div
        className="card shadow-lg border-0 p-5"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "1.5rem",
          backdropFilter: "blur(15px)",
          backgroundColor: "rgba(255, 255, 255, 0.15)",
          boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
        }}
        data-aos="fade-up"
      >
        <h2 className="text-center mb-4 text-white fw-bold">Create Account</h2>

        {alert && (
          <div className={`alert alert-${alert.type} text-center`} role="alert">
            {alert.message}
          </div>
        )}

        <form onSubmit={handleSubmit} noValidate>
          {[
            {
              id: "name",
              label: "Name",
              type: "text",
              placeholder: "Enter your name",
              autoComplete: "name",
            },
            {
              id: "email",
              label: "Email",
              type: "email",
              placeholder: "Enter your email",
              autoComplete: "email",
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "Enter your password",
              autoComplete: "new-password",
            },
            {
              id: "mobile",
              label: "Mobile",
              type: "tel",
              placeholder: "Enter your mobile number",
              autoComplete: "tel",
            },
          ].map(({ id, label, type, placeholder, autoComplete }) => (
            <div className="mb-4" key={id}>
              <label htmlFor={id} className="form-label fw-semibold text-white">
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                className="form-control rounded-pill bg-transparent border-light text-white"
                placeholder={placeholder}
                value={(form as any)[id]}
                onChange={handleChange}
                required
                autoComplete={autoComplete}
                style={{ boxShadow: "inset 0 0 8px rgba(255,255,255,0.2)" }}
              />
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-primary w-100 rounded-pill fw-semibold shadow-lg"
            disabled={loading}
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
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>

      <style jsx>{`
        .bg-gradient {
          background: linear-gradient(135deg, #1f4037, #99f2c8);
        }

        input::placeholder {
          color: rgba(255, 255, 255, 0.6);
        }

        input:focus {
          border-color: #0d6efd !important;
          box-shadow: 0 0 12px #0d6efd !important;
          background-color: rgba(255, 255, 255, 0.1) !important;
          color: white !important;
          outline: none;
        }

        button:disabled {
          opacity: 0.6;
          cursor: not-allowed;
        }
      `}</style>
    </div>
  );
}
