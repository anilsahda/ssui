"use client";

import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const CompanyProfilePage: React.FC = () => {
  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4">🏢 Company Profile</h2>

      {/* 🏢 Basic Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>🏢 Basic Info</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter company name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Industry</Form.Label>
              <Form.Select>
                <option value="">Select Industry</option>
                <option>IT Services</option>
                <option>Software Development</option>
                <option>Healthcare</option>
                <option>Education</option>
                <option>Finance</option>
                <option>Manufacturing</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Size</Form.Label>
              <Form.Select>
                <option value="">Select Size</option>
                <option>1 - 10</option>
                <option>11 - 50</option>
                <option>51 - 200</option>
                <option>201 - 500</option>
                <option>500+</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Founded Year</Form.Label>
              <Form.Control type="number" placeholder="e.g. 2005" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* 📍 Contact Info */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>📍 Contact Info</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter official email" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Phone Number</Form.Label>
              <Form.Control type="text" placeholder="Enter contact number" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Company Address</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Enter company address"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Website</Form.Label>
          <Form.Control type="url" placeholder="https://example.com" />
        </Form.Group>
      </Card>

      {/* 💼 Job Openings */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>💼 Job Openings</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" placeholder="Enter job title" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Required Degree</Form.Label>
              <Form.Control type="text" placeholder="Enter degree" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Experience</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g. 2 Years, 5+ Years"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Salary</Form.Label>
              <Form.Control type="text" placeholder="Enter salary details" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Job Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Enter job description"
          />
        </Form.Group>
      </Card>

      {/* 🌟 About Company */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>🌟 About Company</h4>
        <Form.Group className="mb-3">
          <Form.Label>Mission & Vision</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Write about your company's mission & vision"
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Company Highlights</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            placeholder="Mention achievements, culture, and benefits"
          />
        </Form.Group>
      </Card>

      <Button variant="primary" size="lg" className="mt-3">
        Save Company Profile
      </Button>
    </Container>
  );
};

export default CompanyProfilePage;
