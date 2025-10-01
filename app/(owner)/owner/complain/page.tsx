"use client";
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

const OwnerComplainPage: React.FC = () => {
  const [form, setForm] = useState({
    name: "",
    contact: "",
    subject: "",
    message: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Add API call here
    alert("Complaint submitted successfully!");
    setForm({ name: "", contact: "", subject: "", message: "" });
  };

  return (
    <div
      className="min-vh-100 d-flex justify-content-center align-items-center bg-light"
      style={{ background: "linear-gradient(to right, #f8f9fa, #e9ecef)" }}
    >
      <div className="container p-4">
        <div className="row justify-content-center">
          <div className="col-lg-7">
            <div className="card shadow-lg border-0 rounded-4">
              <div
                className="card-header bg-danger text-white text-center rounded-top-4"
                style={{
                  background: "linear-gradient(to right, #dc3545, #c82333)",
                }}
              >
                <h3 className="mb-0">
                  <i className="bi bi-chat-dots-fill me-2"></i>
                  Owner Complaint Portal
                </h3>
                <p className="mb-0 small">
                  We value your feedback and concerns
                </p>
              </div>
              <div className="card-body p-4">
                <form onSubmit={handleSubmit}>
                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      name="name"
                      placeholder="Your Name"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="name">
                      <i className="bi bi-person-circle me-2"></i>Your Name
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="email"
                      className="form-control"
                      id="contact"
                      name="contact"
                      placeholder="you@example.com"
                      value={form.contact}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="contact">
                      <i className="bi bi-envelope-fill me-2"></i>Contact Email
                    </label>
                  </div>

                  <div className="form-floating mb-3">
                    <input
                      type="text"
                      className="form-control"
                      id="subject"
                      name="subject"
                      placeholder="Subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                    />
                    <label htmlFor="subject">
                      <i className="bi bi-flag-fill me-2"></i>Subject
                    </label>
                  </div>

                  <div className="form-floating mb-4">
                    <textarea
                      className="form-control"
                      placeholder="Describe your issue here..."
                      id="message"
                      name="message"
                      style={{ height: "120px" }}
                      value={form.message}
                      onChange={handleChange}
                      required
                    ></textarea>
                    <label htmlFor="message">
                      <i className="bi bi-pencil-fill me-2"></i>Complaint
                      Details
                    </label>
                  </div>

                  <button
                    type="submit"
                    className="btn btn-danger w-100 py-2 shadow-sm"
                  >
                    <i className="bi bi-send-fill me-2"></i>Submit Complaint
                  </button>
                </form>
              </div>
              <div className="card-footer text-center text-muted small py-2">
                We’ll get back to you within 2 working days.
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OwnerComplainPage;
