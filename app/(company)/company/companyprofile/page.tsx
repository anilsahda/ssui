"use client";

import React, { useEffect, useState, ChangeEvent } from "react";
import axios from "axios";
import {
  Table,
  Button,
  Form,
  Card,
  Row,
  Col,
  InputGroup,
} from "react-bootstrap";
import {
  FaEdit,
  FaTrash,
  FaBuilding,
  FaGlobe,
  FaPhone,
  FaEnvelope,
} from "react-icons/fa";

interface CompanyProfile {
  id: number;
  companyName: string;
  industry: string;
  location: string;
  website: string;
  description: string;
}

const API_BASE_URL = "https://localhost:7269/api/Company";

export default function CompanyPage() {
  const [companies, setCompanies] = useState<CompanyProfile[]>([]);
  const [formData, setFormData] = useState<CompanyProfile>({
    id: 0,
    companyName: "",
    industry: "",
    location: "",
    website: "",
    description: "",
  });
  const [editing, setEditing] = useState<boolean>(false);
  const [search, setSearch] = useState("");

  useEffect(() => {
    fetchCompanies();
  }, []);

  const fetchCompanies = async () => {
    try {
      const response = await axios.get(API_BASE_URL);
      const data = Array.isArray(response.data) ? response.data : [];
      setCompanies(data);
    } catch (error) {
      console.error("Error fetching companies:", error);
      setCompanies([]);
    }
  };

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

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

  const handleEdit = (company: CompanyProfile) => {
    setFormData(company);
    setEditing(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const resetForm = () => {
    setFormData({
      id: 0,
      companyName: "",
      industry: "",
      location: "",
      website: "",
      description: "",
    });
    setEditing(false);
  };

  const filteredCompanies = Array.isArray(companies)
    ? companies.filter(
        (c) =>
          c.companyName.toLowerCase().includes(search.toLowerCase()) ||
          c.industry.toLowerCase().includes(search.toLowerCase()) ||
          c.location.toLowerCase().includes(search.toLowerCase())
      )
    : [];

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4 text-primary">
        {editing ? "Edit Company" : "Add New Company"}
      </h2>

      {/* Form Card */}
      <Card className="mb-5 shadow-sm">
        <Card.Body>
          <Form onSubmit={handleSubmit}>
            <Row className="g-3">
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Company Name</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaBuilding />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Enter company name"
                      required
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Industry</Form.Label>
                  <Form.Control
                    type="text"
                    name="industry"
                    value={formData.industry}
                    onChange={handleChange}
                    placeholder="Enter industry"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Location</Form.Label>
                  <Form.Control
                    type="text"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    placeholder="Enter location"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group>
                  <Form.Label>Website</Form.Label>
                  <InputGroup>
                    <InputGroup.Text>
                      <FaGlobe />
                    </InputGroup.Text>
                    <Form.Control
                      type="text"
                      name="website"
                      value={formData.website}
                      onChange={handleChange}
                      placeholder="https://example.com"
                    />
                  </InputGroup>
                </Form.Group>
              </Col>
              <Col md={12}>
                <Form.Group>
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
              </Col>
            </Row>
            <div className="mt-3 d-flex gap-2">
              <Button type="submit" variant={editing ? "warning" : "primary"}>
                {editing ? "Update" : "Submit"}
              </Button>
              {editing && (
                <Button variant="secondary" onClick={resetForm}>
                  Cancel
                </Button>
              )}
            </div>
          </Form>
        </Card.Body>
      </Card>

      {/* Search */}
      <Form.Group className="mb-3">
        <Form.Control
          type="text"
          placeholder="Search by name, industry, or location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </Form.Group>

      {/* Companies Table */}
      <Card className="shadow-sm">
        <Card.Body>
          <Table striped bordered hover responsive>
            <thead className="table-primary">
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Industry</th>
                <th>Location</th>
                <th>Website</th>
                <th>Description</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredCompanies.length > 0 ? (
                filteredCompanies.map((c) => (
                  <tr key={c.id}>
                    <td>{c.id}</td>
                    <td>{c.companyName}</td>
                    <td>{c.industry}</td>
                    <td>{c.location}</td>
                    <td>{c.website}</td>
                    <td>{c.description}</td>
                    <td>
                      <Button
                        size="sm"
                        variant="info"
                        className="me-2"
                        onClick={() => handleEdit(c)}
                      >
                        <FaEdit /> Edit
                      </Button>
                      <Button
                        size="sm"
                        variant="danger"
                        onClick={() => handleDelete(c.id)}
                      >
                        <FaTrash /> Delete
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={7} className="text-center text-muted">
                    No companies found.
                  </td>
                </tr>
              )}
            </tbody>
          </Table>
        </Card.Body>
      </Card>
    </div>
  );
}
