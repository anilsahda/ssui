"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Modal, Button, Spinner } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface JobSeekerReport {
  id: number;
  jobSeekerId: number;
  reportReason: string;
  reportedAt: string; // ISO date string
}

export default function JobSeekerReportsPage() {
  const [reports, setReports] = useState<JobSeekerReport[]>([]);
  const [formData, setFormData] = useState<JobSeekerReport>({
    id: 0,
    jobSeekerId: 0,
    reportReason: "",
    reportedAt: new Date().toISOString().split("T")[0],
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<number | null>(null);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await axios.get(`${API_BASE}/JobSeekerReport`);
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];
      setReports(data);
    } catch (err) {
      console.error("Error fetching reports:", err);
      setReports([]);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "jobSeekerId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId !== null) {
        await axios.put(`${API_BASE}/JobSeekerReport/${editingId}`, formData);
      } else {
        await axios.post(`${API_BASE}/JobSeekerReport`, formData);
      }
      setFormData({
        id: 0,
        jobSeekerId: 0,
        reportReason: "",
        reportedAt: new Date().toISOString().split("T")[0],
      });
      setEditingId(null);
      fetchReports();
    } catch (err) {
      console.error("Error saving report:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (report: JobSeekerReport) => {
    setFormData({
      ...report,
      reportedAt: report.reportedAt.split("T")[0],
    });
    setEditingId(report.id);
  };

  const confirmDelete = (id: number) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (deleteId === null) return;
    try {
      await axios.delete(`${API_BASE}/JobSeekerReport/${deleteId}`);
      fetchReports();
    } catch (err) {
      console.error("Error deleting report:", err);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center mb-5 text-primary" data-aos="fade-down">
        📄 Job Seeker Reports
      </h1>

      {/* Form Card */}
      <div className="card shadow-lg mb-5" data-aos="fade-right">
        <div className="card-body">
          <h5 className="card-title mb-4">
            {editingId !== null ? "Edit Report ✏️" : "Create New Report ➕"}
          </h5>
          <form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <label className="form-label">Job Seeker ID</label>
                <input
                  type="number"
                  className="form-control"
                  name="jobSeekerId"
                  value={formData.jobSeekerId}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Report Reason</label>
                <input
                  type="text"
                  className="form-control"
                  name="reportReason"
                  value={formData.reportReason}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6">
                <label className="form-label">Reported At</label>
                <input
                  type="date"
                  className="form-control"
                  name="reportedAt"
                  value={formData.reportedAt}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>
            <button
              type="submit"
              className="btn btn-primary mt-4 w-100"
              disabled={loading}
            >
              {loading && (
                <Spinner animation="border" size="sm" className="me-2" />
              )}
              {editingId !== null ? "Update Report" : "Create Report"}
            </button>
          </form>
        </div>
      </div>

      {/* Reports Table */}
      <div className="table-responsive" data-aos="fade-left">
        <table className="table table-hover table-striped align-middle shadow-sm">
          <thead className="table-primary">
            <tr>
              <th>ID</th>
              <th>Job Seeker ID</th>
              <th>Report Reason</th>
              <th>Reported At</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length > 0 ? (
              reports.map((report) => (
                <tr key={report.id}>
                  <td>{report.id}</td>
                  <td>{report.jobSeekerId}</td>
                  <td>{report.reportReason}</td>
                  <td>{new Date(report.reportedAt).toLocaleDateString()}</td>
                  <td className="text-center">
                    <Button
                      variant="warning"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(report)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => confirmDelete(report.id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center text-muted">
                  No reports found 😔
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this report?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
