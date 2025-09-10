"use client";
import API from "@/api";
import React, { useState, useEffect } from "react";
import { Container, Table, Button, Modal, Form } from "react-bootstrap";
import Swal from "sweetalert2";

export default function AssignRolePage() {
  const [users, setUsers] = useState<any[]>([]);
  const [roles, setRoles] = useState<any[]>([]);
  const [assignments, setAssignments] = useState<any[]>([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch users, roles, and assignments
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed to fetch users", "error");
    }
  };

  const fetchRoles = async () => {
    try {
      const res = await API.get("/roles"); // your role API
      setRoles(res.data);
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed to fetch roles", "error");
    }
  };

  const fetchAssignments = async () => {
    try {
      const res = await API.get("/assignroles");
      setAssignments(res.data);
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed to fetch assignments", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
    fetchRoles();
    fetchAssignments();
  }, []);

  const handleSave = async () => {
    if (!selectedUser || !selectedRole) {
      Swal.fire("Error", "Please select user and role", "error");
      return;
    }
    setLoading(true);
    try {
      if (editId) {
        await API.put(`/assignroles/${editId}`, {
          userEmail: selectedUser,
          roleName: selectedRole,
        });
        Swal.fire("Updated!", "Role assignment updated", "success");
      } else {
        await API.post("/assignroles", {
          userEmail: selectedUser,
          roleName: selectedRole,
        });
        Swal.fire("Added!", "Role assigned successfully", "success");
      }
      setSelectedUser("");
      setSelectedRole("");
      setEditId(null);
      setShowModal(false);
      fetchAssignments();
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (assignment: any) => {
    setSelectedUser(assignment.userEmail);
    setSelectedRole(assignment.roleName);
    setEditId(assignment._id);
    setShowModal(true);
  };

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
        await API.delete(`/assignroles/${id}`);
        Swal.fire("Deleted!", "Role assignment deleted.", "success");
        fetchAssignments();
      } catch (err: any) {
        Swal.fire("Error", err.response?.data?.error || "Failed", "error");
      }
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditId(null);
    setSelectedUser("");
    setSelectedRole("");
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Manage User Role</h2>

      <Button variant="primary" className="mb-3" onClick={() => setShowModal(true)}>
        Assign Role
      </Button>

      {/* Assign Role Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editId ? "Edit Role Assignment" : "Assign Role"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>Select User</Form.Label>
              <Form.Select
                value={selectedUser}
                onChange={(e) => setSelectedUser(e.target.value)}
              >
                <option value="">Select User</option>
                {users.map((user) => (
                  <option key={user._id} value={user.email}>
                    {user.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Select Role</Form.Label>
              <Form.Select
                value={selectedRole}
                onChange={(e) => setSelectedRole(e.target.value)}
              >
                <option value="">Select Role</option>
                {roles.map((role) => (
                  <option key={role._id} value={role.name}>
                    {role.name}
                  </option>
                ))}
              </Form.Select>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? (editId ? "Updating..." : "Adding...") : editId ? "Update" : "Assign"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Assignments Table */}
      <div className="table-responsive">
        <Table bordered striped hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>Sr No</th>
              <th>User</th>
              <th>Role</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {assignments.map((a, idx) => (
              <tr key={a._id}>
                <td>{idx + 1}</td>
                <td>{a.userEmail}</td>
                <td>{a.roleName}</td>
                <td className="d-flex flex-wrap gap-2">
                  <Button size="sm" variant="warning" onClick={() => handleEdit(a)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(a._id)}>
                    Delete
                  </Button>
                  <Button size="sm" variant="success" onClick={() => Swal.fire("Info", `User: ${a.userEmail}\nRole: ${a.roleName}`, "info")}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </Container>
  );
}