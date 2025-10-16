"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7293/api";

export interface Branch {
  id: number;
  branchName: string;
  address: string;
}

interface BranchState {
  branches: Branch[];
  formData: Branch;
  isEditing: boolean;
  fetchBranches: () => Promise<void>;
  handleChange: (name: string, value: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleEdit: (branch: Branch) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const useBranchStore = create<BranchState>((set, get) => ({
  branches: [],
  formData: { id: 0, branchName: "", address: "" },
  isEditing: false,

  // ✅ Fetch all branches
  fetchBranches: async () => {
    try {
      const response = await axios.get(`${API_BASE}/Branch`);
      set({ branches: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Error fetching branches:", error);
    }
  },

  // ✅ Handle input change
  handleChange: (name, value) => {
    set((state) => ({
      formData: { ...state.formData, [name]: value },
    }));
  },

  // ✅ Handle form submit (Add / Update)
  handleSubmit: async (e) => {
    e.preventDefault();
    const { formData, isEditing, resetForm, fetchBranches } = get();

    if (!formData.branchName || !formData.address) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/Branch/${formData.id}`, formData);
        Swal.fire("Updated!", "Branch updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/Branch`, formData);
        Swal.fire("Added!", "Branch added successfully", "success");
      }

      resetForm();
      fetchBranches();
    } catch (error) {
      console.error("Error saving branch:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  // ✅ Edit branch
  handleEdit: (branch) => {
    set({ formData: branch, isEditing: true });
  },

  // ✅ Delete branch
  handleDelete: async (id) => {
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
        await axios.delete(`${API_BASE}/Branch/${id}`);
        Swal.fire("Deleted!", "Branch deleted successfully", "success");
        get().fetchBranches();
      } catch (error) {
        console.error("Error deleting branch:", error);
        Swal.fire("Error", "Failed to delete branch", "error");
      }
    }
  },

  // ✅ Reset form
  resetForm: () => {
    set({
      formData: { id: 0, branchName: "", address: "" },
      isEditing: false,
    });
  },
}));
