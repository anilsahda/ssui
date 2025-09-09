"use client";
import React, { useState } from "react";

function PenaltyPage() {
  const [selectedStudent, setSelectedStudent] = useState("");
  const [penalties, setPenalties] = useState([
    { id: 1, student: "Amit Sharma", reason: "Late return", days: 2, fine: 50 },
    { id: 2, student: "Neha Verma", reason: "Lost book", days: 0, fine: 500 },
  ]);

  const handleStudentChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedStudent(e.target.value);
  };

  const filteredPenalties = selectedStudent
    ? penalties.filter((p) => p.student === selectedStudent)
    : penalties;

  return (
    <div className="container mt-4">
      <h2 className="mb-4 text-center">Penalty Report</h2>

      {/* Select Student */}
      <div className="mb-4">
        <label className="form-label">Select Student</label>
        <select className="form-select" value={selectedStudent} onChange={handleStudentChange}>
          <option value="">---Select Students---</option>
          <option value="Amit Sharma">Amit Sharma</option>
          <option value="Neha Verma">Neha Verma</option>
          <option value="Ravi Kumar">Ravi Kumar</option>
          <option value="Pooja Singh">Pooja Singh</option>
        </select>
      </div>

      {/* Penalty Table */}
      <div className="card p-3 shadow-sm">
        <table className="table table-bordered table-striped">
          <thead className="table-dark">
            <tr>
              <th>Student Name</th>
              <th>Reason</th>
              <th>Days</th>
              <th>Fine (₹)</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {filteredPenalties.length > 0 ? (
              filteredPenalties.map((p) => (
                <tr key={p.id}>
                  <td>{p.student}</td>
                  <td>{p.reason}</td>
                  <td>{p.days}</td>
                  <td>{p.fine}</td>
                  <td>
                    <button className="btn btn-info btn-sm me-1">View</button>
                    <button className="btn btn-warning btn-sm me-1">Edit</button>
                    <button className="btn btn-danger btn-sm">Delete</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center">
                  No penalties found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default PenaltyPage;
