"use client";

import React, { useEffect, useState, FormEvent } from "react";
import {
  Container,
  Form,
  Button,
  Table,
  Modal,
  Alert,
  Spinner,
} from "react-bootstrap";

type Member = {
  _id: string;
  fullName: string;
};

type Report = {
  _id: string;
  memberId: { _id: string; fullName: string } | string;
  reportDetails: string;
  reportDate: string;
};

const MemberReportsPage: React.FC = () => {
  const [reports, setReports] = useState<Report[]>([]);
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(false);

  const [reportDetails, setReportDetails] = useState("");
  const [memberId, setMemberId] = useState("");
  const [editId, setEditId] = useState<string | null>(null);

  const [error, setError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const API_BASE = "http://localhost:5000/api";

  const fetchReports = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/member-reports`);
      const data = await res.json();
      setReports(data || []);
    } catch (err) {
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  const fetchMembers = async () => {
    try {
      const res = await fetch(`${API_BASE}/members`);
      const data = await res.json();
      setMembers(data.data || []);
    } catch {
      setMembers([]);
    }
  };

  useEffect(() => {
    fetchReports();
    fetchMembers();
  }, []);

  const resetForm = () => {
    setReportDetails("");
    setMemberId("");
    setEditId(null);
    setError(null);
    setSuccessMsg(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccessMsg(null);

    if (!memberId || !reportDetails.trim()) {
      setError("Please select a member and fill in report details.");
      return;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/member-reports/${editId}`
        : `${API_BASE}/member-reports`;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reportDetails, memberId }),
      });

      if (!res.ok) throw new Error("Failed to save report");

      await fetchReports();
      resetForm();
      setSuccessMsg(editId ? "Report updated successfully." : "Report added.");
    } catch (err: any) {
      setError(err.message || "Error saving report.");
    }
  };

  const handleEdit = (report: Report) => {
    setEditId(report._id);
    setReportDetails(report.reportDetails);
    setMemberId(
      typeof report.memberId === "string"
        ? report.memberId
        : report.memberId?._id || ""
    );
  };

  const confirmDelete = (id: string) => {
    setDeleteId(id);
    setShowDeleteModal(true);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`${API_BASE}/member-reports/${deleteId}`, {
        method: "DELETE",
      });
      await fetchReports();
      setSuccessMsg("Report deleted.");
    } catch {
      setError("Failed to delete report.");
    } finally {
      setShowDeleteModal(false);
      setDeleteId(null);
    }
  };

  return (
    <Container className="my-5">
      <h2 className="mb-4 text-center">📋 Member Reports</h2>

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
        className="bg-light p-4 rounded shadow-sm mb-4"
      >
        <h5>{editId ? "Edit Report" : "New Member Report"}</h5>
        <Form.Group className="mb-3">
          <Form.Label>Select Member</Form.Label>
          <Form.Select
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            required
          >
            <option value="">-- Select Member --</option>
            {members.map((m) => (
              <option key={m._id} value={m._id}>
                {m.fullName}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Report Details</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={reportDetails}
            onChange={(e) => setReportDetails(e.target.value)}
            required
          />
        </Form.Group>

        <div className="text-end">
          <Button type="submit" variant="primary">
            {editId ? "Update Report" : "Add Report"}
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
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : reports.length === 0 ? (
        <Alert variant="info">No reports found.</Alert>
      ) : (
        <Table bordered hover responsive className="shadow-sm">
          <thead className="table-light">
            <tr>
              <th>Member</th>
              <th>Report Details</th>
              <th>Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r._id}>
                <td>
                  {typeof r.memberId === "string"
                    ? r.memberId
                    : r.memberId?.fullName || "Unknown"}
                </td>
                <td>{r.reportDetails}</td>
                <td>
                  {r.reportDate
                    ? new Date(r.reportDate).toLocaleDateString()
                    : "-"}
                </td>
                <td>
                  <Button
                    variant="outline-warning"
                    size="sm"
                    className="me-2"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={() => confirmDelete(r._id)}
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
          <Modal.Title>Confirm Delete</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to delete this report?</Modal.Body>
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

export default MemberReportsPage;
