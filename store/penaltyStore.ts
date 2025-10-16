"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

// Base API URL
const API_BASE = "https://localhost:7293/api";

// Interfaces
export interface Student {
  id: number;
  fullName: string;
  rollNumber: string;
  email: string;
}

export interface Penalty {
  id: number;
  studentId: number;
  amount: number;
  reason: string;
  penaltyDate: string;
  isPaid: boolean;
  student?: Student;
}

interface PenaltyState {
  penalties: Penalty[];
  students: Student[];
  formData: Penalty;
  editingId: number | null;
  fetchPenalties: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (penalty: Penalty) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const usePenaltyStore = create<PenaltyState>((set, get) => ({
  penalties: [],
  students: [],
  editingId: null,
  formData: {
    id: 0,
    studentId: 0,
    amount: 0,
    reason: "",
    penaltyDate: new Date().toISOString().split("T")[0],
    isPaid: false,
  },

  // Fetch penalties
  fetchPenalties: async () => {
    try {
      const res = await axios.get(`${API_BASE}/Penalty`);
      set({ penalties: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch penalties", "error");
    }
  },

  // Fetch students
  fetchStudents: async () => {
    try {
      const res = await axios.get(`${API_BASE}/Student`);
      set({ students: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch students", "error");
    }
  },

  // Handle input change
  handleChange: (name, value) => {
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  // Submit form
  handleSubmit: async () => {
    const { formData, editingId, fetchPenalties, resetForm } = get();

    if (!formData.studentId || !formData.amount || !formData.reason) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/Penalty/${editingId}`, formData);
        Swal.fire("Updated!", "Penalty updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/Penalty`, formData);
        Swal.fire("Added!", "Penalty added successfully", "success");
      }
      resetForm();
      fetchPenalties();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  // Edit penalty
  handleEdit: (penalty) => {
    set({
      formData: {
        ...penalty,
        penaltyDate: penalty.penaltyDate
          ? penalty.penaltyDate.split("T")[0]
          : "",
      },
      editingId: penalty.id,
    });
  },

  // Delete penalty
  handleDelete: async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This penalty will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/Penalty/${id}`);
      Swal.fire("Deleted!", "Penalty deleted successfully", "success");
      get().fetchPenalties();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete penalty", "error");
    }
  },

  // Reset form
  resetForm: () => {
    set({
      formData: {
        id: 0,
        studentId: 0,
        amount: 0,
        reason: "",
        penaltyDate: new Date().toISOString().split("T")[0],
        isPaid: false,
      },
      editingId: null,
    });
  },
}));
