"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

// API Base URL
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

export interface ReturnBook {
  id: number;
  issueBookId: number;
  returnDate: string;
  isDamaged: boolean;
  issueBook?: IssueBook;
}

interface ReturnBookState {
  returns: ReturnBook[];
  issueBooks: IssueBook[];
  formData: ReturnBook;
  editingId: number | null;

  fetchReturns: () => Promise<void>;
  fetchIssueBooks: () => Promise<void>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (ret: ReturnBook) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const useReturnBookStore = create<ReturnBookState>((set, get) => ({
  returns: [],
  issueBooks: [],
  editingId: null,
  formData: {
    id: 0,
    issueBookId: 0,
    returnDate: new Date().toISOString().split("T")[0],
    isDamaged: false,
  },

  fetchReturns: async () => {
    try {
      const res = await axios.get(`${API_BASE}/ReturnBooks`);
      set({ returns: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch returned books", "error");
    }
  },

  fetchIssueBooks: async () => {
    try {
      const res = await axios.get(`${API_BASE}/IssueBooks`);
      set({ issueBooks: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch issue books", "error");
    }
  },

  handleChange: (name, value) => {
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  handleSubmit: async () => {
    const { formData, editingId, fetchReturns, resetForm } = get();

    if (!formData.issueBookId || !formData.returnDate) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/ReturnBooks/${editingId}`, formData);
        Swal.fire("Updated!", "Return record updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/ReturnBooks`, formData);
        Swal.fire("Added!", "Return record added successfully", "success");
      }
      resetForm();
      fetchReturns();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  handleEdit: (ret) => {
    set({
      formData: { ...ret, returnDate: ret.returnDate?.split("T")[0] || "" },
      editingId: ret.id,
    });
  },

  handleDelete: async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This return record will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });
    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/ReturnBooks/${id}`);
      Swal.fire("Deleted!", "Return record deleted successfully", "success");
      get().fetchReturns();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete record", "error");
    }
  },

  resetForm: () => {
    set({
      formData: {
        id: 0,
        issueBookId: 0,
        returnDate: new Date().toISOString().split("T")[0],
        isDamaged: false,
      },
      editingId: null,
    });
  },
}));
