"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Assuming your API endpoint for registration is /auths/register
      const res = await API.post(
        "https://localhost:7024/api/UserRoles/AssignRole",
        form
      );

      if (res.data.user && res.data.token) {
        login(res.data.user, res.data.token);

        // Redirect based on role or to default page after registration
        if (res.data.role === "Super Admin") router.push("/superadmin");
        else if (res.data.role === "Admin") router.push("/admin");
        else if (res.data.role === "Doctor") router.push("/doctor");
        else router.push("/student");
      } else {
        alert(
          "Registration successful, but login info missing. Please login manually."
        );
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
      className="d-flex justify-content-center align-items-center vh-100"
      style={{
        background:
          "linear-gradient(135deg, #1e3a8a 0%, #0f172a 70%, #1e3a8a 100%)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div
        className="card p-4 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "400px",
          borderRadius: "16px",
          background: "rgba(255, 255, 255, 0.12)",
          backdropFilter: "blur(12px)",
          color: "#f8f9fa",
          boxShadow:
            "0 8px 32px 0 rgba(31, 38, 135, 0.37), 0 0 0 1px rgba(255, 255, 255, 0.18)",
        }}
      >
        <h3 className="text-center mb-4 fw-bold">Create Account</h3>
        <form onSubmit={handleSubmit} autoComplete="off" noValidate>
          {[
            {
              id: "name",
              label: "Name",
              type: "text",
              placeholder: "Enter your full name",
              autoComplete: "name",
            },
            {
              id: "email",
              label: "Email address",
              type: "email",
              placeholder: "example@email.com",
              autoComplete: "email",
            },
            {
              id: "password",
              label: "Password",
              type: "password",
              placeholder: "Create a password",
              autoComplete: "new-password",
            },
            {
              id: "mobile",
              label: "Mobile Number",
              type: "tel",
              placeholder: "+1 234 567 8900",
              autoComplete: "tel",
            },
          ].map(({ id, label, type, placeholder, autoComplete }) => (
            <div className="mb-3" key={id}>
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
                autoComplete={autoComplete}
                style={{
                  background: "rgba(255,255,255,0.15)",
                  color: "#f8f9fa",
                  border: "none",
                }}
              />
            </div>
          ))}

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
                Registering...
              </>
            ) : (
              "Register"
            )}
          </button>
        </form>

        <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.2)" }} />

        <div className="text-center mb-2 text-muted">Or sign up with</div>

        <div className="d-flex justify-content-center gap-3">
          {[
            {
              icon: FaGoogle,
              label: "Google",
              color: "text-danger",
              onClick: () => alert("Google signup not implemented"),
            },
            {
              icon: FaFacebook,
              label: "Facebook",
              color: "text-primary",
              onClick: () => alert("Facebook signup not implemented"),
            },
            {
              icon: FaLinkedin,
              label: "LinkedIn",
              color: "text-info",
              onClick: () => alert("LinkedIn signup not implemented"),
            },
          ].map(({ icon: Icon, label, color, onClick }) => (
            <button
              key={label}
              type="button"
              onClick={onClick}
              className="btn btn-outline-light rounded-circle shadow-sm"
              style={{
                width: "44px",
                height: "44px",
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
            >
              <Icon className={`${color} fs-5`} />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
