"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type ReturnBook = {
  id: number;
  issueBookId: number;
  returnDate: string;
  fineAmount: number;
  issueBook?: {
    id: number;
    // optionally more fields like student, book
  };
};

type IssueBook = {
  id: number;
  // optionally more fields
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7293";

export default function ReturnBooksPage() {
  const [returns, setReturns] = useState<ReturnBook[]>([]);
  const [issueBooks, setIssueBooks] = useState<IssueBook[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    issueBookId: number;
    returnDate: string;
    fineAmount: number;
  }>({
    issueBookId: 0,
    returnDate: new Date().toISOString().split("T")[0],
    fineAmount: 0,
  });
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({});

  // Load all data (issueBooks + returns)
  const loadAll = async () => {
    try {
      setLoading(true);
      setError(null);
      const [ibRes, retRes] = await Promise.all([
        fetch(`${API_BASE}/api/IssueBooks`),
        fetch(`${API_BASE}/api/ReturnBooks`),
      ]);
      if (!ibRes.ok || !retRes.ok) {
        throw new Error("Failed to fetch data");
      }
      const [ibData, retData] = await Promise.all([
        ibRes.json(),
        retRes.json(),
      ]);
      setIssueBooks(ibData);
      setReturns(retData);
    } catch (err: any) {
      console.error("loadAll error", err);
      setError(err.message || "Error loading data");
      toast.error("Error loading data: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAll();
  }, []);

  const validate = (): boolean => {
    const errs: Partial<typeof formData> = {};
    if (!formData.issueBookId || formData.issueBookId === 0) {
      errs.issueBookId = "Issue Book is required";
    }
    if (!formData.returnDate) {
      errs.returnDate = "Return date is required";
    }
    if (formData.fineAmount < 0) {
      errs.fineAmount = "Fine cannot be negative";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      issueBookId: 0,
      returnDate: new Date().toISOString().split("T")[0],
      fineAmount: 0,
    });
    setFormErrors({});
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    let val: any = value;
    if (name === "issueBookId") {
      val = parseInt(value);
    } else if (name === "fineAmount") {
      val = parseFloat(value);
    }
    setFormData((prev) => ({
      ...prev,
      [name]: val,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.warn("Please fix form errors");
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
        throw new Error(`Server responded with ${resp.status}: ${text}`);
      }

      toast.success(editId ? "Return record updated" : "Return record created");
      resetForm();
      await loadAll();
    } catch (err: any) {
      console.error("submit error", err);
      toast.error("Save failed: " + (err.message || ""));
    }
  };

  const handleEdit = (rb: ReturnBook) => {
    setEditId(rb.id);
    setFormData({
      issueBookId: rb.issueBookId,
      returnDate: rb.returnDate.split("T")[0],
      fineAmount: rb.fineAmount,
    });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this record?")) return;

    try {
      const resp = await fetch(`${API_BASE}/api/ReturnBooks/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        throw new Error(`Delete failed with status ${resp.status}`);
      }
      toast.success("Deleted successfully");
      // Optimistic removal
      setReturns((prev) => prev.filter((r) => r.id !== id));
    } catch (err: any) {
      console.error("delete error", err);
      toast.error("Delete failed: " + (err.message || ""));
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Return Books</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? `Edit Return #${editId}` : "New Return"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block mb-1 font-medium">Issue Book</label>
            <select
              name="issueBookId"
              value={formData.issueBookId || ""}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.issueBookId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value={0}>Select Issue Book</option>
              {issueBooks.map((ib) => (
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
            <label className="block mb-1 font-medium">Return Date</label>
            <input
              type="date"
              name="returnDate"
              value={formData.returnDate}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.returnDate ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.returnDate && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.returnDate}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Fine Amount</label>
            <input
              type="number"
              name="fineAmount"
              min="0"
              step="0.01"
              value={formData.fineAmount}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.fineAmount ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.fineAmount && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.fineAmount}
              </p>
            )}
          </div>

          <div className="md:col-span-2 flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              {editId ? "Update" : "Save"}
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
          <p className="text-gray-500">Loading return records...</p>
        ) : (
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">ID</th>
                <th className="px-3 py-2 border">IssueBook</th>
                <th className="px-3 py-2 border">Return Date</th>
                <th className="px-3 py-2 border">Fine</th>
                <th className="px-3 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {returns.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No return records found.
                  </td>
                </tr>
              ) : (
                returns.map((rb) => (
                  <tr key={rb.id} className="text-center">
                    <td className="px-3 py-2 border">{rb.id}</td>
                    <td className="px-3 py-2 border">
                      {rb.issueBook?.id ?? rb.issueBookId}
                    </td>
                    <td className="px-3 py-2 border">
                      {rb.returnDate.split("T")[0]}
                    </td>
                    <td className="px-3 py-2 border">
                      {rb.fineAmount.toFixed(2)}
                    </td>
                    <td className="px-3 py-2 border flex justify-center gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleEdit(rb)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
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
    </div>
  );
}
