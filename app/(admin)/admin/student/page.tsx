"use client";

import { useEffect, useState } from "react";

type Student = {
  id: number;
  studentName: string;
  email: string;
  branchId: number;
  branch?: {
    id: number;
    name: string;
  };
};

type Branch = {
  id: number;
  name: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [formData, setFormData] = useState<Omit<Student, "id" | "branch">>({
    studentName: "",
    email: "",
    branchId: 0,
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
      const [studentRes, branchRes] = await Promise.all([
        fetch(`${API_BASE}/api/Student`),
        fetch(`${API_BASE}/api/Branch`),
      ]);

      if (!studentRes.ok || !branchRes.ok) {
        throw new Error("Failed to fetch students or branches.");
      }

      const [studentsData, branchesData] = await Promise.all([
        studentRes.json(),
        branchRes.json(),
      ]);

      setStudents(studentsData);
      setBranches(branchesData);
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
    setFormData((prev) => ({
      ...prev,
      [name]: name === "branchId" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/api/Student/${editId}`
        : `${API_BASE}/api/Student`;

      const payload = editId ? { ...formData, id: editId } : formData;

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Server responded with ${res.status}: ${text}`);
      }

      setFormData({ studentName: "", email: "", branchId: 0 });
      setEditId(null);
      await loadAll();
    } catch (err: any) {
      alert("Failed to save: " + err.message);
    }
  };

  const handleEdit = (student: Student) => {
    setEditId(student.id);
    setFormData({
      studentName: student.studentName,
      email: student.email,
      branchId: student.branchId,
    });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;

    try {
      const res = await fetch(`${API_BASE}/api/Student/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        throw new Error(`Delete failed: ${res.status}`);
      }

      await loadAll();
    } catch (err: any) {
      alert("Delete failed: " + err.message);
    }
  };

  return (
    <div className="container mt-5">
      <h2>Students</h2>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="card mb-4">
        <div className="card-header">
          {editId ? `Edit Student #${editId}` : "Add Student"}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="studentName" className="form-label">
                Student Name
              </label>
              <input
                type="text"
                name="studentName"
                className="form-control"
                value={formData.studentName}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="email" className="form-label">
                Email
              </label>
              <input
                type="email"
                name="email"
                className="form-control"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label htmlFor="branchId" className="form-label">
                Branch
              </label>
              <select
                name="branchId"
                className="form-select"
                value={formData.branchId}
                onChange={handleChange}
                required
              >
                <option value={0} disabled>
                  Select Branch
                </option>
                {branches.map((branch) => (
                  <option key={branch.id} value={branch.id}>
                    {branch.name}
                  </option>
                ))}
              </select>
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
                  setFormData({ studentName: "", email: "", branchId: 0 });
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
              <th>Name</th>
              <th>Email</th>
              <th>Branch</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center">
                  No students found.
                </td>
              </tr>
            ) : (
              students.map((stud) => (
                <tr key={stud.id}>
                  <td>{stud.id}</td>
                  <td>{stud.studentName}</td>
                  <td>{stud.email}</td>
                  <td>{stud.branch?.name || "N/A"}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary me-2"
                      onClick={() => handleEdit(stud)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-sm btn-danger"
                      onClick={() => handleDelete(stud.id)}
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
