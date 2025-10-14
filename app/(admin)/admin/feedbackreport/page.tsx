"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { Button, Table, Form, Spinner, Card } from "react-bootstrap";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface FeedbackReport {
  id: number;
  userId: number;
  feedback: string;
  submittedAt?: string;
}

export default function FeedbackReportsPage() {
  const [feedbacks, setFeedbacks] = useState<FeedbackReport[]>([]);
  const [formData, setFormData] = useState<FeedbackReport>({
    id: 0,
    userId: 0,
    feedback: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  useEffect(() => {
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    setFetching(true);
    try {
      const res = await axios.get(`${API_BASE}/FeedbackReport`);
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data.data)
        ? res.data.data
        : [];
      setFeedbacks(data);
    } catch (err) {
      console.error("Error fetching feedbacks:", err);
      setFeedbacks([]);
    } finally {
      setFetching(false);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "userId" ? Number(value) : value,
    }));
  };

  const showToast = (icon: any, title: string) => {
    Swal.fire({
      icon,
      title,
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 2000,
      timerProgressBar: true,
    });
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/FeedbackReport/${editingId}`, formData);
        showToast("success", "Feedback updated successfully!");
      } else {
        await axios.post(`${API_BASE}/FeedbackReport`, formData);
        showToast("success", "Feedback submitted successfully!");
      }
      setFormData({ id: 0, userId: 0, feedback: "" });
      setEditingId(null);
      fetchFeedbacks();
    } catch (error) {
      console.error("Error saving feedback:", error);
      showToast("error", "Failed to save feedback.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (feedback: FeedbackReport) => {
    setFormData(feedback);
    setEditingId(feedback.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This feedback will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/FeedbackReport/${id}`);
        showToast("success", "Feedback removed successfully!");
        fetchFeedbacks();
      } catch (err) {
        console.error("Error deleting feedback:", err);
        showToast("error", "Failed to delete feedback.");
      }
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-primary mb-5 display-5">
        📝 Feedback Reports
      </h1>

      {/* Feedback Form */}
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Card.Title className="text-center mb-4">
            {editingId ? "✏️ Edit Feedback" : "💬 Submit Your Feedback"}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <div className="row g-3">
              <div className="col-md-6">
                <Form.Group controlId="userId">
                  <Form.Label>User ID</Form.Label>
                  <Form.Control
                    type="number"
                    name="userId"
                    value={formData.userId}
                    onChange={handleChange}
                    placeholder="Enter user ID"
                    required
                  />
                </Form.Group>
              </div>
              <div className="col-md-12">
                <Form.Group controlId="feedback">
                  <Form.Label>Feedback</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="feedback"
                    value={formData.feedback}
                    onChange={handleChange}
                    placeholder="Write your feedback here..."
                    required
                  />
                </Form.Group>
              </div>
            </div>
            <Button
              type="submit"
              variant="primary"
              className="mt-4 w-100"
              disabled={loading}
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />{" "}
                  Saving...
                </>
              ) : editingId ? (
                "Update Feedback"
              ) : (
                "Submit Feedback"
              )}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* Feedback Table */}
      <Card className="shadow-sm">
        <Card.Body className="p-0">
          <Table responsive hover className="mb-0">
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>User ID</th>
                <th>Feedback</th>
                <th>Submitted At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {fetching ? (
                <tr>
                  <td colSpan={5} className="text-center py-3 text-muted">
                    <Spinner animation="border" size="sm" className="me-2" />
                    Loading feedbacks...
                  </td>
                </tr>
              ) : feedbacks.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-3 text-muted">
                    No feedback found.
                  </td>
                </tr>
              ) : (
                feedbacks.map((f) => (
                  <tr key={f.id} className="align-middle">
                    <td>{f.id}</td>
                    <td>{f.userId}</td>
                    <td
                      className="text-truncate"
                      style={{ maxWidth: "300px" }}
                      title={f.feedback}
                    >
                      {f.feedback}
                    </td>
                    <td>
                      {f.submittedAt
                        ? new Date(f.submittedAt).toLocaleString()
                        : "-"}
                    </td>
                    <td className="text-center">
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-1"
                        onClick={() => handleEdit(f)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(f.id)}
                      >
                        Delete
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
