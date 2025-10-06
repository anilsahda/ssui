"use client";

import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

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

const API_BASE = "https://localhost:7293";

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>([]);
  const [branches, setBranches] = useState<Branch[]>([]);
  const [loading, setLoading] = useState(true);
  const [editId, setEditId] = useState<number | null>(null);
  const [formErrors, setFormErrors] = useState<{ [key: string]: string }>({});

  const [formData, setFormData] = useState<Omit<Student, "id" | "branch">>({
    studentName: "",
    email: "",
    branchId: 0,
  });

  useEffect(() => {
    loadAll();
  }, []);

  const loadAll = async () => {
    try {
      setLoading(true);
      const [studentsRes, branchesRes] = await Promise.all([
        fetch(`${API_BASE}/api/Student`),
        fetch(`${API_BASE}/api/Branch`),
      ]);

      if (!studentsRes.ok || !branchesRes.ok) {
        throw new Error("Failed to fetch data");
      }

      const [studentsDataRaw, branchesDataRaw] = await Promise.all([
        studentsRes.json(),
        branchesRes.json(),
      ]);

      const studentsData = Array.isArray(studentsDataRaw)
        ? studentsDataRaw
        : [];
      const branchesData = Array.isArray(branchesDataRaw)
        ? branchesDataRaw
        : [];

      setStudents(studentsData);
      setBranches(branchesData);
    } catch (err: any) {
      toast.error(err.message || "Error loading data");
    } finally {
      setLoading(false);
    }
  };

  const validate = () => {
    const errors: { [key: string]: string } = {};
    if (!formData.studentName.trim()) errors.studentName = "Name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.email.includes("@")) errors.email = "Invalid email";
    if (!formData.branchId) errors.branchId = "Select a branch";
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
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

  const resetForm = () => {
    setEditId(null);
    setFormErrors({});
    setFormData({ studentName: "", email: "", branchId: 0 });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.warning("Please fix form errors.");
      return;
    }

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
        throw new Error(`Server responded: ${res.status} - ${text}`);
      }

      toast.success(`Student ${editId ? "updated" : "created"} successfully.`);
      resetForm();
      await loadAll();
    } catch (err: any) {
      toast.error("Save failed: " + err.message);
    }
  };

  const handleEdit = (student: Student) => {
    setEditId(student.id);
    setFormData({
      studentName: student.studentName,
      email: student.email,
      branchId: student.branchId,
    });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this student?")) return;
    try {
      const res = await fetch(`${API_BASE}/api/Student/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) throw new Error(`Delete failed: ${res.status}`);

      toast.success("Student deleted");
      setStudents((prev) => prev.filter((s) => s.id !== id));
    } catch (err: any) {
      toast.error("Delete failed: " + err.message);
    }
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Manage Students</h2>

      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? `Edit Student #${editId}` : "Add New Student"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              type="text"
              name="studentName"
              value={formData.studentName}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.studentName ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.studentName && (
              <p className="text-red-500 text-sm">{formErrors.studentName}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.email ? "border-red-500" : "border-gray-300"
              }`}
            />
            {formErrors.email && (
              <p className="text-red-500 text-sm">{formErrors.email}</p>
            )}
          </div>

          <div>
            <label className="block mb-1 font-medium">Branch</label>
            <select
              name="branchId"
              value={formData.branchId}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.branchId ? "border-red-500" : "border-gray-300"
              }`}
            >
              <option value={0}>Select Branch</option>
              {Array.isArray(branches) &&
                branches.map((b) => (
                  <option key={b.id} value={b.id}>
                    {b.name}
                  </option>
                ))}
            </select>
            {formErrors.branchId && (
              <p className="text-red-500 text-sm">{formErrors.branchId}</p>
            )}
          </div>

          <div className="flex items-end gap-4">
            <button
              type="submit"
              className="bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700"
            >
              {editId ? "Update" : "Save"}
            </button>
            {editId && (
              <button
                type="button"
                onClick={resetForm}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Student Table */}
      {loading ? (
        <div className="text-center text-gray-500">Loading students...</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Email</th>
                <th className="px-4 py-2 border">Branch</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {Array.isArray(students) && students.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center py-4 text-gray-500">
                    No students found.
                  </td>
                </tr>
              ) : (
                Array.isArray(students) &&
                students.map((s) => (
                  <tr key={s.id} className="text-center">
                    <td className="px-4 py-2 border">{s.id}</td>
                    <td className="px-4 py-2 border">{s.studentName}</td>
                    <td className="px-4 py-2 border">{s.email}</td>
                    <td className="px-4 py-2 border">
                      {s.branch?.name || "N/A"}
                    </td>
                    <td className="px-4 py-2 border flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(s)}
                        className="bg-green-500 text-white px-3 py-1 rounded text-xs hover:bg-green-600"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(s.id)}
                        className="bg-red-500 text-white px-3 py-1 rounded text-xs hover:bg-red-600"
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
