"use client";

import React, { useEffect, useState } from "react";
import {
  Container,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
  ListGroup,
} from "react-bootstrap";

// -----------------------------
// Type Definitions
// -----------------------------
interface House {
  id: number;
  name: string;
}

interface HouseReport {
  id: number;
  houseId: number;
  description: string;
  reportDate: string;
  house?: House;
}

// -----------------------------
// Main Component
// -----------------------------
export default function HouseReportsPage() {
  const [reports, setReports] = useState<HouseReport[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [houseId, setHouseId] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // -----------------------------
  // Fetch reports and houses
  // -----------------------------
  useEffect(() => {
    fetchReports();
    fetchHouses();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("https://localhost:7255/api/HouseReports");
      if (!res.ok) throw new Error("Failed to fetch reports.");
      const data = await res.json();

      if (Array.isArray(data)) {
        setReports(data);
      } else {
        throw new Error("Invalid data format received for reports.");
      }
    } catch (err) {
      setError((err as Error).message);
      setReports([]);
    }
  };

  const fetchHouses = async () => {
    try {
      const res = await fetch("https://localhost:7255/api/Houses");
      if (!res.ok) throw new Error("Failed to fetch houses.");
      const data = await res.json();

      if (Array.isArray(data)) {
        setHouses(data);
      } else {
        throw new Error("Invalid data format received for houses.");
      }
    } catch (err) {
      setError((err as Error).message);
      setHouses([]);
    }
  };

  // -----------------------------
  // Handle form submission
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!houseId || !description.trim()) {
      setError("Please select a house and enter a description.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("https://localhost:7255/api/HouseReports", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          houseId,
          description,
        }),
      });

      if (!res.ok) {
        const message = await res.text();
        throw new Error(message || "Failed to submit report.");
      }

      setDescription("");
      setHouseId("");
      setSuccess("Report submitted successfully.");
      await fetchReports();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Handle delete
  // -----------------------------
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`https://localhost:7255/api/HouseReports/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error("Failed to delete the report.");

      setSuccess("Report deleted successfully.");
      await fetchReports();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // -----------------------------
  // Render
  // -----------------------------
  return (
    <Container className="py-4">
      <h2 className="mb-4">House Reports</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Report Form */}
      <Form onSubmit={handleSubmit} className="mb-5">
        <h5 className="mb-3">Submit a New Report</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>House</Form.Label>
              <Form.Select
                value={houseId}
                onChange={(e) => setHouseId(Number(e.target.value))}
                required
              >
                <option value="">Select a house</option>
                {houses.map((house) => (
                  <option key={house.id} value={house.id}>
                    {house.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Submit Report"}
        </Button>
      </Form>

      {/* Reports List (No Table) */}
      <h5 className="mb-3">Existing Reports</h5>
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ListGroup>
          {reports.map((report) => (
            <ListGroup.Item
              key={report.id}
              className="d-flex justify-content-between align-items-start flex-column flex-md-row"
            >
              <div className="mb-2 mb-md-0">
                <strong>House:</strong> {report.house?.name ?? "N/A"} <br />
                <strong>Description:</strong> {report.description} <br />
                <strong>Date:</strong>{" "}
                {new Date(report.reportDate).toLocaleString()}
              </div>
              <div>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(report.id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
