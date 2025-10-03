"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Penalty = {
  id: number;
  studentId: number;
  amount: number;
  reason: string;
  penaltyDate: string;
  student?: { id: number; name: string };
};

type Student = {
  id: number;
  name: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function PenaltiesPage() {
  const [penalties, setPenalties] = useState<Penalty[]>([]);
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const [editId, setEditId] = useState<number | null>(null);
  const [formData, setFormData] = useState<{
    studentId: number;
    amount: number;
    reason: string;
    penaltyDate: string;
  }>({
    studentId: 0,
    amount: 0,
    reason: "",
    penaltyDate: new Date().toISOString().slice(0, 10),
  });
  const [formErrors, setFormErrors] = useState<Partial<typeof formData>>({});

  // Load students + penalties
  const loadData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [studentsRes, penaltiesRes] = await Promise.all([
        fetch(`${API_BASE}/api/Student`),
        fetch(`${API_BASE}/api/Penalty`),
      ]);

      if (!studentsRes.ok || !penaltiesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [studentsData, penaltiesData] = await Promise.all([
        studentsRes.json(),
        penaltiesRes.json(),
      ]);

      setStudents(studentsData);
      setPenalties(penaltiesData);
    } catch (err: any) {
      console.error("loadData error", err);
      setError(err.message || "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  const validateForm = (): boolean => {
    const errs: Partial<typeof formData> = {};
    if (!formData.studentId || formData.studentId === 0) {
      errs.studentId = "Please select a student";
    }
    if (formData.amount <= 0) {
      errs.amount = "Amount must be > 0";
    }
    if (!formData.reason.trim()) {
      errs.reason = "Reason is required";
    }
    if (!formData.penaltyDate) {
      errs.penaltyDate = "Penalty date is required";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({
      studentId: 0,
      amount: 0,
      reason: "",
      penaltyDate: new Date().toISOString().slice(0, 10),
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
      [name]:
        name === "amount"
          ? Number(value)
          : name === "studentId"
          ? parseInt(value)
          : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) {
      toast.error("Please fix form errors.");
      return;
    }

    try {
      const url = editId
        ? `${API_BASE}/api/Penalty/${editId}`
        : `${API_BASE}/api/Penalty`;
      const method = editId ? "PUT" : "POST";
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

      const saved = await resp.json();

      toast.success(editId ? "Penalty updated" : "Penalty added");
      resetForm();
      // Refresh or optimistically update
      await loadData();
    } catch (err: any) {
      console.error("submit error", err);
      toast.error("Save failed: " + err.message);
    }
  };

  const handleEdit = (p: Penalty) => {
    setEditId(p.id);
    setFormData({
      studentId: p.studentId,
      amount: p.amount,
      reason: p.reason,
      penaltyDate: p.penaltyDate.split("T")[0] ?? p.penaltyDate,
    });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this penalty?")) return;

    try {
      const resp = await fetch(`${API_BASE}/api/Penalty/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Delete failed: ${resp.status} — ${text}`);
      }
      toast.success("Penalty deleted");
      // Optimistic removal
      setPenalties((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      console.error("delete error", err);
      toast.error("Delete failed: " + err.message);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Penalties</h2>

      {error && (
        <div className="bg-red-100 text-red-700 p-3 m b-4 rounded">{error}</div>
      )}

      {/* Form */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? `Edit Penalty #${editId}` : "Add New Penalty"}
        </h3>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-4">
          <div>
            <label className="block mb-1 font-medium">Student</label>
            <select
              name="studentId"
              className={`w-full border px-3 py-2 rounded ${
                formErrors.studentId ? "border-red-500" : ""
              }`}
              value={formData.studentId || ""}
              onChange={handleChange}
            >
              <option value={0}>Select Student</option>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
            {formErrors.studentId && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.studentId}
              </p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Amount</label>
            <input
              type="number"
              name="amount"
              className={`w-full border px-3 py-2 rounded ${
                formErrors.amount ? "border-red-500" : ""
              }`}
              value={formData.amount}
              min={0}
              step="0.01"
              onChange={handleChange}
            />
            {formErrors.amount && (
              <p className="text-red-500 text-sm mt-1">{formErrors.amount}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Reason</label>
            <textarea
              name="reason"
              className={`w-full border px-3 py-2 rounded ${
                formErrors.reason ? "border-red-500" : ""
              }`}
              value={formData.reason}
              onChange={handleChange}
              rows={3}
            />
            {formErrors.reason && (
              <p className="text-red-500 text-sm mt-1">{formErrors.reason}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Penalty Date</label>
            <input
              type="date"
              name="penaltyDate"
              className={`w-full border px-3 py-2 rounded ${
                formErrors.penaltyDate ? "border-red-500" : ""
              }`}
              value={formData.penaltyDate}
              onChange={handleChange}
            />
            {formErrors.penaltyDate && (
              <p className="text-red-500 text-sm mt-1">
                {formErrors.penaltyDate}
              </p>
            )}
          </div>

          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              {editId ? "Update" : "Add Penalty"}
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
          <p className="text-gray-500">Loading penalties...</p>
        ) : (
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-3 py-2 border">ID</th>
                <th className="px-3 py-2 border">Student</th>
                <th className="px-3 py-2 border">Amount</th>
                <th className="px-3 py-2 border">Reason</th>
                <th className="px-3 py-2 border">Penalty Date</th>
                <th className="px-3 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {penalties.length === 0 ? (
                <tr>
                  <td colSpan={6} className="text-center py-4 text-gray-500">
                    No penalties found.
                  </td>
                </tr>
              ) : (
                penalties.map((p) => (
                  <tr key={p.id} className="text-center">
                    <td className="px-3 py-2 border">{p.id}</td>
                    <td className="px-3 py-2 border">
                      {p.student?.name ?? "N/A"}
                    </td>
                    <td className="px-3 py-2 border">{p.amount.toFixed(2)}</td>
                    <td className="px-3 py-2 border">{p.reason}</td>
                    <td className="px-3 py-2 border">
                      {new Date(p.penaltyDate).toLocaleDateString()}
                    </td>
                    <td className="px-3 py-2 border flex justify-center gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleEdit(p)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleDelete(p.id)}
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
