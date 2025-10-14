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
import AOS from "aos";
import "aos/dist/aos.css";

import API from "@/api";
import useAuthStore from "@/store/useAuthStore";

export default function Register() {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    mobile: "",
  });
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await API.post(
        "https://localhost:7024/api/UserRoles/AssignRole",
        form
      );

      if (res.data.user && res.data.token) {
        login(res.data.user, res.data.token);

        if (res.data.role === "Super Admin") router.push("/superadmin");
        else if (res.data.role === "Admin") router.push("/admin");
        else if (res.data.role === "Doctor") router.push("/doctor");
        else router.push("/student");
      } else {
        alert("Registration successful, please login manually.");
        router.push("/login");
      }
    } catch (err: any) {
      alert(err.response?.data?.error || "Registration failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="d-flex justify-content-center align-items-center vh-70"
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
          Create Account
        </h3>

        <form onSubmit={handleSubmit} autoComplete="off">
          {[
            {
              id: "name",
              label: "Full Name",
              type: "text",
              placeholder: "Enter your full name",
            },
            {
              id: "email",
              label: "Email Address",
              type: "email",
              placeholder: "example@email.com",
            },
            {
              id: "password",
              label: "Password",
              type: showPassword ? "text" : "password",
              placeholder: "Create a password",
            },
            {
              id: "mobile",
              label: "Mobile Number",
              type: "tel",
              placeholder: "+1 234 567 8900",
            },
          ].map(({ id, label, type, placeholder }, index) => (
            <div
              className="mb-3 position-relative"
              key={id}
              data-aos="fade-up"
              data-aos-delay={index * 100}
            >
              <label htmlFor={id} className="form-label fw-semibold">
                {label}
              </label>
              <input
                id={id}
                name={id}
                type={type}
                className="form-control form-control-lg"
                placeholder={placeholder}
                value={form[id as keyof typeof form]}
                onChange={handleChange}
                required
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#f8f9fa",
                  border: "none",
                  transition: "0.3s",
                }}
              />
              {id === "password" && (
                <span
                  className="position-absolute top-50 end-3 translate-middle-y text-light fs-6 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </span>
              )}
            </div>
          ))}

          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 fw-semibold shadow"
            disabled={loading}
            style={{ letterSpacing: "1px" }}
            data-aos="fade-up"
            data-aos-delay={500}
          >
            {loading ? (
              <>
                <span
                  className="spinner-border spinner-border-sm me-2"
                  role="status"
                  aria-hidden="true"
                ></span>
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <div
          className="text-center mb-0 text-muted"
          data-aos="fade-right"
          data-aos-delay={600}
        >
          Or sign up with
        </div>

        <div
          className="d-flex justify-content-center gap-3"
          data-aos="fade-left"
          data-aos-delay={700}
        >
          {[
            { icon: FaGoogle, label: "Google", color: "text-danger" },
            { icon: FaFacebook, label: "Facebook", color: "text-primary" },
            { icon: FaLinkedin, label: "LinkedIn", color: "text-info" },
          ].map(({ icon: Icon, label, color }) => (
            <button
              key={label}
              type="button"
              className="btn btn-outline-light rounded-circle shadow-sm"
              style={{
                width: "50px",
                height: "50px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
              }}
              title={`Sign up with ${label}`}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "scale(1.2)";
                e.currentTarget.style.boxShadow =
                  "0 0 12px rgba(255,255,255,0.6)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
              onClick={() => alert(`${label} signup not implemented`)}
            >
              <Icon className={`${color} fs-5`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
