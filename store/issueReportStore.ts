"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

// ✅ Base API URL
const API_BASE = "https://localhost:7293/api";

// Interfaces
export interface IssueBook {
  id: number;
  bookId: number;
  studentId: number;
  issueDate: string;
  dueDate: string;
  isReturned: boolean;
}

export interface IssueReport {
  id: number;
  issueBookId: number;
  remarks: string;
  reportDate: string;
  issueBook?: IssueBook;
}

interface IssueReportState {
  reports: IssueReport[];
  formData: IssueReport;
  editingId: number | null;
  fetchReports: () => Promise<void>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (report: IssueReport) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const useIssueReportStore = create<IssueReportState>((set, get) => ({
  reports: [],
  editingId: null,
  formData: {
    id: 0,
    issueBookId: 0,
    remarks: "",
    reportDate: new Date().toISOString().split("T")[0],
  },

  // ✅ Fetch all reports
  fetchReports: async () => {
    try {
      const res = await axios.get(`${API_BASE}/IssueReports`);
      set({ reports: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      console.error("Error fetching reports:", error);
      Swal.fire("Error", "Failed to load reports", "error");
    }
  },

  // ✅ Handle input change
  handleChange: (name, value) => {
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  // ✅ Submit form
  handleSubmit: async () => {
    const { formData, editingId, fetchReports, resetForm } = get();
    try {
      if (editingId) {
        await axios.put(`${API_BASE}/IssueReports/${editingId}`, formData);
        Swal.fire("Updated!", "Report updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/IssueReports`, formData);
        Swal.fire("Created!", "Report added successfully", "success");
      }
      resetForm();
      fetchReports();
    } catch (error) {
      console.error("Error saving report:", error);
      Swal.fire("Error", "Failed to save report", "error");
    }
  },

  // ✅ Edit report
  handleEdit: (report) => {
    set({
      formData: report,
      editingId: report.id,
    });
  },

  // ✅ Delete report
  handleDelete: async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This record will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/IssueReports/${id}`);
      Swal.fire("Deleted!", "Report deleted successfully", "success");
      get().fetchReports();
    } catch (error) {
      console.error("Error deleting report:", error);
      Swal.fire("Error", "Unable to delete report", "error");
    }
  },

  // ✅ Reset form
  resetForm: () => {
    set({
      formData: {
        id: 0,
        issueBookId: 0,
        remarks: "",
        reportDate: new Date().toISOString().split("T")[0],
      },
      editingId: null,
    });
  },
}));
