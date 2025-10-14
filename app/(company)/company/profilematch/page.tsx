"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import { Card, Table, Form, Row, Col, Button, Spinner } from "react-bootstrap";
import { FaUser, FaPercentage, FaBriefcase } from "react-icons/fa";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7269/api";

interface ProfileMatch {
  id: number;
  jobSeekerId: number;
  jobId: number;
  matchScore: number;
}

export default function ProfileMatchesPage() {
  const [matches, setMatches] = useState<ProfileMatch[]>([]);
  const [formData, setFormData] = useState<ProfileMatch>({
    id: 0,
    jobId: 0,
    jobSeekerId: 0,
    matchScore: 0,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  // ✅ Fetch matches safely
  const fetchMatches = async () => {
    try {
      setFetching(true);
      const res = await axios.get(`${API_BASE}/ProfileMatch`);

      // ✅ Handle .NET JSON format with $values
      const data = Array.isArray(res.data) ? res.data : res.data?.$values || [];

      setMatches(data);
    } catch (err) {
      console.error("Error fetching profile matches:", err);
      alert("Failed to load profile matches.");
    } finally {
      setFetching(false);
    }
  };

  useEffect(() => {
    fetchMatches();
  }, []);

  // ✅ Handle input changes
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: ["jobId", "jobSeekerId", "matchScore"].includes(name)
        ? Number(value)
        : value,
    });
  };

  // ✅ Submit (POST/PUT)
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/ProfileMatch/${editingId}`, formData);
        alert("Profile match updated successfully!");
      } else {
        await axios.post(`${API_BASE}/ProfileMatch`, formData);
        alert("Profile match created successfully!");
      }

      setFormData({ id: 0, jobId: 0, jobSeekerId: 0, matchScore: 0 });
      setEditingId(null);
      fetchMatches();
    } catch (err) {
      console.error("Error saving profile match:", err);
      alert("An error occurred while saving data.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Edit existing entry
  const handleEdit = (match: ProfileMatch) => {
    setFormData(match);
    setEditingId(match.id);
  };

  // ✅ Delete entry
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this profile match?")) return;
    try {
      await axios.delete(`${API_BASE}/ProfileMatch/${id}`);
      alert("Profile match deleted successfully!");
      fetchMatches();
    } catch (err) {
      console.error("Error deleting profile match:", err);
    }
  };

  return (
    <div className="container py-5">
      <h1 className="text-center text-success mb-4 fw-bold">
        🔗 Profile Matches
      </h1>

      {/* --- Form Card --- */}
      <Card className="shadow-sm mb-5 border-0">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={4}>
                <Form.Group>
                  <Form.Label>
                    <FaBriefcase className="me-1" /> Job ID
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="jobId"
                    value={formData.jobId}
                    onChange={handleChange}
                    placeholder="Enter Job ID"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>
                    <FaUser className="me-1" /> Job Seeker ID
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="jobSeekerId"
                    value={formData.jobSeekerId}
                    onChange={handleChange}
                    placeholder="Enter Job Seeker ID"
                    required
                  />
                </Form.Group>
              </Col>

              <Col md={4}>
                <Form.Group>
                  <Form.Label>
                    <FaPercentage className="me-1" /> Match Score (%)
                  </Form.Label>
                  <Form.Control
                    type="number"
                    name="matchScore"
                    value={formData.matchScore}
                    onChange={handleChange}
                    min={0}
                    max={100}
                    placeholder="Enter match score"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Button
              type="submit"
              className="mt-3 w-100"
              variant={editingId ? "warning" : "success"}
              disabled={loading}
            >
              {loading
                ? "Saving..."
                : editingId
                ? "Update Profile Match"
                : "Create Profile Match"}
            </Button>
          </Form>
        </Card.Body>
      </Card>

      {/* --- Table Card --- */}
      <Card className="shadow-sm border-0">
        <Card.Body>
          {fetching ? (
            <div className="text-center py-5">
              <Spinner animation="border" variant="success" />
              <p className="mt-2 text-muted">Loading profile matches...</p>
            </div>
          ) : matches.length === 0 ? (
            <div className="text-center text-muted p-4">
              No profile matches found.
            </div>
          ) : (
            <Table striped bordered hover responsive className="text-center">
              <thead className="table-success">
                <tr>
                  <th>ID</th>
                  <th>Job ID</th>
                  <th>Job Seeker ID</th>
                  <th>Match Score (%)</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {matches.map((match) => (
                  <tr key={match.id}>
                    <td>{match.id}</td>
                    <td>{match.jobId}</td>
                    <td>{match.jobSeekerId}</td>
                    <td>{match.matchScore}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="warning"
                        className="me-2"
                        onClick={() => handleEdit(match)}
                      >
                        Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(match.id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          )}
        </Card.Body>
      </Card>
    </div>
  );
}
