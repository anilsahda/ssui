"use client";

import { useEffect, useState, useMemo } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Spinner,
  Toast,
  ToastContainer,
  Alert,
  InputGroup,
  OverlayTrigger,
  Tooltip,
  Pagination,
} from "react-bootstrap";
import { FaSearch, FaTrash, FaEdit, FaDownload } from "react-icons/fa";

type Book = {
  id: number;
  isbn: string;
  title: string;
  author: string;
  publicationId: number;
  totalCopies: number;
};

type BookDto = Omit<Book, "id">;

const API_BASE = "https://localhost:7293";

export default function BookManager() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [formMode, setFormMode] = useState<"create" | "edit">("create");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [formData, setFormData] = useState<BookDto>({
    isbn: "",
    title: "",
    author: "",
    publicationId: 0,
    totalCopies: 0,
  });
  const [toast, setToast] = useState({
    show: false,
    message: "",
    variant: "success",
  });
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState("");

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 5;

  const fetchBooks = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${API_BASE}/api/Book`);
      const data = await res.json();

      // ✅ Ensure the data is an array before setting it
      if (Array.isArray(data)) {
        setBooks(data);
        setError(null);
      } else {
        console.error("Expected an array but got:", data);
        setBooks([]);
        setError("Invalid data format received from API.");
      }
    } catch (err) {
      console.error("Fetch error:", err);
      setError("Failed to load books.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

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
      setToast({ show: true, message: "Operation failed.", variant: "danger" });
      return;
    }

    resetForm();
    fetchBooks();
    setToast({
      show: true,
      message: selectedId ? "Book updated!" : "Book added!",
      variant: "success",
    });
  };

  const resetForm = () => {
    setFormData({
      isbn: "",
      title: "",
      author: "",
      publicationId: 0,
      totalCopies: 0,
    });
    setSelectedId(null);
    setFormMode("create");
    setShowModal(false);
  };

  const handleEdit = (book: Book) => {
    setFormData(book);
    setSelectedId(book.id);
    setFormMode("edit");
    setShowModal(true);
  };

  const handleDelete = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this book?"
    );
    if (!confirmed) return;

    const res = await fetch(`${API_BASE}/api/Book/${id}`, { method: "DELETE" });

    if (!res.ok) {
      setToast({ show: true, message: "Delete failed.", variant: "danger" });
      return;
    }

    fetchBooks();
    setToast({ show: true, message: "Book deleted.", variant: "warning" });
  };

  const filteredBooks = useMemo(() => {
    // ✅ Extra safety check
    if (!Array.isArray(books)) return [];

    return books.filter(
      (b) =>
        b.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        b.author.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [books, searchQuery]);

  const totalPages = Math.ceil(filteredBooks.length / pageSize);
  const paginatedBooks = filteredBooks.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const exportToCSV = () => {
    const header = [
      "ID",
      "ISBN",
      "Title",
      "Author",
      "PublicationID",
      "TotalCopies",
    ];
    const rows = filteredBooks.map((b) => [
      b.id,
      b.isbn,
      `"${b.title}"`,
      `"${b.author}"`,
      b.publicationId,
      b.totalCopies,
    ]);
    const csv = [header, ...rows].map((row) => row.join(",")).join("\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `books_${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4"> Book Manager</h2>

      {error && <Alert variant="danger">{error}</Alert>}

      <div className="d-flex flex-wrap justify-content-between align-items-center mb-3">
        <InputGroup className="mb-2" style={{ maxWidth: 300 }}>
          <InputGroup.Text>
            <FaSearch />
          </InputGroup.Text>
          <Form.Control
            placeholder="Search by title or author"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setCurrentPage(1);
            }}
          />
        </InputGroup>

        <div className="d-flex gap-2">
          <Button variant="success" onClick={exportToCSV}>
            <FaDownload className="me-1" />
            Export CSV
          </Button>
          <Button onClick={() => setShowModal(true)}>+ Add Book</Button>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-4">
          <Spinner animation="border" />
        </div>
      ) : (
        <Table striped bordered hover responsive>
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
            {paginatedBooks.length === 0 ? (
              <tr>
                <td colSpan={7} className="text-center text-muted">
                  No books found.
                </td>
              </tr>
            ) : (
              paginatedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.isbn}</td>
                  <td>{book.title}</td>
                  <td>{book.author}</td>
                  <td>{book.publicationId}</td>
                  <td>{book.totalCopies}</td>
                  <td>
                    <OverlayTrigger overlay={<Tooltip>Edit</Tooltip>}>
                      <Button
                        size="sm"
                        variant="primary"
                        onClick={() => handleEdit(book)}
                        className="me-2"
                      >
                        <FaEdit />
                      </Button>
                    </OverlayTrigger>
                    <OverlayTrigger overlay={<Tooltip>Delete</Tooltip>}>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(book.id)}
                      >
                        <FaTrash />
                      </Button>
                    </OverlayTrigger>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </Table>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center">
          <Pagination.Prev
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          />
          {[...Array(totalPages)].map((_, idx) => (
            <Pagination.Item
              key={idx + 1}
              active={idx + 1 === currentPage}
              onClick={() => setCurrentPage(idx + 1)}
            >
              {idx + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          />
        </Pagination>
      )}

      {/* Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {formMode === "create" ? "Add Book" : "Edit Book"}
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={handleSubmit}>
          <Modal.Body>
            <Form.Group className="mb-3">
              <Form.Label>ISBN</Form.Label>
              <Form.Control
                type="text"
                name="isbn"
                value={formData.isbn}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Author</Form.Label>
              <Form.Control
                type="text"
                name="author"
                value={formData.author}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Publication ID</Form.Label>
              <Form.Control
                type="number"
                name="publicationId"
                value={formData.publicationId}
                onChange={handleChange}
                required
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Total Copies</Form.Label>
              <Form.Control
                type="number"
                name="totalCopies"
                value={formData.totalCopies}
                onChange={handleChange}
                required
              />
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowModal(false)}>
              Cancel
            </Button>
            <Button type="submit" variant="success">
              {formMode === "create" ? "Create" : "Update"}
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      {/* Toast */}
      <ToastContainer position="bottom-end" className="p-3">
        <Toast
          bg={toast.variant}
          show={toast.show}
          onClose={() => setToast((prev) => ({ ...prev, show: false }))}
          delay={3000}
          autohide
        >
          <Toast.Body className="text-white">{toast.message}</Toast.Body>
        </Toast>
      </ToastContainer>
    </div>
  );
}
