"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

// API Base URL
const API_BASE = "https://localhost:7182/api";

// Interfaces
export interface Book {
  id: number;
  title: string;
  author: string;
  ISBN: string;
  totalCopies: number;
  availableCopies: number;
}

export interface BookReport {
  id: number;
  bookId: number;
  issueCount: number;
  returnCount: number;
  lostCount: number;
  DamagedCount: number;
  reportDate?: string;
  remarks: string;
  book?: Book;
}

interface BookReportState {
  reports: BookReport[];
  books: Book[];
  formData: BookReport;
  editingId: number | null;

  fetchReports: () => Promise<void>;
  fetchBooks: () => Promise<void>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (report: BookReport) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const useBookReportStore = create<BookReportState>((set, get) => ({
  reports: [],
  books: [],
  editingId: null,
  formData: {
    id: 0,
    bookId: 0,
    issueCount: 0,
    returnCount: 0,
    lostCount: 0,
    DamagedCount: 0,
    remarks: "",
  },

  fetchReports: async () => {
    try {
      const res = await axios.get(`${API_BASE}/BookReport`);
      set({ reports: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch book reports", "error");
    }
  },

  fetchBooks: async () => {
    try {
      const res = await axios.get(`${API_BASE}/Book`);
      set({ books: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch books", "error");
    }
  },

  handleChange: (name, value) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [name]: [
          "bookId",
          "issueCount",
          "returnCount",
          "lostCount",
          "DamagedCount",
        ].includes(name)
          ? Number(value)
          : value,
      },
    }));
  },

  handleSubmit: async () => {
    const { formData, editingId, fetchReports, resetForm } = get();

    if (!formData.bookId || !formData.remarks) {
      Swal.fire("Validation Error", "Book and remarks are required", "warning");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/BookReport/${editingId}`, formData);
        Swal.fire("Updated!", "Book report updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/BookReport`, formData);
        Swal.fire("Added!", "Book report added successfully", "success");
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
      await axios.delete(`${API_BASE}/BookReport/${id}`);
      Swal.fire("Deleted!", "Report deleted successfully", "success");
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
        bookId: 0,
        issueCount: 0,
        returnCount: 0,
        lostCount: 0,
        DamagedCount: 0,
        remarks: "",
      },
      editingId: null,
    });
  },
}));
