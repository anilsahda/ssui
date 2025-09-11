"use client";

import React from "react";
import { FiUserCheck } from "react-icons/fi";

export default function UserRolePage() {
  return (
    <div className="d-flex flex-column justify-content-center align-items-center vh-100 bg-light px-4 text-center">
      <FiUserCheck size={70} className="text-primary mb-4" />
      <h1 className="mb-3 fw-bold">User Role Management</h1>
      <p className="text-muted mb-4" style={{ maxWidth: 500 }}>
        Assign and manage roles for users to control access and permissions
        effectively. Ensure your application is secure and organized by
        maintaining proper user roles.
      </p>
      <button className="btn btn-primary shadow-sm px-4 py-2">
        Manage Roles
      </button>
    </div>
  );
}
