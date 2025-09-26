"use client";

import React, { useEffect, useState, FormEvent } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Spinner,
  Alert,
  Row,
  Col,
  Badge,
} from "react-bootstrap";

type House = {
  _id: string;
  houseNumber: string;
};

type Member = {
  _id: string;
  fullName: string;
};

type Complain = {
  _id: string;
  houseId: House;
  memberId: Member | null;
  description: string;
  complainDate: string;
  isResolved: boolean;
};

const ComplainsPage: React.FC = () => {
  const [complains, setComplains] = useState<Complain[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Form state
  const [houseId, setHouseId] = useState<string>("");
  const [memberId, setMemberId] = useState<string | null>(null);
  const [description, setDescription] = useState<string>("");
  const [complainDate, setComplainDate] = useState<string>("");
  const [isResolved, setIsResolved] = useState<boolean>(false);

  // Data sets
  const [houses, setHouses] = useState<House[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const API_BASE = "http://localhost:5000/api/complain";
  const HOUSES_API = "http://localhost:5000/api/houses";
  const MEMBERS_API = "http://localhost:5000/api/members";

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    try {
      const [compRes, houseRes, memberRes] = await Promise.all([
        fetch(API_BASE),
        fetch(HOUSES_API),
        fetch(MEMBERS_API),
      ]);

      if (!compRes.ok || !houseRes.ok || !memberRes.ok) {
        throw new Error("Error fetching data");
      }

      const compData = await compRes.json();
      const houseData = await houseRes.json();
      const memberData = await memberRes.json();

      setComplains(compData.data || []);
      setHouses(houseData.data || houseData);
      setMembers(memberData.data || memberData);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);

    try {
      const payload = {
        houseId,
        memberId,
        description,
        complainDate: complainDate || undefined,
        isResolved,
      };

      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errJson = await res.json();
        throw new Error(errJson.error || "Failed to create complaint.");
      }

      // Reset
      setHouseId("");
      setMemberId(null);
      setDescription("");
      setComplainDate("");
      setIsResolved(false);

      await fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">🛠️ Complaints Management</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Form
        onSubmit={handleSubmit}
        className="bg-light p-4 rounded shadow-sm mb-4"
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formHouse">
              <Form.Label>🏠 House</Form.Label>
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
            <Form.Group className="mb-3" controlId="formMember">
              <Form.Label>👤 Member (optional)</Form.Label>
              <Form.Select
                value={memberId ?? ""}
                onChange={(e) =>
                  setMemberId(e.target.value === "" ? null : e.target.value)
                }
              >
                <option value="">Anonymous / Not linked</option>
                {members.map((m) => (
                  <option key={m._id} value={m._id}>
                    {m.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Form.Group className="mb-3" controlId="formDescription">
          <Form.Label>📝 Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            placeholder="Enter details of the complaint..."
          />
        </Form.Group>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formDate">
              <Form.Label>📅 Complaint Date</Form.Label>
              <Form.Control
                type="date"
                value={complainDate}
                onChange={(e) => setComplainDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6} className="d-flex align-items-center">
            <Form.Check
              type="checkbox"
              id="isResolved"
              label="Mark as Resolved"
              checked={isResolved}
              onChange={(e) => setIsResolved(e.target.checked)}
            />
          </Col>
        </Row>

        <div className="text-end">
          <Button variant="primary" type="submit">
            Submit Complaint
          </Button>
        </div>
      </Form>

      <h4 className="mb-3">📄 Complaint Records</h4>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p>Loading complaints...</p>
        </div>
      ) : complains.length === 0 ? (
        <Alert variant="info">No complaints found.</Alert>
      ) : (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>House</th>
              <th>Member</th>
              <th>Description</th>
              <th>Complaint Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {complains.map((comp, idx) => (
              <tr key={comp._id}>
                <td>{idx + 1}</td>
                <td>{comp.houseId?.houseNumber || "N/A"}</td>
                <td>{comp.memberId?.fullName || "Anonymous"}</td>
                <td>{comp.description}</td>
                <td>
                  {comp.complainDate
                    ? new Date(comp.complainDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {comp.isResolved ? (
                    <Badge bg="success">Resolved</Badge>
                  ) : (
                    <Badge bg="warning">Pending</Badge>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default ComplainsPage;
