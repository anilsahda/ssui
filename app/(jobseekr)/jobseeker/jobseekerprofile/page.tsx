"use client";

import React, { useState } from "react";
import dynamic from "next/dynamic";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

// ✅ Dynamically import react-select (no SSR issues)
const Select = dynamic(() => import("react-select"), { ssr: false });

const ProfilePage: React.FC = () => {
  // 🔹 State for Education entries
  const [educationList, setEducationList] = useState([
    { qualification: "", course: "", year: "" },
  ]);

  // Add new education row
  const handleAddEducation = () => {
    setEducationList([...educationList, { qualification: "", course: "", year: "" }]);
  };

  // Delete education row
  const handleDeleteEducation = (index: number) => {
    const updated = [...educationList];
    updated.splice(index, 1);
    setEducationList(updated);
  };

  // Update field
  const handleEducationChange = (
    index: number,
    field: string,
    value: string
  ) => {
    const updated = [...educationList];
    (updated[index] as any)[field] = value;
    setEducationList(updated);
  };

  // Options for skills
  const technicalOptions = [
    { value: "react", label: "React" },
    { value: "node", label: "Node.js" },
    { value: "dotnet", label: ".NET" },
    { value: "sql", label: "SQL" },
    { value: "java", label: "Java" },
    { value: "python", label: "Python" },
  ];

  const softSkillOptions = [
    { value: "communication", label: "Communication" },
    { value: "teamwork", label: "Teamwork" },
    { value: "leadership", label: "Leadership" },
    { value: "problem-solving", label: "Problem Solving" },
    { value: "adaptability", label: "Adaptability" },
  ];

  const languageOptions = [
    { value: "english", label: "English (Fluent)" },
    { value: "hindi", label: "Hindi (Read/Write)" },
    { value: "spanish", label: "Spanish (Basic)" },
    { value: "french", label: "French (Intermediate)" },
  ];

  return (
    <Container className="mt-4 mb-5">
      <h2 className="mb-4">Job Seeker Profile</h2>

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
        </Row>
        <Row>
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

      {/* 🎓 Education */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4 className="d-flex justify-content-between align-items-center">
          🎓 Education
          <Button variant="success" size="sm" onClick={handleAddEducation}>
            ➕ Add Education
          </Button>
        </h4>

        {educationList.map((edu, index) => (
          <Row key={index} className="align-items-end mb-3">
            <Col md={4}>
              <Form.Group>
                <Form.Label>Qualification</Form.Label>
                <Form.Select
                  value={edu.qualification}
                  onChange={(e) =>
                    handleEducationChange(index, "qualification", e.target.value)
                  }
                >
                  <option value="">Select</option>
                  <option>10th</option>
                  <option>12th</option>
                  <option>Diploma</option>
                  <option>Graduation</option>
                  <option>Masters</option>
                  <option>PhD</option>
                </Form.Select>
              </Form.Group>
            </Col>

            <Col md={4}>
              <Form.Group>
                <Form.Label>Course / Stream</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter course/stream"
                  value={edu.course}
                  onChange={(e) =>
                    handleEducationChange(index, "course", e.target.value)
                  }
                />
              </Form.Group>
            </Col>

            <Col md={3}>
              <Form.Group>
                <Form.Label>Year of Passing</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="e.g. 2023"
                  value={edu.year}
                  onChange={(e) =>
                    handleEducationChange(index, "year", e.target.value)
                  }
                />
              </Form.Group>
            </Col>

            <Col md={1}>
              <Button
                variant="danger"
                size="sm"
                onClick={() => handleDeleteEducation(index)}
                disabled={educationList.length === 1}
              >
                ❌
              </Button>
            </Col>
          </Row>
        ))}
      </Card>

      {/* 💼 Work Experience */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>💼 Work Experience</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Company Name</Form.Label>
              <Form.Control type="text" placeholder="Enter company name" />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Job Title</Form.Label>
              <Form.Control type="text" placeholder="Enter job title" />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Responsibilities</Form.Label>
          <Form.Control
            as="textarea"
            rows={2}
            placeholder="Describe responsibilities"
          />
        </Form.Group>
      </Card>

      {/* 🛠 Skills */}
      <Card className="p-4 mb-4 shadow-sm">
        <h4>🛠 Skills</h4>
        <Row>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Technical Skills</Form.Label>
              <Select
                options={technicalOptions}
                isMulti
                placeholder="Select technical skills"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group className="mb-3">
              <Form.Label>Soft Skills</Form.Label>
              <Select
                options={softSkillOptions}
                isMulti
                placeholder="Select soft skills"
              />
            </Form.Group>
          </Col>
        </Row>
        <Form.Group className="mb-3">
          <Form.Label>Languages Known</Form.Label>
          <Select
            options={languageOptions}
            isMulti
            placeholder="Select languages"
          />
        </Form.Group>
      </Card>

      <Button variant="primary" size="lg" className="mt-3">
        Save Profile
      </Button>
    </Container>
  );
};

export default ProfilePage;
