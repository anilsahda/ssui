"use client";

import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Branch = {
  id: number;
  name: string;
  location: string;
};

type BranchDto = Omit<Branch, "id">;

const API_BASE = "https://localhost:7293";

export default function BranchesPage() {
  const [branches, setBranches] = useState<Branch[]>([]);
  const [formData, setFormData] = useState<BranchDto>({
    name: "",
    location: "",
  });
  const [editId, setEditId] = useState<number | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const resetForm = () => {
    setFormData({ name: "", location: "" });
    setEditId(null);
  };

  // Load branches
  const loadBranches = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/Branch`);
      if (!res.ok) throw new Error("Failed to fetch branches");
      const data = await res.json();
      setBranches(data);
    } catch (err) {
      setError("Failed to load branches.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadBranches();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.location.trim()) {
      toast.warning("Please fill in all fields.");
      return;
    }

    try {
      setSubmitting(true);
      const url = editId
        ? `${API_BASE}/api/Branch/${editId}`
        : `${API_BASE}/api/Branch`;
      const method = editId ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to save branch");

      toast.success(editId ? "Branch updated!" : "Branch created!");
      resetForm();
      await loadBranches();
    } catch {
      toast.error("Error submitting branch.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (branch: Branch) => {
    setFormData({ name: branch.name, location: branch.location });
    setEditId(branch.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    const confirmed = confirm("Are you sure you want to delete this branch?");
    if (!confirmed) return;

    try {
      const res = await fetch(`${API_BASE}/api/Branch/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Delete failed");
      toast.success("Branch deleted.");
      await loadBranches();
    } catch {
      toast.error("Failed to delete branch.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold text-center mb-6">Branch Manager</h2>

      {/* FORM */}
      <div className="bg-white shadow rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? "Edit Branch" : "Add New Branch"}
        </h3>
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
          noValidate
        >
          <div>
            <label htmlFor="name" className="block text-sm font-medium mb-1">
              Branch Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="w-full border px-3 py-2 rounded"
              value={formData.name}
              onChange={handleChange}
              required
              disabled={submitting}
              autoComplete="off"
            />
          </div>

          <div>
            <label
              htmlFor="location"
              className="block text-sm font-medium mb-1"
            >
              Location
            </label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full border px-3 py-2 rounded"
              value={formData.location}
              onChange={handleChange}
              required
              disabled={submitting}
              autoComplete="off"
            />
          </div>

          <div className="md:col-span-2 flex items-center gap-4 mt-4">
            <button
              type="submit"
              disabled={submitting}
              className={`bg-blue-600 text-white px-5 py-2 rounded hover:bg-blue-700 ${
                submitting ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {editId ? "Update" : "Create"}
            </button>
            {editId && (
              <button
                type="button"
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                onClick={resetForm}
                disabled={submitting}
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* TABLE */}
      <div className="overflow-x-auto">
        <h4 className="text-xl font-semibold mb-3">Branch List</h4>
        {error && <div className="text-red-600 mb-4">{error}</div>}
        {loading ? (
          <div className="text-gray-500">Loading branches...</div>
        ) : (
          <table className="w-full table-auto border border-gray-300 shadow-sm text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="border px-4 py-2">ID</th>
                <th className="border px-4 py-2">Name</th>
                <th className="border px-4 py-2">Location</th>
                <th className="border px-4 py-2">Actions</th>
              </tr>
            </thead>
            <tbody>
              {branches.length > 0 ? (
                branches.map((branch) => (
                  <tr key={branch.id} className="text-center">
                    <td className="border px-4 py-2">{branch.id}</td>
                    <td className="border px-4 py-2">{branch.name}</td>
                    <td className="border px-4 py-2">{branch.location}</td>
                    <td className="border px-4 py-2 flex justify-center gap-2">
                      <button
                        onClick={() => handleEdit(branch)}
                        className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded text-xs"
                        aria-label={`Edit branch ${branch.name}`}
                        disabled={submitting}
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(branch.id)}
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        aria-label={`Delete branch ${branch.name}`}
                        disabled={submitting}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="text-center text-gray-500 py-4">
                    No branches found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}
