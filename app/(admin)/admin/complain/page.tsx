"use client"; // Only needed in App Router

import React, { useEffect, useState } from "react";
import {
  Container,
  Table,
  Button,
  Form,
  Row,
  Col,
  Spinner,
  Alert,
} from "react-bootstrap";

// Interfaces
interface House {
  id: number;
  name: string;
}

interface Member {
  id: number;
  name: string;
}

interface Complain {
  id: number;
  houseId: number;
  memberId?: number | null;
  description: string;
  complainDate: string;
  isResolved: boolean;
  house: House;
  member?: Member;
}

export default function ComplainsPage() {
  const [complains, setComplains] = useState<Complain[]>([]);
  const [houses, setHouses] = useState<House[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const [filterUnresolved, setFilterUnresolved] = useState(false);
  const [description, setDescription] = useState("");
  const [houseId, setHouseId] = useState<number>();
  const [memberId, setMemberId] = useState<number | null>(null);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  // Fetch complaints (with optional unresolved filter)
  const fetchComplains = async () => {
    setLoading(true);
    setError(null);
    try {
      const endpoint = filterUnresolved
        ? "https://localhost:7255/api/Complains/unresolved"
        : "https://localhost:7255/api/Complains";
      const res = await fetch(endpoint);
      if (!res.ok) throw new Error("Failed to fetch complaints.");
      const data: Complain[] = await res.json();
      setComplains(data);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Fetch houses and members for form selects
  const fetchHousesAndMembers = async () => {
    try {
      const [houseRes, memberRes] = await Promise.all([
        fetch("https://localhost:7255/api/Houses"),
        fetch("https://localhost:7255/api/Members"),
      ]);

      if (houseRes.ok) setHouses(await houseRes.json());
      if (memberRes.ok) setMembers(await memberRes.json());
    } catch (err) {
      console.error("Error loading houses or members.");
    }
  };

  useEffect(() => {
    fetchComplains();
    fetchHousesAndMembers();
  }, [filterUnresolved]);

  // Submit new complaint
  const handleCreateComplain = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description || !houseId) {
      setError("Description and House are required.");
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://localhost:7255/api/Complains", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ description, houseId, memberId }),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }

      setSuccessMessage("Complaint created successfully.");
      setDescription("");
      setHouseId(undefined);
      setMemberId(null);
      fetchComplains();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  // Resolve a complaint
  const handleResolve = async (id: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `https://localhost:7255/api/Complains/${id}/resolve`,
        {
          method: "PUT",
        }
      );
      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg);
      }
      fetchComplains();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="my-4">
      <h2 className="mb-4">📋 Complaints Management</h2>

      {/* Alerts */}
      {error && <Alert variant="danger">{error}</Alert>}
      {successMessage && (
        <Alert
          variant="success"
          dismissible
          onClose={() => setSuccessMessage(null)}
        >
          {successMessage}
        </Alert>
      )}

      {/* Complaint Form */}
      <Form onSubmit={handleCreateComplain} className="mb-5">
        <h5>Create New Complaint</h5>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>House</Form.Label>
              <Form.Select
                value={houseId ?? ""}
                onChange={(e) => setHouseId(Number(e.target.value))}
              >
                <option value="">Select House</option>
                {houses.map((h) => (
                  <option key={h.id} value={h.id}>
                    {h.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group>
              <Form.Label>Member (Optional)</Form.Label>
              <Form.Select
                value={memberId ?? ""}
                onChange={(e) =>
                  setMemberId(e.target.value ? Number(e.target.value) : null)
                }
              >
                <option value="">Select Member</option>
                {members.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
        <Button type="submit" disabled={loading}>
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : (
            "Submit Complaint"
          )}
        </Button>
      </Form>

      {/* Filter */}
      <Form.Check
        type="switch"
        label="Show only unresolved complaints"
        checked={filterUnresolved}
        onChange={() => setFilterUnresolved(!filterUnresolved)}
        className="mb-4"
      />

      {/* Complaints Table */}
      <Table striped bordered hover responsive>
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Description</th>
            <th>House</th>
            <th>Member</th>
            <th>Date</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {complains.length === 0 ? (
            <tr>
              <td colSpan={7} className="text-center py-3">
                No complaints found.
              </td>
            </tr>
          ) : (
            complains.map((c) => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td>{c.description}</td>
                <td>{c.house?.name}</td>
                <td>{c.member?.name || "N/A"}</td>
                <td>{new Date(c.complainDate).toLocaleString()}</td>
                <td>
                  {c.isResolved ? (
                    <span className="text-success fw-bold">Resolved</span>
                  ) : (
                    <span className="text-danger fw-bold">Unresolved</span>
                  )}
                </td>
                <td>
                  {!c.isResolved && (
                    <Button
                      size="sm"
                      variant="success"
                      onClick={() => handleResolve(c.id)}
                      disabled={loading}
                    >
                      Resolve
                    </Button>
                  )}
                </td>
              </tr>
            ))
          )}
        </tbody>
      </Table>
    </Container>
  );
}
