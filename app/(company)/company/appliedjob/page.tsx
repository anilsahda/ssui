"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaEdit, FaTrash } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE = "https://localhost:7269/api/AppliedJob";

interface AppliedJob {
  id: number;
  JobSeekerId: number;
  postJobId: number;
  appliedDate: string;
}

export default function AppliedJobPage() {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [formData, setFormData] = useState<AppliedJob>({
    id: 0,
    JobSeekerId: 0,
    postJobId: 0,
    appliedDate: new Date().toISOString().split("T")[0],
  });
  const [isEditing, setIsEditing] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchAppliedJobs();
    AOS.init({ duration: 800, easing: "ease-in-out" });
  }, []);

  const fetchAppliedJobs = async () => {
    try {
      const res = await axios.get(API_BASE);
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];
      setAppliedJobs(data);
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch records", "error");
      setAppliedJobs([]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "JobSeekerId" || name === "postJobId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/${formData.id}`, formData);
        Swal.fire("Updated!", "Record updated successfully", "success");
      } else {
        await axios.post(API_BASE, formData);
        Swal.fire("Success!", "Record added successfully", "success");
      }
      resetForm();
      fetchAppliedJobs();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to save record", "error");
    }
  };

  const handleEdit = (job: AppliedJob) => {
    setFormData(job);
    setIsEditing(true);
    setShowForm(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/${id}`);
        Swal.fire("Deleted!", "Record has been deleted.", "success");
        fetchAppliedJobs();
      } catch (err) {
        Swal.fire("Error", "Failed to delete record", "error");
      }
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      JobSeekerId: 0,
      postJobId: 0,
      appliedDate: new Date().toISOString().split("T")[0],
    });
    setIsEditing(false);
    setShowForm(false);
  };

  const filteredJobs = Array.isArray(appliedJobs)
    ? appliedJobs.filter(
        (job) =>
          job.JobSeekerId.toString().includes(search) ||
          job.postJobId.toString().includes(search)
      )
    : [];

  return (
    <div className="container py-5">
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        data-aos="fade-down"
      >
        <h2 className="text-primary">📋 Applied Jobs Management</h2>
        <button
          onClick={() => setShowForm(!showForm)}
          className={`btn btn-${showForm ? "secondary" : "success"}`}
        >
          {showForm ? "Close Form" : "Add Job"}
        </button>
      </div>

      {/* Search */}
      <div className="mb-4" data-aos="fade-right">
        <input
          type="text"
          placeholder="Search by JobSeekerId or PostJobId..."
          className="form-control"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Form */}
      {showForm && (
        <div className="card shadow-lg mb-5 p-4" data-aos="zoom-in">
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label className="form-label">Job Seeker ID</label>
              <input
                type="number"
                name="JobSeekerId"
                value={formData.JobSeekerId}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Post Job ID</label>
              <input
                type="number"
                name="postJobId"
                value={formData.postJobId}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-md-6">
              <label className="form-label">Applied Date</label>
              <input
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                className="form-control"
                required
              />
            </div>
            <div className="col-12 d-flex justify-content-end gap-2 mt-3">
              <button
                type="submit"
                className={`btn ${isEditing ? "btn-warning" : "btn-success"}`}
              >
                {isEditing ? "Update" : "Submit"}
              </button>
              <button
                type="button"
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Table */}
      <div className="card shadow-lg overflow-hidden" data-aos="fade-up">
        {filteredJobs.length > 0 ? (
          <div className="table-responsive">
            <table className="table table-hover mb-0 align-middle">
              <thead className="table-primary">
                <tr>
                  <th>#</th>
                  <th>Job Seeker ID</th>
                  <th>Post Job ID</th>
                  <th>Applied Date</th>
                  <th className="text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredJobs.map((job, index) => (
                  <tr key={job.id}>
                    <td>{index + 1}</td>
                    <td>{job.JobSeekerId}</td>
                    <td>{job.postJobId}</td>
                    <td>{job.appliedDate.substring(0, 10)}</td>
                    <td className="text-center d-flex justify-content-center gap-2">
                      <button
                        onClick={() => handleEdit(job)}
                        className="btn btn-sm btn-warning"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => handleDelete(job.id)}
                        className="btn btn-sm btn-danger"
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="text-center py-5 text-muted">No records found.</div>
        )}
      </div>
    </div>
  );
}
