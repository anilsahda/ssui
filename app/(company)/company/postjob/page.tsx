"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Card, Table, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import {
  FaBuilding,
  FaBriefcase,
  FaMapMarkerAlt,
  FaDollarSign,
  FaSync,
} from "react-icons/fa";

const API_BASE = "https://localhost:7269/api";

// ✅ Interfaces — must match backend DTOs exactly
interface CompanyProfile {
  id: number;
  companyName: string;
  industry: string;
  location: string;
  description: string;
  website: string;
}

interface PostJob {
  id: number;
  companyId: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  postedDate?: string;
  company?: CompanyProfile; // ✅ matches .NET navigation property name
}

export default function PostJobsPage() {
  const [jobs, setJobs] = useState<PostJob[]>([]);
  const [formData, setFormData] = useState<PostJob>({
    id: 0,
    companyId: 0,
    title: "",
    description: "",
    location: "",
    salary: "",
  });

  const [loading, setLoading] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // ✅ Fetch all jobs on load
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`${API_BASE}/PostJob`);
      let jobsData: any = res.data;

      // ✅ Normalize .NET API response
      if (Array.isArray(jobsData)) {
        setJobs(jobsData);
      } else if (jobsData?.$values) {
        setJobs(jobsData.$values);
      } else if (jobsData?.data) {
        setJobs(jobsData.data);
      } else {
        setJobs([]);
      }
    } catch (err) {
      console.error("Error fetching post jobs:", err);
      setJobs([]);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Handle input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "companyId" ? Number(value) : value,
    });
  };

  // ✅ Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // ✅ Clean payload to avoid nested objects
      const payload = {
        companyId: formData.companyId,
        title: formData.title,
        description: formData.description,
        location: formData.location,
        salary: formData.salary,
      };

      await axios.post(`${API_BASE}/PostJob`, payload, {
        headers: { "Content-Type": "application/json" },
      });

      alert("✅ Job post created successfully!");
      resetForm();
      fetchJobs();
    } catch (err) {
      console.error("Error creating post job:", err);
      alert("❌ Failed to create job post. Check API connection.");
    } finally {
      setSubmitting(false);
    }
  };

  // ✅ Reset form fields
  const resetForm = () => {
    setFormData({
      id: 0,
      companyId: 0,
      title: "",
      description: "",
      location: "",
      salary: "",
    });
  };

  return (
    <div className="container py-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <h2 className="text-center text-primary mb-4 fw-bold">
        📌 Post Jobs Management
      </h2>

      {/* ✅ Form Section */}
      <Card className="shadow-sm mb-5 border-0">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <FaBuilding className="me-1 text-secondary" /> Company ID
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="companyId"
                    value={formData.companyId}
                    onChange={handleChange}
                    placeholder="Enter company ID"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <FaBriefcase className="me-1 text-secondary" /> Job Title
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder="Enter job title"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={12}>
                <Form.Group>
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    placeholder="Enter job description"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <FaMapMarkerAlt className="me-1 text-secondary" /> Location
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={6}>
                <Form.Group>
                  <Form.Label>
                    <FaDollarSign className="me-1 text-secondary" /> Salary
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="salary"
                    value={formData.salary}
                    onChange={handleChange}
                    placeholder="Enter salary details"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            {/* ✅ Buttons */}
            <div className="d-flex justify-content-between mt-4">
              <Button
                variant="outline-secondary"
                onClick={fetchJobs}
                disabled={loading}
              >
                <FaSync className="me-1" />
                {loading ? "Refreshing..." : "Refresh"}
              </Button>

              <Button
                type="submit"
                className="px-4"
                variant="primary"
                disabled={submitting}
              >
                {submitting ? (
                  <>
                    <Spinner animation="border" size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  "Create Job Post"
                )}
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* ✅ Job List Section */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          <h4 className="text-primary fw-bold mb-3">
            <FaBriefcase className="me-2" />
            Posted Jobs
          </h4>

          {loading ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="primary" />
              <p className="mt-3 text-muted">Loading jobs...</p>
            </div>
          ) : (
            <Table striped bordered hover responsive>
              <thead className="table-primary">
                <tr>
                  <th>ID</th>
                  <th>Company</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Location</th>
                  <th>Salary</th>
                </tr>
              </thead>
              <tbody>
                {!jobs || jobs.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="text-center text-muted py-4">
                      No jobs found.
                    </td>
                  </tr>
                ) : (
                  jobs.map((job) => (
                    <tr key={job.id}>
                      <td>{job.id}</td>
                      <td>{job.company?.companyName || "—"}</td>
                      <td>{job.title}</td>
                      <td>{job.description}</td>
                      <td>{job.location}</td>
                      <td>{job.salary}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
