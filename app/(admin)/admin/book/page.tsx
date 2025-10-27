"use client";

import React, { useEffect, ChangeEvent, FormEvent } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import AOS from "aos";
import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { useBookStore } from "@/store/bookStore";
import { FaBook, FaPlus, FaSyncAlt, FaSearch } from "react-icons/fa";

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
    AOS.init({ duration: 900, once: true, easing: "ease-in-out" });
  }, [fetchBooks, fetchPublications]);

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

  const handleEdit = (book: any) => {
    setFormData({ ...book, publicationId: Number(book.publicationId) });
    setEditing(true);
  };

  const handleDelete = async (id: number) => {
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
        await axios.delete(`${API_BASE}/Book/${id}`);
        Swal.fire("Deleted!", "Book deleted successfully", "success");
        fetchBooks();
      } catch {
        Swal.fire("Error", "Failed to delete book", "error");
      }
    }
  };

  const booksArray = Array.isArray(books) ? books : [];
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
    <div
      className="min-vh-100 py-5"
      style={{
        background: "linear-gradient(135deg, #0d6efd, #6610f2, #20c997)",
        backgroundSize: "300% 300%",
        animation: "gradientShift 12s ease infinite",
      }}
    >
      <div className="container">
        <div className="text-center text-white mb-5" data-aos="fade-down">
          <h1 className="fw-bold display-5">
            <FaBook className="me-2" /> Book Management
          </h1>
          <p className="lead">Manage your collection with style and ease ✨</p>
        </div>

        {/* Search Bar */}
        <div
          className="card shadow-lg mb-4 p-3 border-0"
          style={{ borderRadius: "15px" }}
          data-aos="fade-up"
        >
          <div className="d-flex justify-content-between align-items-center flex-wrap gap-2">
            <div className="input-group w-50">
              <span className="input-group-text bg-light">
                <FaSearch />
              </span>
              <input
                type="text"
                placeholder="Search by Title, Author, or ISBN"
                className="form-control"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <span className="fw-semibold text-secondary">
              Total Books: {sortedBooks.length}
            </span>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="card shadow-lg p-4 border-0 mb-5"
          style={{ borderRadius: "20px", background: "rgba(255,255,255,0.9)" }}
          data-aos="zoom-in"
        >
          <div className="row g-3">
            {[
              { label: "Title", name: "title", type: "text" },
              { label: "Author", name: "author", type: "text" },
              { label: "ISBN", name: "ISBN", type: "text" },
              { label: "Total Copies", name: "totalCopies", type: "number" },
              {
                label: "Available Copies",
                name: "availableCopies",
                type: "number",
              },
            ].map((f, i) => (
              <div
                key={i}
                className="col-md-6"
                data-aos="fade-up"
                data-aos-delay={i * 100}
              >
                <label className="fw-semibold">{f.label}</label>
                <input
                  type={f.type}
                  name={f.name}
                  className="form-control"
                  value={formData[f.name] || ""}
                  onChange={handleChange}
                />
              </div>
            ))}

            <div className="col-md-6" data-aos="fade-up" data-aos-delay="500">
              <label className="fw-semibold">Publication</label>
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
          </div>

          <div className="text-end mt-4" data-aos="fade-up">
            <button
              type="submit"
              className="btn btn-primary me-2 rounded-pill px-4"
            >
              <FaPlus className="me-2" />
              {isEditing ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className="btn btn-secondary rounded-pill px-4"
              onClick={resetForm}
            >
              <FaSyncAlt className="me-2" /> Reset
            </button>
          </div>
        </form>

        {/* Table */}
        <div
          className="table-responsive shadow-lg rounded"
          style={{ background: "rgba(255,255,255,0.95)" }}
          data-aos="fade-up"
        >
          <table className="table table-hover align-middle text-center">
            <thead className="table-dark sticky-top">
              <tr>
                {[
                  "Title",
                  "Author",
                  "Publication",
                  "ISBN",
                  "Total",
                  "Available",
                  "Actions",
                ].map((header, i) => (
                  <th key={i}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {paginatedBooks.length > 0 ? (
                paginatedBooks.map((b) => (
                  <tr key={b.id} data-aos="fade-up" data-aos-delay="100">
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
                        className="btn btn-sm btn-warning me-2 px-3"
                        onClick={() => handleEdit(b)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-sm btn-danger px-3"
                        onClick={() => handleDelete(b.id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-muted py-3">
                    No books found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <nav className="d-flex justify-content-center mt-4" data-aos="zoom-in">
          <ul className="pagination pagination-rounded">
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
                <button
                  className="page-link"
                  onClick={() => setCurrentPage(num)}
                >
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

      <style jsx>{`
        @keyframes gradientShift {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }

        .pagination .page-link {
          border-radius: 50%;
          margin: 0 3px;
        }

        .table-hover tbody tr:hover {
          background-color: rgba(13, 110, 253, 0.1);
          transition: background-color 0.3s ease;
        }

        .btn {
          transition: all 0.3s ease;
        }

        .btn:hover {
          transform: translateY(-2px);
        }
      `}</style>
    </div>
  );
}
