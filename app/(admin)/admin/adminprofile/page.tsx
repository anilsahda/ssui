"use client";

import React, { useState } from "react";

const HotelAdminProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    adminId: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePhoto: "",

    // Hotel Info
    hotelName: "",
    hotelAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    website: "",
    contactNumber: "",

    // Admin Permissions
    canManageBookings: "",
    canManageRooms: "",
    canManageStaff: "",
    canManageServices: "",
    canViewReports: "",
    canManagePayments: "",
    canManageOffers: "",

    // Hotel Metrics
    totalRooms: "",
    occupiedRooms: "",
    availableRooms: "",
    totalBookings: "",
    monthlyRevenue: "",
    monthlyBookings: "",

    // Staff Info
    totalStaff: "",
    staffOnDuty: "",

    // Services Info
    roomService: "",
    laundryService: "",
    spaService: "",
    gymService: "",
    restaurantService: "",

    // Additional Info
    skills: "",
    notes: "",
    achievements: "",
    languagesKnown: "",
    certifications: "",
    hobbies: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hotel Admin Profile Submitted:", formData);
    alert("Hotel Admin profile submitted ✅. Check console for values.");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🏨 Hotel Admin Profile</h2>
      <form onSubmit={handleSubmit}>

        {/* Basic Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Basic Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Full Name"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Admin ID"
                name="adminId"
                value={formData.adminId}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="email"
                className="form-control"
                placeholder="Email"
                name="email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
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
                className="form-control"
                placeholder="Profile Photo URL"
                name="profilePhoto"
                value={formData.profilePhoto}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Hotel Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Hotel Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Hotel Name"
                name="hotelName"
                value={formData.hotelName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control"
                rows={2}
                placeholder="Hotel Address"
                name="hotelAddress"
                value={formData.hotelAddress}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="City"
                name="city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="State"
                name="state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-2">
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Hotel Contact Number"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Admin Permissions */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Admin Permissions</div>
          <div className="card-body row g-3">
            {[
              { name: "canManageBookings", label: "Manage Bookings" },
              { name: "canManageRooms", label: "Manage Rooms" },
              { name: "canManageStaff", label: "Manage Staff" },
              { name: "canManageServices", label: "Manage Services" },
              { name: "canViewReports", label: "View Reports" },
              { name: "canManagePayments", label: "Manage Payments" },
              { name: "canManageOffers", label: "Manage Offers" },
            ].map((perm, idx) => (
              <div className="col-md-3" key={idx}>
                <select
                  className="form-select"
                  name={perm.name}
                  value={formData[perm.name as keyof typeof formData]}
                  onChange={handleChange}
                >
                  <option value="">{perm.label}</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Hotel Metrics */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Hotel Metrics</div>
          <div className="card-body row g-3">
            {[
              { name: "totalRooms", label: "Total Rooms" },
              { name: "occupiedRooms", label: "Occupied Rooms" },
              { name: "availableRooms", label: "Available Rooms" },
              { name: "totalBookings", label: "Total Bookings" },
              { name: "monthlyRevenue", label: "Monthly Revenue" },
              { name: "monthlyBookings", label: "Monthly Bookings" },
            ].map((metric, idx) => (
              <div className="col-md-3" key={idx}>
                <input
                  type="number"
                  className="form-control"
                  placeholder={metric.label}
                  name={metric.name}
                  value={formData[metric.name as keyof typeof formData]}
                  onChange={handleChange}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Staff Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Staff Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Total Staff"
                name="totalStaff"
                value={formData.totalStaff}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="number"
                className="form-control"
                placeholder="Staff on Duty"
                name="staffOnDuty"
                value={formData.staffOnDuty}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Services Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Services Information</div>
          <div className="card-body row g-3">
            {[
              { name: "roomService", label: "Room Service" },
              { name: "laundryService", label: "Laundry Service" },
              { name: "spaService", label: "Spa Service" },
              { name: "gymService", label: "Gym Service" },
              { name: "restaurantService", label: "Restaurant Service" },
            ].map((service, idx) => (
              <div className="col-md-3" key={idx}>
                <select
                  className="form-select"
                  name={service.name}
                  value={formData[service.name as keyof typeof formData]}
                  onChange={handleChange}
                >
                  <option value="">{service.label}</option>
                  <option>Yes</option>
                  <option>No</option>
                </select>
              </div>
            ))}
          </div>
        </div>

        {/* Additional Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Additional Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Skills"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Hobbies"
                name="hobbies"
                value={formData.hobbies}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Languages Known"
                name="languagesKnown"
                value={formData.languagesKnown}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control"
                placeholder="Achievements"
                name="achievements"
                value={formData.achievements}
                onChange={handleChange}
                rows={2}
              ></textarea>
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control"
                placeholder="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={2}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center mb-4">
          <button type="submit" className="btn btn-success px-5">
            Save Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default HotelAdminProfileForm;
