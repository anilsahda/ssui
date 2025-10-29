"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaSearch, FaEdit, FaTrashAlt, FaEye } from "react-icons/fa";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";

export default function ManageBookings() {
  const [search, setSearch] = useState("");
  const [selectedBooking, setSelectedBooking] = useState<any>(null);
  const [bookings, setBookings] = useState([
    {
      id: 1,
      name: "John Doe",
      room: "Deluxe Suite",
      date: "2025-10-25",
      status: "Confirmed",
    },
    {
      id: 2,
      name: "Jane Smith",
      room: "Luxury Room",
      date: "2025-10-28",
      status: "Pending",
    },
    {
      id: 3,
      name: "Michael Lee",
      room: "Executive Suite",
      date: "2025-11-02",
      status: "Cancelled",
    },
  ]);

  useEffect(() => {
    AOS.init({ duration: 800, once: true });
  }, []);

  const filteredBookings = bookings.filter((b) =>
    b.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleView = (booking: any) => {
    setSelectedBooking(booking);
    const modal = new (window as any).bootstrap.Modal(
      document.getElementById("viewBookingModal")
    );
    modal.show();
  };

  const handleDelete = (id: number) => {
    Swal.fire({
      title: "Are you sure?",
      text: "This booking will be permanently deleted!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setBookings(bookings.filter((b) => b.id !== id));
        Swal.fire("Deleted!", "The booking has been deleted.", "success");
      }
    });
  };

  return (
    <div className="container py-5">
      {/* Header */}
      <div
        className="d-flex justify-content-between align-items-center mb-4"
        data-aos="fade-down"
      >
        <h2 className="fw-bold text-primary">
          <i className="bi bi-calendar-check me-2"></i> Manage Bookings
        </h2>
        <div className="input-group w-50 shadow-sm">
          <span className="input-group-text bg-primary text-white">
            <FaSearch />
          </span>
          <input
            type="text"
            className="form-control"
            placeholder="Search by guest name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Table */}
      <div className="card border-0 shadow-lg rounded-4" data-aos="fade-up">
        <div className="card-body">
          <div className="table-responsive">
            <table className="table align-middle table-hover">
              <thead className="table-primary text-center">
                <tr>
                  <th>#</th>
                  <th>Guest Name</th>
                  <th>Room Type</th>
                  <th>Booking Date</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody className="text-center">
                {filteredBookings.length > 0 ? (
                  filteredBookings.map((b, index) => (
                    <tr key={b.id} data-aos="zoom-in">
                      <td>{index + 1}</td>
                      <td className="fw-semibold">{b.name}</td>
                      <td>{b.room}</td>
                      <td>{b.date}</td>
                      <td>
                        <span
                          className={`badge px-3 py-2 ${
                            b.status === "Confirmed"
                              ? "bg-success"
                              : b.status === "Pending"
                              ? "bg-warning text-dark"
                              : "bg-danger"
                          }`}
                        >
                          {b.status}
                        </span>
                      </td>
                      <td>
                        <div className="d-flex justify-content-center gap-3">
                          <button
                            className="btn btn-sm btn-outline-primary rounded-circle"
                            onClick={() => handleView(b)}
                            title="View Details"
                          >
                            <FaEye />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-success rounded-circle"
                            title="Edit Booking"
                          >
                            <FaEdit />
                          </button>
                          <button
                            className="btn btn-sm btn-outline-danger rounded-circle"
                            onClick={() => handleDelete(b.id)}
                            title="Delete Booking"
                          >
                            <FaTrashAlt />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={6} className="text-muted py-4">
                      No bookings found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add Booking Button */}
      <div className="text-end mt-4" data-aos="fade-left">
        <button className="btn btn-lg btn-primary shadow-sm px-4 rounded-pill">
          + Add New Booking
        </button>
      </div>

      {/* View Booking Modal */}
      <div
        className="modal fade"
        id="viewBookingModal"
        tabIndex={-1}
        aria-labelledby="viewBookingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content border-0 shadow-lg rounded-4">
            <div className="modal-header bg-primary text-white rounded-top-4">
              <h5 className="modal-title" id="viewBookingModalLabel">
                Booking Details
              </h5>
              <button
                type="button"
                className="btn-close btn-close-white"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body" data-aos="fade-up">
              {selectedBooking ? (
                <div>
                  <p>
                    <strong>Guest Name:</strong> {selectedBooking.name}
                  </p>
                  <p>
                    <strong>Room Type:</strong> {selectedBooking.room}
                  </p>
                  <p>
                    <strong>Booking Date:</strong> {selectedBooking.date}
                  </p>
                  <p>
                    <strong>Status:</strong>{" "}
                    <span
                      className={`badge ${
                        selectedBooking.status === "Confirmed"
                          ? "bg-success"
                          : selectedBooking.status === "Pending"
                          ? "bg-warning text-dark"
                          : "bg-danger"
                      }`}
                    >
                      {selectedBooking.status}
                    </span>
                  </p>
                </div>
              ) : (
                <p>No booking selected.</p>
              )}
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary rounded-pill px-3"
                data-bs-dismiss="modal"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
