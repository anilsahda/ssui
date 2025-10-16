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

export interface MyAccount {
  id: number;
  studentId: number;
  totalIssuedBooks: number;
  totalReturnedBooks: number;
  totalPenalties: number;
  outStandingPenalty: number;
  lastUpdated?: string;
  student?: Student;
}

interface MyAccountState {
  accounts: MyAccount[];
  students: Student[];
  formData: MyAccount;
  editingId: number | null;

  fetchAccounts: () => Promise<void>;
  fetchStudents: () => Promise<void>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (account: MyAccount) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const useMyAccountStore = create<MyAccountState>((set, get) => ({
  accounts: [],
  students: [],
  editingId: null,
  formData: {
    id: 0,
    studentId: 0,
    totalIssuedBooks: 0,
    totalReturnedBooks: 0,
    totalPenalties: 0,
    outStandingPenalty: 0,
  },

  fetchAccounts: async () => {
    try {
      const res = await axios.get(`${API_BASE}/MyAccount`);
      set({ accounts: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch accounts", "error");
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
    const { formData, editingId, fetchAccounts, resetForm } = get();

    if (!formData.studentId) {
      Swal.fire("Validation Error", "Student selection is required", "warning");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/MyAccount/${editingId}`, formData);
        Swal.fire("Updated!", "Account updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/MyAccount`, formData);
        Swal.fire("Added!", "Account added successfully", "success");
      }
      resetForm();
      fetchAccounts();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  handleEdit: (account) => {
    set({
      formData: account,
      editingId: account.id,
    });
  },

  handleDelete: async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This account will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/MyAccount/${id}`);
      Swal.fire("Deleted!", "Account deleted successfully", "success");
      get().fetchAccounts();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete account", "error");
    }
  },

  resetForm: () => {
    set({
      formData: {
        id: 0,
        studentId: 0,
        totalIssuedBooks: 0,
        totalReturnedBooks: 0,
        totalPenalties: 0,
        outStandingPenalty: 0,
      },
      editingId: null,
    });
  },
}));
