"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";

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

  useEffect(() => {
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
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
        alert("Registration successful! Please login.");
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
      className="d-flex justify-content-center align-items-center vh-100 position-relative overflow-hidden"
      style={{
        background:
          "linear-gradient(135deg, #0f172a 0%, #1e3a8a 50%, #0f172a 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {/* Background Animated Circles */}
      <div
        className="position-absolute rounded-circle bg-primary opacity-25"
        style={{ width: 280, height: 280, top: "-80px", left: "-80px" }}
        data-aos="zoom-in"
      ></div>
      <div
        className="position-absolute rounded-circle bg-warning opacity-25"
        style={{ width: 220, height: 220, bottom: "-80px", right: "-80px" }}
        data-aos="zoom-in"
        data-aos-delay="300"
      ></div>

      {/* Registration Card */}
      <div
        className="card p-3 shadow-lg border-0 text-light"
        data-aos="fade-up"
        data-aos-delay="200"
        style={{
          width: "100%",
          maxWidth: "450px",
          borderRadius: "20px",
          background: "rgba(255, 255, 255, 0.1)",
          backdropFilter: "blur(20px)",
          boxShadow:
            "0 0 25px rgba(0,0,0,0.25), inset 0 0 1px rgba(255,255,255,0.4)",
        }}
      >
        <h2
          className="text-center mb-1 fw-bold text-uppercase"
          data-aos="fade-down"
        >
          Create Account ✨
        </h2>

        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          {/* Floating Inputs */}
          {[
            {
              id: "name",
              label: "Full Name",
              type: "text",
              placeholder: "John Doe",
              autoComplete: "name",
            },
            {
              id: "email",
              label: "Email Address",
              type: "email",
              placeholder: "example@mail.com",
              autoComplete: "email",
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "Create a strong password",
              autoComplete: "new-password",
            },
            {
              id: "mobile",
              label: "Mobile Number",
              type: "tel",
              placeholder: "+91 98765 43210",
              autoComplete: "tel",
            },
          ].map(({ id, label, type, placeholder, autoComplete }, index) => (
            <div
              className="form-floating mb-3"
              key={id}
              data-aos="fade-right"
              data-aos-delay={100 * (index + 1)}
            >
              <input
                id={id}
                name={id}
                type={type}
                className="form-control bg-transparent text-light border-light"
                placeholder={placeholder}
                value={form[id as keyof typeof form]}
                onChange={handleChange}
                required
                autoComplete={autoComplete}
                style={{
                  borderRadius: "10px",
                  background: "rgba(255,255,255,0.15)",
                }}
              />
              <label htmlFor={id} className="text-light">
                {label}
              </label>
            </div>
          ))}

          {/* Submit Button */}
          <button
            type="submit"
            className="btn btn-warning btn-lg w-100 fw-semibold border-0 shadow-sm"
            disabled={loading}
            style={{
              borderRadius: "10px",
              letterSpacing: "1px",
              transition: "all 0.3s ease",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.boxShadow = "0 0 20px rgba(255,193,7,0.8)")
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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        {/* Divider */}
        <div className="d-flex align-items-center my-4">
          <hr className="flex-grow-1 border-light opacity-25" />
          <span className="mx-2 text-light-50">OR</span>
          <hr className="flex-grow-1 border-light opacity-25" />
        </div>

        {/* Social Signup */}
        <div
          className="text-center mb-3 fw-semibold text-light"
          data-aos="fade-up"
        >
          Sign up with
        </div>
        <div className="d-flex justify-content-center gap-4">
          {[
            { icon: FaGoogle, color: "#db4437", label: "Google" },
            { icon: FaFacebook, color: "#1877f2", label: "Facebook" },
            { icon: FaLinkedin, color: "#0077b5", label: "LinkedIn" },
          ].map(({ icon: Icon, color, label }) => (
            <button
              key={label}
              type="button"
              className="btn rounded-circle shadow-sm border-0"
              onClick={() => alert(`${label} signup not implemented`)}
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
          Already have an account?{" "}
          <a
            href="/login"
            className="text-warning fw-semibold text-decoration-none"
          >
            Login
          </a>
        </div>
      </div>
    </div>
  );
}
