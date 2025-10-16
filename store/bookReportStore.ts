"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
}

interface BookReport {
  id: number;
  bookId: number;
  reportDetails: string;
  issueCount: number;
  returnCount: number;
  lostCount: number;
  reportDate?: string;
  book?: Book;
}

interface BookReportStore {
  reports: BookReport[];
  books: Book[];
  formData: BookReport;
  isEditing: boolean;

  fetchReports: () => Promise<void>;
  fetchBooks: () => Promise<void>;
  setFormData: (data: Partial<BookReport>) => void;
  resetForm: () => void;
  setEditing: (value: boolean) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (report: BookReport) => void;
  handleDelete: (id: number) => Promise<void>;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7293/api";

export const useBookReportStore = create<BookReportStore>((set, get) => ({
  reports: [],
  books: [],
  formData: {
    id: 0,
    bookId: 0,
    reportDetails: "",
    issueCount: 0,
    returnCount: 0,
    lostCount: 0,
  },
  isEditing: false,

  // ✅ Fetch reports
  fetchReports: async () => {
    try {
      const res = await axios.get(`${API_BASE}/BookReports`);
      set({ reports: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      console.error("Error fetching reports:", error);
    }
  },

  // ✅ Fetch books
  fetchBooks: async () => {
    try {
      const res = await axios.get(`${API_BASE}/Book`);
      set({ books: Array.isArray(res.data) ? res.data : [] });
    } catch (error) {
      console.error("Error fetching books:", error);
    }
  },

  // ✅ Update form data
  setFormData: (data) =>
    set((state) => ({
      formData: { ...state.formData, ...data },
    })),

  // ✅ Reset form
  resetForm: () =>
    set({
      formData: {
        id: 0,
        bookId: 0,
        reportDetails: "",
        issueCount: 0,
        returnCount: 0,
        lostCount: 0,
      },
      isEditing: false,
    }),

  // ✅ Set editing mode
  setEditing: (value) => set({ isEditing: value }),

  // ✅ Add or Update report
  handleSubmit: async () => {
    const { formData, isEditing, fetchReports, resetForm } = get();

    if (!formData.bookId || !formData.reportDetails) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/BookReports/${formData.id}`, formData);
        Swal.fire("Updated!", "Book report updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/BookReports`, formData);
        Swal.fire("Added!", "Book report added successfully", "success");
      }

      resetForm();
      fetchReports();
    } catch (error) {
      console.error("Error saving report:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  // ✅ Edit existing report
  handleEdit: (report) =>
    set({
      formData: report,
      isEditing: true,
    }),

  // ✅ Delete report
  handleDelete: async (id) => {
    const { fetchReports } = get();
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won’t be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/BookReports/${id}`);
        Swal.fire("Deleted!", "Book report deleted successfully", "success");
        fetchReports();
      } catch (error) {
        console.error("Error deleting report:", error);
        Swal.fire("Error", "Failed to delete report", "error");
      }
    }
  },
}));
