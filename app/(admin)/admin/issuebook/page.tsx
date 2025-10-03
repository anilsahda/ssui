"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

type Book = { id: number; title: string };
type Student = { id: number; name: string };

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function IssueBooksPage() {
  const [issues, setIssues] = useState<IssueBook[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
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

  const [errors, setErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const [bookRes, studentRes, issueRes] = await Promise.all([
        fetch(`${API_BASE}/api/Book`),
        fetch(`${API_BASE}/api/Student`),
        fetch(`${API_BASE}/api/IssueBooks`),
      ]);
      if (!bookRes.ok || !studentRes.ok || !issueRes.ok)
        throw new Error("Failed to load data");

      const [bookData, studentData, issueData] = await Promise.all([
        bookRes.json(),
        studentRes.json(),
        issueRes.json(),
      ]);

      setBooks(bookData);
      setStudents(studentData);
      setIssues(issueData);
    } catch (err: any) {
      setError(err.message || "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    let val: any = value;

    if (type === "checkbox") {
      val = (e.target as HTMLInputElement).checked;
    }

    if (name === "bookId" || name === "studentId") {
      val = parseInt(val);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!formData.bookId) errs.bookId = "Book is required";
    if (!formData.studentId) errs.studentId = "Student is required";
    if (!formData.issueDate) errs.issueDate = "Issue date required";
    if (!formData.dueDate) errs.dueDate = "Due date required";
    if (
      formData.issueDate &&
      formData.dueDate &&
      new Date(formData.dueDate) < new Date(formData.issueDate)
    ) {
      errs.dueDate = "Due date cannot be before issue date";
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      bookId: 0,
      studentId: 0,
      issueDate: new Date().toISOString().split("T")[0],
      dueDate: new Date(new Date().setDate(new Date().getDate() + 14))
        .toISOString()
        .split("T")[0],
      isReturned: false,
    });
    setErrors({});
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/api/IssueBooks/${editId}`
        : `${API_BASE}/api/IssueBooks`;

      const payload = { ...formData, ...(editId ? { id: editId } : {}) };

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) throw new Error(`Failed: ${resp.status}`);

      toast.success(editId ? "Updated successfully" : "Issued successfully");
      resetForm();
      await loadAll();
    } catch (err: any) {
      toast.error("Error: " + err.message);
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
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    try {
      const resp = await fetch(`${API_BASE}/api/IssueBooks/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) throw new Error("Delete failed");

      setIssues((prev) => prev.filter((i) => i.id !== id));
      toast.success("Deleted successfully");
    } catch (err: any) {
      toast.error("Delete failed: " + err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-4">Issue Books</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white shadow p-5 rounded-md">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? `Edit Issue #${editId}` : "New Issue"}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block mb-1">Book</label>
            <select
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.bookId ? "border-red-500" : ""
              }`}
            >
              <option value={0}>Select Book</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
            {errors.bookId && (
              <p className="text-red-500 text-sm">{errors.bookId}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Student</label>
            <select
              name="studentId"
              value={formData.studentId}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.studentId ? "border-red-500" : ""
              }`}
            >
              <option value={0}>Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {errors.studentId && (
              <p className="text-red-500 text-sm">{errors.studentId}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Issue Date</label>
            <input
              type="date"
              name="issueDate"
              value={formData.issueDate}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.issueDate ? "border-red-500" : ""
              }`}
            />
            {errors.issueDate && (
              <p className="text-red-500 text-sm">{errors.issueDate}</p>
            )}
          </div>

          <div>
            <label className="block mb-1">Due Date</label>
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={handleChange}
              className={`w-full border p-2 rounded ${
                errors.dueDate ? "border-red-500" : ""
              }`}
            />
            {errors.dueDate && (
              <p className="text-red-500 text-sm">{errors.dueDate}</p>
            )}
          </div>

          <div className="md:col-span-2 flex items-center gap-2 mt-2">
            <input
              type="checkbox"
              name="isReturned"
              checked={formData.isReturned}
              onChange={handleChange}
            />
            <label>Returned</label>
          </div>
        </div>

        <div className="mt-4 flex gap-3">
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
          >
            {editId ? "Update" : "Issue"}
          </button>
          {editId && (
            <button
              type="button"
              onClick={resetForm}
              className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
            >
              Cancel
            </button>
          )}
        </div>
      </form>

      {/* Table */}
      <div className="mt-8 overflow-x-auto">
        {loading ? (
          <p className="text-gray-500">Loading issues...</p>
        ) : (
          <table className="w-full table-auto border mt-4 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-3 py-2">ID</th>
                <th className="border px-3 py-2">Book</th>
                <th className="border px-3 py-2">Student</th>
                <th className="border px-3 py-2">Issue Date</th>
                <th className="border px-3 py-2">Due Date</th>
                <th className="border px-3 py-2">Returned</th>
                <th className="border px-3 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {issues.length === 0 ? (
                <tr>
                  <td colSpan={7} className="text-center py-4 text-gray-500">
                    No records
                  </td>
                </tr>
              ) : (
                issues.map((issue) => (
                  <tr key={issue.id} className="text-center">
                    <td className="border px-3 py-2">{issue.id}</td>
                    <td className="border px-3 py-2">{issue.book?.title}</td>
                    <td className="border px-3 py-2">{issue.student?.name}</td>
                    <td className="border px-3 py-2">
                      {issue.issueDate.split("T")[0]}
                    </td>
                    <td className="border px-3 py-2">
                      {issue.dueDate.split("T")[0]}
                    </td>
                    <td className="border px-3 py-2">
                      {issue.isReturned ? "✔️" : "❌"}
                    </td>
                    <td className="border px-3 py-2 flex justify-center gap-2">
                      <button
                        className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleEdit(issue)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleDelete(issue.id)}
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
    </div>
  );
}
