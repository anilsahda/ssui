"use client";

import { create } from "zustand";
import axios from "axios";
import Swal from "sweetalert2";

const API_BASE =
  process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7115/api";

export interface Book {
  id: number;
  title: string;
  author: string;
  isbn: string;
  totalCopies: number;
  availableCopies: number;
}

export interface Student {
  id: number;
  fullName: string;
  rollNumber: string;
  email: string;
}

export interface IssueBook {
  id: number;
  bookId: number;
  studentId: number;
  issueDate: string;
  dueDate: string;
  isReturned: boolean;
  book?: Book;
  student?: Student;
}

interface IssueBookState {
  issues: IssueBook[];
  books: Book[];
  students: Student[];
  formData: IssueBook;
  isEditing: boolean;
  fetchIssues: () => Promise<void>;
  fetchBooksAndStudents: () => Promise<void>;
  handleChange: (
    name: string,
    value: any,
    type?: string,
    checked?: boolean
  ) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => Promise<void>;
  handleEdit: (issue: IssueBook) => void;
  handleDelete: (id: number) => Promise<void>;
  resetForm: () => void;
}

export const useIssueBookStore = create<IssueBookState>((set, get) => ({
  issues: [],
  books: [],
  students: [],
  formData: {
    id: 0,
    bookId: 0,
    studentId: 0,
    issueDate: "",
    dueDate: "",
    isReturned: false,
  },
  isEditing: false,

  // ✅ Fetch all issues
  fetchIssues: async () => {
    try {
      const response = await axios.get(`${API_BASE}/IssueBooks`);
      set({ issues: Array.isArray(response.data) ? response.data : [] });
    } catch (error) {
      console.error("Error fetching issues:", error);
    }
  },

  // ✅ Fetch books & students
  fetchBooksAndStudents: async () => {
    try {
      const [booksRes, studentsRes] = await Promise.all([
        axios.get(`${API_BASE}/Book`),
        axios.get(`${API_BASE}/Student`),
      ]);
      set({
        books: Array.isArray(booksRes.data) ? booksRes.data : [],
        students: Array.isArray(studentsRes.data) ? studentsRes.data : [],
      });
    } catch (error) {
      console.error("Error fetching books or students:", error);
    }
  },

  // ✅ Handle input change
  handleChange: (name, value, type, checked) => {
    set((state) => ({
      formData: {
        ...state.formData,
        [name]:
          type === "checkbox"
            ? checked
            : name === "bookId" || name === "studentId"
            ? Number(value)
            : value,
      },
    }));
  },

  // ✅ Handle form submit
  handleSubmit: async (e) => {
    e.preventDefault();
    const { formData, isEditing, fetchIssues, resetForm } = get();

    if (!formData.bookId || !formData.studentId || !formData.issueDate) {
      Swal.fire("Validation Error", "All fields are required", "warning");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/IssueBooks/${formData.id}`, formData);
        Swal.fire("Updated!", "Issue record updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/IssueBooks`, formData);
        Swal.fire("Added!", "Book issued successfully", "success");
      }
      resetForm();
      fetchIssues();
    } catch (error) {
      console.error("Error saving issue:", error);
      Swal.fire("Error", "Something went wrong", "error");
    }
  },

  // ✅ Edit issue
  handleEdit: (issue) => {
    set({
      formData: {
        ...issue,
        issueDate: issue.issueDate ? issue.issueDate.split("T")[0] : "",
        dueDate: issue.dueDate ? issue.dueDate.split("T")[0] : "",
      },
      isEditing: true,
    });
  },

  // ✅ Delete issue
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
        await axios.delete(`${API_BASE}/IssueBooks/${id}`);
        Swal.fire("Deleted!", "Issue record deleted successfully", "success");
        get().fetchIssues();
      } catch (error) {
        console.error("Error deleting issue:", error);
        Swal.fire("Error", "Failed to delete issue", "error");
      }
    }
  },

  // ✅ Reset form
  resetForm: () => {
    set({
      formData: {
        id: 0,
        bookId: 0,
        studentId: 0,
        issueDate: "",
        dueDate: "",
        isReturned: false,
      },
      isEditing: false,
    });
  },
}));
