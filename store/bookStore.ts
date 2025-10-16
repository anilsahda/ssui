"use client";

import { create } from "zustand";
import axios from "axios";

export interface Book {
  id: number;
  title: string;
  author: string;
  publicationId: number;
  ISBN: string;
  totalCopies: number;
  availableCopies: number;
}

export interface Publication {
  id: number;
  name: string;
  publisher: string;
  contactEmail: string;
}

export interface BookFormData {
  id?: number;
  title: string;
  author: string;
  publicationId: number;
  ISBN: string;
  totalCopies: number;
  availableCopies: number;
}

interface BookStore {
  books: Book[];
  publications: Publication[];
  formData: BookFormData;
  isEditing: boolean;
  searchQuery: string;
  sortField: keyof Book | "";
  sortOrder: "asc" | "desc";
  currentPage: number;
  itemsPerPage: number;

  fetchBooks: () => Promise<void>;
  fetchPublications: () => Promise<void>;
  setFormData: (data: Partial<BookFormData>) => void;
  resetForm: () => void;
  setEditing: (value: boolean) => void;
  setSearchQuery: (query: string) => void;
  setSortField: (field: keyof Book | "") => void;
  setCurrentPage: (page: number) => void;
}

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7293/api";

export const useBookStore = create<BookStore>((set, get) => ({
  books: [],
  publications: [],
  formData: {
    id: 0,
    title: "",
    author: "",
    publicationId: 0,
    ISBN: "",
    totalCopies: 0,
    availableCopies: 0,
  },
  isEditing: false,
  searchQuery: "",
  sortField: "",
  sortOrder: "asc",
  currentPage: 1,
  itemsPerPage: 5,

  fetchBooks: async () => {
    try {
      const res = await axios.get<Book[]>(`${API_BASE}/Book`);
      // Ensure an array is always set
      set({ books: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error("Error fetching books:", err);
      set({ books: [] }); // fallback to empty array
    }
  },

  fetchPublications: async () => {
    try {
      const res = await axios.get<Publication[]>(`${API_BASE}/Publication`);
      set({ publications: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error("Error fetching publications:", err);
      set({ publications: [] });
    }
  },

  setFormData: (data: Partial<BookFormData>) =>
    set((state) => ({ formData: { ...state.formData, ...data } })),

  resetForm: () =>
    set({
      formData: {
        id: 0,
        title: "",
        author: "",
        publicationId: 0,
        ISBN: "",
        totalCopies: 0,
        availableCopies: 0,
      },
      isEditing: false,
    }),

  setEditing: (value) => set({ isEditing: value }),

  setSearchQuery: (query) => set({ searchQuery: query, currentPage: 1 }),

  setSortField: (field) => {
    const { sortField, sortOrder } = get();
    if (sortField === field) {
      set({ sortOrder: sortOrder === "asc" ? "desc" : "asc" });
    } else {
      set({ sortField: field, sortOrder: "asc" });
    }
  },

  setCurrentPage: (page) => set({ currentPage: page }),
}));
