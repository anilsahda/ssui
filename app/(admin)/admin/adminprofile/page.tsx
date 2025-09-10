"use client";

import React, { useState } from "react";

const AdminEmployeePayrollForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Admin Basic Info
    adminName: "",
    adminId: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePhoto: "",

    // Employee Overview
    totalEmployees: "",
    departmentManaged: "",
    payrollCycle: "",
    reportingTo: "",

    // Bank & Salary Config
    defaultBankName: "",
    defaultIFSC: "",
    defaultBranch: "",
    defaultSalaryTemplate: "",
    taxConfig: "",
    pfPercentage: "",
    bonusPolicy: "",

    // Leave & Attendance
    maxLeavesAllowed: "",
    carryForwardPolicy: "",
    attendanceTracking: "",
    leaveApprovalAuthority: "",

    // Performance & Appraisal
    appraisalCycle: "",
    appraisalAuthority: "",
    performanceMetrics: "",

    // Additional Admin Notes
    notes: "",
    policiesDocumentURL: "",
    announcements: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Admin Employee Payroll Profile Submitted:", formData);
    alert("Admin employee payroll profile submitted ✅. Check console for values.");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">👤 Admin Employee Payroll Profile</h2>
      <form onSubmit={handleSubmit}>

        {/* Admin Basic Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Admin Basic Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Admin Name"
                name="adminName"
                value={formData.adminName}
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

        {/* Employee Overview */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Employee Overview</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Total Employees"
                name="totalEmployees"
                value={formData.totalEmployees}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Departments Managed"
                name="departmentManaged"
                value={formData.departmentManaged}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Payroll Cycle"
                name="payrollCycle"
                value={formData.payrollCycle}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Reporting To"
                name="reportingTo"
                value={formData.reportingTo}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Bank & Salary Config */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Bank & Salary Configuration</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Default Bank Name"
                name="defaultBankName"
                value={formData.defaultBankName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="IFSC Code"
                name="defaultIFSC"
                value={formData.defaultIFSC}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Branch"
                name="defaultBranch"
                value={formData.defaultBranch}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Default Salary Template"
                name="defaultSalaryTemplate"
                value={formData.defaultSalaryTemplate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Tax Configuration"
                name="taxConfig"
                value={formData.taxConfig}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="PF %"
                name="pfPercentage"
                value={formData.pfPercentage}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Bonus Policy"
                name="bonusPolicy"
                value={formData.bonusPolicy}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Leave & Attendance */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Leave & Attendance</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Max Leaves Allowed"
                name="maxLeavesAllowed"
                value={formData.maxLeavesAllowed}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Carry Forward Policy"
                name="carryForwardPolicy"
                value={formData.carryForwardPolicy}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Attendance Tracking"
                name="attendanceTracking"
                value={formData.attendanceTracking}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Leave Approval Authority"
                name="leaveApprovalAuthority"
                value={formData.leaveApprovalAuthority}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Performance & Appraisal */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Performance & Appraisal</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Appraisal Cycle"
                name="appraisalCycle"
                value={formData.appraisalCycle}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Appraisal Authority"
                name="appraisalAuthority"
                value={formData.appraisalAuthority}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Performance Metrics"
                name="performanceMetrics"
                value={formData.performanceMetrics}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Additional Admin Notes */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Additional Admin Notes</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <textarea
                className="form-control"
                placeholder="Notes"
                name="notes"
                value={formData.notes}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Policies Document URL"
                name="policiesDocumentURL"
                value={formData.policiesDocumentURL}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <textarea
                className="form-control"
                placeholder="Announcements"
                name="announcements"
                value={formData.announcements}
                onChange={handleChange}
                rows={3}
              ></textarea>
            </div>
          </div>
        </div>

        {/* Submit */}
        <div className="text-center mb-4">
          <button type="submit" className="btn btn-success px-5">
            Save Admin Payroll Profile
          </button>
        </div>
      </form>
    </div>
  );
};

export default AdminEmployeePayrollForm;
