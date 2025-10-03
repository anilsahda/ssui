"use client";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

type Publication = {
  id: number;
  name: string;
  address: string;
};

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:7293";

export default function PublicationsPage() {
  const [publications, setPublications] = useState<Publication[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<{ name: string; address: string }>({
    name: "",
    address: "",
  });
  const [formErrors, setFormErrors] = useState<
    Partial<{ name: string; address: string }>
  >({});
  const [editId, setEditId] = useState<number | null>(null);

  // Fetch publications on mount
  useEffect(() => {
    loadPublications();
  }, []);

  const loadPublications = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await fetch(`${API_BASE}/api/Publication`);
      if (!res.ok) {
        throw new Error(`Failed to fetch: ${res.status}`);
      }
      const data = await res.json();
      setPublications(data);
    } catch (err: any) {
      console.error("loadPublications error", err);
      setError(err.message || "Error loading data");
      toast.error("Error loading publications: " + (err.message || ""));
    } finally {
      setLoading(false);
    }
  };

  const validate = (): boolean => {
    const errs: typeof formErrors = {};
    if (!formData.name || formData.name.trim().length === 0) {
      errs.name = "Name is required";
    }
    if (!formData.address || formData.address.trim().length === 0) {
      errs.address = "Address is required";
    }
    setFormErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const resetForm = () => {
    setEditId(null);
    setFormData({ name: "", address: "" });
    setFormErrors({});
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      toast.warn("Please fix form errors before submitting");
      return;
    }

    try {
      const method = editId ? "PUT" : "POST";
      const url = editId
        ? `${API_BASE}/api/Publication/${editId}`
        : `${API_BASE}/api/Publication`;

      const resp = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Server responded ${resp.status}: ${text}`);
      }

      toast.success(editId ? "Publication updated" : "Publication added");
      resetForm();
      await loadPublications();
    } catch (err: any) {
      console.error("submit error", err);
      toast.error("Failed to save: " + (err.message || ""));
    }
  };

  const handleEdit = (pub: Publication) => {
    setEditId(pub.id);
    setFormData({ name: pub.name, address: pub.address });
    setFormErrors({});
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this publication?")) {
      return;
    }
    try {
      const resp = await fetch(`${API_BASE}/api/Publication/${id}`, {
        method: "DELETE",
      });
      if (!resp.ok) {
        const text = await resp.text();
        throw new Error(`Delete failed: ${resp.status} — ${text}`);
      }
      toast.success("Publication deleted");
      // Optimistically update UI
      setPublications((prev) => prev.filter((p) => p.id !== id));
    } catch (err: any) {
      console.error("delete error", err);
      toast.error("Delete failed: " + (err.message || ""));
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <ToastContainer />
      <h2 className="text-3xl font-bold mb-6 text-center">Publications</h2>

      {error && (
        <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">
          {error}
        </div>
      )}

      {/* Form */}
      <div className="bg-white shadow-lg rounded-lg p-6 mb-8">
        <h3 className="text-xl font-semibold mb-4">
          {editId ? `Edit Publication #${editId}` : "Add New Publication"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1 font-medium">Name</label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.name ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter publication name"
            />
            {formErrors.name && (
              <p className="text-red-500 text-sm mt-1">{formErrors.name}</p>
            )}
          </div>
          <div>
            <label className="block mb-1 font-medium">Address</label>
            <input
              name="address"
              value={formData.address}
              onChange={handleChange}
              className={`w-full border px-3 py-2 rounded ${
                formErrors.address ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Enter address"
            />
            {formErrors.address && (
              <p className="text-red-500 text-sm mt-1">{formErrors.address}</p>
            )}
          </div>
          <div className="flex gap-4 mt-4">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded"
            >
              {editId ? "Update" : "Add"}
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
          <p className="text-gray-500">Loading publications...</p>
        ) : (
          <table className="w-full table-auto border border-gray-300 text-sm">
            <thead className="bg-gray-100">
              <tr>
                <th className="px-4 py-2 border">ID</th>
                <th className="px-4 py-2 border">Name</th>
                <th className="px-4 py-2 border">Address</th>
                <th className="px-4 py-2 border">Actions</th>
              </tr>
            </thead>
            <tbody>
              {publications.length === 0 ? (
                <tr>
                  <td colSpan={4} className="text-center py-4 text-gray-500">
                    No publications found.
                  </td>
                </tr>
              ) : (
                publications.map((pub) => (
                  <tr key={pub.id} className="text-center">
                    <td className="px-4 py-2 border">{pub.id}</td>
                    <td className="px-4 py-2 border">{pub.name}</td>
                    <td className="px-4 py-2 border">{pub.address}</td>
                    <td className="px-4 py-2 border flex justify-center gap-2">
                      <button
                        className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleEdit(pub)}
                      >
                        Edit
                      </button>
                      <button
                        className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded text-xs"
                        onClick={() => handleDelete(pub.id)}
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
