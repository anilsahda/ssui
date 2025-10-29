"use client";

import React, { useState, useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  FaHotel,
  FaUserCog,
  FaChartLine,
  FaTools,
  FaSave,
} from "react-icons/fa";

const HotelAdminProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    adminId: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePhoto: "",

    hotelName: "",
    hotelAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    website: "",
    contactNumber: "",

    canManageBookings: "",
    canManageRooms: "",
    canManageStaff: "",
    canManageServices: "",
    canViewReports: "",
    canManagePayments: "",
    canManageOffers: "",

    totalRooms: "",
    occupiedRooms: "",
    availableRooms: "",
    totalBookings: "",
    monthlyRevenue: "",
    monthlyBookings: "",

    totalStaff: "",
    staffOnDuty: "",

    roomService: "",
    laundryService: "",
    spaService: "",
    gymService: "",
    restaurantService: "",

    skills: "",
    notes: "",
    achievements: "",
    languagesKnown: "",
    certifications: "",
    hobbies: "",
  });

  // Initialize AOS
  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hotel Admin Profile Submitted:", formData);
    alert("Hotel Admin profile submitted ✅ Check console for details.");
  };

  return (
    <div className="container py-5">
      <div className="text-center mb-5" data-aos="zoom-in">
        <h1 className="fw-bold text-primary mb-3">
          <FaUserCog className="me-2" />
          Hotel Admin Profile
        </h1>
        <p className="text-muted fs-5">
          Manage hotel details, permissions, and performance metrics.
        </p>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Profile Preview */}
        <div className="text-center mb-5" data-aos="fade-up">
          <div className="position-relative d-inline-block">
            <img
              src={
                formData.profilePhoto ||
                "https://cdn-icons-png.flaticon.com/512/149/149071.png"
              }
              alt="Profile"
              className="rounded-circle shadow"
              width="120"
              height="120"
            />
            <div
              className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle p-2 shadow-sm"
              style={{ cursor: "pointer" }}
              title="Change Profile Photo"
            >
              <i className="bi bi-camera"></i>
            </div>
          </div>
        </div>

        {/* Basic Information */}
        <div className="card shadow-lg mb-4 border-0" data-aos="fade-right">
          <div className="card-header bg-primary text-white fw-bold">
            <FaUserCog className="me-2" />
            Basic Information
          </div>
          <div className="card-body row g-3">
            {[
              { label: "Full Name", name: "fullName" },
              { label: "Admin ID", name: "adminId" },
              { label: "Email", name: "email", type: "email" },
              { label: "Phone", name: "phone" },
            ].map((field, i) => (
              <div className="col-md-6" key={i}>
                <input
                  type={field.type || "text"}
                  className="form-control form-control-lg"
                  placeholder={field.label}
                  name={field.name}
                  value={formData[field.name as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}
            <div className="col-md-4">
              <input
                type="date"
                className="form-control form-control-lg"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select form-select-lg"
                name="gender"
                value={formData.gender}
                onChange={handleChange}
              >
                <option value="">Select Gender</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Profile Photo URL"
                name="profilePhoto"
                value={formData.profilePhoto}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="card shadow-lg mb-4 border-0" data-aos="fade-left">
          <div className="card-header bg-success text-white fw-bold">
            <FaHotel className="me-2" />
            Hotel Information
          </div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control form-control-lg"
                placeholder="Hotel Name"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control form-control-lg"
                rows={2}
                placeholder="Hotel Address"
                name="hotelAddress"
                value={formData.hotelAddress}
                onChange={handleChange}
              ></textarea>
            </div>
            {[
              "city",
              "state",
              "pincode",
              "country",
              "website",
              "contactNumber",
            ].map((field, i) => (
              <div className="col-md-4" key={i}>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={
                    field.charAt(0).toUpperCase() +
                    field.slice(1).replace(/([A-Z])/g, " $1")
                  }
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Permissions */}
        <div className="card shadow-lg mb-4 border-0" data-aos="fade-right">
          <div className="card-header bg-warning text-dark fw-bold">
            <FaTools className="me-2" />
            Admin Permissions
          </div>
          <div className="card-body row g-3">
            {[
              "canManageBookings",
              "canManageRooms",
              "canManageStaff",
              "canManageServices",
              "canViewReports",
              "canManagePayments",
              "canManageOffers",
            ].map((perm, idx) => (
              <div className="col-md-3" key={idx}>
                <select
                  className="form-select form-select-lg"
                  name={perm}
                  value={formData[perm as keyof typeof formData]}
                  onChange={handleChange}
                >
                  <option value="">
                    {perm
                      .replace("canManage", "Manage ")
                      .replace("canView", "View ")}
                  </option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Metrics */}
        <div className="card shadow-lg mb-4 border-0" data-aos="fade-left">
          <div className="card-header bg-info text-white fw-bold">
            <FaChartLine className="me-2" />
            Hotel Metrics
          </div>
          <div className="card-body row g-3">
            {[
              "totalRooms",
              "occupiedRooms",
              "availableRooms",
              "totalBookings",
              "monthlyRevenue",
              "monthlyBookings",
            ].map((metric, idx) => (
              <div className="col-md-4" key={idx}>
                <input
                  type="number"
                  className="form-control form-control-lg"
                  placeholder={metric.replace(/([A-Z])/g, " $1")}
                  name={metric}
                  value={formData[metric as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Staff Info */}
        <div className="card shadow-lg mb-4 border-0" data-aos="fade-right">
          <div className="card-header bg-dark text-white fw-bold">
            Staff Information
          </div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Total Staff"
                name="totalStaff"
                value={formData.totalStaff}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control form-control-lg"
                placeholder="Staff on Duty"
                name="staffOnDuty"
                value={formData.staffOnDuty}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="card shadow-lg mb-5 border-0" data-aos="fade-up">
          <div className="card-header bg-secondary text-white fw-bold">
            Additional Information
          </div>
          <div className="card-body row g-3">
            {[
              "skills",
              "hobbies",
              "certifications",
              "languagesKnown",
              "achievements",
              "notes",
            ].map((field, idx) => (
              <div className="col-md-6" key={idx}>
                <input
                  type="text"
                  className="form-control form-control-lg"
                  placeholder={field.replace(/([A-Z])/g, " $1")}
                  name={field}
                  value={formData[field as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Submit */}
        <div className="text-center" data-aos="zoom-in-up">
          <button
            type="submit"
            className="btn btn-lg btn-success px-5 shadow-sm rounded-pill"
          >
            <FaSave className="me-2" />
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelAdminProfileForm;
