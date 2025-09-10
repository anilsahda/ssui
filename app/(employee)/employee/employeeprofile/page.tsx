"use client";

import React, { useState } from "react";

const EmployeeProfilePayrollForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    employeeId: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePhoto: "",

    // Job Info
    designation: "",
    department: "",
    dateOfJoining: "",
    reportingManager: "",
    employmentType: "",

    // Bank Info
    bankName: "",
    accountNumber: "",
    ifscCode: "",
    branch: "",

    // Salary Details
    basicSalary: "",
    hra: "",
    conveyanceAllowance: "",
    specialAllowance: "",
    bonus: "",
    taxDeductions: "",
    providentFund: "",
    netSalary: "",

    // Leave Info
    totalLeaves: "",
    leavesTaken: "",
    remainingLeaves: "",

    // Performance Info
    lastAppraisalDate: "",
    appraisalRating: "",
    keyAchievements: "",

    // Additional Info
    skills: "",
    certifications: "",
    projects: "",
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
    console.log("Employee Profile & Payroll Submitted:", formData);
    alert("Employee profile & payroll submitted ✅. Check console for values.");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">👔 Employee Profile & Payroll</h2>
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
                placeholder="Employee ID"
                name="employeeId"
                value={formData.employeeId}
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

        {/* Job Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Job Information</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Designation"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Department"
                name="department"
                value={formData.department}
                onChange={handleChange}
              />
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
                placeholder="Reporting Manager"
                name="reportingManager"
                value={formData.reportingManager}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                name="employmentType"
                value={formData.employmentType}
                onChange={handleChange}
              >
                <option value="">Employment Type</option>
                <option>Full-Time</option>
                <option>Part-Time</option>
                <option>Contract</option>
              </select>
            </div>
          </div>
        </div>

        {/* Bank Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Bank Information</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Bank Name"
                name="bankName"
                value={formData.bankName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Account Number"
                name="accountNumber"
                value={formData.accountNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="IFSC Code"
                name="ifscCode"
                value={formData.ifscCode}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Branch"
                name="branch"
                value={formData.branch}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Salary Details */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Salary Details</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Basic Salary"
                name="basicSalary"
                value={formData.basicSalary}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="HRA"
                name="hra"
                value={formData.hra}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Conveyance Allowance"
                name="conveyanceAllowance"
                value={formData.conveyanceAllowance}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Special Allowance"
                name="specialAllowance"
                value={formData.specialAllowance}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Bonus"
                name="bonus"
                value={formData.bonus}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Tax Deductions"
                name="taxDeductions"
                value={formData.taxDeductions}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Provident Fund"
                name="providentFund"
                value={formData.providentFund}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Net Salary"
                name="netSalary"
                value={formData.netSalary}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Leave Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Leave Information</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Total Leaves"
                name="totalLeaves"
                value={formData.totalLeaves}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Leaves Taken"
                name="leavesTaken"
                value={formData.leavesTaken}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Remaining Leaves"
                name="remainingLeaves"
                value={formData.remainingLeaves}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Performance Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Performance Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="date"
                className="form-control"
                placeholder="Last Appraisal Date"
                name="lastAppraisalDate"
                value={formData.lastAppraisalDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                name="appraisalRating"
                value={formData.appraisalRating}
                onChange={handleChange}
              >
                <option value="">Appraisal Rating</option>
                <option>Excellent</option>
                <option>Very Good</option>
                <option>Good</option>
                <option>Average</option>
              </select>
            </div>
            <div className="col-md-12">
              <textarea
                className="form-control"
                placeholder="Key Achievements"
                name="keyAchievements"
                value={formData.keyAchievements}
                onChange={handleChange}
                rows={3}
              ></textarea>
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
                placeholder="Projects"
                name="projects"
                value={formData.projects}
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
            <div className="col-md-12">
              <textarea
                className="form-control"
                placeholder="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
              ></textarea>
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
          </div>
        </div>

        {/* Submit */}
        <div className="text-center mb-4">
          <button type="submit" className="btn btn-success px-5">
            Save Profile & Payroll
          </button>
        </div>
      </form>
    </div>
  );
};

export default EmployeeProfilePayrollForm;
