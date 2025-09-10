"use client";

import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const LibraryAdminProfilePage: React.FC = () => {
  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4">📚 Library Admin Profile</h2>

      {/* 👤 Personal Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>👤 Personal Info</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={3}>
            <Form.Group className="mb-3">
              <Form.Label>Gender</Form.Label>
              <Form.Select>
                <option value="">Select</option>
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Enter mobile number" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 🔐 Account Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>🔐 Account Info</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control type="text" placeholder="Enter username" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control type="password" placeholder="Enter password" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Role</Form.Label>
          <Form.Select>
            <option>Library Admin</option>
            <option>Super Admin</option>
          </Form.Select>
        </Form.Group>
      </Card>

      {/* 📖 Library Access Control */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>📖 Library Access Control</h4>
        <Form.Group className="mb-3">
          <Form.Check type="checkbox" label="Manage Books" />
          <Form.Check type="checkbox" label="Manage Members" />
          <Form.Check type="checkbox" label="Manage Borrowing & Returns" />
          <Form.Check type="checkbox" label="Manage Library Staff" />
          <Form.Check type="checkbox" label="View Reports & Analytics" />
        </Form.Group>
      </Card>

      {/* 📍 Contact Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>📍 Contact Info</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Library Address</Form.Label>
              <Form.Control
                as="textarea"
                rows={2}
                placeholder="Enter library address"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Alternate Contact</Form.Label>
              <Form.Control type="text" placeholder="Enter alternate phone/email" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 🌟 Notes */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>📝 Notes</h4>
        <Form.Group className="mb-3">
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write any internal notes about this library admin account"
          />
        </Form.Group>
      </Card>

      <Button variant="primary" size="lg" className="mt-3">
        Save Library Admin Profile
      </Button>
    </Container>
  );
};

export default LibraryAdminProfilePage;
