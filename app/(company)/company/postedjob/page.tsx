"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { Card, Table, Button, Form, Row, Col, Spinner } from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaCalendarAlt,
  FaBriefcase,
  FaToggleOn,
  FaToggleOff,
  FaSyncAlt,
} from "react-icons/fa";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7269/api";

// ✅ Define CompanyProfile model (used in PostJob)
interface CompanyProfile {
  id: number;
  companyName: string;
  industry: string;
  location: string;
  description: string;
  website: string;
}

// ✅ Define PostJob model (matches backend PostJob entity)
interface PostJob {
  id: number;
  companyId: number;
  title: string;
  description: string;
  location: string;
  salary: string;
  postedDate: string;
  company?: CompanyProfile;
}

// ✅ Define PostedJob model (matches backend PostedJob entity)
interface PostedJob {
  id: number;
  postJobId: number;
  isActive: boolean;
  expiryDate: string;
  postJob?: PostJob;
}

export default function PostedJobsPage() {
  const [jobs, setJobs] = useState<PostedJob[]>([]);
  const [formData, setFormData] = useState<PostedJob>({
    id: 0,
    postJobId: 0,
    isActive: true,
    expiryDate: new Date().toISOString().slice(0, 10),
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  // ✅ Fetch all posted jobs
  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setRefreshing(true);
    try {
      const res = await axios.get(`${API_BASE}/PostedJob`);
      const data = res.data;

      // ✅ Handle .NET JSON ($values) array response safely
      const normalized = Array.isArray(data)
        ? data
        : data?.$values
        ? data.$values
        : [];

      setJobs(normalized);
    } catch (err) {
      console.error("Error fetching posted jobs:", err);
      Swal.fire(
        "Error",
        "❌ Failed to fetch jobs. Check API connection.",
        "error"
      );
    } finally {
      setRefreshing(false);
    }
  };

  // ✅ Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type, checked } = e.target as any;
    setFormData({
      ...formData,
      [name]:
        type === "checkbox"
          ? checked
          : name === "postJobId"
          ? Number(value)
          : value,
    });
  };

  // ✅ Create or Update Posted Job
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    const payload = {
      id: formData.id,
      postJobId: formData.postJobId,
      isActive: formData.isActive,
      expiryDate: new Date(formData.expiryDate).toISOString(),
    };

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/PostedJob/${editingId}`, payload);
        Swal.fire("Updated", "✅ Posted job updated successfully!", "success");
      } else {
        await axios.post(`${API_BASE}/PostedJob`, payload);
        Swal.fire("Created", "✅ Posted job created successfully!", "success");
      }
      resetForm();
      fetchJobs();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "❌ Failed to save posted job.", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (job: PostedJob) => {
    setFormData({
      id: job.id,
      postJobId: job.postJobId,
      isActive: job.isActive,
      expiryDate: job.expiryDate
        ? job.expiryDate.slice(0, 10)
        : new Date().toISOString().slice(0, 10),
    });
    setEditingId(job.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirmDelete = await Swal.fire({
      title: "Are you sure?",
      text: "This will permanently delete the posted job.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      cancelButtonText: "Cancel",
    });

    if (!confirmDelete.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/PostedJob/${id}`);
      Swal.fire("Deleted", "🗑️ Posted job deleted successfully!", "success");
      fetchJobs();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "❌ Failed to delete job!", "error");
    }
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      postJobId: 0,
      isActive: true,
      expiryDate: new Date().toISOString().slice(0, 10),
    });
    setEditingId(null);
  };

  return (
    <div className="container py-5" style={{ fontFamily: "Inter, sans-serif" }}>
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="fw-bold text-primary">💼 Posted Jobs Management</h2>
        <Button
          variant="outline-primary"
          onClick={fetchJobs}
          disabled={refreshing}
        >
          {refreshing ? (
            <>
              <Spinner animation="border" size="sm" className="me-2" />{" "}
              Refreshing...
            </>
          ) : (
            <>
              <FaSyncAlt className="me-1" /> Refresh
            </>
          )}
        </Button>
      </div>

      {/* ✅ Form Card */}
      <Card className="shadow-sm border-0 mb-5">
        <Card.Header className="bg-primary text-white fw-semibold">
          {editingId ? "✏️ Edit Posted Job" : "🆕 Add New Posted Job"}
        </Card.Header>
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>
                    <FaBriefcase className="me-1" /> Post Job ID
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="postJobId"
                    value={formData.postJobId}
                    onChange={handleChange}
                    required
                    placeholder="Enter Post Job ID"
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>
                    <FaCalendarAlt className="me-1" /> Expiry Date
                  </Form.Label>
                  <Form.Control
                    type="date"
                    name="expiryDate"
                    value={formData.expiryDate || ""}
                    onChange={handleChange}
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group className="d-flex align-items-center mt-4">
                  <Form.Check
                    type="checkbox"
                    name="isActive"
                    label={
                      formData.isActive ? (
                        <>
                          <FaToggleOn className="text-success me-1" /> Active
                        </>
                      ) : (
                        <>
                          <FaToggleOff className="text-danger me-1" /> Inactive
                        </>
                      )
                    }
                    checked={formData.isActive}
                    onChange={handleChange}
                  />
                </Form.Group>
              </Col>
            </Row>

            <div className="mt-4 d-flex gap-2">
              <Button
                type="submit"
                variant={editingId ? "warning" : "primary"}
                disabled={loading}
              >
                {loading ? (
                  <Spinner animation="border" size="sm" />
                ) : editingId ? (
                  "Update Posted Job"
                ) : (
                  "Create Posted Job"
                )}
              </Button>
              {editingId && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* ✅ Table Card */}
      <Card className="shadow-sm border-0">
        <Card.Header className="bg-light fw-semibold text-secondary">
          Posted Jobs List
        </Card.Header>
        <Card.Body className="p-0">
          <Table hover responsive className="mb-0">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Post Job ID</th>
                <th>Title</th>
                <th>Description</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {jobs.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center text-muted p-4">
                    No posted jobs found.
                  </td>
                </tr>
              ) : (
                jobs.map((job) => (
                  <tr key={job.id} className="align-middle">
                    <td>{job.id}</td>
                    <td>{job.postJobId}</td>
                    <td>{job.postJob?.title || "-"}</td>
                    <td>{job.postJob?.description || "-"}</td>
                    <td>
                      {job.expiryDate
                        ? new Date(job.expiryDate).toLocaleDateString()
                        : "-"}
                    </td>
                    <td>
                      {job.isActive ? (
                        <span className="badge bg-success px-3 py-2">
                          Active
                        </span>
                      ) : (
                        <span className="badge bg-danger px-3 py-2">
                          Inactive
                        </span>
                      )}
                    </td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => handleEdit(job)}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(job.id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
