"use client";
import React, { useState } from "react";

function Page() {
  const [borrowedBooks, setBorrowedBooks] = useState([
    { id: 1, name: "Data Structures", issueDate: "2025-08-01", days: 14 },
    { id: 2, name: "Operating System", issueDate: "2025-08-05", days: 10 },
  ]);

  const [returnedBooks, setReturnedBooks] = useState([
    {
      id: 1,
      name: "Machine Learning",
      issueDate: "2025-07-20",
      days: 15,
      returnDate: "2025-08-04",
    },
  ]);

  // Remove ": any" — JS doesn't support types
  const handleReturn = (book: any) => {
    const today = new Date().toISOString().split("T")[0];
    setReturnedBooks([...returnedBooks, { ...book, returnDate: today }]);
    setBorrowedBooks(borrowedBooks.filter((b) => b.id !== book.id));
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Book Report</h2>

      {/* Borrowed Books Table */}
      <div className="card p-3 mb-4 shadow-sm">
        <h5>Borrowed Books</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Book Name</th>
              <th>Issue Date</th>
              <th>Days</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {borrowedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.issueDate}</td>
                <td>{book.days}</td>
                <td>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => handleReturn(book)}
                  >
                    Return
                  </button>
                </td>
              </tr>
            ))}
            {borrowedBooks.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center">
                  No borrowed books
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Returned Books Table */}
      <div className="card p-3 shadow-sm">
        <h5>Returned Books</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Book Name</th>
              <th>Issue Date</th>
              <th>Days</th>
              <th>Return Date</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {returnedBooks.map((book) => (
              <tr key={book.id}>
                <td>{book.name}</td>
                <td>{book.issueDate}</td>
                <td>{book.days}</td>
                <td>{book.returnDate}</td>
                <td>
                  <button className="btn btn-info btn-sm">View</button>
                </td>
              </tr>
            ))}
            {returnedBooks.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No returned books
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
