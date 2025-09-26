"use client";

import React, { useEffect, useState, FormEvent } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Spinner,
  Alert,
  Badge,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

type House = {
  _id: string;
  houseNumber: string;
  // add more fields as needed (e.g. address, societyName, etc.)
};

type HouseReport = {
  _id: string;
  houseId: House;
  reportDetails: string;
  reportDate: string; // ISO
};

const HouseReportsPage: React.FC = () => {
  const [reports, setReports] = useState<HouseReport[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Form state
  const [houseId, setHouseId] = useState<string>("");
  const [reportDetails, setReportDetails] = useState<string>("");
  const [reportDate, setReportDate] = useState<string>("");

  // For editing (if you want to support editing reports later)
  const [editId, setEditId] = useState<string | null>(null);

  const API_BASE = "http://localhost:5000/api/house-reports";
  const HOUSES_API = "http://localhost:5000/api/houses";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [reportsRes, housesRes] = await Promise.all([
        fetch(API_BASE),
        fetch(HOUSES_API),
      ]);

      if (!reportsRes.ok) throw new Error("Failed to fetch house reports");
      if (!housesRes.ok) throw new Error("Failed to fetch houses");

      const reportsJson = await reportsRes.json();
      const housesJson = await housesRes.json();

      setReports(reportsJson.data || []);
      setHouses(housesJson.data || housesJson);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const resetForm = () => {
    setHouseId("");
    setReportDetails("");
    setReportDate("");
    setEditId(null);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!houseId || !reportDetails.trim()) {
      setError("House and report details are required.");
      return;
    }

    try {
      const payload: any = {
        houseId,
        reportDetails,
      };
      if (reportDate) {
        payload.reportDate = reportDate;
      }

      const url = editId ? `${API_BASE}/${editId}` : API_BASE;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to save report");
      }

      resetForm();
      setSuccessMsg(
        editId
          ? "Report updated successfully!"
          : "Report submitted successfully!"
      );
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  // (Optionally) support editing a report
  const handleEdit = (rep: HouseReport) => {
    setEditId(rep._id);
    setHouseId(rep.houseId._id);
    setReportDetails(rep.reportDetails);
    // convert ISO to yyyy-MM-dd for <input type="date">
    if (rep.reportDate) {
      const dt = new Date(rep.reportDate);
      const iso = dt.toISOString().substring(0, 10);
      setReportDate(iso);
    } else {
      setReportDate("");
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // (Optionally) support deleting a report via modal
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setError(null);
    setSuccessMsg(null);
    setShowDeleteModal(false);
    try {
      const res = await fetch(`${API_BASE}/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to delete report");
      }
      setSuccessMsg("Report deleted successfully!");
      await fetchData();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">🏗️ House Reports</h2>

      {/* Alerts */}
      {error && (
        <Alert variant="danger" onClose={() => setError(null)} dismissible>
          {error}
        </Alert>
      )}
      {successMsg && (
        <Alert
          variant="success"
          onClose={() => setSuccessMsg(null)}
          dismissible
        >
          {successMsg}
        </Alert>
      )}

      {/* Form */}
      <Form
        onSubmit={handleSubmit}
        className="bg-light p-4 rounded shadow-sm mb-5"
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formHouse">
              <Form.Label>House</Form.Label>
              <Form.Select
                value={houseId}
                onChange={(e) => setHouseId(e.target.value)}
                required
              >
                <option value="">Select a house</option>
                {houses.map((h) => (
                  <option key={h._id} value={h._id}>
                    {h.houseNumber}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formReportDate">
              <Form.Label>Report Date</Form.Label>
              <Form.Control
                type="date"
                value={reportDate}
                onChange={(e) => setReportDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formDetails">
          <Form.Label>Report Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={4}
            placeholder="Describe the issue or observation..."
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit">
            {editId ? "Update Report" : "Submit Report"}
          </Button>
          {editId && (
            <Button
              variant="outline-secondary"
              className="ms-2"
              onClick={resetForm}
            >
              Cancel
            </Button>
          )}
        </div>
      </Form>

      {/* Table / List */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p className="mt-2">Loading reports...</p>
        </div>
      ) : reports.length === 0 ? (
        <Alert variant="info">No reports found.</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>House</th>
              <th>Details</th>
              <th>Report Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((rep, idx) => (
              <tr key={rep._id}>
                <td>{idx + 1}</td>
                <td>{rep.houseId?.houseNumber ?? "—"}</td>
                <td style={{ whiteSpace: "pre-wrap" }}>{rep.reportDetails}</td>
                <td>
                  {rep.reportDate
                    ? new Date(rep.reportDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(rep)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => confirmDelete(rep._id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to delete this house report?
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowDeleteModal(false)}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default HouseReportsPage;
