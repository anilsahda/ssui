"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

function BranchPage() {
  const [branches, setBranches] = useState<any[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [editingBranch, setEditingBranch] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: "",
  });

  // 🔹 API base URL (adjust to your backend)
  const API_URL = "https://localhost:7293/api/Branches";

  // 🔹 Fetch all branches
  useEffect(() => {
    fetchBranches();
  }, []);

  const fetchBranches = async () => {
    try {
      const res = await axios.get(API_URL + "/GetBranches");
      setBranches(res.data);
    } catch (err) {
      console.error("Error fetching branches:", err);
    }
  };

  // 🔹 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 🔹 Open modal for new branch
  const handleOpenModal = () => {
    setEditingBranch(null);
    setFormData({ name: "" });
    setShowModal(true);
  };

  // 🔹 Open modal for editing branch
  const handleEdit = (branch: any) => {
    setEditingBranch(branch);
    setFormData({ name: branch.name });
    setShowModal(true);
  };

  // 🔹 Add / Update Branch
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingBranch) {
        // Update
        await axios.put(`${API_URL}/UpdateBranch`, {
          Id: editingBranch.id,
          ...formData,
        });
      } else {
        // Create
        await axios.post(API_URL + "/AddBranch", formData);
      }
      fetchBranches();
      setShowModal(false);
    } catch (err) {
      console.error("Error saving branch:", err);
    }
  };

  // 🔹 Delete Branch
  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this branch?")) return;
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchBranches();
    } catch (err) {
      console.error("Error deleting branch:", err);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Manage Branches</h2>

      {/* Button to open modal */}
      <div className="mb-3 text-end">
        <button className="btn btn-primary" onClick={handleOpenModal}>
          + Add Branch
        </button>
      </div>

      {/* Branch Form Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          tabIndex={-1}
          role="dialog"
          style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        >
          <div
            className="modal-dialog modal-dialog-centered"
            role="document"
          >
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">
                  {editingBranch ? "Edit Branch" : "Add Branch"}
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
                    <label className="form-label">Branch Name</label>
                    <input
                      type="text"
                      className="form-control"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
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
                      {editingBranch ? "Update Branch" : "Add Branch"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Branches Table */}
      <table className="table table-bordered table-striped mt-3">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Branch Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {branches.length > 0 ? (
            branches.map((branch: any) => (
              <tr key={branch.id}>
                <td>{branch.id}</td>
                <td>{branch.name}</td>
                <td>
                  <button
                    className="btn btn-warning me-1"
                    onClick={() => handleEdit(branch)}
                  >
                    Edit
                  </button>
                  <button
                    className="btn btn-danger me-1"
                    onClick={() => handleDelete(branch.id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-success"
                    onClick={() => alert(`Branch: ${branch.name}`)}
                  >
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={3} className="text-center">
                No Branches Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default BranchPage;
