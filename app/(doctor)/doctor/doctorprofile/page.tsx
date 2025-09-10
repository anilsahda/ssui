"use client";

import { useEffect, useState } from "react";
import API from "api";
import useAuthStore from "store/useAuthStore";

export default function DoctorProfile() {
  const { user } = useAuthStore();

  // States
  const [userInfo, setUserInfo] = useState({ name: "", email: "", mobileNumber: "" });
  const [personalInfo, setPersonalInfo] = useState({ gender: "", dob: "", address: "", linkedin: "", portfolio: "" });
  const [education, setEducation] = useState([{ degree: "", institution: "", year: "" }]);
  const [experience, setExperience] = useState([{ title: "", company: "", startDate: "", endDate: "", salary: "" }]);

  // Load all data
  useEffect(() => {
    if (!user) return;

    const fetchData = async () => {
      try {
        // user info
        const u = await API.get("/users/me");
        setUserInfo({
          name: u.data.name,
          email: u.data.email,
          mobileNumber: u.data.mobileNumber || ""
        });

        // personal info
        try {
          const p = await API.get(`/personal-info/${user.id}`);
          setPersonalInfo(p.data);
        } catch {}

        // education
        const edu = await API.get(`/education/${user.id}`);
        setEducation(edu.data.length ? edu.data : [{ degree: "", institution: "", year: "" }]);

        // experience
        const exp = await API.get(`/experience/${user.id}`);
        setExperience(exp.data.length ? exp.data : [{ title: "", company: "", startDate: "", endDate: "", salary: "" }]);
      } catch (err) {
        console.error(err);
      }
    };

    fetchData();
  }, [user]);

  // Handlers
  const handleUserChange = (e: any) => setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  const handlePersonalChange = (e: any) => setPersonalInfo({ ...personalInfo, [e.target.name]: e.target.value });

  const handleEducationChange = (index: number, e: any) => {
    const updated = [...education];
    updated[index][e.target.name] = e.target.value;
    setEducation(updated);
  };

  const handleExperienceChange = (index: number, e: any) => {
    const updated = [...experience];
    updated[index][e.target.name] = e.target.value;
    setExperience(updated);
  };

  // Save All
  const handleSave = async () => {
    try {
      // User
      await API.put(`/users/${user?.id}`, userInfo);

      // Personal Info (upsert)
      await API.post(`/personal-info`, { ...personalInfo, userId: user?.id });

      // Education (save multiple)
      for (const edu of education) {
        await API.post(`/education`, { ...edu, userId: user?.id });
      }

      // Experience (save multiple)
      for (const exp of experience) {
        await API.post(`/experience`, { ...exp, userId: user?.id });
      }

      alert("Profile updated ✅");
    } catch (err: any) {
      alert(err.response?.data?.error || "Error saving data");
    }
  };

  return (
    <div className="container mt-4">
  <h2 className="mb-4 text-center">Edit Doctor Profile</h2>

  {/* User Info */}
  <div className="card shadow-sm mb-4">
    <div className="card-header bg-primary text-white">User Info</div>
    <div className="card-body row g-3">
      <div className="col-md-6">
        <input
          name="name"
          value={userInfo.name}
          onChange={handleUserChange}
          className="form-control"
          placeholder="Full Name"
        />
      </div>
      <div className="col-md-6">
        <input
          name="email"
          value={userInfo.email}
          disabled
          className="form-control"
          placeholder="Email"
        />
      </div>
      <div className="col-md-6">
        <input
          name="mobileNumber"
          value={userInfo.mobileNumber}
          onChange={handleUserChange}
          className="form-control"
          placeholder="Mobile Number"
        />
      </div>
    </div>
  </div>

  {/* Personal Info */}
  <div className="card shadow-sm mb-4">
    <div className="card-header bg-primary text-white">Personal Info</div>
    <div className="card-body row g-3">
      <div className="col-md-4">
        <select
          name="gender"
          value={personalInfo.gender}
          onChange={handlePersonalChange}
          className="form-control"
        >
          <option value="">Select Gender</option>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
      </div>
      <div className="col-md-4">
        <input
          type="date"
          name="dob"
          value={personalInfo.dob?.substring(0, 10) || ""}
          onChange={handlePersonalChange}
          className="form-control"
        />
      </div>
      <div className="col-md-4">
        <input
          name="address"
          value={personalInfo.address}
          onChange={handlePersonalChange}
          className="form-control"
          placeholder="Address"
        />
      </div>
      <div className="col-md-6">
        <input
          name="linkedin"
          value={personalInfo.linkedin}
          onChange={handlePersonalChange}
          className="form-control"
          placeholder="LinkedIn Profile"
        />
      </div>
      <div className="col-md-6">
        <input
          name="portfolio"
          value={personalInfo.portfolio}
          onChange={handlePersonalChange}
          className="form-control"
          placeholder="Portfolio Website"
        />
      </div>
    </div>
  </div>

  {/* Doctor Professional Info */}
  <div className="card shadow-sm mb-4">
    <div className="card-header bg-primary text-white">Doctor Professional Info</div>
    <div className="card-body row g-3">
      <div className="col-md-6">
        <input
          name="specialization"
          className="form-control"
          placeholder="Specialization (e.g., Cardiologist)"
        />
      </div>
      <div className="col-md-6">
        <input
          name="licenseNumber"
          className="form-control"
          placeholder="Medical License Number"
        />
      </div>
      <div className="col-md-6">
        <input
          type="number"
          name="experienceYears"
          className="form-control"
          placeholder="Years of Experience"
        />
      </div>
      <div className="col-md-6">
        <input
          name="hospital"
          className="form-control"
          placeholder="Clinic/Hospital Name"
        />
      </div>
      <div className="col-md-12">
        <textarea
          name="availability"
          className="form-control"
          rows="2"
          placeholder="Availability (e.g., Mon-Fri, 10AM - 5PM)"
        ></textarea>
      </div>
    </div>
  </div>

  {/* Education */}
  {/* Education */}
<div className="card shadow-sm mb-4">
  <div className="card-header bg-primary text-white">Education</div>
  <div className="card-body">
    {education.map((edu, i) => (
      <div key={i} className="border rounded p-3 mb-3">
        <div className="row g-3">
          <div className="col-md-4">
            <input
              name="degree"
              value={edu.degree}
              onChange={(e) => handleEducationChange(i, e)}
              className="form-control"
              placeholder="Degree (e.g., MBBS, MD)"
            />
          </div>
          <div className="col-md-4">
            <input
              name="specialization"
              value={edu.specialization}
              onChange={(e) => handleEducationChange(i, e)}
              className="form-control"
              placeholder="Specialization (e.g., Cardiology)"
            />
          </div>
          <div className="col-md-4">
            <input
              name="institution"
              value={edu.institution}
              onChange={(e) => handleEducationChange(i, e)}
              className="form-control"
              placeholder="Institution / University"
            />
          </div>
          <div className="col-md-4">
            <input
              type="number"
              name="year"
              value={edu.year}
              onChange={(e) => handleEducationChange(i, e)}
              className="form-control"
              placeholder="Year of Completion"
            />
          </div>
          <div className="col-md-4">
            <input
              name="grade"
              value={edu.grade}
              onChange={(e) => handleEducationChange(i, e)}
              className="form-control"
              placeholder="Grade / CGPA"
            />
          </div>
          <div className="col-md-4">
            <input
              name="location"
              value={edu.location}
              onChange={(e) => handleEducationChange(i, e)}
              className="form-control"
              placeholder="Location (City, Country)"
            />
          </div>
          <div className="col-md-6">
            <input
              name="certificateId"
              value={edu.certificateId}
              onChange={(e) => handleEducationChange(i, e)}
              className="form-control"
              placeholder="Certificate / License ID"
            />
          </div>
          <div className="col-md-6">
            <input
              type="file"
              name="certificateFile"
              onChange={(e) => handleEducationFileChange(i, e)}
              className="form-control"
            />
          </div>
        </div>
      </div>
    ))}
  </div>
</div>


  {/* Experience */}
  <div className="card shadow-sm mb-4">
    <div className="card-header bg-primary text-white">Experience</div>
    <div className="card-body">
      {experience.map((exp, i) => (
        <div key={i} className="border rounded p-3 mb-3">
          <div className="row g-3">
            <div className="col-md-6">
              <input
                name="title"
                value={exp.title}
                onChange={(e) => handleExperienceChange(i, e)}
                className="form-control"
                placeholder="Job Title"
              />
            </div>
            <div className="col-md-6">
              <input
                name="company"
                value={exp.company}
                onChange={(e) => handleExperienceChange(i, e)}
                className="form-control"
                placeholder="Hospital/Clinic"
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                name="startDate"
                value={exp.startDate?.substring(0, 10) || ""}
                onChange={(e) => handleExperienceChange(i, e)}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                type="date"
                name="endDate"
                value={exp.endDate?.substring(0, 10) || ""}
                onChange={(e) => handleExperienceChange(i, e)}
                className="form-control"
              />
            </div>
            <div className="col-md-6">
              <input
                name="salary"
                value={exp.salary}
                onChange={(e) => handleExperienceChange(i, e)}
                className="form-control"
                placeholder="Salary"
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>

  {/* Save Button */}
  <div className="text-center">
    <button onClick={handleSave} className="btn btn-success px-5 py-2">
      Save All
    </button>
  </div>
</div>

  );
}
