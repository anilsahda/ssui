"use client";

import React, { useEffect, useState, useCallback } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Alert,
  Modal,
  Spinner,
  InputGroup,
  Row,
  Col,
} from "react-bootstrap";

type Society = {
  _id: string;
  name: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
};

export default function SocietyPage() {
  const [societies, setSocieties] = useState<Society[]>([]);
  const [filteredSocieties, setFilteredSocieties] = useState<Society[]>([]);
  const [formData, setFormData] = useState<Omit<Society, "_id">>({
    name: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
  });

  const [fetching, setFetching] = useState(false); // loading state for fetch
  const [submitting, setSubmitting] = useState(false); // loading state for submit
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [searchTerm, setSearchTerm] = useState("");

  // Pagination states
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;
  const totalPages = Math.ceil(filteredSocieties.length / pageSize);

  const API_BASE = "http://localhost:5000/api/societies";

  // Fetch societies from API - useCallback to avoid redeclaration on each render
  const fetchSocieties = useCallback(async () => {
    setFetching(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch societies");
      const data = await res.json();
      if (data.success) {
        setSocieties(data.data);
        setFilteredSocieties(data.data);
        setCurrentPage(1);
      } else {
        throw new Error(data.message || "Failed to load societies");
      }
    } catch (err) {
      setError((err as Error).message || "Failed to fetch societies");
    } finally {
      setFetching(false);
    }
  }, [API_BASE]);

  useEffect(() => {
    fetchSocieties();
  }, [fetchSocieties]);

  // Handle form input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Add new society
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (
      !formData.name.trim() ||
      !formData.address.trim() ||
      !formData.city.trim() ||
      !formData.state.trim() ||
      !formData.zipCode.trim()
    ) {
      setError("Please fill all fields.");
      return;
    }

    setSubmitting(true);
    try {
      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to add society");
      }
      setSuccess("Society added successfully");
      setFormData({ name: "", address: "", city: "", state: "", zipCode: "" });
      fetchSocieties();
    } catch (err) {
      setError((err as Error).message || "Error adding society");
    } finally {
      setSubmitting(false);
    }
  };

  // Search/filter societies by name or city
  const handleSearch = (term: string) => {
    setSearchTerm(term);
    if (!term.trim()) {
      setFilteredSocieties(societies);
      setCurrentPage(1);
      return;
    }
    const lowerTerm = term.toLowerCase();
    const filtered = societies.filter(
      (s) =>
        s.name.toLowerCase().includes(lowerTerm) ||
        s.city.toLowerCase().includes(lowerTerm)
    );
    setFilteredSocieties(filtered);
    setCurrentPage(1);
  };

  // Pagination slice
  const paginatedSocieties = filteredSocieties.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  // Confirm delete modal
  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  // Delete society API call
  const handleDelete = async () => {
    if (!deleteId) return;
    setShowDeleteModal(false);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`${API_BASE}/${deleteId}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete society");
      }
      setSuccess("Society deleted successfully");
      fetchSocieties();
    } catch (err) {
      setError((err as Error).message || "Error deleting society");
    } finally {
      setDeleteId(null);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">🏘️ Society Management</h2>

      {/* Alerts */}
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

      {/* Add Society Form */}
      <Form
        onSubmit={handleSubmit}
        className="mb-5 p-4 bg-light rounded shadow-sm"
      >
        <Row>
          <Col md={6} className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control
              name="name"
              placeholder="Society Name"
              value={formData.name}
              onChange={handleChange}
              disabled={submitting}
              required
            />
          </Col>
          <Col md={6} className="mb-3">
            <Form.Label>Address</Form.Label>
            <Form.Control
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              disabled={submitting}
              required
            />
          </Col>
          <Col md={4} className="mb-3">
            <Form.Label>City</Form.Label>
            <Form.Control
              name="city"
              placeholder="City"
              value={formData.city}
              onChange={handleChange}
              disabled={submitting}
              required
            />
          </Col>
          <Col md={4} className="mb-3">
            <Form.Label>State</Form.Label>
            <Form.Control
              name="state"
              placeholder="State"
              value={formData.state}
              onChange={handleChange}
              disabled={submitting}
              required
            />
          </Col>
          <Col md={4} className="mb-3">
            <Form.Label>Zip Code</Form.Label>
            <Form.Control
              name="zipCode"
              placeholder="Zip Code"
              value={formData.zipCode}
              onChange={handleChange}
              disabled={submitting}
              required
            />
          </Col>
        </Row>

        <div className="text-end">
          <Button type="submit" variant="primary" disabled={submitting}>
            {submitting ? (
              <>
                <Spinner
                  as="span"
                  animation="border"
                  size="sm"
                  role="status"
                  aria-hidden="true"
                  className="me-2"
                />
                Adding...
              </>
            ) : (
              "Add Society"
            )}
          </Button>
        </div>
      </Form>

      {/* Search */}
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by Name or City"
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          disabled={fetching}
        />
        <Button
          variant="outline-secondary"
          onClick={() => handleSearch("")}
          disabled={fetching || !searchTerm}
        >
          Clear
        </Button>
      </InputGroup>

      {/* Societies Table */}
      {fetching ? (
        <div className="text-center my-5">
          <Spinner animation="border" />
        </div>
      ) : (
        <>
          <Table striped bordered hover responsive className="shadow-sm">
            <thead className="table-light">
              <tr>
                <th>#</th>
                <th>Name</th>
                <th>Address</th>
                <th>City</th>
                <th>State</th>
                <th>Zip Code</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {paginatedSocieties.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center">
                    No societies found
                  </td>
                </tr>
              ) : (
                paginatedSocieties.map((society, idx) => (
                  <tr key={society._id}>
                    <td>{(currentPage - 1) * pageSize + idx + 1}</td>
                    <td>{society.name}</td>
                    <td>{society.address}</td>
                    <td>{society.city}</td>
                    <td>{society.state}</td>
                    <td>{society.zipCode}</td>
                    <td>
                      <Button
                        variant="outline-danger"
                        size="sm"
                        onClick={() => confirmDelete(society._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </Table>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="d-flex justify-content-center align-items-center gap-3 mt-3">
              <Button
                variant="outline-primary"
                disabled={currentPage === 1}
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
              >
                Prev
              </Button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <Button
                variant="outline-primary"
                disabled={currentPage === totalPages}
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
              >
                Next
              </Button>
            </div>
          )}
        </>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        show={showDeleteModal}
        onHide={() => setShowDeleteModal(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Delete Society</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this society?</Modal.Body>
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
