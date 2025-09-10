"use client";

import React, { useState } from "react";

const HotelCustomerProfileForm: React.FC = () => {
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
    address: "",
    city: "",
    state: "",
    pincode: "",
    country: "",

    // Booking Info
    preferredRoomType: "",
    checkInDate: "",
    checkOutDate: "",
    numberOfGuests: "",
    specialRequests: "",
    frequentTravelerNumber: "",

    // Payment Info
    cardHolderName: "",
    cardNumber: "",
    cardExpiry: "",
    cardCVV: "",
    preferredPaymentMethod: "",

    // Loyalty & Rewards
    loyaltyPoints: "",
    membershipTier: "",
    rewardsEligible: "",

    // Past Bookings
    lastBookingDate: "",
    totalBookings: "",
    totalNightsStayed: "",

    // Feedback & Preferences
    feedback: "",
    preferredAmenities: "",
    dietaryPreferences: "",
    languagesKnown: "",
    hobbies: "",
    notes: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Hotel Customer Profile Submitted:", formData);
    alert("Hotel Customer profile submitted ✅. Check console for values.");
  };

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">🏨 Hotel Customer Profile</h2>
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

        {/* Booking Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Booking Information</div>
          <div className="card-body row g-3">
            <div className="col-md-3">
              <select
                className="form-select"
                name="preferredRoomType"
                value={formData.preferredRoomType}
                onChange={handleChange}
              >
                <option value="">Preferred Room Type</option>
                <option>Single</option>
                <option>Double</option>
                <option>Suite</option>
                <option>Deluxe</option>
              </select>
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                placeholder="Check-In Date"
                name="checkInDate"
                value={formData.checkInDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="date"
                className="form-control"
                placeholder="Check-Out Date"
                name="checkOutDate"
                value={formData.checkOutDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="number"
                className="form-control"
                placeholder="Number of Guests"
                name="numberOfGuests"
                value={formData.numberOfGuests}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-12">
              <textarea
                className="form-control"
                rows={2}
                placeholder="Special Requests"
                name="specialRequests"
                value={formData.specialRequests}
                onChange={handleChange}
              ></textarea>
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Frequent Traveler Number"
                name="frequentTravelerNumber"
                value={formData.frequentTravelerNumber}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Payment Info */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Payment Information</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Card Holder Name"
                name="cardHolderName"
                value={formData.cardHolderName}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <input
                type="text"
                className="form-control"
                placeholder="Card Number"
                name="cardNumber"
                value={formData.cardNumber}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Expiry Date"
                name="cardExpiry"
                value={formData.cardExpiry}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="CVV"
                name="cardCVV"
                value={formData.cardCVV}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-6">
              <select
                className="form-select"
                name="preferredPaymentMethod"
                value={formData.preferredPaymentMethod}
                onChange={handleChange}
              >
                <option value="">Preferred Payment Method</option>
                <option>Credit Card</option>
                <option>Debit Card</option>
                <option>UPI</option>
                <option>Net Banking</option>
                <option>Cash</option>
              </select>
            </div>
          </div>
        </div>

        {/* Loyalty & Rewards */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Loyalty & Rewards</div>
          <div className="card-body row g-3">
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
                placeholder="Membership Tier"
                name="membershipTier"
                value={formData.membershipTier}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <select
                className="form-select"
                name="rewardsEligible"
                value={formData.rewardsEligible}
                onChange={handleChange}
              >
                <option value="">Rewards Eligible</option>
                <option>Yes</option>
                <option>No</option>
              </select>
            </div>
          </div>
        </div>

        {/* Past Bookings */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Past Bookings</div>
          <div className="card-body row g-3">
            <div className="col-md-4">
              <input
                type="date"
                className="form-control"
                placeholder="Last Booking Date"
                name="lastBookingDate"
                value={formData.lastBookingDate}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Total Bookings"
                name="totalBookings"
                value={formData.totalBookings}
                onChange={handleChange}
              />
            </div>
            <div className="col-md-4">
              <input
                type="number"
                className="form-control"
                placeholder="Total Nights Stayed"
                name="totalNightsStayed"
                value={formData.totalNightsStayed}
                onChange={handleChange}
              />
            </div>
          </div>
        </div>

        {/* Feedback & Preferences */}
        <div className="card shadow-sm mb-4">
          <div className="card-header bg-primary text-white">Feedback & Preferences</div>
          <div className="card-body row g-3">
            <div className="col-md-6">
              <textarea
                className="form-control"
                placeholder="Feedback"
                name="feedback"
                value={formData.feedback}
                onChange={handleChange}
                rows={2}
              ></textarea>
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control"
                placeholder="Preferred Amenities"
                name="preferredAmenities"
                value={formData.preferredAmenities}
                onChange={handleChange}
                rows={2}
              ></textarea>
            </div>
            <div className="col-md-6">
              <textarea
                className="form-control"
                placeholder="Dietary Preferences"
                name="dietaryPreferences"
                value={formData.dietaryPreferences}
                onChange={handleChange}
                rows={2}
              ></textarea>
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

export default HotelCustomerProfileForm;
