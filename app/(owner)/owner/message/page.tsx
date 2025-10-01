"use client";

import React, { useEffect, useState, FormEvent } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

type Owner = {
  _id: string;
  name?: string;
};

type Message = {
  _id: string;
  text: string;
  sentAt: string;
  ownerId: Owner | string;
};

const MessagesPage: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [text, setText] = useState("");
  const [ownerId, setOwnerId] = useState("");
  const [editId, setEditId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const fetchMessages = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("http://localhost:5000/api/messages");
      if (!res.ok) {
        const err = await res.text();
        throw new Error(err || "Failed to fetch messages");
      }
      const json = await res.json();
      setMessages(json.data || []);
    } catch (err: any) {
      console.error("Fetch messages error:", err);
      setError(err.message || "Failed to load messages");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  const resetForm = () => {
    setText("");
    setOwnerId("");
    setEditId(null);
    setError(null);
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!text.trim() || !ownerId.trim()) {
      setError("Text and Owner ID are required.");
      return;
    }

    setSubmitting(true);
    try {
      const url = editId
        ? `http://localhost:5000/api/messages/${editId}`
        : `http://localhost:5000/api/messages`;
      const method = editId ? "PUT" : "POST";
      const body: any = { text: text.trim(), ownerId: ownerId.trim() };

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const resJson = await res.json();

      if (!res.ok) {
        throw new Error(resJson.error || "Failed to save message");
      }

      await fetchMessages();
      resetForm();
    } catch (err: any) {
      console.error("Submit error:", err);
      setError(err.message || "Error saving message.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleEdit = (msg: Message) => {
    setEditId(msg._id);
    setText(msg.text);
    setOwnerId(typeof msg.ownerId === "string" ? msg.ownerId : msg.ownerId._id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = async (id: string) => {
    if (!window.confirm("Are you sure you want to delete this message?"))
      return;
    try {
      const res = await fetch(`http://localhost:5000/api/messages/${id}`, {
        method: "DELETE",
      });
      const resJson = await res.json();
      if (!res.ok) {
        throw new Error(resJson.error || "Failed to delete");
      }
      await fetchMessages();
    } catch (err: any) {
      console.error("Delete error:", err);
      setError(err.message || "Error deleting message.");
    }
  };

  return (
    <div className="container py-4">
      <div className="text-center mb-4">
        <h2 className="fw-bold">
          <i className="bi bi-chat-left-text me-2 text-primary"></i>
          Messages
        </h2>
        <p className="text-muted">Create, edit or remove messages</p>
      </div>

      <div className="card shadow-sm mb-5">
        <div className="card-header bg-primary text-white">
          <h5 className="mb-0">
            {editId ? (
              <>
                <i className="bi bi-pencil-square me-2"></i>Edit Message
              </>
            ) : (
              <>
                <i className="bi bi-plus-circle me-2"></i>New Message
              </>
            )}
          </h5>
        </div>
        <div className="card-body">
          {error && (
            <div
              className="alert alert-danger d-flex align-items-center"
              role="alert"
            >
              <i className="bi bi-exclamation-triangle-fill me-2"></i>
              <div>{error}</div>
            </div>
          )}
          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label htmlFor="text" className="form-label">
                Message Text
              </label>
              <textarea
                id="text"
                className="form-control"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter your message"
                rows={3}
                disabled={submitting}
                required
              />
            </div>
            <div className="mb-3">
              <label htmlFor="ownerId" className="form-label">
                Owner ID
              </label>
              <input
                id="ownerId"
                className="form-control"
                value={ownerId}
                onChange={(e) => setOwnerId(e.target.value)}
                placeholder="Enter owner ID"
                disabled={submitting}
                required
              />
            </div>
            <div className="d-grid gap-2 d-md-flex justify-content-md-end">
              <button
                type="submit"
                className="btn btn-success me-md-2"
                disabled={submitting}
              >
                <i
                  className={`bi ${editId ? "bi-pencil" : "bi-plus-lg"} me-1`}
                ></i>
                {editId ? "Update Message" : "Create Message"}
              </button>
              {editId && (
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={resetForm}
                  disabled={submitting}
                >
                  <i className="bi bi-x-circle me-1"></i>Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-primary" role="status"></div>
          <p className="mt-3">Loading messages...</p>
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover table-bordered align-middle">
            <thead className="table-dark">
              <tr>
                <th>ID</th>
                <th>Text</th>
                <th>Owner</th>
                <th>Sent At</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {messages.length === 0 ? (
                <tr>
                  <td colSpan={5} className="text-center text-muted">
                    No messages found.
                  </td>
                </tr>
              ) : (
                messages.map((msg) => (
                  <tr key={msg._id}>
                    <td>
                      <span className="badge bg-secondary">{msg._id}</span>
                    </td>
                    <td>{msg.text}</td>
                    <td>
                      {typeof msg.ownerId === "string"
                        ? msg.ownerId
                        : msg.ownerId.name ?? msg.ownerId._id}
                    </td>
                    <td>{new Date(msg.sentAt).toLocaleString()}</td>
                    <td className="text-center">
                      <button
                        className="btn btn-sm btn-outline-primary me-2"
                        onClick={() => handleEdit(msg)}
                      >
                        <i className="bi bi-pencil-square"></i>
                      </button>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(msg._id)}
                      >
                        <i className="bi bi-trash-fill"></i>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MessagesPage;
