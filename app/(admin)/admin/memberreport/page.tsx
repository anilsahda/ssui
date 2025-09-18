"use client";
import React, { useEffect, useState } from "react";
import {
  Container,
  Button,
  Modal,
  Form,
  Alert,
  Spinner,
  ListGroup,
  Row,
  Col,
} from "react-bootstrap";

interface Member {
  id: number;
  name: string;
}

interface MemberReport {
  id: number;
  title: string;
  description: string;
  memberId: number;
  member?: Member;
}

export default function MemberReports() {
  const [reports, setReports] = useState<MemberReport[]>([]);
  const [members, setMembers] = useState<Member[]>([]);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Modal controls
  const [showModal, setShowModal] = useState(false);
  const [editingReport, setEditingReport] = useState<MemberReport | null>(null);

  // Form state
  const [formTitle, setFormTitle] = useState("");
  const [formDescription, setFormDescription] = useState("");
  const [formMemberId, setFormMemberId] = useState<number | "">("");

  useEffect(() => {
    fetchReports();
    fetchMembers();
  }, []);

  const fetchReports = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("https://localhost:7255/api/MemberReports");
      if (!res.ok) throw new Error("Failed to fetch reports");

      const response = await res.json();
      const data = Array.isArray(response)
        ? response
        : Array.isArray(response?.data)
        ? response.data
        : [];

      setReports(data);
    } catch (err) {
      setError((err as Error).message);
      setReports([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch("https://localhost:7255/api/Members");
      if (!res.ok) throw new Error("Failed to fetch members");
      const data = await res.json();
      setMembers(Array.isArray(data) ? data : []);
    } catch (err) {
      setError((err as Error).message);
      setMembers([]);
    }
  };

  const openModal = (report?: MemberReport) => {
    if (report) {
      setEditingReport(report);
      setFormTitle(report.title);
      setFormDescription(report.description);
      setFormMemberId(report.memberId);
    } else {
      setEditingReport(null);
      setFormTitle("");
      setFormDescription("");
      setFormMemberId("");
    }
    setShowModal(true);
    setError(null);
    setSuccess(null);
  };

  const closeModal = () => setShowModal(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);

    if (!formTitle.trim() || !formDescription.trim() || !formMemberId) {
      setError("Please fill in all fields");
      return;
    }

    setLoading(true);

    try {
      const body = {
        id: editingReport?.id,
        title: formTitle,
        description: formDescription,
        memberId: formMemberId,
      };

      const method = editingReport ? "PUT" : "POST";
      const url = editingReport
        ? `https://localhost:7255/api/MemberReports/${editingReport.id}`
        : "https://localhost:7255/api/MemberReports";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(msg || "Failed to save report");
      }

      setSuccess(editingReport ? "Report updated." : "Report added.");
      fetchReports();
      closeModal();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    setLoading(true);
    setError(null);
    setSuccess(null);

    try {
      const res = await fetch(
        `https://localhost:7255/api/MemberReports/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete report");

      setSuccess("Report deleted.");
      fetchReports();
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container className="py-4">
      <h2 className="mb-4">Member Reports</h2>

      {error && <Alert variant="danger">{error}</Alert>}
      {success && (
        <Alert variant="success" dismissible onClose={() => setSuccess(null)}>
          {success}
        </Alert>
      )}

      <Button className="mb-3" onClick={() => openModal()}>
        + Add New Report
      </Button>

      {loading && (
        <div className="text-center my-3">
          <Spinner animation="border" />
        </div>
      )}

      {/* Reports List (no table) */}
      {reports.length === 0 ? (
        <p>No reports found.</p>
      ) : (
        <ListGroup>
          {reports.map((report) => (
            <ListGroup.Item
              key={report.id}
              className="d-flex justify-content-between align-items-start flex-column flex-md-row"
            >
              <div className="me-3">
                <h5>{report.title}</h5>
                <p className="mb-1">{report.description}</p>
                <small>
                  <strong>Member:</strong> {report.member?.name || "N/A"}
                </small>
              </div>
              <div className="mt-2 mt-md-0 text-md-end">
                <Button
                  size="sm"
                  variant="warning"
                  className="me-2"
                  onClick={() => openModal(report)}
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(report.id)}
                >
                  Delete
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Modal for Add/Edit */}
      <Modal show={showModal} onHide={closeModal} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>
            {editingReport ? "Edit Report" : "Add New Report"}
          </Modal.Title>
        </Modal.Header>

        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3" controlId="reportTitle">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter report title"
                value={formTitle}
                onChange={(e) => setFormTitle(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reportDescription">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Enter report description"
                value={formDescription}
                onChange={(e) => setFormDescription(e.target.value)}
                disabled={loading}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reportMember">
              <Form.Label>Member</Form.Label>
              <Form.Select
                value={formMemberId}
                onChange={(e) => setFormMemberId(Number(e.target.value))}
                disabled={loading}
                required
              >
                <option value="">Select Member</option>
                {Array.isArray(members) &&
                  members.map((m) => (
                    <option key={m.id} value={m.id}>
                      {m.name}
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
              ) : editingReport ? (
                "Update Report"
              ) : (
                "Add Report"
              )}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </Container>
  );
}
