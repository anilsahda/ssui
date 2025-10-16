"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

// API Base URL
const API_BASE = "https://localhost:7293/api";

// Interface
export interface Publication {
  id: number;
  name: string;
  publisher: string;
  contactEmail: string;
}

interface PublicationState {
  publications: Publication[];
  formData: Publication;
  editingId: number | null;
  fetchPublications: () => Promise<void>;
  handleChange: (name: string, value: any) => void;
  handleSubmit: () => Promise<void>;
  handleEdit: (publication: Publication) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const usePublicationStore = create<PublicationState>((set, get) => ({
  publications: [],
  editingId: null,
  formData: { id: 0, name: "", publisher: "", contactEmail: "" },

  fetchPublications: async () => {
    try {
      const res = await axios.get(`${API_BASE}/Publication`);
      set({ publications: Array.isArray(res.data) ? res.data : [] });
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to fetch publications", "error");
    }
  },

  handleChange: (name, value) => {
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  handleSubmit: async () => {
    const { formData, editingId, fetchPublications, resetForm } = get();

    if (!formData.name || !formData.publisher || !formData.contactEmail) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      if (editingId) {
        await axios.put(`${API_BASE}/Publication/${editingId}`, formData);
        Swal.fire("Updated!", "Publication updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/Publication`, formData);
        Swal.fire("Added!", "Publication added successfully", "success");
      }
      resetForm();
      fetchPublications();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  handleEdit: (publication) => {
    set({ formData: publication, editingId: publication.id });
  },

  handleDelete: async (id) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "This publication will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (!confirm.isConfirmed) return;

    try {
      await axios.delete(`${API_BASE}/Publication/${id}`);
      Swal.fire("Deleted!", "Publication deleted successfully", "success");
      get().fetchPublications();
    } catch (err) {
      console.error(err);
      Swal.fire("Error", "Failed to delete publication", "error");
    }
  },

  resetForm: () => {
    set({
      formData: { id: 0, name: "", publisher: "", contactEmail: "" },
      editingId: null,
    });
  },
}));
