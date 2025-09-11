"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Modal,
  Alert,
  Spinner,
  Row,
  Col,
} from "react-bootstrap";

interface Society {
  id: number;
  name: string;
}

interface House {
  id: number;
  name: string;
  address: string;
  societyId: number;
  society?: Society;
}

export default function HousesPage() {
  const [houses, setHouses] = useState<House[]>([]);
  const [societies, setSocieties] = useState<Society[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modal controls for Add/Edit
  const [showModal, setShowModal] = useState(false);
  const [editingHouse, setEditingHouse] = useState<House | null>(null);

  // Form fields
  const [formName, setFormName] = useState("");
  const [formAddress, setFormAddress] = useState("");
  const [formSocietyId, setFormSocietyId] = useState<number | "">("");

  useEffect(() => {
    fetchHouses();
    fetchSocieties();
  }, []);

  const fetchHouses = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://localhost:7255/api/Houses");
      if (!res.ok) throw new Error("Failed to fetch houses.");
      const data: House[] = await res.json();
      setHouses(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const fetchSocieties = async () => {
    try {
      const res = await fetch("https://localhost:7255/api/Societies");
      if (!res.ok) throw new Error("Failed to fetch societies.");
      const data: Society[] = await res.json();
      setSocieties(data);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  // Open modal for new house or edit
  const openModal = (house?: House) => {
    if (house) {
      setEditingHouse(house);
      setFormName(house.name);
      setFormAddress(house.address);
      setFormSocietyId(house.societyId);
    } else {
      setEditingHouse(null);
      setFormName("");
      setFormAddress("");
      setFormSocietyId("");
    }
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setError(null);
    setSuccess(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formName.trim() || !formAddress.trim() || !formSocietyId) {
      setError("Please fill all fields.");
      return;
    }

    setLoading(true);

    try {
      const body = {
        id: editingHouse?.id,
        name: formName,
        address: formAddress,
        societyId: formSocietyId,
      };

      const method = editingHouse ? "PUT" : "POST";
      const url = editingHouse
        ? `https://localhost:7255/api/Houses/${editingHouse.id}`
        : "https://localhost:7255/api/Houses";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to save house.");
      }

      setSuccess(editingHouse ? "House updated." : "House added.");
      fetchHouses();
      closeModal();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this house?")) return;
    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`https://localhost:7255/api/Houses/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Failed to delete house.");
      setSuccess("House deleted.");
      fetchHouses();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Houses Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Button className="mb-3" onClick={() => openModal()}>
        + Add New House
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
            <th>Name</th>
            <th>Address</th>
            <th>Society</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {houses.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center">
                No houses found.
              </td>
            </tr>
          )}
          {houses.map((house) => (
            <tr key={house.id}>
              <td>{house.id}</td>
              <td>{house.name}</td>
              <td>{house.address}</td>
              <td>{house.society?.name || "N/A"}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => openModal(house)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(house.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingHouse ? "Edit House" : "Add New House"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="houseName">
              <Form.Label>House Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter house name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="houseAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter address"
                value={formAddress}
                onChange={(e) => setFormAddress(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="houseSociety">
              <Form.Label>Society</Form.Label>
              <Form.Select
                value={formSocietyId}
                onChange={(e) => setFormSocietyId(Number(e.target.value))}
                disabled={loading}
                required
              >
                <option value="">Select Society</option>
                {societies.map((soc) => (
                  <option key={soc.id} value={soc.id}>
                    {soc.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={closeModal} disabled={loading}>
              Cancel
            </Button>
            <Button type="submit" variant="primary" disabled={loading}>
              {loading ? (
                <>
                  <Spinner
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="me-2"
                  />
                  Saving...
                </>
              ) : editingHouse ? (
                "Update House"
              ) : (
                "Add House"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
