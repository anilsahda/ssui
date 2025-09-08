import React from "react";

function Employee() {
  return (
    <div className="container mt-4">
      <div className="bg-primary text-white text-center py-2 mb-3 rounded-top">
          <h4 className="mb-0">Employee Management</h4>
        </div>

      {/* ===== Trigger Button for Modal ===== */}
      <div className="text-end mb-3">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addEmployeeModal"
        >
          + Add New Employee
        </button>
      </div>

      {/* ===== Modal for Add Employee Form ===== */}
      <div
        className="modal fade"
        id="addEmployeeModal"
        tabIndex={-1}
        aria-labelledby="addEmployeeModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-xl modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="addEmployeeModalLabel">
                Add New Employee
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <form>
                <div className="row">
                  {/* Name */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Name</label>
                    <input type="text" className="form-control" />
                  </div>

                  {/* Address */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Address</label>
                    <input type="text" className="form-control" />
                  </div>

                  {/* City */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">City</label>
                    <input type="text" className="form-control" />
                  </div>

                  {/* Pincode */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Pincode</label>
                    <input type="number" className="form-control" />
                  </div>

                  {/* Phone Number */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Mobile Number</label>
                    <input type="tel" className="form-control" />
                  </div>

                  {/* Degree */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Degree</label>
                    <select className="form-select">
                      <option value="">Select Degree</option>
                      <option>B.Tech</option>
                      <option>M.Tech</option>
                      <option>MBA</option>
                      <option>PhD</option>
                    </select>
                  </div>

                  {/* Designation */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Designation</label>
                    <select className="form-select">
                      <option value="">Select Designation</option>
                      <option>Manager</option>
                      <option>Developer</option>
                      <option>Clerk</option>
                      <option>HR</option>
                    </select>
                  </div>

                  {/* Branch */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Branch</label>
                    <select className="form-select">
                      <option value="">Select Branch</option>
                      <option>IT</option>
                      <option>Finance</option>
                      <option>HR</option>
                      <option>Marketing</option>
                    </select>
                  </div>

                  {/* Class */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Class</label>
                    <select className="form-select">
                      <option value="">Select Class</option>
                      <option>Class I</option>
                      <option>Class II</option>
                      <option>Class III</option>
                    </select>
                  </div>

                  {/* Basic Pay */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Basic Pay</label>
                    <input type="number" className="form-control" />
                  </div>

                  {/* Salary */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Salary</label>
                    <input type="number" className="form-control" />
                  </div>

                  {/* Bank Account */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Bank Account</label>
                    <input type="text" className="form-control" />
                  </div>

                  {/* Email */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Email</label>
                    <input type="email" className="form-control" />
                  </div>

                  {/* Password */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Password</label>
                    <input type="password" className="form-control" />
                  </div>

                  {/* Confirm Password */}
                  <div className="col-md-6 mb-3">
                    <label className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" />
                  </div>
                </div>

                <div className="text-end">
                  <button type="submit" className="btn btn-primary">
                    Add Employee
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Employee Table ===== */}
      <div className="card shadow-sm">
        <div className="card-header bg-info text-white text-center border-bottom">
          <h4 className="mb-0">Employee List</h4>
        </div>
        <div className="card-body">
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Degree</th>
                <th>Designation</th>
                <th>Branch</th>
                <th>Class</th>
                <th>Salary</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Kapil</td>
                <td>B.Tech</td>
                <td>Developer</td>
                <td>IT</td>
                <td>Class I</td>
                <td>50000</td>
                <td>
                  <button className="btn btn-info btn-sm me-1">View</button>
                  <button className="btn btn-warning btn-sm me-1">Edit</button>
                  <button className="btn btn-danger btn-sm">Delete</button>
                </td>
              </tr>
              <tr>
                <td>Kapil Yadav</td>
                <td>MBA</td>
                <td>Manager</td>
                <td>Finance</td>
                <td>Class II</td>
                <td>65000</td>
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

export default Employee;
