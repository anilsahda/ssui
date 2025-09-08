import React from "react";

function SalaryReport() {
  return (
    <div className="container mt-4">
      {/* Page Heading */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center border-bottom">
          <h4 className="mb-0">Salary Report</h4>
        </div>
        <div className="card-body">
          {/* Filter Section */}
          <div className="row mb-3">
            {/* Year */}
            <div className="col-md-4 mb-2">
              <label className="form-label fw-bold">Year</label>
              <input type="number" className="form-control" placeholder="Enter Year" />
            </div>

            {/* Month */}
            <div className="col-md-4 mb-2">
              <label className="form-label fw-bold">Select Month</label>
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

            {/* Search Button */}
            <div className="col-md-4 d-flex align-items-end">
              <button className="btn btn-primary w-100">Search</button>
            </div>
          </div>

          {/* Table Section */}
          <div className="table-responsive">
            <table className="table table-bordered text-center align-middle">
              <thead className="table-secondary">
                <tr>
                  <th>Sr.No.</th>
                  <th>Basic Pay</th>
                  <th>Salary</th>
                  <th>Deducation</th>
                  <th>Allowance</th>
                  <th>Net Pay</th>
                  <th>View Report</th>
                </tr>
              </thead>
              <tbody>
                {/* Example Row */}
                <tr>
                  <td>1</td>
                  <td>5000</td>
                  <td>20000</td>
                  <td>1000</td>
                  <td>2500</td>
                  <td>21500</td>
                  <td>
                    <button className="btn btn-info btn-sm">View</button>
                  </td>
                </tr>
                <tr>
                  <td>2</td>
                  <td>6000</td>
                  <td>25000</td>
                  <td>1200</td>
                  <td>3000</td>
                  <td>26800</td>
                  <td>
                    <button className="btn btn-info btn-sm">View</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SalaryReport;
