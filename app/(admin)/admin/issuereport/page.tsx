// pages/issue-reports.tsx
import { useEffect, useState } from "react";

type IssueReport = {
  id: number;
  issueBookId: number;
  reportDate: string;
  message: string;
  issueBook?: {
    id: number;
  };
};

type IssueBook = {
  id: number;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function IssueReportsPage() {
  const [reports, setReports] = useState<IssueReport[]>([]);
  const [issueBooks, setIssueBooks] = useState<IssueBook[]>([]);
  const [formData, setFormData] = useState<
    Omit<IssueReport, "id" | "issueBook">
  >({
    issueBookId: 0,
    reportDate: new Date().toISOString().split("T")[0],
    message: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const [reportsRes, booksRes] = await Promise.all([
      fetch(`${API_BASE}/api/IssueReports`),
      fetch(`${API_BASE}/api/IssueBooks`),
    ]);

    const [reportsData, booksData] = await Promise.all([
      reportsRes.json(),
      booksRes.json(),
    ]);

    setReports(reportsData);
    setIssueBooks(booksData);
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const method = editId ? "PUT" : "POST";
    const url = editId
      ? `${API_BASE}/api/IssueReports/${editId}`
      : `${API_BASE}/api/IssueReports`;

    const payload = editId ? { ...formData, id: editId } : formData;

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      alert("Failed to save report.");
      return;
    }

    setFormData({
      issueBookId: 0,
      reportDate: new Date().toISOString().split("T")[0],
      message: "",
    });
    setEditId(null);
    await loadData();
  };

  const handleEdit = (report: IssueReport) => {
    setEditId(report.id);
    setFormData({
      issueBookId: report.issueBookId,
      reportDate: report.reportDate.split("T")[0],
      message: report.message,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this report?")) return;

    const res = await fetch(`${API_BASE}/api/IssueReports/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Failed to delete.");
      return;
    }

    await loadData();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Issue Reports</h2>

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-header">
          {editId ? "Edit Report" : "New Report"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Issue Book ID</label>
              <select
                name="issueBookId"
                className="form-select"
                value={formData.issueBookId}
                onChange={handleChange}
                required
              >
                <option value="">Select Issue Book</option>
                {issueBooks.map((book) => (
                  <option key={book.id} value={book.id}>
                    #{book.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Report Date</label>
              <input
                type="date"
                name="reportDate"
                className="form-control"
                value={formData.reportDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Message</label>
              <textarea
                name="message"
                className="form-control"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                required
              ></textarea>
            </div>

            <button type="submit" className="btn btn-success me-2">
              {editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    issueBookId: 0,
                    reportDate: new Date().toISOString().split("T")[0],
                    message: "",
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* TABLE */}
      <h4>All Reports</h4>
      <table className="table table-bordered table-striped">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>IssueBook ID</th>
            <th>Report Date</th>
            <th>Message</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.map((report) => (
            <tr key={report.id}>
              <td>{report.id}</td>
              <td>{report.issueBookId}</td>
              <td>{report.reportDate.split("T")[0]}</td>
              <td>{report.message}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(report)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(report.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {reports.length === 0 && (
            <tr>
              <td colSpan={5} className="text-center text-muted">
                No reports found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
