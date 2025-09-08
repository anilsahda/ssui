import React from "react";

function DesignationPage() {
  return (
    <div className="container mt-4">
      {/* Card for Add Designation */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center border-bottom">
          <h4 className="mb-0">Add New Designation</h4>
        </div>

        <div className="card-body">
          <div className="row">
            {/* Designation Name */}
            <div className="col-md-6 mb-3">
              <label htmlFor="designationName" className="form-label">
                Designation Name
              </label>
              <input
                type="text"
                id="designationName"
                className="form-control"
                placeholder="Enter designation"
              />
            </div>
          </div>

          <div className="">
            <button className="btn btn-primary" type="button">
              Save Designation
            </button>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-secondary text-white text-center border-bottom">
          <h5 className="mb-0">Designation List</h5>
        </div>
        <div className="card-body">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-light">
              <tr>
                <th>ID</th>
                <th>Designation Name</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              <tr>
                <td>1</td>
                <td>Manager</td>
                <td>
                  <button className="btn btn-info btn-sm me-1">View</button>
                  <button className="btn btn-warning btn-sm me-1">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              <tr>
                <td>2</td>
                <td>Software Engineer</td>
                <td>
                  <button className="btn btn-info btn-sm me-1">View</button>
                  <button className="btn btn-warning btn-sm me-1">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default DesignationPage;
