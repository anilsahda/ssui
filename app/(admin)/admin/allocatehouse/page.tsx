// pages/admin/allocateHouses.tsx

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
} from "react-bootstrap";

type House = {
  _id: string;
  houseNumber: string;
};

type Member = {
  _id: string;
  fullName: string;
};

type Allocation = {
  _id: string;
  houseId: House;
  memberId: Member;
  allocationDate: string;
  releaseDate: string | null;
};

const AllocateHousesPage: React.FC = () => {
  const [allocations, setAllocations] = useState<Allocation[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [houseId, setHouseId] = useState<string>("");
  const [memberId, setMemberId] = useState<string>("");
  const [allocationDate, setAllocationDate] = useState<string>("");
  const [releaseDate, setReleaseDate] = useState<string>("");

  const [houses, setHouses] = useState<House[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const API_BASE = "http://localhost:5000/api/allocations";
  const HOUSES_API = "http://localhost:5000/api/houses";
  const MEMBERS_API = "http://localhost:5000/api/members";

  // Fetch all data
  async function fetchData() {
    setLoading(true);
    setError(null);
    try {
      const [allocRes, housesRes, membersRes] = await Promise.all([
        fetch(API_BASE),
        fetch(HOUSES_API),
        fetch(MEMBERS_API),
      ]);

      if (!allocRes.ok || !housesRes.ok || !membersRes.ok) {
        throw new Error("Failed to load data.");
      }

      const [allocJson, housesJson, membersJson] = await Promise.all([
        allocRes.json(),
        housesRes.json(),
        membersRes.json(),
      ]);

      setAllocations(allocJson.data || []);
      setHouses(housesJson.data || housesJson);
      setMembers(membersJson.data || membersJson);
    } catch (err: any) {
      setError(err.message || "Unknown error");
    } finally {
      setLoading(false);
    }
  }

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
        allocationDate: allocationDate || undefined,
        releaseDate: releaseDate || undefined,
      };

      const res = await fetch(API_BASE, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const errorJson = await res.json();
        throw new Error(errorJson.error || "Allocation failed.");
      }

      // Reset form
      setHouseId("");
      setMemberId("");
      setAllocationDate("");
      setReleaseDate("");

      await fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">🏠 Allocate Houses</h2>

      {error && (
        <Alert variant="danger" dismissible onClose={() => setError(null)}>
          {error}
        </Alert>
      )}

      <Form
        onSubmit={handleSubmit}
        className="border p-4 rounded shadow-sm bg-light mb-4"
      >
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formHouse">
              <Form.Label>Select House</Form.Label>
              <Form.Select
                value={houseId}
                onChange={(e) => setHouseId(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                {houses.map((house) => (
                  <option key={house._id} value={house._id}>
                    {house.houseNumber}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formMember">
              <Form.Label>Select Member</Form.Label>
              <Form.Select
                value={memberId}
                onChange={(e) => setMemberId(e.target.value)}
                required
              >
                <option value="">Choose...</option>
                {members.map((member) => (
                  <option key={member._id} value={member._id}>
                    {member.fullName}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <Form.Group className="mb-3" controlId="formAllocationDate">
              <Form.Label>Allocation Date</Form.Label>
              <Form.Control
                type="date"
                value={allocationDate}
                onChange={(e) => setAllocationDate(e.target.value)}
              />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group className="mb-3" controlId="formReleaseDate">
              <Form.Label>Release Date</Form.Label>
              <Form.Control
                type="date"
                value={releaseDate}
                onChange={(e) => setReleaseDate(e.target.value)}
              />
            </Form.Group>
          </Col>
        </Row>

        <div className="text-end">
          <Button variant="primary" type="submit">
            Allocate
          </Button>
        </div>
      </Form>

      <h4 className="mb-3">📋 Allocation Records</h4>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
          <p className="mt-2">Loading...</p>
        </div>
      ) : allocations.length > 0 ? (
        <Table striped bordered hover responsive className="shadow-sm">
          <thead>
            <tr>
              <th>#</th>
              <th>House</th>
              <th>Member</th>
              <th>Allocation Date</th>
              <th>Release Date</th>
            </tr>
          </thead>
          <tbody>
            {allocations.map((alloc, index) => (
              <tr key={alloc._id}>
                <td>{index + 1}</td>
                <td>{alloc.houseId?.houseNumber}</td>
                <td>{alloc.memberId?.fullName}</td>
                <td>
                  {alloc.allocationDate
                    ? new Date(alloc.allocationDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  {alloc.releaseDate
                    ? new Date(alloc.releaseDate).toLocaleDateString()
                    : "-"}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <Alert variant="info">No allocations found.</Alert>
      )}
    </Container>
  );
};

export default AllocateHousesPage;
