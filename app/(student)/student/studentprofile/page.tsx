"use client";

import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>My Profile</h2>

      {/* Profile Form */}
      <div className="card p-4 shadow-sm">
        <form>
          <div className="row">
            {/* Name */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Name</label>
              <input type="text" className="form-control" placeholder="Enter Name" />
            </div>

            {/* Roll No */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Roll No</label>
              <input type="text" className="form-control" placeholder="Enter Roll No" />
            </div>

            {/* Email */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Email</label>
              <input type="email" className="form-control" placeholder="Enter Email" />
            </div>

            {/* Mobile */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Mobile</label>
              <input type="text" className="form-control" placeholder="Enter Mobile No" />
            </div>

            {/* Address */}
            <div className="col-md-12 mb-3">
              <label className="form-label">Address</label>
              <textarea className="form-control" rows={2} placeholder="Enter Address"></textarea>
            </div>

            {/* City */}
            <div className="col-md-6 mb-3">
              <label className="form-label">City</label>
              <input type="text" className="form-control" placeholder="Enter City" />
            </div>

            {/* Pincode */}
            <div className="col-md-6 mb-3">
              <label className="form-label">Pincode</label>
              <input type="text" className="form-control" placeholder="Enter Pincode" />
            </div>
          </div>

          {/* Update Button */}
          <div className="d-flex justify-content-end">
            <button type="submit" className="btn btn-primary">
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Page;
