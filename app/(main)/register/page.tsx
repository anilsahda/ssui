"use client";
import { FaGoogle, FaFacebook, FaLinkedin } from "react-icons/fa";

export default function Login() {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
      <div className="card shadow p-4" style={{ width: "350px", borderRadius: "12px" }}>
        <h3 className="text-center mb-4">Register</h3>

        {/* Name */}
        <div className="mb-3">
          <label className="form-label">Name</label>
          <input type="email" className="form-control" placeholder="Enter name" />
        </div>

        {/* Mobile */}
        <div className="mb-3">
          <label className="form-label">Mobile</label>
          <input type="text" className="form-control" placeholder="Enter mobile" />
        </div>

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
        <a href="admin" className="btn btn-primary w-100 mb-3">Register</a>

      </div>
    </div>
  );
}
