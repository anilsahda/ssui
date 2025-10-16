"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

// API Base URL
const API_BASE = "https://localhost:7293/api";

// Interfaces
export interface Branch {
  id: number;
  branchName: string;
  address: string;
}

export interface Student {
  id: number;
  fullName: string;
  rollNo: string;
  email: string;
  branchId: number;
  branch?: Branch;
}

interface StudentState {
  students: Student[];
  branches: Branch[];
  formData: Student;
  editingId: number | null;

  fetchStudents: () => Promise<void>;
  fetchBranches: () => Promise<void>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (student: Student) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const useStudentStore = create<StudentState>((set, get) => ({
  students: [],
  branches: [],
  editingId: null,
  formData: {
    id: 0,
    fullName: "",
    rollNo: "",
    email: "",
    branchId: 0,
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

  fetchBranches: async () => {
    try {
      const res = await axios.get(`${API_BASE}/Branch`);
      set({ branches: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch branches", "error");
    }
  },

  handleChange: (name, value) => {
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  handleSubmit: async () => {
    const { formData, editingId, fetchStudents, resetForm } = get();

    if (
      !formData.fullName ||
      !formData.rollNo ||
      !formData.email ||
      !formData.branchId
    ) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/Student/${editingId}`, formData);
        Swal.fire("Updated!", "Student updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/Student`, formData);
        Swal.fire("Added!", "Student added successfully", "success");
      }
      resetForm();
      fetchStudents();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  handleEdit: (student) => {
    set({
      formData: student,
      editingId: student.id,
    });
  },

  handleDelete: async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This student will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/Student/${id}`);
      Swal.fire("Deleted!", "Student deleted successfully", "success");
      get().fetchStudents();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete student", "error");
    }
  },

  resetForm: () => {
    set({
      formData: { id: 0, fullName: "", rollNo: "", email: "", branchId: 0 },
      editingId: null,
    });
  },
}));
