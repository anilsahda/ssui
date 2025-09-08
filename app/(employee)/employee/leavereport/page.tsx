import React from "react";

function LeaveReport() {
  return (
    <div className="container mt-4">
      {/* Card Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center border-bottom">
          <h4 className="mb-0">Leave Report</h4>
        </div>

        <div className="card-body">
          {/* Search Section */}
          <div className="row mb-3">
            <div className="col-md-4">
              <label className="form-label fw-bold">Select Employee</label>
              <select className="form-select">
                <option>Select Employee</option>
                <option>John Doe</option>
                <option>Jane Smith</option>
              </select>
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">From Date</label>
              <input type="date" className="form-control" />
            </div>
            <div className="col-md-4">
              <label className="form-label fw-bold">To Date</label>
              <input type="date" className="form-control" />
            </div>
          </div>

          <div className="text-end mb-3">
            <button className="btn btn-primary">Search</button>
          </div>

          {/* Table Section */}
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>Sr. No.</th>
                <th>Employee Name</th>
                <th>From Date</th>
                <th>To Date</th>
                <th>No. of Days</th>
                <th>Reason</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              <tr>
                <td>1</td>
                <td>Kapil</td>
                <td>2025-09-01</td>
                <td>2025-09-03</td>
                <td>3</td>
                <td>Medical Leave</td>
                <td><span className="badge bg-success">Approved</span></td>
              </tr>
              <tr>
                <td>2</td>
                <td>Raju</td>
                <td>2025-09-05</td>
                <td>2025-09-06</td>
                <td>2</td>
                <td>Personal Work</td>
                <td><span className="badge bg-warning text-dark">Pending</span></td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default LeaveReport;
