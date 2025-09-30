"use client";
import { useEffect, useState } from "react";

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
  const [formData, setFormData] = useState({
    studentId: 0,
    amount: 0,
    reason: "",
    penaltyDate: new Date().toISOString().slice(0, 10),
  });
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {
    try {
      setLoading(true);
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
      setError(null);
    } catch (err: any) {
      setError(err.message || "Error loading data");
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "amount" ? Number(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.studentId === 0) {
      alert("Please select a student");
      return;
    }
    if (!formData.reason.trim()) {
      alert("Please enter a reason");
      return;
    }

    try {
      const resp = await fetch(`${API_BASE}/api/Penalty`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server responded with ${resp.status}: ${text}`);
      }
      setFormData({
        studentId: 0,
        amount: 0,
        reason: "",
        penaltyDate: new Date().toISOString().slice(0, 10),
      });
      await loadData();
      alert("Penalty added successfully!");
    } catch (err: any) {
      alert("Failed to add penalty: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Penalties</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      {/* Form */}
      <div className="card mb-4">
        <div className="card-header">Add Penalty</div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="studentId" className="form-label">
                Student
              </label>
              <select
                id="studentId"
                name="studentId"
                className="form-select"
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

            <div className="mb-3">
              <label htmlFor="amount" className="form-label">
                Amount
              </label>
              <input
                type="number"
                id="amount"
                name="amount"
                className="form-control"
                value={formData.amount}
                min={0}
                step={0.01}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="reason" className="form-label">
                Reason
              </label>
              <textarea
                id="reason"
                name="reason"
                className="form-control"
                value={formData.reason}
                onChange={handleChange}
                rows={3}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="penaltyDate" className="form-label">
                Penalty Date
              </label>
              <input
                type="date"
                id="penaltyDate"
                name="penaltyDate"
                className="form-control"
                value={formData.penaltyDate}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-primary">
              Add Penalty
            </button>
          </form>
        </div>
      </div>

      {/* Penalties Table */}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>ID</th>
              <th>Student</th>
              <th>Amount</th>
              <th>Reason</th>
              <th>Penalty Date</th>
            </tr>
          </thead>
          <tbody>
            {penalties.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No penalties found.
                </td>
              </tr>
            )}
            {penalties.map((penalty) => (
              <tr key={penalty.id}>
                <td>{penalty.id}</td>
                <td>{penalty.student?.name || "N/A"}</td>
                <td>${penalty.amount.toFixed(2)}</td>
                <td>{penalty.reason}</td>
                <td>{new Date(penalty.penaltyDate).toLocaleDateString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
