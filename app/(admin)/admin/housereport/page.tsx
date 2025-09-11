"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Form,
  Button,
  Alert,
  Row,
  Col,
  Spinner,
} from "react-bootstrap";

interface House {
  id: number;
  name: string;
}

interface HouseReport {
  id: number;
  houseId: number;
  description: string;
  reportDate: string;
  house: House;
}

export default function HouseReportsPage() {
  const [reports, setReports] = useState<HouseReport[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [houseId, setHouseId] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    fetchReports();
    fetchHouses();
  }, []);

  const fetchReports = async () => {
    try {
      const res = await fetch("https://localhost:7255/api/HouseReports");
      if (!res.ok) throw new Error("Failed to fetch reports.");
      const data: HouseReport[] = await res.json();
      setReports(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const fetchHouses = async () => {
    try {
      const res = await fetch("https://localhost:7255/api/Houses");
      if (!res.ok) throw new Error("Failed to fetch houses.");
      const data: House[] = await res.json();
      setHouses(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

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
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ houseId, description }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      setDescription("");
      setHouseId("");
      setSuccess("Report submitted successfully.");
      fetchReports();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`https://localhost:7255/api/HouseReports/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete report.");
      setSuccess("Report deleted.");
      fetchReports();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">House Reports</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      {/* Form */}
      <Form onSubmit={handleSubmit} className="mb-5">
        <h5 className="mb-3">Submit New Report</h5>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>House</Form.Label>
              <Form.Select
                value={houseId}
                onChange={(e) => setHouseId(Number(e.target.value))}
              >
                <option value="">Select House</option>
                {houses.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
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
              />
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" disabled={loading}>
          {loading ? <Spinner size="sm" animation="border" /> : "Submit"}
        </Button>
      </Form>

      {/* Reports Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>House</th>
            <th>Description</th>
            <th>Report Date</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.house?.name}</td>
              <td>{report.description}</td>
              <td>{new Date(report.reportDate).toLocaleString()}</td>
              <td>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => handleDelete(report.id)}
                  disabled={loading}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
}
