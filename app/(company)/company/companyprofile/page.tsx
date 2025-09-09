import React from "react";

function page() {
  return (
    <div className="container mt-4">
      <h2>Manage Company Profile</h2>

      {/* Button to Open Popup */}
      <div className="mb-3 text-end">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#companyModal"
        >
         + Add Company Profile
        </button>
      </div>

      {/* Popup Modal */}
      <div
        className="modal fade"
        id="companyModal"
        tabIndex={-1}
        aria-labelledby="companyModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="companyModalLabel">
                + Add Company Profile
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              {/* Company Profile Form */}
              <div className="mb-3">
                <label className="form-label">Select Job</label>
                <select className="form-select">
                  <option>-- Select --</option>
                  <option>Software Engineer</option>
                  <option>HR Manager</option>
                  <option>Data Analyst</option>
                  <option>Project Manager</option>
                </select>
              </div>

              <div className="mb-3">
                <label className="form-label">Degree</label>
                <input type="text" className="form-control" placeholder="Enter Degree" />
              </div>

              <div className="mb-3">
                <label className="form-label">Experience</label>
                <input type="text" className="form-control" placeholder="Enter Experience (e.g. 2 Years)" />
              </div>

              <div className="mb-3">
                <label className="form-label">Salary</label>
                <input type="text" className="form-control" placeholder="Enter Salary" />
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" className="btn btn-primary">
                Save Profile
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Company Profile Table */}
      <table className="table table-bordered mt-4">
        <thead className="table-dark">
          <tr>
            <th>Job</th>
            <th>Degree</th>
            <th>Experience</th>
            <th>Salary</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Software Engineer</td>
            <td>B.Tech</td>
            <td>2 Years</td>
            <td>6 LPA</td>
            <td>
              <button className="btn btn-sm btn-info me-2">View</button>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>HR Manager</td>
            <td>MBA</td>
            <td>5 Years</td>
            <td>10 LPA</td>
            <td>
              <button className="btn btn-sm btn-info me-2">View</button>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default page;
