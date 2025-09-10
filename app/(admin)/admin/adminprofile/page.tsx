"use client";

import React, { useState } from "react";

const AdminProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    name: "",
    adminId: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePhoto: "",

    // Personal Info
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",
    linkedin: "",
    website: "",

    // Admin Info
    role: "",
    accessLevel: "",
    dateOfJoining: "",
    lastLogin: "",
    managedDepartments: "",
    permissions: "",

    // Attendance Portal Settings
    portalAccess: "",
    canEditRecords: "",
    canApproveLeaves: "",
    canManageStaff: "",
    canManageStudents: "",

    // Additional Info
    skills: "",
    certifications: "",
    projectsHandled: "",
    achievements: "",
    notes: "",
    hobbies: "",
    languages: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin Profile Submitted:", formData);
    alert("Admin profile submitted ✅. Check console for values.");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛡️ Admin Profile & Portal Access</h2>
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
                name="name"
                value={formData.name}
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

        {/* Personal Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Personal Information</div>
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
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="LinkedIn Profile"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Website"
                name="website"
                value={formData.website}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Admin Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Admin Information</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Role"
                name="role"
                value={formData.role}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                name="accessLevel"
                value={formData.accessLevel}
                onChange={handleChange}
              >
                <option value="">Access Level</option>
                <option>Super Admin</option>
                <option>Admin</option>
                <option>Moderator</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                placeholder="Date of Joining"
                name="dateOfJoining"
                value={formData.dateOfJoining}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Last Login"
                name="lastLogin"
                value={formData.lastLogin}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Managed Departments"
                name="managedDepartments"
                value={formData.managedDepartments}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <textarea
                className="form-control"
                placeholder="Permissions"
                name="permissions"
                value={formData.permissions}
                onChange={handleChange}
                rows={1}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Portal Access */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Attendance Portal Access</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <select
                className="form-select"
                name="portalAccess"
                value={formData.portalAccess}
                onChange={handleChange}
              >
                <option value="">Portal Access</option>
                <option>Full</option>
                <option>Limited</option>
                <option>None</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="canEditRecords"
                value={formData.canEditRecords}
                onChange={handleChange}
              >
                <option value="">Edit Records</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="canApproveLeaves"
                value={formData.canApproveLeaves}
                onChange={handleChange}
              >
                <option value="">Approve Leaves</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="canManageStaff"
                value={formData.canManageStaff}
                onChange={handleChange}
              >
                <option value="">Manage Staff</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="canManageStudents"
                value={formData.canManageStudents}
                onChange={handleChange}
              >
                <option value="">Manage Students</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
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
                placeholder="Projects Handled"
                name="projectsHandled"
                value={formData.projectsHandled}
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
                name="languages"
                value={formData.languages}
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

export default AdminProfileForm;
