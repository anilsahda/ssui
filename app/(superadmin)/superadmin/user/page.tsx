"use client";
import API from "@/api";
import React, { useState, useEffect } from "react";
import { Button, Container, Form, Modal, Table } from "react-bootstrap";
import Swal from "sweetalert2";



export default function ManageUserPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    name: "",
    mobileNumber: "",
    email: "",
    password: "",
  });
  const [editUserId, setEditUserId] = useState<string | null>(null);
  const [viewUser, setViewUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch all users
  const fetchUsers = async () => {
    try {
      const res = await API.get("/users");
      setUsers(res.data);
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed to fetch users", "error");
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = async () => {
    const { name, mobileNumber, email, password } = formData;
    if (!name || !mobileNumber || !email || !password) {
      Swal.fire("Error", "All fields are required", "error");
      return;
    }

    setLoading(true);
    try {
      if (editUserId) {
        await API.put(`/users/${editUserId}`, formData);
        Swal.fire("Updated!", "User updated successfully", "success");
      } else {
        await API.post("/users", formData);
        Swal.fire("Added!", "User added successfully", "success");
      }
      setFormData({ name: "", mobileNumber: "", email: "", password: "" });
      setEditUserId(null);
      setShowModal(false);
      fetchUsers();
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed", "error");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = async (user: any) => {
    try {
      const res = await API.get(`/users/with-password/${user._id}`);
      const fullUser = res.data;
      setFormData({
        name: fullUser.name || "",
        mobileNumber: fullUser.mobileNumber || "",
        email: fullUser.email || "",
        password: fullUser.password || "",
      });
      setEditUserId(fullUser._id);
      setShowModal(true);
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed to fetch user", "error");
    }
  };

  const handleView = async (user: any) => {
    try {
      const res = await API.get(`/users/with-password/${user._id}`);
      setViewUser(res.data);
    } catch (err: any) {
      Swal.fire("Error", err.response?.data?.error || "Failed to fetch user", "error");
    }
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
        await API.delete(`/users/${id}`);
        Swal.fire("Deleted!", "User has been deleted.", "success");
        fetchUsers();
      } catch (err: any) {
        Swal.fire("Error", err.response?.data?.error || "Failed", "error");
      }
    }
  };

  const handleCloseView = () => {
    setViewUser(null);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditUserId(null);
    setFormData({ name: "", mobileNumber: "", email: "", password: "" });
  };

  return (
    <Container className="mt-4">
      <h2 className="mb-4">Manage Users</h2>

      <Button variant="primary" onClick={() => setShowModal(true)}>
        Add User
      </Button>

      {/* Users Table */}
      <div className="table-responsive mt-4">
        <Table bordered striped hover className="align-middle">
          <thead className="table-light">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, idx) => (
              <tr key={user._id}>
                <td>{idx + 1}</td>
                <td>{user.name}</td>
                <td>{user.mobileNumber}</td>
                <td>{user.email}</td>
                <td className="d-flex flex-wrap gap-2">
                  <Button size="sm" variant="warning" onClick={() => handleEdit(user)}>
                    Edit
                  </Button>
                  <Button size="sm" variant="danger" onClick={() => handleDelete(user._id)}>
                    Delete
                  </Button>
                  <Button size="sm" variant="success" onClick={() => handleView(user)}>
                    View
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>

      {/* Add/Edit User Modal */}
      <Modal show={showModal} onHide={handleCloseModal} centered>
        <Modal.Header closeButton>
          <Modal.Title>{editUserId ? "Edit User" : "Add New User"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Name"
                name="name"
                value={formData.name || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Mobile</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Mobile"
                name="mobileNumber"
                value={formData.mobileNumber || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter Email"
                name="email"
                value={formData.email || ""}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group>
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter Password"
                value={formData.password || ""}
                onChange={handleChange}
                name="password"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModal}>
            Cancel
          </Button>
          <Button variant="primary" onClick={handleSave} disabled={loading}>
            {loading ? (editUserId ? "Updating..." : "Adding...") : editUserId ? "Update User" : "Add User"}
          </Button>
        </Modal.Footer>
      </Modal>

      {/* View User Modal */}
      <Modal show={!!viewUser} onHide={handleCloseView} centered>
        <Modal.Header closeButton>
          <Modal.Title>View User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {viewUser && (
            <Form>
              <Form.Group className="mb-2">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" value={viewUser.name} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Mobile</Form.Label>
                <Form.Control type="text" value={viewUser.mobileNumber} readOnly />
              </Form.Group>
              <Form.Group className="mb-2">
                <Form.Label>Email</Form.Label>
                <Form.Control type="text" value={viewUser.email} readOnly />
              </Form.Group>
              <Form.Group>
                <Form.Label>Password</Form.Label>
                <Form.Control type="text" value={viewUser.password || "N/A"} readOnly />
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





// import React from 'react'

// function page() {
//   return (
//     <div className="container mt-4">
//       <h2>Manage User</h2>

//       <div className='row'>
//         <div className="col-md-6 mb-3">
//           <input type="text" placeholder="Enter Name" className="form-control" />
//         </div>
//         <div className="col-md-6 mb-3">
//           <input type="mobile" placeholder="Enter Mobile" className="form-control" />
//         </div>
//       </div>

//       <div className='row'>
//         <div className="col-md-6 mb-3">
//           <input type="email" placeholder="Enter Email" className="form-control" />
//         </div>
//         <div className="col-md-6 mb-3">
//           <input type="password" placeholder="Enter Password" className="form-control" />
//         </div>
//       </div>

//       <div className="mb-4">
//         <button className="btn btn-primary me-2">Add User</button>
//       </div>

//       <table className="table table-bordered table-striped">
//         <thead className="table-light">
//           <tr>
//             <th>Id</th>
//             <th>Name</th>
//             <th>Mobile</th>
//             <th>Email</th>
//             <th>Password</th>
//             <th>Actions</th>
//           </tr>
//         </thead>
//         <tbody>
//           <tr>
//             <td>1</td>
//             <td>Philip</td>
//             <td>9999999999</td>
//             <td>philip@gmail.com</td>
//             <td>Philip@121</td>
//             <td>
//               <button className="btn btn-warning me-1">Edit</button>
//               <button className="btn btn-danger me-1">Delete</button>
//               <button className="btn btn-success">View</button>
//             </td>
//           </tr>
//           <tr>
//             <td>2</td>
//             <td>John</td>
//             <td>9999999999</td>
//             <td>john@gmail.com</td>
//             <td>John@121</td>
//             <td>
//               <button className="btn btn-warning me-1">Edit</button>
//               <button className="btn btn-danger me-1">Delete</button>
//               <button className="btn btn-success">View</button>
//             </td>
//           </tr>
//           <tr>
//             <td>3</td>
//             <td>Paul</td>
//             <td>9999999999</td>
//             <td>paul@gmail.com</td>
//             <td>Paul@121</td>
//             <td>
//               <button className="btn btn-warning me-1">Edit</button>
//               <button className="btn btn-danger me-1">Delete</button>
//               <button className="btn btn-success">View</button>
//             </td>
//           </tr>
//         </tbody>
//       </table>
//     </div>
//   )
// }

// export default page