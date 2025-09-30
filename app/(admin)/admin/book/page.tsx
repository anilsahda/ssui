"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

type Book = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publicationId: number;
  totalCopies: number;
};

type BookDto = Omit<Book, "id">;

const API_BASE = process.env.NEXT_PUBLIC_API_BASE || "http://localhost:5000";

export default function BookManager() {
  const [books, setBooks] = useState<Book[]>([]);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<BookDto>({
    isbn: "",
    title: "",
    author: "",
    publicationId: 0,
    totalCopies: 0,
  });
  const [error, setError] = useState<string | null>(null);

  // Load all books
  const fetchBooks = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/Book`);
      const data = await res.json();
      setBooks(data);
    } catch (err) {
      setError("Failed to load books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Handle form changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === "publicationId" || name === "totalCopies"
          ? parseInt(value)
          : value,
    }));
  };

  // Handle create/update
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const url = selectedId
      ? `${API_BASE}/api/Book/${selectedId}`
      : `${API_BASE}/api/Book`;
    const method = selectedId ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      alert("Operation failed.");
      return;
    }

    setFormData({
      isbn: "",
      title: "",
      author: "",
      publicationId: 0,
      totalCopies: 0,
    });
    setFormMode("create");
    setSelectedId(null);
    fetchBooks();
  };

  // Handle edit
  const handleEdit = (book: Book) => {
    setFormData({ ...book });
    setSelectedId(book.id);
    setFormMode("edit");
  };

  // Handle delete
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure?")) return;

    const res = await fetch(`${API_BASE}/api/Book/${id}`, {
      method: "DELETE",
    });

    if (!res.ok) {
      alert("Delete failed.");
      return;
    }

    fetchBooks();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Book Manager</h2>

      {/* FORM */}
      <div className="card mb-4">
        <div className="card-header">
          {formMode === "create" ? "Add New Book" : `Edit Book #${selectedId}`}
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">ISBN</label>
              <input
                type="text"
                name="isbn"
                className="form-control"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Title</label>
              <input
                type="text"
                name="title"
                className="form-control"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Author</label>
              <input
                type="text"
                name="author"
                className="form-control"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Publication ID</label>
              <input
                type="number"
                name="publicationId"
                className="form-control"
                value={formData.publicationId}
                onChange={handleChange}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Total Copies</label>
              <input
                type="number"
                name="totalCopies"
                className="form-control"
                value={formData.totalCopies}
                onChange={handleChange}
                required
              />
            </div>

            <button type="submit" className="btn btn-success me-2">
              {formMode === "create" ? "Create" : "Update"}
            </button>
            {formMode === "edit" && (
              <button
                type="button"
                className="btn btn-secondary"
                onClick={() => {
                  setFormMode("create");
                  setSelectedId(null);
                  setFormData({
                    isbn: "",
                    title: "",
                    author: "",
                    publicationId: 0,
                    totalCopies: 0,
                  });
                }}
              >
                Cancel
              </button>
            )}
          </form>
        </div>
      </div>

      {/* BOOK LIST */}
      <h4>All Books</h4>
      {error && <div className="alert alert-danger">{error}</div>}
      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>ISBN</th>
            <th>Title</th>
            <th>Author</th>
            <th>Publication ID</th>
            <th>Total Copies</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book) => (
            <tr key={book.id}>
              <td>{book.id}</td>
              <td>{book.isbn}</td>
              <td>{book.title}</td>
              <td>{book.author}</td>
              <td>{book.publicationId}</td>
              <td>{book.totalCopies}</td>
              <td>
                <button
                  className="btn btn-sm btn-primary me-2"
                  onClick={() => handleEdit(book)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-sm btn-danger"
                  onClick={() => handleDelete(book.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
          {books.length === 0 && (
            <tr>
              <td colSpan={7} className="text-center text-muted">
                No books found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
