"use client";

import { useEffect, useState, useMemo } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FaEdit, FaTrash, FaSearch, FaFileCsv } from "react-icons/fa";

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

const API_BASE = "https://localhost:7293";

export default function BookReportsPage() {
  const [reports, setReports] = useState<BookReport[]>([]);
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [editId, setEditId] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ [k: string]: string }>({});
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const [formData, setFormData] = useState<Omit<BookReport, "id" | "book">>({
    bookId: 0,
    reportDate: new Date().toISOString().split("T")[0],
    remarks: "",
  });

  // Load initial data
  useEffect(() => {
    loadReports();
    loadBooks();
  }, []);

  const loadReports = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/BookReports`);
      if (!res.ok) throw new Error("Failed to fetch reports");
      const data = await res.json();

      // Ensure the response is an array before using it
      if (Array.isArray(data)) {
        setReports(data);
      } else {
        throw new Error("Reports API returned unexpected data format.");
      }
    } catch (err: any) {
      toast.error("Failed to load reports: " + err.message);
      setReports([]); // fallback to empty array to avoid crash
    } finally {
      setLoading(false);
    }
  };

  const loadBooks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/Book`);
      if (!res.ok) throw new Error("Failed to fetch books");
      const data = await res.json();

      // Ensure it's an array
      if (Array.isArray(data)) {
        setBooks(data);
      } else {
        throw new Error("Books API returned unexpected data format.");
      }
    } catch (err: any) {
      toast.error("Failed to load books: " + err.message);
      setBooks([]); // Fallback to empty array to avoid crashing .map
    }
  };

  const resetForm = () => {
    setFormData({
      bookId: 0,
      reportDate: new Date().toISOString().split("T")[0],
      remarks: "",
    });
    setFormErrors({});
    setEditId(null);
  };

  const validate = () => {
    const errors: { [k: string]: string } = {};
    if (!formData.bookId) errors.bookId = "Please select a book";
    if (!formData.reportDate) errors.reportDate = "Report date is required";
    if (!formData.remarks.trim()) errors.remarks = "Remarks cannot be empty";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

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
    if (!validate()) {
      toast.warning("Fix errors before submitting");
      return;
    }

    const url = editId
      ? `${API_BASE}/api/BookReports/${editId}`
      : `${API_BASE}/api/BookReports`;
    const method = editId ? "PUT" : "POST";

    try {
      setSubmitting(true);
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editId ? { ...formData, id: editId } : formData),
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Server error ${res.status}: ${txt}`);
      }

      toast.success(editId ? "Report updated" : "Report created");
      resetForm();
      await loadReports();
    } catch (err: any) {
      toast.error("Submit failed: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (report: BookReport) => {
    setEditId(report.id);
    setFormData({
      bookId: report.bookId,
      reportDate: report.reportDate.split("T")[0],
      remarks: report.remarks,
    });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/BookReports/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const txt = await res.text();
        throw new Error(`Delete failed ${res.status}: ${txt}`);
      }
      toast.success("Deleted successfully");
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      toast.error("Delete error: " + err.message);
    }
  };

  const filtered = useMemo(() => {
    if (!Array.isArray(reports)) return [];

    const search = searchQuery.toLowerCase();
    return reports.filter(
      (r) =>
        (r.book?.title || "").toLowerCase().includes(search) ||
        r.remarks.toLowerCase().includes(search)
    );
  }, [reports, searchQuery]);

  const totalPages = Math.ceil(filtered.length / pageSize);
  const pageData = filtered.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const goPage = (p: number) => {
    if (p < 1 || p > totalPages) return;
    setCurrentPage(p);
  };

  const exportCSV = () => {
    const csvHeader = ["ID", "Book Title", "Report Date", "Remarks"];
    const rows = filtered.map((r) => [
      r.id,
      r.book?.title || "",
      r.reportDate.split("T")[0],
      `"${r.remarks.replace(/"/g, '""')}"`,
    ]);
    const csvContent = [csvHeader, ...rows]
      .map((row) => row.join(","))
      .join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `book_reports_${new Date().toISOString().slice(0, 10)}.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center"> Book Reports</h2>

      {/* Search & Export */}
      <div className="flex flex-col md:flex-row md:justify-between items-start md:items-center mb-4 gap-2">
        <div className="relative w-full md:w-1/2">
          <input
            type="text"
            placeholder="Search by book or remarks..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
            className="w-full border px-3 py-2 rounded pl-8"
            aria-label="Search reports"
          />
          <FaSearch className="absolute top-1/2 left-2 transform -translate-y-1/2 text-gray-400" />
        </div>
        <button
          onClick={exportCSV}
          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded flex items-center gap-2"
        >
          <FaFileCsv /> Export CSV
        </button>
      </div>

      {/* Form */}
      <div
        className={`bg-white shadow-md rounded-lg p-6 mb-8 ${
          editId ? "border-2 border-blue-400" : ""
        }`}
      >
        <h3 className="text-xl font-semibold mb-4">
          {editId ? " Edit Report" : " Create Report"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block font-medium mb-1">Book</label>
            <select
              name="bookId"
              value={formData.bookId}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.bookId ? "border-red-500" : "border-gray-300"
              }`}
              aria-label="Select book"
            >
              <option value={0}>-- Select Book --</option>
              {books.map((b) => (
                <option key={b.id} value={b.id}>
                  {b.title}
                </option>
              ))}
            </select>
            {formErrors.bookId && (
              <p className="text-red-500 text-sm mt-1">{formErrors.bookId}</p>
            )}
          </div>

          <div>
            <label className="block font-medium mb-1">Report Date</label>
            <input
              type="date"
              name="reportDate"
              value={formData.reportDate}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.reportDate ? "border-red-500" : "border-gray-300"
              }`}
              aria-label="Report date"
            />
            {formErrors.reportDate && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.reportDate}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Remarks</label>
            <textarea
              name="remarks"
              rows={3}
              value={formData.remarks}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.remarks ? "border-red-500" : "border-gray-300"
              }`}
              aria-label="Remarks"
            />
            {formErrors.remarks && (
              <p className="text-red-500 text-sm mt-1">{formErrors.remarks}</p>
            )}
          </div>

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {submitting
                ? "Submitting..."
                : editId
                ? "Update Report"
                : "Create Report"}
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
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <p className="text-gray-500">Loading reports...</p>
        ) : filtered.length === 0 ? (
          <p className="text-center text-gray-500 py-8">No reports to show.</p>
        ) : (
          <>
            <table className="w-full table-auto border border-gray-300 shadow-sm mb-4">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 border">ID</th>
                  <th className="px-4 py-2 border">Book</th>
                  <th className="px-4 py-2 border">Date</th>
                  <th className="px-4 py-2 border">Remarks</th>
                  <th className="px-4 py-2 border">Actions</th>
                </tr>
              </thead>
              <tbody>
                {pageData.map((r) => (
                  <tr
                    key={r.id}
                    className="text-sm text-center hover:bg-gray-50"
                  >
                    <td className="border px-4 py-2">{r.id}</td>
                    <td className="border px-4 py-2">
                      {r.book?.title || "N/A"}
                    </td>
                    <td className="border px-4 py-2">
                      {r.reportDate.split("T")[0]}
                    </td>
                    <td className="border px-4 py-2">{r.remarks}</td>
                    <td className="border px-4 py-2 flex justify-center gap-2">
                      <button
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                        onClick={() => handleEdit(r)}
                        aria-label={`Edit report ${r.id}`}
                      >
                        <FaEdit />
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                        onClick={() => handleDelete(r.id)}
                        aria-label={`Delete report ${r.id}`}
                      >
                        <FaTrash />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Pagination */}
            <div className="flex justify-center gap-2 mb-4">
              <button
                disabled={currentPage === 1}
                onClick={() => goPage(currentPage - 1)}
                className="px-3 py-1 border rounded hover:bg-gray-200"
              >
                Previous
              </button>
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i}
                  onClick={() => goPage(i + 1)}
                  className={`px-3 py-1 border rounded ${
                    i + 1 === currentPage
                      ? "bg-blue-600 text-white"
                      : "hover:bg-gray-200"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
              <button
                disabled={currentPage === totalPages}
                onClick={() => goPage(currentPage + 1)}
                className="px-3 py-1 border rounded hover:bg-gray-200"
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
