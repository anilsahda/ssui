"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function BookPage() {
  const [books, setBooks] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBook, setEditingBook] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    details: "",
    author: "",
    publicationId: 0,
    branch: "",
    price: "",
    quantity: "",
  });

  // 🔹 API base URL (change according to your backend)
  const API_URL = "https://localhost:7293/api/Books";

  // 🔹 Fetch all books on load
  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const res = await axios.get(API_URL + "/GetBooks");
      setBooks(res.data);
    } catch (err) {
      console.error("Error fetching books:", err);
    }
  };

  // 🔹 Handle input changes
  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Open modal for new book
  const handleOpenModal = () => {
    setEditingBook(null);
    setFormData({
      name: "",
      details: "",
      author: "",
      publicationId: 0,
      branch: "",
      price: "",
      quantity: "",
    });
    setShowModal(true);
  };

  // 🔹 Open modal for editing book
  const handleEdit = (book: any) => {
    setEditingBook(book);
    setFormData({
      name: book.name,
      details: book.details,
      author: book.author,
      publicationId: book.publicationId,
      branch: book.branch,
      price: book.price,
      quantity: book.quantity,
    });
    setShowModal(true);
  };

  // 🔹 Add / Update Book
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBook) {
        // Update (include ID in request)
        await axios.put(`${API_URL}/UpdateBooks/${editingBook.id}`, {
          id: editingBook.id,
          ...formData,
        });
      } else {
        // Create
        await axios.post(API_URL + "/AddBook", formData);
      }
      fetchBooks();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving book:", err);
    }
  };

  // 🔹 Delete Book
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBooks();
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Books</h2>

      {/* Button to open modal */}
      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={handleOpenModal}>
          + Add Book
        </button>
      </div>

      {/* Book Form Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered modal-lg"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingBook ? "Edit Book" : "Add Book"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="mb-3">
                    <label className="form-label">Book Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Details</label>
                    <textarea
                      className="form-control"
                      rows={3}
                      name="details"
                      value={formData.details}
                      onChange={handleChange}
                    ></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input
                      type="text"
                      className="form-control"
                      name="author"
                      value={formData.author}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Publication</label>
                    <select
                      className="form-select"
                      name="publication"
                      value={formData.publicationId}
                      onChange={handleChange}
                    >
                      <option value="">Select Publication</option>
                      <option>Oxford University Press</option>
                      <option>Cambridge University Press</option>
                      <option>McGraw Hill</option>
                      <option>Pearson</option>
                      <option>MIT Press</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Branch</label>
                    <select
                      className="form-select"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                    >
                      <option value="">Select Branch</option>
                      <option>Computer Science</option>
                      <option>Electronics</option>
                      <option>Mechanical</option>
                      <option>Civil</option>
                      <option>Electrical</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input
                      type="number"
                      className="form-control"
                      name="price"
                      value={formData.price}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input
                      type="number"
                      className="form-control"
                      name="quantity"
                      value={formData.quantity}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setShowModal(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingBook ? "Update Book" : "Add Book"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Books Table */}
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Book Name</th>
            <th>Author</th>
            <th>Publication</th>
            <th>Branch</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Details</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {books.length > 0 ? (
            books.map((book: any) => (
              <tr key={book.id}>
                <td>{book.id}</td>
                <td>{book.name}</td>
                <td>{book.author}</td>
                <td>{book.publicationId}</td>
                <td>{book.branch}</td>
                <td>{book.price}</td>
                <td>{book.quantity}</td>
                <td>{book.details}</td>
                <td>
                  <button
                    className="btn btn-warning me-1"
                    onClick={() => handleEdit(book)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger me-1"
                    onClick={() => handleDelete(book.id)}
                  >
                    Delete
                  </button>
                  <button className="btn btn-success">View</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={9} className="text-center">
                No Books Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BookPage;
