"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Alert,
  Modal,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";

interface SellHouseReport {
  _id: string;
  houseId: { _id: string } | string;
  sellPrice: string;
  sellDate: string;
  buyerName: string;
}

export default function SellHouseReportsAdmin() {
  const [reports, setReports] = useState<SellHouseReport[]>([]);
  const [houseId, setHouseId] = useState("");
  const [sellPrice, setSellPrice] = useState("");
  const [sellDate, setSellDate] = useState("");
  const [buyerName, setBuyerName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const API_BASE = "http://localhost:5000/api/sell-house-reports";

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_BASE);
      const data = await res.json();
      if (data.success) {
        setReports(data.data);
      } else {
        setError("Failed to load reports");
      }
    } catch (err) {
      setError("Error fetching reports");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const resetForm = () => {
    setHouseId("");
    setSellPrice("");
    setSellDate("");
    setBuyerName("");
    setEditId(null);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!houseId || !sellPrice || !buyerName) {
      setError("Please fill in all required fields");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_BASE}/${editId}` : API_BASE;

    const body = {
      houseId,
      sellPrice,
      sellDate: sellDate || new Date().toISOString(),
      buyerName,
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Failed to save report");

      await fetchReports();
      setSuccess(
        editId ? "Report updated successfully" : "Report added successfully"
      );
      resetForm();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (report: SellHouseReport) => {
    setEditId(report._id);
    setHouseId(
      typeof report.houseId === "string" ? report.houseId : report.houseId._id
    );
    setSellPrice(report.sellPrice);
    setSellDate(report.sellDate.substring(0, 10));
    setBuyerName(report.buyerName);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setShowDeleteModal(false);
    try {
      const res = await fetch(`${API_BASE}/${deleteId}`, { method: "DELETE" });
      if (!res.ok) throw new Error();
      await fetchReports();
      setSuccess("Report deleted successfully");
    } catch {
      setError("Failed to delete report");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="text-center mb-4">🏠 Sell House Reports</h2>

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

      {/* Form */}
      <Form
        onSubmit={handleSubmit}
        className="bg-light p-4 rounded shadow-sm mb-5"
      >
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="houseId">
              <Form.Label>House ID *</Form.Label>
              <Form.Control
                type="text"
                value={houseId}
                onChange={(e) => setHouseId(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="buyerName">
              <Form.Label>Buyer Name *</Form.Label>
              <Form.Control
                type="text"
                value={buyerName}
                onChange={(e) => setBuyerName(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="sellPrice">
              <Form.Label>Sell Price *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={sellPrice}
                onChange={(e) => setSellPrice(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="sellDate">
              <Form.Label>Sell Date</Form.Label>
              <Form.Control
                type="date"
                value={sellDate}
                onChange={(e) => setSellDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-end">
          <Button type="submit" variant="primary">
            {editId ? "Update Report" : "Add Report"}
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

      {/* Table */}
      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>House ID</th>
              <th>Sell Price</th>
              <th>Sell Date</th>
              <th>Buyer Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 ? (
              <tr>
                <td colSpan={6} className="text-center">
                  No reports found
                </td>
              </tr>
            ) : (
              reports.map((r, idx) => (
                <tr key={r._id}>
                  <td>{idx + 1}</td>
                  <td>
                    {typeof r.houseId === "string" ? r.houseId : r.houseId._id}
                  </td>
                  <td>${parseFloat(r.sellPrice).toFixed(2)}</td>
                  <td>{new Date(r.sellDate).toLocaleDateString()}</td>
                  <td>{r.buyerName}</td>
                  <td>
                    <Button
                      size="sm"
                      variant="outline-primary"
                      className="me-2"
                      onClick={() => handleEdit(r)}
                    >
                      Edit
                    </Button>
                    <Button
                      size="sm"
                      variant="outline-danger"
                      onClick={() => confirmDelete(r._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Delete Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Report</Modal.Title>
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
    </Container>
  );
}
