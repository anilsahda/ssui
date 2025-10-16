"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBookStore } from "@/store/bookStore";

export default function BookPage() {
  const {
    books,
    publications,
    formData,
    isEditing,
    searchQuery,
    sortField,
    sortOrder,
    currentPage,
    itemsPerPage,
    fetchBooks,
    fetchPublications,
    setFormData,
    resetForm,
    setEditing,
    setSearchQuery,
    setSortField,
    setSortOrder,
    setCurrentPage,
  } = useBookStore();

  const API_BASE =
    process.env.NEXT_PUBLIC_API_BASE || "https://localhost:7293/api";

  useEffect(() => {
    fetchBooks();
    fetchPublications();
  }, [fetchBooks, fetchPublications]);

  // ✅ Input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    const parsedValue = [
      "publicationId",
      "totalCopies",
      "availableCopies",
    ].includes(name)
      ? Number(value)
      : value;
    setFormData({ [name]: parsedValue });
  };

  // ✅ Submit form
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (
      !formData.title ||
      !formData.author ||
      !formData.publicationId ||
      !formData.ISBN
    ) {
      Swal.fire("Validation Error", "Please fill all fields!", "warning");
      return;
    }

    try {
      if (isEditing) {
        await axios.put(`${API_BASE}/Book/${formData.id}`, formData);
        Swal.fire("Updated!", "Book updated successfully", "success");
      } else {
        await axios.post(`${API_BASE}/Book`, formData);
        Swal.fire("Added!", "Book added successfully", "success");
      }
      resetForm();
      fetchBooks();
    } catch {
      Swal.fire("Error", "Something went wrong", "error");
    }
  };

  // ✅ Edit
  const handleEdit = (book: any) => {
    setFormData({ ...book, publicationId: Number(book.publicationId) });
    setEditing(true);
  };

  // ✅ Delete
  const handleDelete = async (id: number) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    });

    if (confirm.isConfirmed) {
      try {
        await axios.delete(`${API_BASE}/Book/${id}`);
        Swal.fire("Deleted!", "Book deleted successfully", "success");
        fetchBooks();
      } catch {
        Swal.fire("Error", "Failed to delete book", "error");
      }
    }
  };

  // ✅ Filter + Sort + Pagination
  const booksArray = Array.isArray(books) ? books : []; // ✅ Fix: ensure array
  const publicationsArray = Array.isArray(publications) ? publications : [];

  const filteredBooks = booksArray.filter(
    (b) =>
      b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.author.toLowerCase().includes(searchQuery.toLowerCase()) ||
      b.ISBN.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedBooks = sortField
    ? [...filteredBooks].sort((a, b) => {
        const valA = a[sortField];
        const valB = b[sortField];
        if (valA < valB) return sortOrder === "asc" ? -1 : 1;
        if (valA > valB) return sortOrder === "asc" ? 1 : -1;
        return 0;
      })
    : filteredBooks;

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedBooks = sortedBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );
  const totalPages = Math.ceil(sortedBooks.length / itemsPerPage);

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">📚 Book Management</h2>

      {/* ✅ Search */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <input
          type="text"
          placeholder="🔍 Search by Title, Author, ISBN"
          className="form-control w-50"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
        <span className="text-muted">Total Books: {sortedBooks.length}</span>
      </div>

      {/* ✅ Form */}
      <form onSubmit={handleSubmit} className="card p-3 mb-4 shadow-sm">
        <div className="row g-3">
          <div className="col-md-6">
            <label>Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={formData.title || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={formData.author || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Publication</label>
            <select
              name="publicationId"
              className="form-control"
              value={formData.publicationId || 0}
              onChange={handleChange}
            >
              <option value={0}>Select Publication</option>
              {publicationsArray.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          </div>
          <div className="col-md-6">
            <label>ISBN</label>
            <input
              type="text"
              name="ISBN"
              className="form-control"
              value={formData.ISBN || ""}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Total Copies</label>
            <input
              type="number"
              name="totalCopies"
              className="form-control"
              value={formData.totalCopies || 0}
              onChange={handleChange}
            />
          </div>
          <div className="col-md-6">
            <label>Available Copies</label>
            <input
              type="number"
              name="availableCopies"
              className="form-control"
              value={formData.availableCopies || 0}
              onChange={handleChange}
            />
          </div>
        </div>

        <div className="mt-3 text-end">
          <button type="submit" className="btn btn-primary me-2">
            {isEditing ? "Update" : "Add"}
          </button>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={resetForm}
          >
            Reset
          </button>
        </div>
      </form>

      {/* ✅ Table */}
      <table className="table table-striped table-bordered shadow-sm">
        <thead>
          <tr>
            <th
              onClick={() => setSortField("title")}
              style={{ cursor: "pointer" }}
            >
              Title {sortField === "title" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th
              onClick={() => setSortField("author")}
              style={{ cursor: "pointer" }}
            >
              Author{" "}
              {sortField === "author" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Publication</th>
            <th
              onClick={() => setSortField("ISBN")}
              style={{ cursor: "pointer" }}
            >
              ISBN {sortField === "ISBN" && (sortOrder === "asc" ? "▲" : "▼")}
            </th>
            <th>Total Copies</th>
            <th>Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBooks.length > 0 ? (
            paginatedBooks.map((b) => (
              <tr key={b.id}>
                <td>{b.title}</td>
                <td>{b.author}</td>
                <td>
                  {publicationsArray.find((p) => p.id === b.publicationId)
                    ?.name || "N/A"}
                </td>
                <td>{b.ISBN}</td>
                <td>{b.totalCopies}</td>
                <td>{b.availableCopies}</td>
                <td>
                  <button
                    className="btn btn-sm btn-warning me-2"
                    onClick={() => handleEdit(b)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-sm btn-danger"
                    onClick={() => handleDelete(b.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No books found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* ✅ Pagination */}
      <nav className="d-flex justify-content-center">
        <ul className="pagination">
          <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage - 1)}
            >
              Prev
            </button>
          </li>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
            <li
              key={num}
              className={`page-item ${currentPage === num ? "active" : ""}`}
            >
              <button className="page-link" onClick={() => setCurrentPage(num)}>
                {num}
              </button>
            </li>
          ))}
          <li
            className={`page-item ${
              currentPage === totalPages ? "disabled" : ""
            }`}
          >
            <button
              className="page-link"
              onClick={() => setCurrentPage(currentPage + 1)}
            >
              Next
            </button>
          </li>
        </ul>
      </nav>
    </div>
  );
}
