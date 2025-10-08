"use client";

import React, { useState, useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7129/api";

interface CompanyReport {
  id: number;
  companyId: number;
  reportDetails: string;
  createdAt?: string;
}

export default function CompanyReportsPage() {
  const [reports, setReports] = useState<CompanyReport[]>([]);
  const [formData, setFormData] = useState<CompanyReport>({
    id: 0,
    companyId: 0,
    reportDetails: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);

  // Fetch all reports
  const fetchReports = async () => {
    try {
      const res = await axios.get(`${API_BASE}/CompanyReport`);
      setReports(res.data);
    } catch (err) {
      console.error("Error fetching company reports:", err);
    }
  };

  useEffect(() => {
    fetchReports();
  }, []);

  // Handle input changes
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: name === "companyId" ? Number(value) : value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/CompanyReport/${editingId}`, formData);
        alert("Report updated successfully!");
      } else {
        await axios.post(`${API_BASE}/CompanyReport`, formData);
        alert("Report created successfully!");
      }
      setFormData({ id: 0, companyId: 0, reportDetails: "" });
      setEditingId(null);
      fetchReports();
    } catch (err) {
      console.error("Error saving report:", err);
      alert("An error occurred!");
    } finally {
      setLoading(false);
    }
  };

  // Edit report
  const handleEdit = (report: CompanyReport) => {
    setFormData(report);
    setEditingId(report.id);
  };

  // Delete report
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this report?")) return;
    try {
      await axios.delete(`${API_BASE}/CompanyReport/${id}`);
      alert("Report deleted successfully!");
      fetchReports();
    } catch (err) {
      console.error("Error deleting report:", err);
    }
  };

  return (
    <div className="container mx-auto p-6 max-w-5xl">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        🏢 Company Reports
      </h1>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-xl p-6 mb-8 border border-gray-200"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block font-medium mb-1">Company ID</label>
            <input
              type="number"
              name="companyId"
              value={formData.companyId}
              onChange={handleChange}
              required
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            />
          </div>

          <div className="md:col-span-2">
            <label className="block font-medium mb-1">Report Details</label>
            <textarea
              name="reportDetails"
              value={formData.reportDetails}
              onChange={handleChange}
              required
              rows={4}
              className="w-full border px-3 py-2 rounded-md focus:ring focus:ring-blue-200"
            ></textarea>
          </div>
        </div>

        <button
          type="submit"
          disabled={loading}
          className={`w-full mt-5 py-2 rounded-md text-white ${
            loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
          }`}
        >
          {editingId ? "Update Report" : "Create Report"}
        </button>
      </form>

      {/* Table */}
      <table className="w-full bg-white shadow-md rounded-xl overflow-hidden border border-gray-200">
        <thead className="bg-gray-100 text-left">
          <tr>
            <th className="p-3 border-b">ID</th>
            <th className="p-3 border-b">Company ID</th>
            <th className="p-3 border-b">Report Details</th>
            <th className="p-3 border-b">Created At</th>
            <th className="p-3 border-b text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reports.length === 0 ? (
            <tr>
              <td colSpan={5} className="text-center p-4 text-gray-500">
                No reports found.
              </td>
            </tr>
          ) : (
            reports.map((report) => (
              <tr key={report.id} className="hover:bg-gray-50">
                <td className="p-3 border-b">{report.id}</td>
                <td className="p-3 border-b">{report.companyId}</td>
                <td className="p-3 border-b">{report.reportDetails}</td>
                <td className="p-3 border-b">{report.createdAt || "-"}</td>
                <td className="p-3 border-b text-center space-x-2">
                  <button
                    onClick={() => handleEdit(report)}
                    className="bg-yellow-500 text-white px-3 py-1 rounded-md hover:bg-yellow-600"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(report.id)}
                    className="bg-red-600 text-white px-3 py-1 rounded-md hover:bg-red-700"
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
  );
}
