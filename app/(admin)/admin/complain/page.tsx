import React from "react";

function ComplaintPage() {
  // Example data (later you can replace with backend/dynamic data)
  const complaints = [
    {
      rollNo: "101",
      studentName: "Rahul Sharma",
      subject: "Library",
      complaint: "Books not available",
      reply: "Will be added soon",
      status: "Resolved",
    },
    {
      rollNo: "102",
      studentName: "Anita Verma",
      subject: "Hostel",
      complaint: "Water issue in hostel",
      reply: "Pending",
      status: "Pending",
    },
  ];

  return (
    <div className="container mt-4">
      <h2>Complaint Management</h2>

      {/* ✅ Total Complaints */}
      <div className="alert alert-info">
        Total Complaints = <b>{complaints.length}</b>
      </div>

      <div className="card p-4 shadow-sm">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Roll No</th>
              <th>Student Name</th>
              <th>Subject</th>
              <th>Complaint</th>
              <th>Reply</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {complaints.map((c, index) => (
              <tr key={index}>
                <td>{c.rollNo}</td>
                <td>{c.studentName}</td>
                <td>{c.subject}</td>
                <td>{c.complaint}</td>
                <td>{c.reply}</td>
                <td>
                  <span
                    className={`badge ${
                      c.status === "Resolved"
                        ? "bg-success"
                        : "bg-warning text-dark"
                    }`}
                  >
                    {c.status}
                  </span>
                </td>
                <td>
                  <button className="btn btn-sm btn-info me-2">View</button>
                  <button className="btn btn-sm btn-warning me-2">Edit</button>
                  <button className="btn btn-sm btn-danger">Delete</button>
                </td>
              </tr>
            ))}

            {complaints.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center">
                  No Complaints Found
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ComplaintPage;
