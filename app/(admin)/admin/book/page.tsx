"use client";

import React, { useState } from "react";

function BookPage() {
  const [showModal, setShowModal] = useState(false);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);

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
          <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Book</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleCloseModal}
                ></button>
              </div>
              <div className="modal-body">
                <form>
                  <div className="mb-3">
                    <label className="form-label">Book Name</label>
                    <input type="text" className="form-control" placeholder="Enter Book Name" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Details</label>
                    <textarea className="form-control" rows={3} placeholder="Enter Book Details"></textarea>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Author</label>
                    <input type="text" className="form-control" placeholder="Enter Author Name" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Publication</label>
                    <select className="form-select">
                      <option>Select Publication</option>
                      <option>Oxford University Press</option>
                      <option>Cambridge University Press</option>
                      <option>McGraw Hill</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Branch</label>
                    <select className="form-select">
                      <option>Select Branch</option>
                      <option>Computer Science</option>
                      <option>Electronics</option>
                      <option>Mechanical</option>
                      <option>Civil</option>
                      <option>Electrical</option>
                    </select>
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Price</label>
                    <input type="number" className="form-control" placeholder="Enter Price" />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Quantity</label>
                    <input type="number" className="form-control" placeholder="Enter Quantity" />
                  </div>

                  <div className="d-flex justify-content-end">
                    <button
                      type="button"
                      className="btn btn-secondary me-2"
                      onClick={handleCloseModal}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Add Book
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
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Introduction to Algorithms</td>
            <td>Thomas H. Cormen</td>
            <td>MIT Press</td>
            <td>Computer Science</td>
            <td>1200</td>
            <td>10</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Digital Logic Design</td>
            <td>M. Morris Mano</td>
            <td>Pearson</td>
            <td>Electronics</td>
            <td>850</td>
            <td>5</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default BookPage;
