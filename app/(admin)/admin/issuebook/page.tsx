"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";

function IssueBookPage() {
  const [showPopup, setShowPopup] = useState(false);
  const [issuedBooks, setIssuedBooks] = useState<any[]>([]);
  const [editingIssue, setEditingIssue] = useState<any>(null);

  // 🔹 Dropdown Data
  const [publications, setPublications] = useState<any[]>([]);
  const [books, setBooks] = useState<any[]>([]);
  const [branches, setBranches] = useState<any[]>([]);
  const [students, setStudents] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    publication: "",
    bookName: "",
    branch: "",
    student: "",
    issueDays: "",
    issueDate: "",
  });

  // 🔹 Base URLs (adjust as per your backend)
  const API_BASE = "https://localhost:7293/api";
  const ISSUE_API = `${API_BASE}/IssueBook`;
  const PUB_API = `${API_BASE}/Publications/GetPublications`;
  const BOOK_API = `${API_BASE}/Books/GetBooks`;
  const BRANCH_API = `${API_BASE}/Branches/GetBranches`;
  const STUDENT_API = `${API_BASE}/Students/GetStudent`;

  // 🔹 Fetch dropdown + issuedBooks
  useEffect(() => {
    fetchIssuedBooks();
    fetchDropdownData();
  }, []);

  const fetchIssuedBooks = async () => {
    try {
      const res = await axios.get(`${ISSUE_API}/GetIssueBooks`);
      setIssuedBooks(res.data);
    } catch (err) {
      console.error("Error fetching issued books:", err);
    }
  };

  const fetchDropdownData = async () => {
    try {
      const [pubRes, bookRes, branchRes, studentRes] = await Promise.all([
        axios.get(PUB_API),
        axios.get(BOOK_API),
        axios.get(BRANCH_API),
        axios.get(STUDENT_API),
      ]);
      setPublications(pubRes.data);
      setBooks(bookRes.data);
      setBranches(branchRes.data);
      setStudents(studentRes.data);
    } catch (err) {
      console.error("Error fetching dropdown data:", err);
    }
  };

  // 🔹 Input handler
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Open Modal
  const handleOpenModal = () => {
    setEditingIssue(null);
    setFormData({
      publication: "",
      bookName: "",
      branch: "",
      student: "",
      issueDays: "",
      issueDate: "",
    });
    setShowPopup(true);
  };

  // 🔹 Edit
  const handleEdit = (issue: any) => {
    setEditingIssue(issue);
    setFormData({
      publication: issue.publication,
      bookName: issue.bookName,
      branch: issue.branch,
      student: issue.student,
      issueDays: issue.issueDays,
      issueDate: issue.issueDate,
    });
    setShowPopup(true);
  };

  // 🔹 Save
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingIssue) {
        await axios.put(`${ISSUE_API}/UpdateIssueBook`, {
          Id: editingIssue.id,
          ...formData,
        });
      } else {
        await axios.post(`${ISSUE_API}/AddIssueBook`, formData);
      }
      fetchIssuedBooks();
      setShowPopup(false);
    } catch (err) {
      console.error("Error saving issued book:", err);
    }
  };

  // 🔹 Delete
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this record?")) return;
    try {
      await axios.delete(`${ISSUE_API}/${id}`);
      fetchIssuedBooks();
    } catch (err) {
      console.error("Error deleting issued book:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Issue Book</h2>

      <button className="btn btn-primary mb-3" onClick={handleOpenModal}>
        + Issue New Book
      </button>

      {/* Modal */}
      {showPopup && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingIssue ? "Edit Issued Book" : "Issue Book"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowPopup(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  {/* Publication */}
                  <div className="mb-3">
                    <label className="form-label">Select Publication</label>
                    <select
                      className="form-select"
                      name="publication"
                      value={formData.publication}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Publication</option>
                      {publications.map((pub) => (
                        <option key={pub.id} value={pub.name}>
                          {pub.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Book */}
                  <div className="mb-3">
                    <label className="form-label">Select Book</label>
                    <select
                      className="form-select"
                      name="bookName"
                      value={formData.bookName}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Book</option>
                      {books.map((book) => (
                        <option key={book.id} value={book.name}>
                          {book.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Branch */}
                  <div className="mb-3">
                    <label className="form-label">Select Branch</label>
                    <select
                      className="form-select"
                      name="branch"
                      value={formData.branch}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Branch</option>
                      {branches.map((branch) => (
                        <option key={branch.id} value={branch.name}>
                          {branch.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Student */}
                  <div className="mb-3">
                    <label className="form-label">Select Student</label>
                    <select
                      className="form-select"
                      name="student"
                      value={formData.student}
                      onChange={handleChange}
                      required
                    >
                      <option value="">Select Student</option>
                      {students.map((student) => (
                        <option key={student.id} value={student.name}>
                          {student.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Days & Date */}
                  <div className="mb-3">
                    <label className="form-label">Issue Days</label>
                    <input
                      type="number"
                      className="form-control"
                      name="issueDays"
                      value={formData.issueDays}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label">Issue Date</label>
                    <input
                      type="date"
                      className="form-control"
                      name="issueDate"
                      value={formData.issueDate}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={() => setShowPopup(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      {editingIssue ? "Update Issue" : "Issue Book"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Issued Books Table */}
      <div className="card shadow-sm p-4">
        <h5 className="mb-3">Issued Books</h5>
        <table className="table table-bordered table-striped">
          <thead className="table-light">
            <tr>
              <th>Id</th>
              <th>Book Name</th>
              <th>Publication</th>
              <th>Branch</th>
              <th>Student</th>
              <th>Issue Date</th>
              <th>Issue Days</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {issuedBooks.length > 0 ? (
              issuedBooks.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.bookName}</td>
                  <td>{book.publication}</td>
                  <td>{book.branch}</td>
                  <td>{book.student}</td>
                  <td>{book.issueDate}</td>
                  <td>{book.issueDays}</td>
                  <td>
                    <button
                      className="btn btn-warning btn-sm me-1"
                      onClick={() => handleEdit(book)}
                    >
                      Edit
                    </button>
                    <button
                      className="btn btn-danger btn-sm me-1"
                      onClick={() => handleDelete(book.id)}
                    >
                      Delete
                    </button>
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() =>
                        alert(`Returned book: ${book.bookName} by ${book.student}`)
                      }
                    >
                      Return
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={8} className="text-center">
                  No Issued Books Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default IssueBookPage;
