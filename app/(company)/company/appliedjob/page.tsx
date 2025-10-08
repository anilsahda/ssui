"use client"; // if you're using Next.js App Router

import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { Button, Table, Form } from "react-bootstrap";

// ✅ TypeScript interface for AppliedJob entity
interface AppliedJob {
  id: number;
  jobTitle: string;
  companyName: string;
  applicantName: string;
  applicantEmail: string;
  appliedDate: string;
}

// ✅ API Base URL — replace with your .NET Core API URL
const API_BASE_URL = "https://localhost:7070/api/AppliedJob";

export default function AppliedJobPage() {
  const [appliedJobs, setAppliedJobs] = useState<AppliedJob[]>([]);
  const [formData, setFormData] = useState<AppliedJob>({
    id: 0,
    jobTitle: "",
    companyName: "",
    applicantName: "",
    applicantEmail: "",
    appliedDate: "",
  });
  const [editing, setEditing] = useState<boolean>(false);

  // ✅ Fetch all records
  const fetchAppliedJobs = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setAppliedJobs(response.data);
    } catch (error) {
      console.error("Error fetching applied jobs:", error);
    }
  };

  useEffect(() => {
    fetchAppliedJobs();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Handle form submission (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_BASE_URL}/${formData.id}`, formData);
        alert("Record updated successfully!");
      } else {
        await axios.post(API_BASE_URL, formData);
        alert("Record added successfully!");
      }
      setFormData({
        id: 0,
        jobTitle: "",
        companyName: "",
        applicantName: "",
        applicantEmail: "",
        appliedDate: "",
      });
      setEditing(false);
      fetchAppliedJobs();
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // ✅ Handle delete
  const handleDelete = async (id: number) => {
    if (confirm("Are you sure you want to delete this record?")) {
      try {
        await axios.delete(`${API_BASE_URL}/${id}`);
        alert("Deleted successfully!");
        fetchAppliedJobs();
      } catch (error) {
        console.error("Error deleting record:", error);
      }
    }
  };

  // ✅ Handle edit
  const handleEdit = (job: AppliedJob) => {
    setFormData(job);
    setEditing(true);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {editing ? "Edit Applied Job" : "Add New Applied Job"}
      </h2>

      {/* ✅ Form */}
      <Form onSubmit={handleSubmit}>
        <div className="row g-3 mb-3">
          <div className="col-md-4">
            <Form.Group controlId="jobTitle">
              <Form.Label>Job Title</Form.Label>
              <Form.Control
                type="text"
                name="jobTitle"
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder="Enter job title"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-4">
            <Form.Group controlId="companyName">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-4">
            <Form.Group controlId="applicantName">
              <Form.Label>Applicant Name</Form.Label>
              <Form.Control
                type="text"
                name="applicantName"
                value={formData.applicantName}
                onChange={handleChange}
                placeholder="Enter applicant name"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="applicantEmail">
              <Form.Label>Applicant Email</Form.Label>
              <Form.Control
                type="email"
                name="applicantEmail"
                value={formData.applicantEmail}
                onChange={handleChange}
                placeholder="Enter email"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="appliedDate">
              <Form.Label>Applied Date</Form.Label>
              <Form.Control
                type="date"
                name="appliedDate"
                value={formData.appliedDate}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </div>
        </div>

        <Button type="submit" variant={editing ? "warning" : "primary"}>
          {editing ? "Update" : "Submit"}
        </Button>
        {editing && (
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => {
              setEditing(false);
              setFormData({
                id: 0,
                jobTitle: "",
                companyName: "",
                applicantName: "",
                applicantEmail: "",
                appliedDate: "",
              });
            }}
          >
            Cancel
          </Button>
        )}
      </Form>

      <hr className="my-4" />

      {/* ✅ Table */}
      <h3 className="text-center mb-3">Applied Jobs List</h3>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>ID</th>
            <th>Job Title</th>
            <th>Company</th>
            <th>Applicant</th>
            <th>Email</th>
            <th>Applied Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appliedJobs.map((job) => (
            <tr key={job.id}>
              <td>{job.id}</td>
              <td>{job.jobTitle}</td>
              <td>{job.companyName}</td>
              <td>{job.applicantName}</td>
              <td>{job.applicantEmail}</td>
              <td>{job.appliedDate ? job.appliedDate.substring(0, 10) : ""}</td>
              <td>
                <Button
                  variant="info"
                  size="sm"
                  onClick={() => handleEdit(job)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(job.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
