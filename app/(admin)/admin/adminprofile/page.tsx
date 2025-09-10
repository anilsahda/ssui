"use client";

import React, { useState } from "react";

const HousingAdminProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    adminId: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePhoto: "",

    // Address Info
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",

    // Property Management
    totalPropertiesManaged: "",
    propertiesOwned: "",
    propertiesRented: "",
    vacantProperties: "",
    maintenancePending: "",

    // Tenant Management
    totalTenants: "",
    activeTenants: "",
    pendingApplications: "",
    tenantComplaints: "",

    // Financial Info
    monthlyRentCollected: "",
    totalOutstandingRent: "",
    preferredPaymentMethod: "",

    // Maintenance Info
    maintenanceRequests: "",
    ongoingRepairs: "",
    completedRepairs: "",

    // Additional Info
    notes: "",
    documentsUploaded: "",
    licenses: "",
    certifications: "",
    softwareUsed: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Housing Admin Profile Submitted:", formData);
    alert("Housing Admin profile submitted ✅. Check console for values.");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🏠 Housing Management Admin Profile</h2>
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

        {/* Address Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Address Information</div>
          <div className="card-body row g-3">
            <div className="col-md-12">
              <textarea
                className="form-control"
                rows={2}
                placeholder="Address"
                name="address"
                value={formData.address}
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
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Country"
                name="country"
                value={formData.country}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Property Management */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Property Management</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Total Properties Managed"
                name="totalPropertiesManaged"
                value={formData.totalPropertiesManaged}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Properties Owned"
                name="propertiesOwned"
                value={formData.propertiesOwned}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Properties Rented"
                name="propertiesRented"
                value={formData.propertiesRented}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Vacant Properties"
                name="vacantProperties"
                value={formData.vacantProperties}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Maintenance Pending"
                name="maintenancePending"
                value={formData.maintenancePending}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Tenant Management */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Tenant Management</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Total Tenants"
                name="totalTenants"
                value={formData.totalTenants}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Active Tenants"
                name="activeTenants"
                value={formData.activeTenants}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Pending Applications"
                name="pendingApplications"
                value={formData.pendingApplications}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Tenant Complaints"
                name="tenantComplaints"
                value={formData.tenantComplaints}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Financial Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Financial Information</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Monthly Rent Collected"
                name="monthlyRentCollected"
                value={formData.monthlyRentCollected}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Total Outstanding Rent"
                name="totalOutstandingRent"
                value={formData.totalOutstandingRent}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                name="preferredPaymentMethod"
                value={formData.preferredPaymentMethod}
                onChange={handleChange}
              >
                <option value="">Preferred Payment Method</option>
                <option>Bank Transfer</option>
                <option>Cheque</option>
                <option>Cash</option>
              </select>
            </div>
          </div>
        </div>

        {/* Maintenance Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Maintenance Information</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Maintenance Requests"
                name="maintenanceRequests"
                value={formData.maintenanceRequests}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Ongoing Repairs"
                name="ongoingRepairs"
                value={formData.ongoingRepairs}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Completed Repairs"
                name="completedRepairs"
                value={formData.completedRepairs}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Additional Information</div>
          <div className="card-body row g-3">
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
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Documents Uploaded"
                name="documentsUploaded"
                value={formData.documentsUploaded}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Licenses"
                name="licenses"
                value={formData.licenses}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Certifications"
                name="certifications"
                value={formData.certifications}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Software Used"
                name="softwareUsed"
                value={formData.softwareUsed}
                onChange={handleChange}
              />
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

export default HousingAdminProfileForm;
