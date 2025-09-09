import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <div className="bg-primary text-white text-center py-2 mb-3 rounded-top">
          <h4 className="mb-0">Class Management</h4>
        </div>

      {/* ===== Trigger Button for Modal ===== */}
      <div className="text-end mb-3">
        <button
          className="btn btn-primary"
          data-bs-toggle="modal"
          data-bs-target="#addClassModal"
        >
         + Add New Class
        </button>
      </div>

      {/* ===== Modal for Add Class Form ===== */}
      <div
        className="modal fade"
        id="addClassModal"
        tabIndex={-1}
        aria-labelledby="addClassModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-lg modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header bg-primary text-white">
              <h5 className="modal-title" id="addClassModalLabel">Add New Class</h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>

            <div className="modal-body">
              <div className="row">
                {/* Class Name */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="className" className="form-label fw-bold">Class Name</label>
                  <input type="text" id="className" className="form-control" />
                </div>

                {/* Basic Pay */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="basicPay" className="form-label fw-bold">Basic Pay</label>
                  <input type="number" id="basicPay" className="form-control" />
                </div>

                {/* Salary */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="salary" className="form-label fw-bold">Salary</label>
                  <input type="number" id="salary" className="form-control" />
                </div>

                {/* Travel Allowance */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="travelAllowance" className="form-label fw-bold">Travel Allowance</label>
                  <input type="text" id="travelAllowance" className="form-control" />
                </div>

                {/* Medical Allowance */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="medicalAllowance" className="form-label fw-bold">Medical Allowance</label>
                  <input type="text" id="medicalAllowance" className="form-control" />
                </div>

                {/* Washing Allowance */}
                <div className="col-md-6 mb-3">
                  <label htmlFor="washingAllowance" className="form-label fw-bold">Washing Allowance</label>
                  <input type="text" id="washingAllowance" className="form-control" />
                </div>
              </div>
            </div>

            <div className="modal-footer">
              <button className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button className="btn btn-primary" type="button">Save Employee</button>
            </div>
          </div>
        </div>
      </div>

      {/* ===== Table Section ===== */}
      <div className="card shadow-sm mt-4">
        <div className="card-header bg-info text-white text-center border-bottom">
          <h5 className="mb-0">Class List</h5>
        </div>
        <div className="card-body">
          <table className="table table-bordered text-center align-middle">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Class Name</th>
                <th>Basic Pay</th>
                <th>Salary</th>
                <th>Travel Allowance</th>
                <th>Medical Allowance</th>
                <th>Washing Allowance</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {/* Example Row */}
              <tr>
                <td>1</td>
                <td>Class A</td>
                <td>5000</td>
                <td>20000</td>
                <td>1500</td>
                <td>1000</td>
                <td>500</td>
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

export default Page;
