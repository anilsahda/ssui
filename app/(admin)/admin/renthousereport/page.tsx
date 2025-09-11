"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
} from "react-bootstrap";

interface House {
  id: number;
  name: string;
  address?: string;
  // any other fields
}

interface RentHouseReport {
  id: number;
  houseId: number;
  rentAmount: number;
  description: string;
  reportDate: string; // ISO
  house?: House;
}

export default function RentHouseReportsPage() {
  const [reports, setReports] = useState<RentHouseReport[]>([]);
  const [houses, setHouses] = useState<House[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingReport, setEditingReport] = useState<RentHouseReport | null>(
    null
  );

  // Form fields
  const [formHouseId, setFormHouseId] = useState<number | "">("");
  const [formRentAmount, setFormRentAmount] = useState<number | "">("");
  const [formDescription, setFormDescription] = useState("");

  useEffect(() => {
    fetchReports();
    fetchHouses();
  }, []);

  async function fetchReports() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://localhost:7255/api/RentHouseReports");
      if (!res.ok) throw new Error("Failed to fetch rent house reports.");
      const data: RentHouseReport[] = await res.json();
      setReports(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function fetchHouses() {
    try {
      const res = await fetch("https://localhost:7255/api/Houses");
      if (!res.ok) throw new Error("Failed to fetch houses.");
      const data: House[] = await res.json();
      setHouses(data);
    } catch (err) {
      console.error("Error fetching houses:", err);
    }
  }

  function openModal(report?: RentHouseReport) {
    if (report) {
      // edit mode
      setEditingReport(report);
      setFormHouseId(report.houseId);
      setFormRentAmount(report.rentAmount);
      setFormDescription(report.description);
    } else {
      // new
      setEditingReport(null);
      setFormHouseId("");
      setFormRentAmount("");
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

    // validation
    if (
      formHouseId === "" ||
      formRentAmount === "" ||
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
        rentAmount: formRentAmount,
        description: formDescription.trim(),
      };

      const method = editingReport ? "PUT" : "POST";
      const url = editingReport
        ? `https://localhost:7255/api/RentHouseReports/${editingReport.id}`
        : "https://localhost:7255/api/RentHouseReports";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to save report.");
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
    if (!confirm("Are you sure you want to delete this report?")) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(
        `https://localhost:7255/api/RentHouseReports/${id}`,
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
      <h2 className="mb-4">Rent House Reports</h2>

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

      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>#</th>
            <th>House</th>
            <th>Rent Amount</th>
            <th>Description</th>
            <th>Reported On</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 && !loading && (
            <tr>
              <td colSpan={6} className="text-center">
                No reports found.
              </td>
            </tr>
          )}
          {reports.map((r) => (
            <tr key={r.id}>
              <td>{r.id}</td>
              <td>{r.house?.name || `House ${r.houseId}`}</td>
              <td>{r.rentAmount}</td>
              <td>{r.description}</td>
              <td>{new Date(r.reportDate).toLocaleString()}</td>
              <td>
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
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add / Edit */}
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
                disabled={loading}
                required
              >
                <option value="">Select House</option>
                {houses.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>

            <Form.Group className="mb-3" controlId="formRentAmount">
              <Form.Label>Rent Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter rent amount"
                value={formRentAmount}
                onChange={(e) => setFormRentAmount(Number(e.target.value))}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                disabled={loading}
                required
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
