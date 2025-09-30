// pages/issue-books.tsx

import { useEffect, useState } from "react";

type IssueBook = {
  id: number;
  bookId: number;
  studentId: number;
  issueDate: string;
  dueDate: string;
  isReturned: boolean;
  book?: { id: number; title: string };
  student?: { id: number; name: string };
};

type Book = {
  id: number;
  title: string;
};

type Student = {
  id: number;
  name: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function IssueBooksPage() {
  const [issues, setIssues] = useState<IssueBook[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [formData, setFormData] = useState<
    Omit<IssueBook, "id" | "book" | "student">
  >({
    bookId: 0,
    studentId: 0,
    issueDate: new Date().toISOString().split("T")[0],
    dueDate: new Date(new Date().setDate(new Date().getDate() + 14))
      .toISOString()
      .split("T")[0],
    isReturned: false,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      // Fetch books, students, and issued books in parallel
      const [booksRes, studentsRes, issuesRes] = await Promise.all([
        fetch(`${API_BASE}/api/Book`),
        fetch(`${API_BASE}/api/Student`),
        fetch(`${API_BASE}/api/IssueBooks`),
      ]);

      if (!booksRes.ok || !studentsRes.ok || !issuesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [booksData, studentsData, issuesData] = await Promise.all([
        booksRes.json(),
        studentsRes.json(),
        issuesRes.json(),
      ]);

      setBooks(booksData);
      setStudents(studentsData);
      setIssues(issuesData);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let newValue: any = value;

    // Since we removed `checked`, parse string value for checkbox manually
    if (type === "checkbox") {
      newValue = value === "true" ? true : false;
    }

    if (name === "bookId" || name === "studentId") {
      newValue = parseInt(newValue);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/api/IssueBooks/${editId}`
        : `${API_BASE}/api/IssueBooks`;

      // Build the payload
      const payload = { ...formData, ...(editId ? { id: editId } : {}) };

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server responded with ${resp.status}: ${text}`);
      }

      // Reset form
      setFormData({
        bookId: 0,
        studentId: 0,
        issueDate: new Date().toISOString().split("T")[0],
        dueDate: new Date(new Date().setDate(new Date().getDate() + 14))
          .toISOString()
          .split("T")[0],
        isReturned: false,
      });
      setEditId(null);
      await loadAll();
    } catch (err: any) {
      console.error(err);
      alert("Save failed: " + err.message);
    }
  };

  const handleEdit = (issue: IssueBook) => {
    setEditId(issue.id);
    setFormData({
      bookId: issue.bookId,
      studentId: issue.studentId,
      issueDate: issue.issueDate.split("T")[0],
      dueDate: issue.dueDate.split("T")[0],
      isReturned: issue.isReturned,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure to delete this record?")) return;

    try {
      const resp = await fetch(`${API_BASE}/api/IssueBooks/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        throw new Error(`Delete failed: ${resp.status}`);
      }
      await loadAll();
    } catch (err: any) {
      console.error(err);
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Issue Books</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Form */}
      <div className="card my-4">
        <div className="card-header">
          {editId ? `Edit Issue #${editId}` : "New Issue Book"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="bookId" className="form-label">
                Book
              </label>
              <select
                className="form-select"
                name="bookId"
                value={formData.bookId}
                onChange={handleChange}
                required
              >
                <option value={0} disabled>
                  Select Book
                </option>
                {books.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.title}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="studentId" className="form-label">
                Student
              </label>
              <select
                className="form-select"
                name="studentId"
                value={formData.studentId}
                onChange={handleChange}
                required
              >
                <option value={0} disabled>
                  Select Student
                </option>
                {students.map((s) => (
                  <option key={s.id} value={s.id}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="row">
              <div className="col-md-6 mb-3">
                <label htmlFor="issueDate" className="form-label">
                  Issue Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="issueDate"
                  value={formData.issueDate}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="col-md-6 mb-3">
                <label htmlFor="dueDate" className="form-label">
                  Due Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  name="dueDate"
                  value={formData.dueDate}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            <div className="form-check mb-3">
              <input
                type="checkbox"
                className="form-check-input"
                name="isReturned"
                value={formData.isReturned ? "true" : "false"}
                onChange={handleChange}
                id="isReturned"
              />
              <label htmlFor="isReturned" className="form-check-label">
                Returned
              </label>
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {editId ? "Update" : "Issue"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    bookId: 0,
                    studentId: 0,
                    issueDate: new Date().toISOString().split("T")[0],
                    dueDate: new Date(
                      new Date().setDate(new Date().getDate() + 14)
                    )
                      .toISOString()
                      .split("T")[0],
                    isReturned: false,
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Book</th>
              <th>Student</th>
              <th>Issue Date</th>
              <th>Due Date</th>
              <th>Returned</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issues.length === 0 && (
              <tr>
                <td colSpan={7} className="text-center">
                  No records
                </td>
              </tr>
            )}
            {issues.map((issue) => (
              <tr key={issue.id}>
                <td>{issue.id}</td>
                <td>{issue.book?.title || "N/A"}</td>
                <td>{issue.student?.name || "N/A"}</td>
                <td>{issue.issueDate.split("T")[0]}</td>
                <td>{issue.dueDate.split("T")[0]}</td>
                <td>{issue.isReturned ? "✔️" : "❌"}</td>
                <td>
                  <button
                    className="btn btn-sm btn-primary me-2"
                    onClick={() => handleEdit(issue)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(issue.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
