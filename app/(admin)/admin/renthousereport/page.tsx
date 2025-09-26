"use client";

import React, { useState, useEffect, FormEvent } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Spinner,
  Alert,
  Modal,
  Row,
  Col,
} from "react-bootstrap";

interface RentHouseReport {
  _id: string;
  houseId: { _id: string } | string;
  rentAmount: string;
  rentStartDate: string;
  rentEndDate: string | null;
  renterName: string;
  createdAt: string;
  updatedAt: string;
}

export default function RentHouseReportsAdmin() {
  const [reports, setReports] = useState<RentHouseReport[]>([]);
  const [houseId, setHouseId] = useState("");
  const [rentAmount, setRentAmount] = useState("");
  const [rentStartDate, setRentStartDate] = useState("");
  const [rentEndDate, setRentEndDate] = useState("");
  const [renterName, setRenterName] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const API_BASE = "http://localhost:5000/api/rent-house-reports";

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) {
        throw new Error("Failed to fetch reports");
      }
      const data = await res.json();
      if (data.success) {
        setReports(data.data);
      } else {
        // if your API returns differently
        setReports(data.data || []);
      }
    } catch (err: any) {
      setError(err.message);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  const resetForm = () => {
    setHouseId("");
    setRentAmount("");
    setRentStartDate("");
    setRentEndDate("");
    setRenterName("");
    setEditId(null);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    // Basic validation
    if (
      !houseId.trim() ||
      !rentAmount.trim() ||
      !rentStartDate.trim() ||
      !renterName.trim()
    ) {
      setError("Please fill in all required fields.");
      return;
    }

    const method = editId ? "PUT" : "POST";
    const url = editId ? `${API_BASE}/${editId}` : API_BASE;

    const body = {
      houseId: houseId.trim(),
      rentAmount: rentAmount.trim(),
      rentStartDate,
      rentEndDate: rentEndDate || null,
      renterName: renterName.trim(),
    };

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      if (!res.ok) {
        const errResp = await res.json();
        throw new Error(errResp.error || "Failed to save report");
      }
      await fetchReports();
      setSuccessMsg(
        editId ? "Report updated successfully." : "Report added successfully."
      );
      resetForm();
    } catch (err: any) {
      setError(err.message || "Error occurred.");
    }
  };

  const handleEdit = (report: RentHouseReport) => {
    setEditId(report._id);
    const hid =
      typeof report.houseId === "string" ? report.houseId : report.houseId._id;
    setHouseId(hid);
    setRentAmount(report.rentAmount);
    setRentStartDate(report.rentStartDate.substring(0, 10));
    setRentEndDate(
      report.rentEndDate ? report.rentEndDate.substring(0, 10) : ""
    );
    setRenterName(report.renterName);

    // Scroll to form (optional)
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setShowDeleteModal(false);
    setError(null);
    setSuccessMsg(null);
    try {
      const res = await fetch(`${API_BASE}/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errResp = await res.json();
        throw new Error(errResp.error || "Failed to delete report");
      }
      await fetchReports();
      setSuccessMsg("Report deleted successfully.");
    } catch (err: any) {
      setError(err.message || "Delete failed");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">📝 Rent House Reports</h2>

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

      <Form
        onSubmit={handleSubmit}
        className="bg-light p-4 rounded shadow-sm mb-5"
      >
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>House ID *</Form.Label>
              <Form.Control
                type="text"
                value={houseId}
                onChange={(e) => setHouseId(e.target.value)}
                placeholder="Enter House ID"
                required
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Renter Name *</Form.Label>
              <Form.Control
                type="text"
                value={renterName}
                onChange={(e) => setRenterName(e.target.value)}
                placeholder="Enter Renter Name"
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Rent Amount *</Form.Label>
              <Form.Control
                type="number"
                step="0.01"
                value={rentAmount}
                onChange={(e) => setRentAmount(e.target.value)}
                placeholder="Enter rent amount"
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Start Date *</Form.Label>
              <Form.Control
                type="date"
                value={rentStartDate}
                onChange={(e) => setRentStartDate(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>End Date</Form.Label>
              <Form.Control
                type="date"
                value={rentEndDate}
                onChange={(e) => setRentEndDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-end">
          <Button variant="primary" type="submit">
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

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>House ID</th>
              <th>Rent Amount</th>
              <th>Start Date</th>
              <th>End Date</th>
              <th>Renter Name</th>
              <th>Created At</th>
              <th>Updated At</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.length === 0 && (
              <tr>
                <td colSpan={9} className="text-center">
                  No reports found
                </td>
              </tr>
            )}
            {reports.map((r, idx) => {
              const hid =
                typeof r.houseId === "string" ? r.houseId : r.houseId._id;
              return (
                <tr key={r._id}>
                  <td>{idx + 1}</td>
                  <td>{hid}</td>
                  <td>{parseFloat(r.rentAmount).toFixed(2)}</td>
                  <td>{new Date(r.rentStartDate).toLocaleDateString()}</td>
                  <td>
                    {r.rentEndDate
                      ? new Date(r.rentEndDate).toLocaleDateString()
                      : "-"}
                  </td>
                  <td>{r.renterName}</td>
                  <td>{new Date(r.createdAt).toLocaleString()}</td>
                  <td>{new Date(r.updatedAt).toLocaleString()}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      size="sm"
                      className="me-2"
                      onClick={() => handleEdit(r)}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => confirmDelete(r._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              );
            })}
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
          <Modal.Title>Confirm Deletion</Modal.Title>
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
