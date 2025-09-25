"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function StudentPage() {
  const [students, setStudents] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [branches, setBranches] = useState<any[]>([]);
  const [editingStudent, setEditingStudent] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
    branchId: 0,
    mobile: "",
    email: "",
    dob: "",
    address: "",
  });

  // 🔹 API base URL (change as per your backend)
  const API_URL = "https://localhost:7293/api/Students";
  const BRANCH_API_URL = "https://localhost:7293/api/Branches";

  // 🔹 Fetch students on load
  useEffect(() => {
    fetchStudents();
    fetchBranches();
  }, []);

  const fetchStudents = async () => {
    try {
      const res = await axios.get(API_URL + "/GetStudent");
      setStudents(res.data);
    } catch (err) {
      console.error("Error fetching students:", err);
    }
  };
  const fetchBranches = async () => {
    try {
      const res = await axios.get(BRANCH_API_URL + "/GetBranches");
      setBranches(res.data);
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  // 🔹 Handle input changes
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Open modal for new student
  const handleOpenModal = () => {
    setEditingStudent(null);
    setFormData({
      name: "",
      branchId: 0,
      mobile: "",
      email: "",
      dob: "",
      address: "",
    });
    setShowModal(true);
  };

  // 🔹 Open modal for editing student
  const handleEdit = (student: any) => {
    setEditingStudent(student);
    setFormData({
      name: student.name,
      branchId: student.branchId,
      mobile: student.mobile,
      email: student.email,
      dob: student.dob,
      address: student.address,
    });
    setShowModal(true);
  };

  // 🔹 Add / Update Student
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingStudent) {
        // Update
        await axios.put(`${API_URL}/UpdateStudent`, {
          Id: editingStudent.id,
          ...formData,
        });
      } else {
        // Create
        await axios.post(API_URL + "/AddStudent", formData);
      }
      fetchStudents();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving student:", err);
    }
  };

  // 🔹 Delete Student
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this student?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchStudents();
    } catch (err) {
      console.error("Error deleting student:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Student Registration</h2>

      {/* Button to open modal */}
      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={handleOpenModal}>
          + Add Student
        </button>
      </div>

      {/* Student Form Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div className="modal-dialog modal-dialog-centered modal-lg">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingStudent ? "Edit Student" : "Add Student"}
                </h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Student Name</label>
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
                    <label className="form-label">Branch</label>
                    <select
                      className="form-select"
                      name="branchId"
                      value={formData.branchId}
                      onChange={handleChange}
                      required
                    >
                      <option value={0}>Select Branch</option>
                      {branches.map((c) => (
                        <option key={c.id} value={c.id}>
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                    <div className="col-md-6 mb-3">
                      <label className="form-label">Mobile</label>
                      <input
                        type="text"
                        className="form-control"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Email</label>
                      <input
                        type="email"
                        className="form-control"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-6 mb-3">
                      <label className="form-label">Date of Birth</label>
                      <input
                        type="date"
                        className="form-control"
                        name="dob"
                        value={formData.dob}
                        onChange={handleChange}
                        required
                      />
                    </div>
                    <div className="col-md-12 mb-3">
                      <label className="form-label">Address</label>
                      <textarea
                        className="form-control"
                        name="address"
                        rows={2}
                        value={formData.address}
                        onChange={handleChange}
                        required
                      ></textarea>
                    </div>
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
                      {editingStudent ? "Update Student" : "Add Student"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Students Table */}
      <table className="table table-bordered table-striped mt-4">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Branch</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Date of Birth</th>
            <th>Address</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.length > 0 ? (
            students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>{student.name}</td>
                  <td>
                  {
                    branches.find((b) => b.id === student.branchId)?.name ||
                    student.branchId
                  }
                </td>
                <td>{student.mobile}</td>
                <td>{student.email}</td>
                <td>{student.dob}</td>
                <td>{student.address}</td>
                <td>
                  <button
                    className="btn btn-warning btn-sm me-1"
                    onClick={() => handleEdit(student)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger btn-sm me-1"
                    onClick={() => handleDelete(student.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => alert(`Student: ${student.name}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={8} className="text-center">
                No Students Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default StudentPage;
