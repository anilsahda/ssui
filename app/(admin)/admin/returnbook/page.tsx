"use client";

import { useEffect, useState } from "react";

type ReturnBook = {
  id: number;
  issueBookId: number;
  returnDate: string;
  fineAmount: number;
  issueBook?: {
    id: number;
    // you can include more fields if your API includes them: e.g. Book, Student, etc.
  };
};

type IssueBook = {
  id: number;
  // optionally include other fields if needed
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function ReturnBooksPage() {
  const [returns, setReturns] = useState<ReturnBook[]>([]);
  const [issueBooks, setIssueBooks] = useState<IssueBook[]>([]);
  const [formData, setFormData] = useState<
    Omit<ReturnBook, "id" | "issueBook">
  >({
    issueBookId: 0,
    returnDate: new Date().toISOString().split("T")[0],
    fineAmount: 0,
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [issueBooksRes, returnsRes] = await Promise.all([
        fetch(`${API_BASE}/api/IssueBooks`),
        fetch(`${API_BASE}/api/ReturnBooks`),
      ]);

      if (!issueBooksRes.ok || !returnsRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [ibData, returnsData] = await Promise.all([
        issueBooksRes.json(),
        returnsRes.json(),
      ]);

      setIssueBooks(ibData);
      setReturns(returnsData);
      setError(null);
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
    const { name, value } = e.target;
    let newVal: any = value;
    if (name === "issueBookId") {
      newVal = parseInt(value);
    } else if (name === "fineAmount") {
      newVal = parseFloat(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: newVal,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.issueBookId === 0) {
      alert("Please select an Issue Book");
      return;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/api/ReturnBooks/${editId}`
        : `${API_BASE}/api/ReturnBooks`;

      const payload = editId ? { ...formData, id: editId } : formData;

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server responded ${resp.status}: ${text}`);
      }

      // Reset form
      setFormData({
        issueBookId: 0,
        returnDate: new Date().toISOString().split("T")[0],
        fineAmount: 0,
      });
      setEditId(null);
      await loadAll();
    } catch (err: any) {
      alert("Save failed: " + err.message);
    }
  };

  const handleEdit = (rb: ReturnBook) => {
    setEditId(rb.id);
    setFormData({
      issueBookId: rb.issueBookId,
      returnDate: rb.returnDate.split("T")[0],
      fineAmount: rb.fineAmount,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const resp = await fetch(`${API_BASE}/api/ReturnBooks/${id}`, {
        method: "DELETE",
      });

      if (!resp.ok) {
        throw new Error(`Delete failed: ${resp.status}`);
      }

      await loadAll();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Return Books</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-4">
        <div className="card-header">
          {editId ? `Edit Return #${editId}` : "New Return"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="issueBookId" className="form-label">
                Issue Book
              </label>
              <select
                id="issueBookId"
                name="issueBookId"
                className="form-select"
                value={formData.issueBookId}
                onChange={handleChange}
                required
              >
                <option value={0} disabled>
                  Select Issue Book
                </option>
                {issueBooks.map((ib) => (
                  <option key={ib.id} value={ib.id}>
                    #{ib.id}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label htmlFor="returnDate" className="form-label">
                Return Date
              </label>
              <input
                type="date"
                id="returnDate"
                name="returnDate"
                className="form-control"
                value={formData.returnDate}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="fineAmount" className="form-label">
                Fine Amount
              </label>
              <input
                type="number"
                id="fineAmount"
                name="fineAmount"
                className="form-control"
                value={formData.fineAmount}
                step="0.01"
                min="0"
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary me-2">
              {editId ? "Update" : "Save"}
            </button>
            {editId && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setEditId(null);
                  setFormData({
                    issueBookId: 0,
                    returnDate: new Date().toISOString().split("T")[0],
                    fineAmount: 0,
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Issue Book</th>
              <th>Return Date</th>
              <th>Fine</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {returns.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No return records found.
                </td>
              </tr>
            ) : (
              returns.map((rb) => (
                <tr key={rb.id}>
                  <td>{rb.id}</td>
                  <td>{rb.issueBook?.id ?? rb.issueBookId}</td>
                  <td>{rb.returnDate.split("T")[0]}</td>
                  <td>{rb.fineAmount.toFixed(2)}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(rb)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(rb.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      )}
    </div>
  );
}
