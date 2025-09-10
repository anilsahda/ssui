"use client";

import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const LibraryStudentProfile: React.FC = () => {
  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4 text-center">📚 Library Student Profile</h2>

      {/* 👤 Personal Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>👤 Personal Information</h4>
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
          <Col md={8}>
            <Form.Group className="mb-3">
              <Form.Label>Address</Form.Label>
              <Form.Control type="text" placeholder="Enter address" />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="City" />
            </Form.Group>
          </Col>
          <Col md={2}>
            <Form.Group className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control type="text" placeholder="Pincode" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 🎓 Academic Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>🎓 Academic Information</h4>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Enrollment / Roll No</Form.Label>
              <Form.Control type="text" placeholder="Enter Roll No" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Course / Program</Form.Label>
              <Form.Control type="text" placeholder="e.g. B.Sc Computer Science" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Year / Semester</Form.Label>
              <Form.Control type="text" placeholder="e.g. 3rd Year" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Department</Form.Label>
              <Form.Control type="text" placeholder="e.g. Computer Science" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>College / University</Form.Label>
              <Form.Control type="text" placeholder="Enter College/University" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 📖 Library Details */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>📖 Library Details</h4>
        <Row>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Library Card No</Form.Label>
              <Form.Control type="text" placeholder="Enter Library Card No" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Date of Issue</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group className="mb-3">
              <Form.Label>Expiry Date</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Books Currently Issued</Form.Label>
              <Form.Control type="number" placeholder="e.g. 2" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Pending Fines</Form.Label>
              <Form.Control type="text" placeholder="e.g. ₹200" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 👨‍👩‍👦 Guardian Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>👨‍👩‍👦 Guardian Information</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Guardian Name</Form.Label>
              <Form.Control type="text" placeholder="Enter guardian name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Guardian Contact</Form.Label>
              <Form.Control type="text" placeholder="Enter contact number" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 🔐 Account Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>🔐 Account Information</h4>
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
      </Card>

      <div className="text-center">
        <Button variant="primary" size="lg">
          Save Student Profile
        </Button>
      </div>
    </Container>
  );
};

export default LibraryStudentProfile;
