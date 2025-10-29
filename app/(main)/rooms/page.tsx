"use client";

import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import AOS from "aos";
import "aos/dist/aos.css";
import { FaBed, FaEdit, FaTrash, FaPlus, FaEye } from "react-icons/fa";

export default function ManageRooms() {
  const [rooms, setRooms] = useState([
    {
      id: 1,
      name: "Deluxe Room",
      type: "Luxury",
      status: "Available",
      price: 2500,
    },
    {
      id: 2,
      name: "Standard Room",
      type: "Economy",
      status: "Booked",
      price: 1500,
    },
    {
      id: 3,
      name: "Executive Suite",
      type: "Premium",
      status: "Available",
      price: 4000,
    },
  ]);

  const [newRoom, setNewRoom] = useState({
    name: "",
    type: "",
    price: "",
    status: "Available",
  });

  useEffect(() => {
    AOS.init({ duration: 800, easing: "ease-in-out", once: true });
  }, []);

  const handleAddRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newRoom.name || !newRoom.type || !newRoom.price)
      return alert("Please fill all fields!");
    setRooms([...rooms, { id: rooms.length + 1, ...newRoom }]);
    setNewRoom({ name: "", type: "", price: "", status: "Available" });
    (
      document.getElementById("addRoomModalClose") as HTMLButtonElement
    )?.click();
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this room?")) {
      setRooms(rooms.filter((r) => r.id !== id));
    }
  };

  return (
    <div
      className="py-5"
      style={{
        minHeight: "100vh",
        background: "linear-gradient(135deg, #e0f2fe, #e2e8f0)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      <div className="container">
        {/* Header */}
        <div
          className="d-flex justify-content-between align-items-center mb-5"
          data-aos="fade-down"
        >
          <h2 className="fw-bold text-primary mb-0">🏨 Manage Rooms</h2>
          <button
            className="btn btn-primary d-flex align-items-center gap-2 shadow-sm"
            data-bs-toggle="modal"
            data-bs-target="#addRoomModal"
          >
            <FaPlus /> Add Room
          </button>
        </div>

        {/* Room Cards */}
        <div className="row g-4">
          {rooms.map((room, i) => (
            <div
              key={room.id}
              className="col-md-4"
              data-aos="zoom-in"
              data-aos-delay={i * 100}
            >
              <div
                className="card border-0 shadow-lg rounded-4 overflow-hidden h-100"
                style={{
                  background: "linear-gradient(145deg, #ffffff, #f1f5f9)",
                  transition: "0.3s",
                }}
              >
                <div className="card-body p-4">
                  <div className="d-flex align-items-center mb-3">
                    <div className="bg-primary bg-opacity-10 rounded-circle p-3 me-3">
                      <FaBed size={24} className="text-primary" />
                    </div>
                    <div>
                      <h5 className="fw-bold mb-1">{room.name}</h5>
                      <span
                        className={`badge ${
                          room.status === "Available"
                            ? "bg-success"
                            : "bg-danger"
                        }`}
                      >
                        {room.status}
                      </span>
                    </div>
                  </div>
                  <p className="text-muted mb-1">
                    <strong>Type:</strong> {room.type}
                  </p>
                  <p className="text-muted mb-3">
                    <strong>Price:</strong> ₹{room.price}/night
                  </p>

                  <div className="d-flex justify-content-between">
                    <button className="btn btn-outline-primary btn-sm d-flex align-items-center gap-1">
                      <FaEye /> View
                    </button>
                    <button className="btn btn-outline-success btn-sm d-flex align-items-center gap-1">
                      <FaEdit /> Edit
                    </button>
                    <button
                      className="btn btn-outline-danger btn-sm d-flex align-items-center gap-1"
                      onClick={() => handleDelete(room.id)}
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Room Modal */}
        <div
          className="modal fade"
          id="addRoomModal"
          tabIndex={-1}
          aria-labelledby="addRoomModalLabel"
          aria-hidden="true"
        >
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content rounded-4 border-0 shadow-lg">
              <div className="modal-header bg-primary text-white rounded-top-4">
                <h5 className="modal-title" id="addRoomModalLabel">
                  Add New Room
                </h5>
                <button
                  type="button"
                  className="btn-close btn-close-white"
                  data-bs-dismiss="modal"
                  aria-label="Close"
                  id="addRoomModalClose"
                ></button>
              </div>
              <form onSubmit={handleAddRoom}>
                <div className="modal-body p-4">
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Room Name</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter room name"
                      value={newRoom.name}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, name: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Room Type</label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter room type (e.g., Deluxe)"
                      value={newRoom.type}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, type: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Price (₹)</label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Enter price per night"
                      value={newRoom.price}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, price: e.target.value })
                      }
                      required
                    />
                  </div>
                  <div className="mb-3">
                    <label className="form-label fw-semibold">Status</label>
                    <select
                      className="form-select"
                      value={newRoom.status}
                      onChange={(e) =>
                        setNewRoom({ ...newRoom, status: e.target.value })
                      }
                    >
                      <option>Available</option>
                      <option>Booked</option>
                    </select>
                  </div>
                </div>
                <div className="modal-footer border-0">
                  <button
                    type="button"
                    className="btn btn-secondary"
                    data-bs-dismiss="modal"
                  >
                    Cancel
                  </button>
                  <button type="submit" className="btn btn-primary">
                    Add Room
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Footer */}
        <footer
          className="text-center mt-5 text-muted small"
          data-aos="fade-up"
        >
          © {new Date().getFullYear()} Room Management System | Built with ❤️
          using Next.js & Bootstrap
        </footer>
      </div>
    </div>
  );
}
