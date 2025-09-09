"use client";
import React, { useState } from "react";
import { Eye, Pencil, Key, Trash, EyeSlash } from "react-bootstrap-icons";

function MyProfilePage() {
  const [showPassword, setShowPassword] = useState(false);
  const [modal, setModal] = useState(""); // "view" | "edit" | "changePass" | "delete" | "deleteSuccess"
  const [profile, setProfile] = useState({
    name: "Kapil Yadav",
    mobile: "9876543210",
    address: "123, MG Road",
    city: "New Delhi",
    pincode: "110001",
    email: "kapil@example.com",
    password: "password123",
  });

  const handleProfileChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  return (
    <div className="container-fluid vh-200 bg-light d-flex flex-column justify-content-center align-items-center">
      <div className="card shadow-sm p-4 w-50">
        <h2 className="text-center mb-4">My Profile</h2>

        <div className="mb-4 d-flex justify-content-around">
          <button className="btn btn-info" onClick={() => setModal("view")}><Eye /> View</button>
          <button className="btn btn-warning" onClick={() => setModal("edit")}><Pencil /> Edit</button>
          <button className="btn btn-secondary" onClick={() => setModal("changePass")}><Key /> Change Password</button>
          <button className="btn btn-danger" onClick={() => setModal("delete")}><Trash /> Delete</button>
        </div>

        {/* Profile Table */}
        <table className="table table-bordered">
          <tbody>
            <tr><th>Name</th><td>{profile.name}</td></tr>
            <tr><th>Mobile</th><td>{profile.mobile}</td></tr>
            <tr><th>Address</th><td>{profile.address}</td></tr>
            <tr><th>City</th><td>{profile.city}</td></tr>
            <tr><th>Pincode</th><td>{profile.pincode}</td></tr>
            <tr><th>Email</th><td>{profile.email}</td></tr>
            <tr>
              <th>Password</th>
              <td>
                <div className="input-group">
                  <input type={showPassword ? "text" : "password"} className="form-control" value={profile.password} disabled />
                  <span className="input-group-text" style={{ cursor: "pointer" }} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <EyeSlash /> : <Eye />}
                  </span>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Centered Modal */}
      {modal && (
        <div className="modal fade show d-block" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {modal === "view" && "View Profile"}
                  {modal === "edit" && "Edit Profile"}
                  {modal === "changePass" && "Change Password"}
                  {modal === "delete" && "Delete Profile"}
                  {modal === "deleteSuccess" && "Deleted Successfully"}
                </h5>
                <button type="button" className="btn-close" onClick={() => setModal("")}></button>
              </div>
              <div className="modal-body">
                {modal === "view" && (
                  <div>
                    <p><b>Name:</b> {profile.name}</p>
                    <p><b>Email:</b> {profile.email}</p>
                    <p><b>Mobile:</b> {profile.mobile}</p>
                    <p><b>Address:</b> {profile.address}</p>
                    <p><b>City:</b> {profile.city}</p>
                    <p><b>Pincode:</b> {profile.pincode}</p>
                  </div>
                )}

                {modal === "edit" && (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">Name</label>
                      <input type="text" className="form-control" name="name" value={profile.name} onChange={handleProfileChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Mobile</label>
                      <input type="text" className="form-control" name="mobile" value={profile.mobile} onChange={handleProfileChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Address</label>
                      <textarea className="form-control" rows={2} name="address" value={profile.address} onChange={handleProfileChange}></textarea>
                    </div>
                    <div className="mb-3">
                      <label className="form-label">City</label>
                      <input type="text" className="form-control" name="city" value={profile.city} onChange={handleProfileChange} />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Pincode</label>
                      <input type="text" className="form-control" name="pincode" value={profile.pincode} onChange={handleProfileChange} />
                    </div>
                  </form>
                )}

                {modal === "changePass" && (
                  <form>
                    <div className="mb-3">
                      <label className="form-label">New Password</label>
                      <input type="password" className="form-control" placeholder="Enter new password" />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Confirm Password</label>
                      <input type="password" className="form-control" placeholder="Confirm password" />
                    </div>
                  </form>
                )}

                {modal === "delete" && <p>Are you sure you want to delete this profile?</p>}
                {modal === "deleteSuccess" && <p>Profile has been deleted successfully!</p>}
              </div>

              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setModal("")}>Close</button>
                {modal === "edit" || modal === "changePass" ? (
                  <button className="btn btn-success">Save</button>
                ) : modal === "delete" ? (
                  <button className="btn btn-danger" onClick={() => setModal("deleteSuccess")}>Delete</button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyProfilePage;
