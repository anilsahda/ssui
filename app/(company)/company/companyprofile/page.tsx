"use client"; // (for App Router apps only)

import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import { Table, Button, Form } from "react-bootstrap";

// ✅ Define TypeScript Interface for CompanyProfile
interface CompanyProfile {
  id: number;
  name: string;
  address: string;
  email: string;
  phone: string;
  website: string;
  description: string;
}

// ✅ Base API URL (Update this for your backend)
const API_BASE_URL = "https://localhost:7129/api/Company";

export default function CompanyPage() {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [formData, setFormData] = useState<CompanyProfile>({
    id: 0,
    name: "",
    address: "",
    email: "",
    phone: "",
    website: "",
    description: "",
  });
  const [editing, setEditing] = useState<boolean>(false);

  // ✅ Fetch all companies
  const fetchCompanies = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      setCompanies(response.data);
    } catch (error) {
      console.error("Error fetching companies:", error);
    }
  };

  useEffect(() => {
    fetchCompanies();
  }, []);

  // ✅ Handle form input change
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // ✅ Submit (Create / Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editing) {
        await axios.put(`${API_BASE_URL}/${formData.id}`, formData);
        alert("Company updated successfully!");
      } else {
        await axios.post(API_BASE_URL, formData);
        alert("Company created successfully!");
      }
      fetchCompanies();
      resetForm();
    } catch (error) {
      console.error("Error submitting company:", error);
    }
  };

  // ✅ Delete company
  const handleDelete = async (id: number) => {
    if (!confirm("Are you sure you want to delete this company?")) return;
    try {
      await axios.delete(`${API_BASE_URL}/${id}`);
      alert("Deleted successfully!");
      fetchCompanies();
    } catch (error) {
      console.error("Error deleting company:", error);
    }
  };

  // ✅ Edit company
  const handleEdit = (company: CompanyProfile) => {
    setFormData(company);
    setEditing(true);
  };

  // ✅ Reset form
  const resetForm = () => {
    setFormData({
      id: 0,
      name: "",
      address: "",
      email: "",
      phone: "",
      website: "",
      description: "",
    });
    setEditing(false);
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center mb-4">
        {editing ? "Edit Company" : "Add New Company"}
      </h2>

      {/* ✅ Company Form */}
      <Form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <Form.Group controlId="name">
              <Form.Label>Company Name</Form.Label>
              <Form.Control
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter company name"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="email">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter company email"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="phone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-6">
            <Form.Group controlId="website">
              <Form.Label>Website</Form.Label>
              <Form.Control
                type="text"
                name="website"
                value={formData.website}
                onChange={handleChange}
                placeholder="https://example.com"
              />
            </Form.Group>
          </div>

          <div className="col-md-12">
            <Form.Group controlId="address">
              <Form.Label>Address</Form.Label>
              <Form.Control
                type="text"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter company address"
                required
              />
            </Form.Group>
          </div>

          <div className="col-md-12">
            <Form.Group controlId="description">
              <Form.Label>Description</Form.Label>
              <Form.Control
                as="textarea"
                rows={3}
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder="Enter description"
              />
            </Form.Group>
          </div>
        </div>

        <div className="mt-3">
          <Button type="submit" variant={editing ? "warning" : "primary"}>
            {editing ? "Update" : "Submit"}
          </Button>
          {editing && (
            <Button variant="secondary" className="ms-2" onClick={resetForm}>
              Cancel
            </Button>
          )}
        </div>
      </Form>

      <hr className="my-4" />

      {/* ✅ Company Table */}
      <h3 className="text-center mb-3">Companies List</h3>
      <Table striped bordered hover responsive>
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Website</th>
            <th>Address</th>
            <th>Description</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {companies.map((c) => (
            <tr key={c.id}>
              <td>{c.id}</td>
              <td>{c.name}</td>
              <td>{c.email}</td>
              <td>{c.phone}</td>
              <td>{c.website}</td>
              <td>{c.address}</td>
              <td>{c.description}</td>
              <td>
                <Button
                  size="sm"
                  variant="info"
                  onClick={() => handleEdit(c)}
                  className="me-2"
                >
                  Edit
                </Button>
                <Button
                  size="sm"
                  variant="danger"
                  onClick={() => handleDelete(c.id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
