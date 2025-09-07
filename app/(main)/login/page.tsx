"use client";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Login</h3>

        {/* Email */}
        <div className="mb-3">
          <label className="form-label">Email</label>
          <input type="email" className="form-control" placeholder="Enter your email" />
        </div>

        {/* Password */}
        <div className="mb-3">
          <label className="form-label">Password</label>
          <input type="password" className="form-control" placeholder="Enter your password" />
        </div>

        {/* Login Button */}
        <a href="superadmin" className="btn btn-primary w-100 mb-3">Login</a>

        {/* Divider */}
        <div className="d-flex align-items-center mb-3">
          <hr className="flex-grow-1" />
          <span className="px-2 text-muted">or</span>
          <hr className="flex-grow-1" />
        </div>

        {/* Social Login */}
        <div className="d-flex justify-content-center gap-3">
          <button className="btn btn-outline-secondary rounded-circle">
            <FaGoogle className="text-danger" />
          </button>
          <button className="btn btn-outline-secondary rounded-circle">
            <FaFacebook className="text-primary" />
          </button>
          <button className="btn btn-outline-secondary rounded-circle">
            <FaLinkedin className="text-info" />
          </button>
        </div>
      </div>
    </div>
  );
}
