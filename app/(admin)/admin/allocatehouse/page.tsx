"use client";
import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

interface AllocateHouse {
  id: number;
  houseId: number;
  memberId: number;
  allocationDate: string;
  releaseDate?: string | null;
}

const AllocateHouseManager: React.FC = () => {
  const API_URL = "https://localhost:7293/api/AllocateHouse";

  const [allocations, setAllocations] = useState<AllocateHouse[]>([]);
  const [form, setForm] = useState<Partial<AllocateHouse>>({
    houseId: undefined,
    memberId: undefined,
    allocationDate: new Date().toISOString(),
    releaseDate: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showError, setShowError] = useState(true);

  const fetchAllocations = async () => {
    setLoading(true);
    try {
      const res = await fetch(API_URL);
      if (!res.ok) throw new Error("Failed to fetch allocations");
      const data = await res.json();
      setAllocations(data);
      setError(null);
      setShowError(false);
    } catch (err: any) {
      setError(err.message || "Unknown error");
      setShowError(true);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllocations();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value === "" ? undefined : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!form.houseId || !form.memberId) {
      alert("House ID and Member ID are required.");
      return;
    }

    const method = isEditing ? "PUT" : "POST";
    const url = isEditing ? `${API_URL}/${form.id}` : API_URL;

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const msg = await res.text();
        throw new Error(`Error: ${res.status} - ${msg}`);
      }

      await fetchAllocations();
      setForm({
        houseId: undefined,
        memberId: undefined,
        allocationDate: new Date().toISOString(),
      });
      setIsEditing(false);
    } catch (err: any) {
      alert(err.message || "Submission failed");
    }
  };

  const handleEdit = (alloc: AllocateHouse) => {
    setForm({
      id: alloc.id,
      houseId: alloc.houseId,
      memberId: alloc.memberId,
      allocationDate: alloc.allocationDate,
      releaseDate: alloc.releaseDate ?? "",
    });
    setIsEditing(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm("Are you sure you want to delete this allocation?"))
      return;

    try {
      const res = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Delete failed");
      await fetchAllocations();
    } catch (err: any) {
      alert(err.message || "Deletion error");
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4 text-center text-primary fw-bold">
        House Allocation Management
      </h2>

      {error && showError && (
        <div
          className="alert alert-danger alert-dismissible fade show"
          role="alert"
        >
          <strong>Error:</strong> {error}
          <button
            type="button"
            className="btn-close"
            aria-label="Close"
            onClick={() => setShowError(false)}
          ></button>
        </div>
      )}

      <div className="row">
        {/* Form Card */}
        <div className="col-lg-5 mb-4">
          <div className="card shadow-sm">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">
                {isEditing ? "Edit Allocation" : "New Allocation"}
              </h5>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit} noValidate>
                <div className="mb-3">
                  <label htmlFor="houseId" className="form-label">
                    House ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="houseId"
                    name="houseId"
                    className="form-control"
                    value={form.houseId ?? ""}
                    onChange={handleChange}
                    required
                    min={1}
                    placeholder="Enter house ID"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="memberId" className="form-label">
                    Member ID <span className="text-danger">*</span>
                  </label>
                  <input
                    type="number"
                    id="memberId"
                    name="memberId"
                    className="form-control"
                    value={form.memberId ?? ""}
                    onChange={handleChange}
                    required
                    min={1}
                    placeholder="Enter member ID"
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="allocationDate" className="form-label">
                    Allocation Date
                  </label>
                  <input
                    type="datetime-local"
                    id="allocationDate"
                    name="allocationDate"
                    className="form-control"
                    value={form.allocationDate?.substring(0, 16)}
                    onChange={handleChange}
                    max={new Date().toISOString().substring(0, 16)}
                  />
                </div>

                <div className="mb-3">
                  <label htmlFor="releaseDate" className="form-label">
                    Release Date
                  </label>
                  <input
                    type="datetime-local"
                    id="releaseDate"
                    name="releaseDate"
                    className="form-control"
                    value={form.releaseDate?.substring(0, 16) ?? ""}
                    onChange={handleChange}
                    min={form.allocationDate?.substring(0, 16)}
                  />
                </div>

                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-success fw-semibold">
                    {isEditing ? (
                      <>
                        <i className="bi bi-pencil-square me-2"></i> Update
                      </>
                    ) : (
                      <>
                        <i className="bi bi-plus-circle me-2"></i> Create
                      </>
                    )}
                  </button>

                  {isEditing && (
                    <button
                      type="button"
                      className="btn btn-outline-secondary"
                      onClick={() => {
                        setForm({
                          houseId: undefined,
                          memberId: undefined,
                          allocationDate: new Date().toISOString(),
                          releaseDate: "",
                        });
                        setIsEditing(false);
                      }}
                    >
                      <i className="bi bi-x-circle me-1"></i> Cancel
                    </button>
                  )}
                </div>
              </form>
            </div>
          </div>
        </div>

        {/* Table Card */}
        <div className="col-lg-7">
          <div className="card shadow-sm">
            <div className="card-header bg-info text-white">
              <h5 className="mb-0">All Allocations</h5>
            </div>
            <div className="card-body p-0">
              {loading ? (
                <div className="d-flex justify-content-center align-items-center p-5">
                  <div
                    className="spinner-border text-primary"
                    role="status"
                    aria-hidden="true"
                  ></div>
                  <span className="ms-3 fw-semibold">
                    Loading allocations...
                  </span>
                </div>
              ) : allocations.length === 0 ? (
                <p className="text-center p-4 text-muted fw-semibold">
                  No allocations found.
                </p>
              ) : (
                <div className="table-responsive">
                  <table className="table table-hover table-striped align-middle mb-0">
                    <thead className="table-light">
                      <tr>
                        <th>ID</th>
                        <th>House ID</th>
                        <th>Member ID</th>
                        <th>Allocated At</th>
                        <th>Released At</th>
                        <th className="text-center">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {allocations.map((alloc) => (
                        <tr key={alloc.id}>
                          <td>{alloc.id}</td>
                          <td>{alloc.houseId}</td>
                          <td>{alloc.memberId}</td>
                          <td>
                            {new Date(alloc.allocationDate).toLocaleString()}
                          </td>
                          <td>
                            {alloc.releaseDate ? (
                              new Date(alloc.releaseDate).toLocaleString()
                            ) : (
                              <span className="text-muted">-</span>
                            )}
                          </td>
                          <td className="text-center">
                            <button
                              className="btn btn-sm btn-outline-primary me-2"
                              onClick={() => handleEdit(alloc)}
                              title="Edit"
                              aria-label="Edit allocation"
                            >
                              <i className="bi bi-pencil-fill"></i>
                            </button>
                            <button
                              className="btn btn-sm btn-outline-danger"
                              onClick={() => handleDelete(alloc.id)}
                              title="Delete"
                              aria-label="Delete allocation"
                            >
                              <i className="bi bi-trash-fill"></i>
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllocateHouseManager;
