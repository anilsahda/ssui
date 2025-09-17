"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";

function Page() {
  const [tasks, setTasks] = useState([]);
  const [statuses, setStatuses] = useState([]);
  const [priorities, setPriorities] = useState([]);
  const [assignees, setAssignees] = useState([]);

  const [filters, setFilters] = useState({ assigneeId: 0, statusId: 0 });

  const [form, setForm] = useState({
    id: null,
    title: "",
    description: "",
    statusId: "",
    priorityId: "",
    assigneeId: "",
  });

  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    fetchAll();
  }, []);

  const fetchAll = async () => {
    fetchTasks();
    fetchStatuses();
    fetchPriorities();
    fetchAssignees();
  };

  const fetchTasks = async () => {
    try {
      const { assigneeId, statusId } = filters;
      const res = await axios.get(
        `https://localhost:7071/api/Tasks/AssignTask?statusId=${statusId}&assigneeId=${assigneeId}`
      );
      setTasks(res.data);
    } catch {
      Swal.fire("Error", "Failed to fetch tasks", "error");
    }
  };

  const fetchStatuses = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Statuses");
      setStatuses(res.data);
    } catch {
      Swal.fire("Error", "Failed to fetch statuses", "error");
    }
  };

  const fetchPriorities = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Priorities");
      setPriorities(res.data);
    } catch {
      Swal.fire("Error", "Failed to fetch priorities", "error");
    }
  };

  const fetchAssignees = async () => {
    try {
      const res = await axios.get("https://localhost:7071/api/Users/GetUsers");
      setAssignees(res.data);
    } catch {
      Swal.fire("Error", "Failed to fetch assignees", "error");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  const handleSave = async () => {
    const { title, description, statusId, priorityId, assigneeId, id } = form;

    if (!title || !description || !statusId || !priorityId || !assigneeId) {
      Swal.fire("Warning", "Please fill in all fields", "warning");
      return;
    }

    const payload = {
      title,
      description,
      statusId: parseInt(statusId),
      priorityId: parseInt(priorityId),
      assigneeId: parseInt(assigneeId),
    };

    try {
      if (id) {
        await axios.put(`https://localhost:7071/api/Tasks/${id}`, {
          ...payload,
          id,
          updatedAt: new Date().toISOString(),
          createdAt: new Date().toISOString(),
          createrId: 1,
        });
        Swal.fire("Updated!", "Task has been updated.", "success");
      } else {
        await axios.post("https://localhost:7071/api/Tasks", payload);
        Swal.fire("Added!", "Task has been created.", "success");
      }

      resetForm();
      fetchTasks();
    } catch (error) {
      console.error("Save failed:", error);
      Swal.fire("Error", "Failed to save task", "error");
    }
  };

  const handleEdit = (task) => {
    setForm({
      id: task.id,
      title: task.title,
      description: task.description,
      statusId: task.statusId.toString(),
      priorityId: task.priorityId.toString(),
      assigneeId: task.assigneeId.toString(),
    });
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "This will delete the task.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#6c757d",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await axios.delete(`https://localhost:7071/api/Tasks/${id}`);
        Swal.fire("Deleted!", "Task has been removed.", "success");
        fetchTasks();
      } catch {
        Swal.fire("Error", "Failed to delete task", "error");
      }
    }
  };

  const handleView = (task) => {
    Swal.fire({
      title: "Task Details",
      html: `
        <strong>ID:</strong> ${task.id}<br/>
        <strong>Title:</strong> ${task.title}<br/>
        <strong>Description:</strong> ${task.description}<br/>
        <strong>Status:</strong> ${statuses.find(s => s.id === task.statusId)?.name || "N/A"}<br/>
        <strong>Priority:</strong> ${priorities.find(p => p.id === task.priorityId)?.name || "N/A"}<br/>
        <strong>Assignee:</strong> ${assignees.find(a => a.id === task.assigneeId)?.name || "N/A"}
      `,
      icon: "info",
    });
  };

  const resetForm = () => {
    setForm({
      id: null,
      title: "",
      description: "",
      statusId: "",
      priorityId: "",
      assigneeId: "",
    });
    setShowModal(false);
  };

  const renderSelect = (label, name, options, value, onChange) => (
    <div className="mb-3">
      <label className="form-label">{label}</label>
      <select className="form-select" name={name} value={value} onChange={onChange}>
        <option value="">Select {label}</option>
        {options.map((opt) => (
          <option key={opt.id} value={opt.id}>
            {opt.name}
          </option>
        ))}
      </select>
    </div>
  );

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Manage Tasks</h2>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Task
        </button>
      </div>

      <div className="d-flex gap-2 mb-4">
        <select
          className="form-select"
          name="assigneeId"
          value={filters.assigneeId}
          onChange={handleFilterChange}
        >
          <option value={0}>All Assignees</option>
          {assignees.map((a) => (
            <option key={a.id} value={a.id}>
              {a.name}
            </option>
          ))}
        </select>

        <select
          className="form-select"
          name="statusId"
          value={filters.statusId}
          onChange={handleFilterChange}
        >
          <option value={0}>All Statuses</option>
          {statuses.map((s) => (
            <option key={s.id} value={s.id}>
              {s.name}
            </option>
          ))}
        </select>

        <button className="btn btn-primary" onClick={fetchTasks}>
          Filter
        </button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Assignee</th>
            <th>Status</th>
            <th>Priority</th>
            <th style={{ width: "220px" }}>Actions</th>
          </tr>
        </thead>
        <tbody>
          {tasks.length ? (
            tasks.map((task) => (
              <tr key={task.id}>
                <td>{task.id}</td>
                <td>{task.title}</td>
                <td>{assignees.find((a) => a.id === task.assigneeId)?.name}</td>
                <td>{statuses.find((s) => s.id === task.statusId)?.name}</td>
                <td>{priorities.find((p) => p.id === task.priorityId)?.name}</td>
                <td>
                  <button className="btn btn-warning btn-sm me-1" onClick={() => handleEdit(task)}>
                    Edit
                  </button>
                  <button className="btn btn-danger btn-sm me-1" onClick={() => handleDelete(task.id)}>
                    Delete
                  </button>
                  <button className="btn btn-success btn-sm" onClick={() => handleView(task)}>
                    View
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No tasks found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Modal */}
      {showModal && (
        <div className="modal show d-block" tabIndex="-1" style={{ background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header bg-primary text-white">
                <h5 className="modal-title">{form.id ? "Edit Task" : "Add Task"}</h5>
                <button type="button" className="btn-close" onClick={resetForm}></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Title"
                    value={form.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <textarea
                    className="form-control"
                    name="description"
                    placeholder="Description"
                    value={form.description}
                    onChange={handleInputChange}
                  />
                </div>
                {renderSelect("Status", "statusId", statuses, form.statusId, handleInputChange)}
                {renderSelect("Priority", "priorityId", priorities, form.priorityId, handleInputChange)}
                {renderSelect("Assignee", "assigneeId", assignees, form.assigneeId, handleInputChange)}
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={resetForm}>
                  Close
                </button>
                <button className="btn btn-primary" onClick={handleSave}>
                  {form.id ? "Update Task" : "Create Task"}
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
