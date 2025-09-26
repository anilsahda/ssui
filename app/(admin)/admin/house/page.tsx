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
import { FaEdit, FaTrash } from "react-icons/fa";

type House = {
  _id: string;
  houseNumber: string;
  societyId: string;
  address: string;
  isAllocated: boolean;
};

const HousesPage: React.FC = () => {
  const [houses, setHouses] = useState<House[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // form fields
  const [houseNumber, setHouseNumber] = useState("");
  const [societyId, setSocietyId] = useState("");
  const [address, setAddress] = useState("");
  const [isAllocated, setIsAllocated] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  // delete modal
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const API_BASE = "http://localhost:5000/api/houses";

  const fetchHouses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch houses");
      const json = await res.json();
      setHouses(json.data || []);
    } catch (err: any) {
      setError(err.message);
      setHouses([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHouses();
  }, []);

  const resetForm = () => {
    setHouseNumber("");
    setSocietyId("");
    setAddress("");
    setIsAllocated(false);
    setEditId(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    const payload = {
      houseNumber,
      societyId,
      address,
      isAllocated,
    };

    try {
      const url = editId ? `${API_BASE}/${editId}` : API_BASE;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save house");
      }
      await fetchHouses();
      resetForm();
      setSuccessMsg(
        editId ? "House updated successfully!" : "House created successfully!"
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (h: House) => {
    setEditId(h._id);
    setHouseNumber(h.houseNumber);
    setSocietyId(h.societyId);
    setAddress(h.address);
    setIsAllocated(h.isAllocated);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setError(null);
    setSuccessMsg(null);

    try {
      const res = await fetch(`${API_BASE}/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete house");
      }
      await fetchHouses();
      setSuccessMsg("House deleted successfully!");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">🏠 House Management</h2>

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

      {/* FORM */}
      <Form
        onSubmit={handleSubmit}
        className="bg-light p-4 rounded shadow-sm mb-5"
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>House Number</Form.Label>
              <Form.Control
                placeholder="e.g. A-101"
                value={houseNumber}
                onChange={(e) => setHouseNumber(e.target.value)}
                required
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Society ID</Form.Label>
              <Form.Control
                placeholder="e.g. SOC123"
                value={societyId}
                onChange={(e) => setSocietyId(e.target.value)}
                required
              />
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3">
          <Form.Label>Address</Form.Label>
          <Form.Control
            placeholder="e.g. 123 Main St, Springfield"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
        </Form.Group>

        <Form.Check
          className="mb-3"
          type="checkbox"
          id="isAllocated"
          label="Is Allocated"
          checked={isAllocated}
          onChange={(e) => setIsAllocated(e.target.checked)}
        />

        <div className="d-flex justify-content-end gap-2">
          <Button variant="primary" type="submit">
            {editId ? "Update House" : "Create House"}
          </Button>
          {editId && (
            <Button variant="secondary" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </Form>

      {/* TABLE */}
      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
          <p>Loading houses...</p>
        </div>
      ) : houses.length === 0 ? (
        <Alert variant="info">No houses found.</Alert>
      ) : (
        <Table responsive bordered hover className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>House Number</th>
              <th>Society ID</th>
              <th>Address</th>
              <th>Allocated</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {houses.map((h, index) => (
              <tr key={h._id}>
                <td>{index + 1}</td>
                <td>{h.houseNumber}</td>
                <td>{h.societyId}</td>
                <td>{h.address}</td>
                <td>
                  <Badge bg={h.isAllocated ? "success" : "secondary"}>
                    {h.isAllocated ? "Yes" : "No"}
                  </Badge>
                </td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(h)}
                    title="Edit"
                  >
                    <FaEdit />
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => confirmDelete(h._id)}
                    title="Delete"
                  >
                    <FaTrash />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* DELETE MODAL */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this house?</Modal.Body>
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

export default HousesPage;
