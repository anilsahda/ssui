"use client";

import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const DoctorProfilePage: React.FC = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">Doctor Profile</h2>

      <Card className="p-4 mb-4">
        <h4>👤 Personal Information</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Full Name</Form.Label>
              <Form.Control type="text" placeholder="Enter full name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Email</Form.Label>
              <Form.Control type="email" placeholder="Enter email" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Mobile Number</Form.Label>
              <Form.Control type="text" placeholder="Enter mobile number" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Date of Birth</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      <Card className="p-4 mb-4">
        <h4>🎓 Education</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Medical Degree</Form.Label>
              <Form.Control type="text" placeholder="e.g. MBBS, MD" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>University</Form.Label>
              <Form.Control type="text" placeholder="Enter university name" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Year of Graduation</Form.Label>
              <Form.Control type="number" placeholder="e.g. 2018" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Additional Certifications</Form.Label>
              <Form.Control type="text" placeholder="e.g. Cardiology, Surgery" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      <Card className="p-4 mb-4">
        <h4>💼 Professional Details</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Specialization</Form.Label>
              <Form.Control type="text" placeholder="e.g. Cardiologist, Neurologist" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Years of Experience</Form.Label>
              <Form.Control type="number" placeholder="Enter years" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Hospital/Clinic Name</Form.Label>
              <Form.Control type="text" placeholder="Enter workplace name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Registration Number</Form.Label>
              <Form.Control type="text" placeholder="Enter medical registration no." />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      <Card className="p-4 mb-4">
        <h4>🌍 Contact & Location</h4>
        <Row className="mb-3">
          <Col md={12}>
            <Form.Group>
              <Form.Label>Address</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Enter address" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter state" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Enter country" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Enter zip code" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      <div className="text-center">
        <Button variant="primary" type="submit">
          Save Profile
        </Button>
      </div>
    </Container>
  );
};

export default DoctorProfilePage;
