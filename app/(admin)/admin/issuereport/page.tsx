"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type IssueReport = {
  id: number;
  issueBookId: number;
  reportDate: string;
  message: string;
  issueBook?: { id: number };
};

type IssueBook = {
  id: number;
};

const API_BASE = "https://localhost:7293";

const getTodayISO = () => new Date().toISOString().split("T")[0];

export default function IssueReportsPage() {
  const [reports, setReports] = useState<IssueReport[]>([]);
  const [issueBooks, setIssueBooks] = useState<IssueBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<
    Omit<IssueReport, "id" | "issueBook">
  >({
    issueBookId: 0,
    reportDate: getTodayISO(),
    message: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<Record<keyof typeof formData, string>>
  >({});
  const [submitting, setSubmitting] = useState<boolean>(false);

  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [reportsRes, issueBooksRes] = await Promise.all([
        fetch(`${API_BASE}/api/IssueReports`),
        fetch(`${API_BASE}/api/IssueBooks`),
      ]);

      if (!reportsRes.ok || !issueBooksRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const reportsDataRaw = await reportsRes.json();
      const issueBooksDataRaw = await issueBooksRes.json();

      const reportsData = Array.isArray(reportsDataRaw) ? reportsDataRaw : [];
      const issueBooksData = Array.isArray(issueBooksDataRaw)
        ? issueBooksDataRaw
        : [];

      setReports(reportsData);
      setIssueBooks(issueBooksData);
    } catch (err: any) {
      console.error("loadData error:", err);
      setError(err.message || "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const validateForm = (): boolean => {
    const errs: typeof formErrors = {};
    if (!formData.issueBookId || formData.issueBookId <= 0) {
      errs.issueBookId = "Issue Book is required";
    }
    if (!formData.reportDate) {
      errs.reportDate = "Report date is required";
    }
    if (!formData.message || formData.message.trim().length === 0) {
      errs.message = "Message is required";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      issueBookId: 0,
      reportDate: getTodayISO(),
      message: "",
    });
    setFormErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "issueBookId" ? parseInt(value) || 0 : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix form errors before submitting");
      return;
    }
    setSubmitting(true);
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/api/IssueReports/${editId}`
        : `${API_BASE}/api/IssueReports`;

      const payload = editId ? { ...formData, id: editId } : formData;

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`Server error ${resp.status}: ${txt}`);
      }

      toast.success(editId ? "Report updated" : "Report created");
      resetForm();
      await loadData();
    } catch (err: any) {
      console.error("submit error:", err);
      toast.error("Failed to save: " + err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (report: IssueReport) => {
    setEditId(report.id);
    setFormData({
      issueBookId: report.issueBookId,
      reportDate: report.reportDate.split("T")[0],
      message: report.message,
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this report?")) {
      return;
    }
    try {
      const resp = await fetch(`${API_BASE}/api/IssueReports/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        const txt = await resp.text();
        throw new Error(`Delete failed: ${resp.status} — ${txt}`);
      }
      toast.success("Report deleted");
      setReports((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      console.error("delete error:", err);
      toast.error("Failed to delete: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Issue Reports</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 mb-4 rounded">{error}</div>
      )}

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? `Edit Report #${editId}` : "New Report"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label htmlFor="issueBookId" className="block mb-1 font-medium">
              Issue Book
            </label>
            <select
              id="issueBookId"
              name="issueBookId"
              className={`w-full border px-3 py-2 rounded ${
                formErrors.issueBookId ? "border-red-500" : ""
              }`}
              value={formData.issueBookId || ""}
              onChange={handleChange}
              disabled={submitting}
            >
              <option value="">Select Issue Book</option>
              {Array.isArray(issueBooks) &&
                issueBooks.map((ib) => (
                  <option key={ib.id} value={ib.id}>
                    #{ib.id}
                  </option>
                ))}
            </select>
            {formErrors.issueBookId && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.issueBookId}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="reportDate" className="block mb-1 font-medium">
              Report Date
            </label>
            <input
              id="reportDate"
              type="date"
              name="reportDate"
              className={`w-full border px-3 py-2 rounded ${
                formErrors.reportDate ? "border-red-500" : ""
              }`}
              value={formData.reportDate}
              onChange={handleChange}
              disabled={submitting}
            />
            {formErrors.reportDate && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.reportDate}
              </p>
            )}
          </div>

          <div>
            <label htmlFor="message" className="block mb-1 font-medium">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              rows={3}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.message ? "border-red-500" : ""
              }`}
              value={formData.message}
              onChange={handleChange}
              disabled={submitting}
            />
            {formErrors.message && (
              <p className="text-red-500 text-sm mt-1">{formErrors.message}</p>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 hover:bg-gray-500 text-white px-4 py-2 rounded"
                disabled={submitting}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Reports Table */}
      <div className="overflow-x-auto">
        {loading ? (
          <div className="text-center py-4">
            <div className="animate-spin h-6 w-6 mx-auto border-4 border-blue-500 border-t-transparent rounded-full" />
            <p className="text-gray-500 mt-2">Loading reports...</p>
          </div>
        ) : Array.isArray(reports) && reports.length > 0 ? (
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">ID</th>
                <th className="px-3 py-2 border">IssueBook ID</th>
                <th className="px-3 py-2 border">Report Date</th>
                <th className="px-3 py-2 border">Message</th>
                <th className="px-3 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {reports.map((r) => (
                <tr key={r.id} className="text-center">
                  <td className="px-3 py-2 border">{r.id}</td>
                  <td className="px-3 py-2 border">{r.issueBookId}</td>
                  <td className="px-3 py-2 border">
                    {r.reportDate.split("T")[0]}
                  </td>
                  <td className="px-3 py-2 border">{r.message}</td>
                  <td className="px-3 py-2 border flex justify-center gap-2">
                    <button
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                      onClick={() => handleEdit(r)}
                      disabled={submitting}
                    >
                      Edit
                    </button>
                    <button
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                      onClick={() => handleDelete(r.id)}
                      disabled={submitting}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <div className="text-center py-4 text-gray-500">
            No reports found.
          </div>
        )}
      </div>
    </div>
  );
}
