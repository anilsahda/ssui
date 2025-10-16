"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

// API Base URL
const API_BASE = "https://localhost:7182/api";

// Interfaces
export interface Student {
  id: number;
  fullName: string;
  rollNo: string;
  email: string;
}

export interface PenaltyReport {
  id: number;
  studentId: number;
  totalPenalties: number;
  paidPenalties: number;
  pendingPenalties: number;
  reportDate?: string;
  student?: Student;
}

interface PenaltyReportState {
  reports: PenaltyReport[];
  students: Student[];
  formData: PenaltyReport;
  editingId: number | null;

  fetchReports: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (report: PenaltyReport) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const usePenaltyReportStore = create<PenaltyReportState>((set, get) => ({
  reports: [],
  students: [],
  editingId: null,
  formData: {
    id: 0,
    studentId: 0,
    totalPenalties: 0,
    paidPenalties: 0,
    pendingPenalties: 0,
  },

  fetchReports: async () => {
    try {
      const res = await axios.get(`${API_BASE}/PenaltyReport`);
      set({ reports: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch penalty reports", "error");
    }
  },

  fetchStudents: async () => {
    try {
      const res = await axios.get(`${API_BASE}/Student`);
      set({ students: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch students", "error");
    }
  },

  handleChange: (name, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: Number(value),
      },
    }));
  },

  handleSubmit: async () => {
    const { formData, editingId, fetchReports, resetForm } = get();

    if (
      !formData.studentId ||
      formData.totalPenalties < 0 ||
      formData.paidPenalties < 0 ||
      formData.pendingPenalties < 0
    ) {
      Swal.fire(
        "Validation Error",
        "All fields are required and values must be non-negative",
        "warning"
      );
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/PenaltyReport/${editingId}`, formData);
        Swal.fire("Updated!", "Penalty report updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/PenaltyReport`, formData);
        Swal.fire("Added!", "Penalty report added successfully", "success");
      }
      resetForm();
      fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  handleEdit: (report) => {
    set({
      formData: report,
      editingId: report.id,
    });
  },

  handleDelete: async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This report will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/PenaltyReport/${id}`);
      Swal.fire("Deleted!", "Penalty report deleted successfully", "success");
      get().fetchReports();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete report", "error");
    }
  },

  resetForm: () => {
    set({
      formData: {
        id: 0,
        studentId: 0,
        totalPenalties: 0,
        paidPenalties: 0,
        pendingPenalties: 0,
      },
      editingId: null,
    });
  },
}));
