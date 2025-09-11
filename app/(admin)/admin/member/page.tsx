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
  Row,
  Col,
} from "react-bootstrap";

interface House {
  id: number;
  houseNumber: string;
  // Add more fields if needed
}

interface AllocatedHouse {
  id: number;
  house: House;
}

interface MemberReport {
  id: number;
  title: string;
}

interface Complain {
  id: number;
  title: string;
}

interface Member {
  id: number;
  name: string;
  email: string;
  phone?: string;
  allocatedHouses: AllocatedHouse[];
  memberReports: MemberReport[];
  complains: Complain[];
}

export default function MembersPage() {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const [showModal, setShowModal] = useState(false);
  const [editingMember, setEditingMember] = useState<Member | null>(null);

  const [formName, setFormName] = useState("");
  const [formEmail, setFormEmail] = useState("");
  const [formPhone, setFormPhone] = useState("");

  useEffect(() => {
    fetchMembers();
  }, []);

  async function fetchMembers() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://localhost:7255/api/Members");
      if (!res.ok) throw new Error("Failed to fetch members");
      const data: Member[] = await res.json();
      setMembers(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  function openModal(member?: Member) {
    if (member) {
      setEditingMember(member);
      setFormName(member.name);
      setFormEmail(member.email);
      setFormPhone(member.phone || "");
    } else {
      setEditingMember(null);
      setFormName("");
      setFormEmail("");
      setFormPhone("");
    }
    setShowModal(true);
    setError(null);
    setSuccess(null);
  }

  function closeModal() {
    setShowModal(false);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formName.trim() || !formEmail.trim()) {
      setError("Name and Email are required.");
      return;
    }

    setLoading(true);

    try {
      const body = {
        id: editingMember?.id,
        name: formName,
        email: formEmail,
        phone: formPhone || null,
      };

      const method = editingMember ? "PUT" : "POST";
      const url = editingMember
        ? `https://localhost:7255/api/Members/${editingMember.id}`
        : "https://localhost:7255/api/Members";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to save member");
      }

      setSuccess(editingMember ? "Member updated." : "Member added.");
      fetchMembers();
      closeModal();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    if (!confirm("Are you sure you want to delete this member?")) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(`/api/Members/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Failed to delete member");
      setSuccess("Member deleted.");
      fetchMembers();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container className="py-4">
      <h2 className="mb-4">Members Management</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Button className="mb-3" onClick={() => openModal()}>
        + Add New Member
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
            <th>Email</th>
            <th>Phone</th>
            <th>Allocated Houses</th>
            <th>Reports</th>
            <th>Complains</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {members.length === 0 && (
            <tr>
              <td colSpan={8} className="text-center">
                No members found.
              </td>
            </tr>
          )}
          {members.map((member) => (
            <tr key={member.id}>
              <td>{member.id}</td>
              <td>{member.name}</td>
              <td>{member.email}</td>
              <td>{member.phone || "-"}</td>
              <td>
                {member.allocatedHouses.length > 0
                  ? member.allocatedHouses
                      .map((ah) => ah.house.houseNumber)
                      .join(", ")
                  : "-"}
              </td>
              <td>{member.memberReports.length}</td>
              <td>{member.complains.length}</td>
              <td>
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => openModal(member)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(member.id)}
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
            {editingMember ? "Edit Member" : "Add New Member"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="memberName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter full name"
                value={formName}
                onChange={(e) => setFormName(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="memberEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email address"
                value={formEmail}
                onChange={(e) => setFormEmail(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="memberPhone">
              <Form.Label>Phone (optional)</Form.Label>
              <Form.Control
                type="tel"
                placeholder="Enter phone number"
                value={formPhone}
                onChange={(e) => setFormPhone(e.target.value)}
                disabled={loading}
              />
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
              ) : editingMember ? (
                "Update Member"
              ) : (
                "Add Member"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
