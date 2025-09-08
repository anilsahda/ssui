import React from "react";

function SalaryReport() {
  return (
    <div className="container mt-4">
      <div className="card-header bg-primary text-white text-center border-bottom">
          <h4 className="mb-0">Salary Report</h4>
        </div>

      {/* Filters Form */}
      <form className="row mb-4 mt-2">
        {/* Select Month */}
        <div className="col-md-3 mb-3">
          <label className="form-label">Select Month</label>
          <select className="form-select">
            <option>-- Select Month --</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
            <option>July</option>
            <option>August</option>
            <option>September</option>
            <option>October</option>
            <option>November</option>
            <option>December</option>

          </select>
        </div>

        {/* Select Year */}
        <div className="col-md-3 mb-3">
          <label className="form-label">Select Year</label>
          <select className="form-select">
            <option>-- Select Year --</option>
            <option>2024</option>
            <option>2025</option>
            <option>2026</option>
          </select>
        </div>

        {/* Select Class */}
        <div className="col-md-3 mb-3">
          <label className="form-label">Select Class</label>
          <select className="form-select">
            <option>-- Select Class --</option>
            <option>Class I</option>
            <option>Class II</option>
            <option>Class III</option>
          </select>
        </div>

        {/* Select Employee */}
        <div className="col-md-3 mb-3">
          <label className="form-label">Select Employee</label>
          <select className="form-select">
            <option>-- Select Employee --</option>
            <option>John Doe</option>
            <option>Jane Smith</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="col-12 text-end">
          <button type="submit" className="btn btn-primary">
            Search
          </button>
        </div>
      </form>

      {/* Salary Report Table */}
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>Name</th>
            <th>Basic Pay</th>
            <th>Salary</th>
            <th>Deductions</th>
            <th>Allowance</th>
            <th>Net Pay</th>
            <th>Salary Receipt</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>Raju</td>
            <td>40000</td>
            <td>50000</td>
            <td>5000</td>
            <td>7000</td>
            <td>47000</td>
            <td>
              <button className="btn btn-primary btn-sm">View</button>
            </td>
          </tr>
          <tr>
            <td>Kapil yadav</td>
            <td>35000</td>
            <td>45000</td>
            <td>3000</td>
            <td>6000</td>
            <td>48000</td>
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
