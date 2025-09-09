import React from "react";

function EmployeeReport() {
  return (
    <div className="container mt-4">
      <div className="bg-primary text-white text-center py-2 mb-3 rounded-top">
          <h4 className="mb-0">Employee Report</h4>
        </div>

      {/* Simple Form */}
      <form className="row mb-4">
        <div className="col-md-5">
          <label className="form-label">Select Branch</label>
          <select className="form-select">
            <option>-- Select Branch --</option>
            <option>IT</option>
            <option>Finance</option>
            <option>HR</option>
          </select>
        </div>

        <div className="col-md-5">
          <label className="form-label">Select Employee</label>
          <select className="form-select">
            <option>-- Select Employee --</option>
            <option>Ram</option>
            <option>Shaym</option>
          </select>
        </div>

        <div className="col-md-2 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </form>

      {/* Simple Table */}
      <table className="table table-bordered table-striped">
        <thead className="table-primary text-center">
          <tr>
            <th>Name</th>
            <th>City</th>
            <th>Mobile</th>
            <th>Branch</th>
            <th>Class</th>
            <th>Basic Pay</th>
            <th>Salary</th>
            <th>Bank Account</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>Kapil</td>
            <td>Lucknow</td>
            <td>9876543210</td>
            <td>IT</td>
            <td>Class I</td>
            <td>40000</td>
            <td>50000</td>
            <td>1234567890</td>
            <td>kapil@example.com</td>
            <td>
              <button className="btn btn-info btn-sm me-1">View</button>
              <button className="btn btn-warning btn-sm me-1">Edit</button>
              <button className="btn btn-danger btn-sm">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default EmployeeReport;
