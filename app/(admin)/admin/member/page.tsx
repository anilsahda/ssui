"use client";

import React, { useEffect, useState, FormEvent, useRef } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Spinner,
  Alert,
  Modal,
  Badge,
  OverlayTrigger,
  Tooltip,
} from "react-bootstrap";

type House = {
  _id: string;
  houseNumber: string;
};

type AllocatedHouse = {
  _id: string;
  houseId?: House;
};

type Member = {
  _id: string;
  fullName: string;
  email: string;
  allocatedHouses: AllocatedHouse[];
};

const MembersPage: React.FC = () => {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const API_BASE = "http://localhost:5000/api/members";
  const formRef = useRef<HTMLFormElement>(null);

  const fetchMembers = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(API_BASE);
      if (!res.ok) throw new Error("Failed to fetch members");
      const json = await res.json();
      setMembers(json.data || []);
    } catch (err: any) {
      setError(err.message);
      setMembers([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  const resetForm = () => {
    setFullName("");
    setEmail("");
    setEditId(null);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!fullName.trim() || !email.trim()) {
      setError("Name and Email are required.");
      return;
    }

    const payload = { fullName: fullName.trim(), email: email.trim() };
    const url = editId ? `${API_BASE}/${editId}` : API_BASE;
    const method = editId ? "PUT" : "POST";

    try {
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to save member");
      }

      await fetchMembers();
      resetForm();
      setSuccessMsg(
        editId ? "Member updated successfully." : "Member added successfully."
      );
    } catch (err: any) {
      setError(err.message);
    }
  };

  const handleEdit = (member: Member) => {
    setEditId(member._id);
    setFullName(member.fullName);
    setEmail(member.email);
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    setError(null);
    try {
      const res = await fetch(`${API_BASE}/${deleteId}`, { method: "DELETE" });
      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.error || "Failed to delete member");
      }
      await fetchMembers();
      setSuccessMsg("Member deleted successfully.");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setDeleteId(null);
      setShowDeleteModal(false);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">👤 Members Management</h2>

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
        ref={formRef}
        className="bg-light p-4 rounded shadow-sm mb-5"
      >
        <h5>{editId ? "Edit Member" : "Add New Member"}</h5>
        <Form.Group className="mb-3">
          <Form.Label>Full Name</Form.Label>
          <Form.Control
            type="text"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="Enter full name"
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="e.g. user@example.com"
            required
          />
        </Form.Group>

        <div className="text-end">
          <Button variant="primary" type="submit">
            {editId ? "Update Member" : "Add Member"}
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
      ) : members.length === 0 ? (
        <Alert variant="info">No members found.</Alert>
      ) : (
        <Table bordered hover responsive className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Full Name</th>
              <th>Email</th>
              <th>Allocated Houses</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((m, index) => (
              <tr key={m._id}>
                <td>{index + 1}</td>
                <td>{m.fullName}</td>
                <td>
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>{m.email}</Tooltip>}
                  >
                    <span>{m.email}</span>
                  </OverlayTrigger>
                </td>
                <td>
                  {m.allocatedHouses && m.allocatedHouses.length > 0 ? (
                    m.allocatedHouses.map((ah) => (
                      <Badge bg="info" className="me-1" key={ah._id}>
                        {ah.houseId?.houseNumber ?? "?"}
                      </Badge>
                    ))
                  ) : (
                    <Badge bg="secondary">None</Badge>
                  )}
                </td>
                <td>
                  <Button
                    variant="outline-primary"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(m)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => confirmDelete(m._id)}
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
          <Modal.Title>Confirm Deletion</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this member?</Modal.Body>
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

export default MembersPage;
