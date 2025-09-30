"use client";
import { useEffect, useState } from "react";

type BookReport = {
  id: number;
  bookId: number;
  reportDate: string;
  remarks: string;
  book?: {
    id: number;
    title: string;
  };
};

type Book = {
  id: number;
  title: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function BookReportsPage() {
  const [reports, setReports] = useState<BookReport[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Omit<BookReport, "id" | "book">>({
    bookId: 0,
    reportDate: new Date().toISOString().split("T")[0],
    remarks: "",
  });
  const [editId, setEditId] = useState<number | null>(null);

  // Load all reports
  const loadReports = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/BookReports`);
      const data = await res.json();
      setReports(data);
    } catch (err) {
      setError("Failed to load reports.");
    } finally {
      setLoading(false);
    }
  };

  // Load books for dropdown
  const loadBooks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/Book`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError("Failed to load books.");
    }
  };

  useEffect(() => {
    loadReports();
    loadBooks();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "bookId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = editId
      ? `${API_BASE}/api/BookReports/${editId}`
      : `${API_BASE}/api/BookReports`;
    const method = editId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editId ? { ...formData, id: editId } : formData),
    });

    if (!res.ok) {
      alert("Failed to submit");
      return;
    }

    setFormData({
      bookId: 0,
      reportDate: new Date().toISOString().split("T")[0],
      remarks: "",
    });
    setEditId(null);
    loadReports();
  };

  const handleEdit = (report: BookReport) => {
    setFormData({
      bookId: report.bookId,
      reportDate: report.reportDate.split("T")[0],
      remarks: report.remarks,
    });
    setEditId(report.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`${API_BASE}/api/BookReports/${id}`, {
      method: "DELETE",
    });
    if (!res.ok) {
      alert("Delete failed");
      return;
    }

    loadReports();
  };

  return (
    <div className="container mt-5">
      <h2>Book Reports</h2>

      {/* Form */}
      <div className="card my-4">
        <div className="card-header">
          {editId ? "Edit Book Report" : "Create Book Report"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Book</label>
              <select
                name="bookId"
                className="form-select"
                value={formData.bookId}
                onChange={handleChange}
                required
              >
                <option value="">-- Select Book --</option>
                {books.map((book) => (
                  <option key={book.id} value={book.id}>
                    {book.title}
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
              <label className="form-label">Remarks</label>
              <textarea
                name="remarks"
                className="form-control"
                value={formData.remarks}
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
                  setFormData({
                    bookId: 0,
                    reportDate: new Date().toISOString().split("T")[0],
                    remarks: "",
                  });
                  setEditId(null);
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Table */}
      <h5>All Reports</h5>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Date</th>
              <th>Remarks</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reports.map((r) => (
              <tr key={r.id}>
                <td>{r.id}</td>
                <td>{r.book?.title || "N/A"}</td>
                <td>{r.reportDate.split("T")[0]}</td>
                <td>{r.remarks}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(r)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(r.id)}
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
      )}
    </div>
  );
}
