"use client";

import React, { useState } from "react";

const EcommerceCustomerProfileForm: React.FC = () => {
  const [formData, setFormData] = useState({
    // Basic Info
    fullName: "",
    customerId: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    profilePhoto: "",

    // Address Info
    billingAddress: "",
    shippingAddress: "",
    city: "",
    state: "",
    pincode: "",
    country: "",

    // Account Info
    username: "",
    password: "",
    membershipType: "",
    loyaltyPoints: "",
    preferredLanguage: "",
    preferredCurrency: "",

    // Order Preferences
    preferredPaymentMethod: "",
    preferredDeliveryTime: "",
    subscribeNewsletter: "",
    favoriteCategories: "",

    // Social & Communication
    linkedin: "",
    facebook: "",
    instagram: "",
    twitter: "",

    // Additional Info
    skills: "",
    hobbies: "",
    notes: "",
    achievements: "",
    projects: "",
    certifications: "",
    languagesKnown: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Customer Profile Submitted:", formData);
    alert("Customer profile submitted ✅. Check console for values.");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🛍️ Ecommerce Customer Profile</h2>
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
                placeholder="Customer ID"
                name="customerId"
                value={formData.customerId}
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
            <div className="col-md-6">
              <textarea
                className="form-control"
                rows={2}
                placeholder="Billing Address"
                name="billingAddress"
                value={formData.billingAddress}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control"
                rows={2}
                placeholder="Shipping Address"
                name="shippingAddress"
                value={formData.shippingAddress}
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

        {/* Account Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Account Information</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Username"
                name="username"
                value={formData.username}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="password"
                className="form-control"
                placeholder="Password"
                name="password"
                value={formData.password}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                name="membershipType"
                value={formData.membershipType}
                onChange={handleChange}
              >
                <option value="">Membership Type</option>
                <option>Regular</option>
                <option>Premium</option>
                <option>VIP</option>
              </select>
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Loyalty Points"
                name="loyaltyPoints"
                value={formData.loyaltyPoints}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Preferred Language"
                name="preferredLanguage"
                value={formData.preferredLanguage}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="text"
                className="form-control"
                placeholder="Preferred Currency"
                name="preferredCurrency"
                value={formData.preferredCurrency}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Order Preferences */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Order Preferences</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <select
                className="form-select"
                name="preferredPaymentMethod"
                value={formData.preferredPaymentMethod}
                onChange={handleChange}
              >
                <option value="">Payment Method</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>Net Banking</option>
                <option>UPI</option>
                <option>Cash on Delivery</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Preferred Delivery Time"
                name="preferredDeliveryTime"
                value={formData.preferredDeliveryTime}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <select
                className="form-select"
                name="subscribeNewsletter"
                value={formData.subscribeNewsletter}
                onChange={handleChange}
              >
                <option value="">Subscribe Newsletter</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Favorite Categories"
                name="favoriteCategories"
                value={formData.favoriteCategories}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Social & Additional Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Social & Additional Information</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="LinkedIn"
                name="linkedin"
                value={formData.linkedin}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Facebook"
                name="facebook"
                value={formData.facebook}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Instagram"
                name="instagram"
                value={formData.instagram}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Twitter"
                name="twitter"
                value={formData.twitter}
                onChange={handleChange}
              />
            </div>

            {/* Additional Info */}
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

export default EcommerceCustomerProfileForm;
