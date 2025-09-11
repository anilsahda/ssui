"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { Modal, Button, Form, Table, Spinner, Alert } from "react-bootstrap";

interface House {
  id: number;
  // You can extend with more house properties if needed
}

interface Society {
  id: number;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  houses: House[];
}

const SocietiesPage = () => {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Modal state
  const [showModal, setShowModal] = useState(false);
  const [editingSociety, setEditingSociety] = useState<Society | null>(null);

  // Form state
  const [form, setForm] = useState({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  // Fetch societies on mount
  useEffect(() => {
    fetchSocieties();
  }, []);

  const fetchSocieties = async () => {
    try {
      setLoading(true);
      const res = await axios.get<Society[]>(
        "https://localhost:7255/api/societies"
      );
      setSocieties(res.data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch societies.");
    } finally {
      setLoading(false);
    }
  };

  const openNewModal = () => {
    setEditingSociety(null);
    setForm({
      name: "",
      address: "",
      city: "",
      state: "",
      zipCode: "",
    });
    setShowModal(true);
  };

  const openEditModal = (society: Society) => {
    setEditingSociety(society);
    setForm({
      name: society.name,
      address: society.address,
      city: society.city,
      state: society.state,
      zipCode: society.zipCode,
    });
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this society?")) return;
    try {
      await axios.delete(`https://localhost:7255/api/societies/${id}`);
      setSocieties(societies.filter((s) => s.id !== id));
    } catch {
      alert("Failed to delete society.");
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingSociety) {
        // Update
        await axios.put(
          `https://localhost:7255/api/societies/${editingSociety.id}`,
          {
            id: editingSociety.id,
            ...form,
          }
        );
      } else {
        // Create
        await axios.post("https://localhost:7255/api/societies", form);
      }
      setShowModal(false);
      fetchSocieties();
    } catch {
      alert("Failed to save society.");
    }
  };

  return (
    <div className="container mt-4">
      <h2>Societies</h2>
      <Button variant="primary" className="mb-3" onClick={openNewModal}>
        + Add New Society
      </Button>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      ) : error ? (
        <Alert variant="danger">{error}</Alert>
      ) : (
        <Table striped bordered hover responsive>
          <thead>
            <tr>
              <th>Name</th>
              <th>Address</th>
              <th>City</th>
              <th>State</th>
              <th>Zip Code</th>
              <th>Number of Houses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {societies.map((society) => (
              <tr key={society.id}>
                <td>{society.name}</td>
                <td>{society.address}</td>
                <td>{society.city}</td>
                <td>{society.state}</td>
                <td>{society.zipCode}</td>
                <td>{society.houses.length}</td>
                <td>
                  <Button
                    variant="info"
                    size="sm"
                    className="me-2"
                    onClick={() => openEditModal(society)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDelete(society.id)}
                  >
                    Delete
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Form onSubmit={handleSubmit}>
          <Modal.Header closeButton>
            <Modal.Title>
              {editingSociety ? "Edit Society" : "Add New Society"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                placeholder="Enter society name"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formAddress">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={form.address}
                onChange={handleChange}
                required
                placeholder="Enter address"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formCity">
              <Form.Label>City</Form.Label>
              <Form.Control
                type="text"
                name="city"
                value={form.city}
                onChange={handleChange}
                required
                placeholder="Enter city"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formState">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                name="state"
                value={form.state}
                onChange={handleChange}
                required
                placeholder="Enter state"
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formZipCode">
              <Form.Label>Zip Code</Form.Label>
              <Form.Control
                type="text"
                name="zipCode"
                value={form.zipCode}
                onChange={handleChange}
                required
                placeholder="Enter zip code"
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button variant="primary" type="submit">
              {editingSociety ? "Update" : "Create"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </div>
  );
};

export default SocietiesPage;
