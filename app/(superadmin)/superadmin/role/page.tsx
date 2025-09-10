"use client";
import API from "@/api";
import React, { useState, useEffect } from "react";
import { Modal, Button, Form, Table, Container, Row, Col } from "react-bootstrap";
import Swal from "sweetalert2";

export default function ManageRolePage() {
  const [showModal, setShowModal] = useState(false);
  const [roles, setRoles] = useState([]);
  const [roleName, setRoleName] = useState("");
  const [editRoleId, setEditRoleId] = useState<string | null>(null);
  const [viewRole, setViewRole] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  // Fetch roles from API
  const fetchRoles = async () => {
    try {
      const res = await API.get("/roles");
      setRoles(res.data);
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed to fetch roles", "error");
    }
  };

  useEffect(() => {
    fetchRoles();
  }, []);

  // Add or Update Role
  const handleSave = async () => {
    if (!roleName.trim()) return;
    setLoading(true);
    try {
      if (editRoleId) {
        await API.put(`/roles/${editRoleId}`, { name: roleName });
        Swal.fire("Updated!", "Role updated successfully", "success");
      } else {
        await API.post("/roles", { name: roleName });
        Swal.fire("Added!", "Role added successfully", "success");
      }
      setRoleName("");
      setEditRoleId(null);
      setShowModal(false);
      fetchRoles();
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  // Edit Role
  const handleEdit = (role: any) => {
    setRoleName(role.name);
    setEditRoleId(role._id);
    setShowModal(true);
  };

  // View Role
  const handleView = (role: any) => {
    setViewRole(role);
  };

  const handleCloseView = () => setViewRole(null);

  // Delete Role
  const handleDelete = async (id: string) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
    });
    if (confirm.isConfirmed) {
      try {
        await API.delete(`/roles/${id}`);
        Swal.fire("Deleted!", "Role has been deleted.", "success");
        fetchRoles();
      } catch (err: any) {
        Swal.fire("Error", err.response?.data?.error || "Failed", "error");
      }
    }
  };

  return (
    <Container className="mt-4">
      <Row className="mb-3">
        <Col xs={12} sm={6}>
          <h2>Manage Role</h2>
        </Col>
        <Col xs={12} sm={6} className="text-sm-end mt-2 mt-sm-0">
          <Button variant="primary" onClick={() => setShowModal(true)}>
            Add Role
          </Button>
        </Col>
      </Row>

      <div className="table-responsive">
        <Table bordered striped hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th style={{ width: "10%" }}>Sr No</th>
              <th>Role Name</th>
              <th style={{ width: "30%" }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {roles.map((role: any, idx: number) => (
              <tr key={role._id}>
                <td>{idx + 1}</td>
                <td>{role.name}</td>
                <td className="d-flex flex-wrap gap-2">
                  <Button variant="warning" size="sm" onClick={() => handleEdit(role)}>
                    Edit
                  </Button>
                  <Button variant="danger" size="sm" onClick={() => handleDelete(role._id)}>
                    Delete
                  </Button>
                  <Button variant="success" size="sm" onClick={() => handleView(role)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add/Edit Modal */}
      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
          setEditRoleId(null);
          setRoleName("");
        }}
        centered
        size="sm"
      >
        <Modal.Header closeButton>
          <Modal.Title>{editRoleId ? "Edit Role" : "Add New Role"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Role Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter role name"
                value={roleName}
                onChange={(e) => setRoleName(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer className="d-flex justify-content-between">
          <Button
            variant="secondary"
            onClick={() => {
              setShowModal(false);
              setEditRoleId(null);
              setRoleName("");
            }}
          >
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? "Saving..." : "Save Role"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View Modal */}
      <Modal show={!!viewRole} onHide={handleCloseView} centered size="sm">
        <Modal.Header closeButton>
          <Modal.Title>View Role</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewRole && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Role Name</Form.Label>
                <Form.Control type="text" value={viewRole.name} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Role ID</Form.Label>
                <Form.Control type="text" value={viewRole._id} readOnly />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseView}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}
