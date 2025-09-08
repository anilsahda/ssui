import React from "react";

function SalaryReport() {
  return (
    <div className="container mt-4">
      <div className="card-header bg-primary text-white text-center border-bottom">
          <h4 className="mb-0">Year Wise Report</h4>
        </div>

      {/* Filters Form */}
      <form className="row mb-4">
        {/* Select Year */}
        <div className="col-md-4 mb-3">
          <label className="form-label">Select Year</label>
          <select className="form-select">
            <option>-- Select Year --</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
        </div>

        {/* Select Class */}
        <div className="col-md-4 mb-3">
          <label className="form-label">Select Class</label>
          <select className="form-select">
            <option>-- Select Class --</option>
            <option>Class I</option>
            <option>Class II</option>
            <option>Class III</option>
          </select>
        </div>

        {/* Select Employee */}
        <div className="col-md-4 mb-3">
          <label className="form-label">Select Employee</label>
          <select className="form-select">
            <option>-- Select Employee --</option>
            <option>Raju</option>
            <option>Kapil</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Year-wise Salary Table */}
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>Name</th>
            <th>Salary</th>
            <th>Deductions</th>
            <th>Allowance</th>
            <th>Net Pay</th>
            <th>View Details</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>John Doe</td>
            <td>500000</td>
            <td>60000</td>
            <td>70000</td>
            <td>510000</td>
            <td>
              <button className="btn btn-primary btn-sm">View</button>
            </td>
          </tr>
          <tr>
            <td>Jane Smith</td>
            <td>450000</td>
            <td>50000</td>
            <td>60000</td>
            <td>460000</td>
            <td>
              <button className="btn btn-primary btn-sm">View</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default SalaryReport;
