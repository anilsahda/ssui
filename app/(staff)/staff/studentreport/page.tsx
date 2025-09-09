import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>Manage Student Report</h2>

      {/* Filter Form */}
      <div className="card p-4 mb-4 shadow-sm">
        <h5>Filter Report</h5>
        <form>
          <div className="row">
            <div className="col-md-4 mb-3">
              <label className="form-label">Select STD</label>
              <select className="form-select">
                <option value="">-- Select STD --</option>
                <option value="1">STD 1</option>
                <option value="2">STD 2</option>
                <option value="3">STD 3</option>
              </select>
            </div>

            <div className="col-md-4 mb-3">
              <label className="form-label">Select Division</label>
              <select className="form-select">
                <option value="">-- Select Division --</option>
                <option value="A">Division A</option>
                <option value="B">Division B</option>
                <option value="C">Division C</option>
              </select>
            </div>

            <div className="col-md-4 d-flex align-items-end mb-3">
              <button type="submit" className="btn btn-primary w-100">
                View Report
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Report Table */}
      <div className="card p-4 shadow-sm">
        <h5>Student List</h5>
        <table className="table table-bordered table-striped mt-3">
          <thead className="table-dark">
            <tr>
              <th>Roll No.</th>
              <th>Name</th>
              <th>Mobile</th>
              <th>Email</th>
              <th>Birthdate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td>Rahul Sharma</td>
              <td>9876543210</td>
              <td>rahul@example.com</td>
              <td>2005-04-12</td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            <tr>
              <td>2</td>
              <td>Pooja Patel</td>
              <td>9876501234</td>
              <td>pooja@example.com</td>
              <td>2006-09-20</td>
              <td>
                <button className="btn btn-info btn-sm me-1">View</button>
                <button className="btn btn-warning btn-sm me-1">Edit</button>
                <button className="btn btn-danger btn-sm">Delete</button>
              </td>
            </tr>
            {/* Add more rows if needed */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
