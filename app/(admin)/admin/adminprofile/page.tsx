"use client";

import React from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const HospitalAdminProfilePage: React.FC = () => {
  return (
    <Container className="mt-4">
      <h2 className="mb-4 text-center">🏥 Hospital Admin Profile</h2>

      {/* Personal Info */}
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
        <Row>
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

      {/* Hospital Details */}
      <Card className="p-4 mb-4">
        <h4>🏥 Hospital Details</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Hospital Name</Form.Label>
              <Form.Control type="text" placeholder="Enter hospital name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Registration Number</Form.Label>
              <Form.Control type="text" placeholder="Enter registration number" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Hospital Type</Form.Label>
              <Form.Select>
                <option>Government</option>
                <option>Private</option>
                <option>Trust</option>
                <option>Teaching</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Founded Year</Form.Label>
              <Form.Control type="number" placeholder="e.g. 1995" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* Location & Contact */}
      <Card className="p-4 mb-4">
        <h4>🌍 Location & Contact</h4>
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Hospital Address</Form.Label>
              <Form.Control as="textarea" rows={2} placeholder="Enter address" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>City</Form.Label>
              <Form.Control type="text" placeholder="Enter city" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>State</Form.Label>
              <Form.Control type="text" placeholder="Enter state" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Zip Code</Form.Label>
              <Form.Control type="text" placeholder="Enter zip code" />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Country</Form.Label>
              <Form.Control type="text" placeholder="Enter country" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Contact Number</Form.Label>
              <Form.Control type="text" placeholder="Enter hospital contact number" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* Admin Role Details */}
      <Card className="p-4 mb-4">
        <h4>🛠️ Admin Role Details</h4>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group>
              <Form.Label>Position / Role</Form.Label>
              <Form.Control type="text" placeholder="e.g. Chief Admin" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Label>Years in Administration</Form.Label>
              <Form.Control type="number" placeholder="e.g. 10" />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col md={12}>
            <Form.Group>
              <Form.Label>Responsibilities</Form.Label>
              <Form.Control as="textarea" rows={3} placeholder="List responsibilities" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* Hospital Capacity */}
      <Card className="p-4 mb-4">
        <h4>🏨 Hospital Capacity</h4>
        <Row className="mb-3">
          <Col md={4}>
            <Form.Group>
              <Form.Label>Total Beds</Form.Label>
              <Form.Control type="number" placeholder="Enter number of beds" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>ICU Beds</Form.Label>
              <Form.Control type="number" placeholder="Enter number of ICU beds" />
            </Form.Group>
          </Col>
          <Col md={4}>
            <Form.Group>
              <Form.Label>Operation Theatres</Form.Label>
              <Form.Control type="number" placeholder="Enter number of OTs" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* Facilities */}
      <Card className="p-4 mb-4">
        <h4>🏗️ Hospital Facilities</h4>
        <Row>
          <Col md={6}>
            <Form.Group>
              <Form.Check type="checkbox" label="Emergency Services" />
              <Form.Check type="checkbox" label="Ambulance Service" />
              <Form.Check type="checkbox" label="Blood Bank" />
              <Form.Check type="checkbox" label="Pharmacy" />
              <Form.Check type="checkbox" label="Diagnostic Labs" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group>
              <Form.Check type="checkbox" label="Cafeteria" />
              <Form.Check type="checkbox" label="Parking Facility" />
              <Form.Check type="checkbox" label="Insurance Tie-ups" />
              <Form.Check type="checkbox" label="24/7 OPD" />
              <Form.Check type="checkbox" label="Special Wards" />
            </Form.Group>
          </Col>
        </Row>
      </Card>

      {/* Save */}
      <div className="text-center mb-5">
        <Button variant="primary" type="submit">
          Save Profile
        </Button>
      </div>
    </Container>
  );
};

export default HospitalAdminProfilePage;
