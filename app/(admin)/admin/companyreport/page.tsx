"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  Modal,
  Button,
  Spinner,
  Table,
  Form,
  Card,
  Pagination,
} from "react-bootstrap";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface CompanyReport {
  id: number;
  companyId: number;
  reportReason: string; // changed to match backend
  reportedAt?: string; // string ISO format date
}

export default function CompanyReportsPage() {
  const [reports, setReports] = useState<CompanyReport[]>([]);
  const [filteredReports, setFilteredReports] = useState<CompanyReport[]>([]);
  const [formData, setFormData] = useState<CompanyReport>({
    id: 0,
    companyId: 0,
    reportReason: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isLoadingData, setIsLoadingData] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [viewingReport, setViewingReport] = useState<CompanyReport | null>(
    null
  );

  const reportsPerPage = 6;

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      setIsLoadingData(true);
      const res = await axios.get(`${API_BASE}/CompanyReport`);
      const data = Array.isArray(res.data)
        ? res.data
        : Array.isArray(res.data?.data)
        ? res.data.data
        : [];
      setReports(data);
      setFilteredReports(data);
    } catch (err) {
      console.error(err);
      setReports([]);
      setFilteredReports([]);
    } finally {
      setIsLoadingData(false);
    }
  };

  useEffect(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return setFilteredReports(reports);
    setFilteredReports(
      reports.filter(
        (r) =>
          r.reportReason.toLowerCase().includes(term) ||
          r.companyId.toString().includes(term) ||
          r.id.toString().includes(term)
      )
    );
  }, [searchTerm, reports]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "companyId" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/CompanyReport/${editingId}`, formData);
        Swal.fire("✅ Updated!", "Report updated successfully!", "success");
      } else {
        await axios.post(`${API_BASE}/CompanyReport`, formData);
        Swal.fire("🎉 Created!", "New report added successfully!", "success");
      }
      setFormData({ id: 0, companyId: 0, reportReason: "" });
      setEditingId(null);
      fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("❌ Error", "Failed to save report!", "error");
    } finally {
      setIsSaving(false);
    }
  };

  const handleEdit = (report: CompanyReport) => {
    setFormData(report);
    setEditingId(report.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This action cannot be undone.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#dc3545",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/CompanyReport/${id}`);
        Swal.fire("🗑️ Deleted!", "Report deleted successfully!", "success");
        fetchReports();
      } catch (err) {
        Swal.fire("❌ Error", "Failed to delete report!", "error");
      }
    }
  };

  const exportToCSV = () => {
    const csv = [
      ["ID", "Company ID", "Report Reason", "Reported At"],
      ...reports.map((r) => [
        r.id,
        r.companyId,
        `"${r.reportReason.replace(/"/g, '""')}"`,
        r.reportedAt ? new Date(r.reportedAt).toLocaleString() : "-",
      ]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `company_reports_${new Date().toISOString()}.csv`;
    link.click();
  };

  const totalPages = Math.ceil(filteredReports.length / reportsPerPage);
  const currentReports = filteredReports.slice(
    (currentPage - 1) * reportsPerPage,
    currentPage * reportsPerPage
  );

  return (
    <div className="container py-5">
      {/* Header */}
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h1 className="text-primary">📊 Company Reports</h1>
        <div className="d-flex gap-2 flex-wrap">
          <Button variant="success" onClick={exportToCSV}>
            ⬇️ Export CSV
          </Button>
          <Button variant="secondary" onClick={fetchReports}>
            🔄 Refresh
          </Button>
        </div>
      </div>

      {/* Form */}
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Card.Title>
            {editingId ? "✏️ Edit Report" : "📝 Create New Report"}
          </Card.Title>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3" controlId="companyId">
              <Form.Label>Company ID</Form.Label>
              <Form.Control
                type="number"
                min={1}
                name="companyId"
                value={formData.companyId}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="reportReason">
              <Form.Label>Report Details</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="reportReason"
                value={formData.reportReason}
                onChange={handleChange}
                placeholder="Enter detailed information about this report..."
                required
              />
            </Form.Group>

            <div className="d-flex gap-2">
              <Button type="submit" variant="primary" disabled={isSaving}>
                {isSaving && (
                  <Spinner animation="border" size="sm" className="me-2" />
                )}
                {editingId ? "Update Report" : "Create Report"}
              </Button>
              <Button
                variant="secondary"
                onClick={() => {
                  setFormData({ id: 0, companyId: 0, reportReason: "" });
                  setEditingId(null);
                }}
              >
                Reset
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Search */}
      <Form.Control
        type="text"
        placeholder="🔍 Search reports..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="mb-3"
      />

      {/* Table */}
      <Table striped bordered hover responsive className="shadow-sm">
        <thead className="table-primary">
          <tr>
            <th>ID</th>
            <th>Company ID</th>
            <th>Report Details</th>
            <th>Reported At</th>
            <th className="text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {isLoadingData ? (
            <tr>
              <td colSpan={5} className="text-center">
                Loading...
              </td>
            </tr>
          ) : currentReports.length > 0 ? (
            currentReports.map((report) => (
              <tr key={report.id}>
                <td>{report.id}</td>
                <td>{report.companyId}</td>
                <td>{report.reportReason}</td>
                <td>
                  {report.reportedAt
                    ? new Date(report.reportedAt).toLocaleString()
                    : "-"}
                </td>
                <td className="text-center">
                  <Button
                    size="sm"
                    variant="warning"
                    className="me-1"
                    onClick={() => handleEdit(report)}
                  >
                    ✏ Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="danger"
                    onClick={() => handleDelete(report.id)}
                  >
                    🗑 Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="info"
                    className="ms-1"
                    onClick={() => setViewingReport(report)}
                  >
                    👁 View
                  </Button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No reports found.
              </td>
            </tr>
          )}
        </tbody>
      </Table>

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, i) => (
            <Pagination.Item
              key={i}
              active={currentPage === i + 1}
              onClick={() => setCurrentPage(i + 1)}
            >
              {i + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}

      {/* View Modal */}
      <Modal show={!!viewingReport} onHide={() => setViewingReport(null)}>
        <Modal.Header closeButton>
          <Modal.Title>Report Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewingReport && (
            <>
              <p>
                <strong>ID:</strong> {viewingReport.id}
              </p>
              <p>
                <strong>Company ID:</strong> {viewingReport.companyId}
              </p>
              <p>
                <strong>Report Details:</strong> {viewingReport.reportReason}
              </p>
              <p>
                <strong>Reported At:</strong>{" "}
                {viewingReport.reportedAt
                  ? new Date(viewingReport.reportedAt).toLocaleString()
                  : "-"}
              </p>
            </>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setViewingReport(null)}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
