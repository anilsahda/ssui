"use client"; // if using Next.js app router, else remove

import React, { useState, useEffect } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  Card,
} from "react-bootstrap";

interface House {
  id: number;
  name: string;
  address?: string;
}

interface SellHouseReport {
  id: number;
  houseId: number;
  price: number;
  description: string;
  reportDate: string;
  house?: House;
}

export default function SellHouseReportsPage() {
  const [reports, setReports] = useState<SellHouseReport[]>([]);
  const [houses, setHouses] = useState<House[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingReport, setEditingReport] = useState<SellHouseReport | null>(
    null
  );

  const [formHouseId, setFormHouseId] = useState<number | "">("");
  const [formPrice, setFormPrice] = useState<number | "">("");
  const [formDescription, setFormDescription] = useState("");

  useEffect(() => {
    fetchReports();
    fetchHouses();
  }, []);

  async function fetchReports() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://localhost:7255/api/SellHouseReports");
      if (!res.ok) throw new Error("Failed to fetch reports.");
      const data: SellHouseReport[] = await res.json();
      setReports(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchHouses() {
    try {
      const res = await fetch("https://localhost:7255/api/House");
      if (!res.ok) throw new Error("Failed to fetch houses.");
      const data: House[] = await res.json();
      setHouses(data);
    } catch (err) {
      console.error(err);
    }
  }

  function openModal(report?: SellHouseReport) {
    if (report) {
      setEditingReport(report);
      setFormHouseId(report.houseId);
      setFormPrice(report.price);
      setFormDescription(report.description);
    } else {
      setEditingReport(null);
      setFormHouseId("");
      setFormPrice("");
      setFormDescription("");
    }
    setError(null);
    setSuccess(null);
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      formHouseId === "" ||
      formPrice === "" ||
      formDescription.trim() === ""
    ) {
      setError("Please fill in all fields.");
      return;
    }

    setLoading(true);
    try {
      const body = {
        id: editingReport?.id,
        houseId: formHouseId,
        price: formPrice,
        description: formDescription.trim(),
      };

      const method = editingReport ? "PUT" : "POST";
      const url = editingReport
        ? `https://localhost:7255/api/SellHouseReports/${editingReport.id}`
        : "https://localhost:7255/api/SellHouseReports";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to save report");
      }

      setSuccess(
        editingReport
          ? "Report updated successfully."
          : "Report created successfully."
      );
      fetchReports();
      closeModal();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    const confirmed = confirm("Are you sure you want to delete this report?");
    if (!confirmed) return;

    setLoading(true);
    setError(null);
    setSuccess(null);
    try {
      const res = await fetch(
        `https://localhost:7255/api/SellHouseReports/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to delete report.");
      }
      setSuccess("Report deleted successfully.");
      fetchReports();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Sell House Reports</h2>

      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      {success && (
        <Alert variant="success" onClose={() => setSuccess(null)} dismissible>
          {success}
        </Alert>
      )}

      <Button variant="primary" className="mb-3" onClick={() => openModal()}>
        + New Report
      </Button>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {reports.length === 0 && !loading ? (
        <p className="text-center">No reports found</p>
      ) : (
        reports.map((r) => (
          <Card className="mb-3" key={r.id}>
            <Card.Body>
              <Card.Title>
                {r.house?.name || `House ${r.houseId}`} - ${r.price}
              </Card.Title>
              <Card.Subtitle className="mb-2 text-muted">
                {new Date(r.reportDate).toLocaleString()}
              </Card.Subtitle>
              <Card.Text>{r.description}</Card.Text>
              <Button
                variant="warning"
                size="sm"
                className="me-2"
                onClick={() => openModal(r)}
              >
                Edit
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDelete(r.id)}
              >
                Delete
              </Button>
            </Card.Body>
          </Card>
        ))
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={closeModal} backdrop="static" centered>
        <Modal.Header closeButton>
          <Modal.Title>
            {editingReport ? "Edit Report" : "New Report"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formHouse">
              <Form.Label>House</Form.Label>
              <Form.Select
                value={formHouseId}
                onChange={(e) => setFormHouseId(Number(e.target.value))}
                required
                disabled={loading}
              >
                <option value="">Select House</option>
                {houses.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formPrice">
              <Form.Label>Price</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter price"
                value={formPrice}
                onChange={(e) => setFormPrice(Number(e.target.value))}
                required
                disabled={loading}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                required
                disabled={loading}
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal} disabled={loading}>
              Cancel
            </Button>
            <Button variant="primary" type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Spinner size="sm" animation="border" className="me-2" />
                  Saving...
                </>
              ) : editingReport ? (
                "Update Report"
              ) : (
                "Create Report"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
