import React from "react";

function Salary() {
  return (
    <div className="container mt-4">
        <div className="card-header bg-primary text-white text-center border-bottom">
          <h4 className="mb-0">Geneate Salary</h4>
        </div>

      {/* Salary Search Form */}
      <form className="row mb-4 mt-2">
        {/* Select Month */}
        <div className="col-md-3">
          <label className="form-label">Select Month</label>
          <select className="form-select">
            <option>-- Select Month --</option>
            <option>January</option>
            <option>February</option>
            <option>March</option>
            <option>April</option>
            <option>May</option>
            <option>June</option>
          </select>
        </div>

        {/* Current Salary */}
        <div className="col-md-3">
          <label className="form-label">Current Salary</label>
          <input type="number" className="form-control" placeholder="Enter Salary" />
        </div>

        {/* Select Class */}
        <div className="col-md-3">
          <label className="form-label">Select Class</label>
          <select className="form-select">
            <option>-- Select Class --</option>
            <option>Class I</option>
            <option>Class II</option>
            <option>Class III</option>
          </select>
        </div>

        {/* Select Employee */}
        <div className="col-md-2">
          <label className="form-label">Select Employee</label>
          <select className="form-select">
            <option>-- Select Employee --</option>
            <option>Kapil</option>
            <option>Other Name</option>
          </select>
        </div>

        {/* Search Button */}
        <div className="col-md-1 d-flex align-items-end">
          <button type="submit" className="btn btn-primary w-100">
            Search
          </button>
        </div>
      </form>

      {/* Salary Details Table */}
      <table className="table table-bordered table-striped table-hover">
        <thead className="table-dark text-center">
          <tr>
            <th>Name</th>
            <th>Account No.</th>
            <th>Basic Pay</th>
            <th>Salary</th>
            <th>Total Leave</th>
            <th>Approved Leave</th>
            <th>Leave Deduction</th>
            <th>Travel Allowance</th>
            <th>Medical Allowance</th>
            <th>Washing Allowance</th>
            <th>DA</th>
            <th>HR</th>
          </tr>
        </thead>
        <tbody className="text-center">
          <tr>
            <td>kapil Yadav</td>
            <td>1234567890</td>
            <td>40000</td>
            <td>50000</td>
            <td>2</td>
            <td>1</td>
            <td>1000</td>
            <td>2000</td>
            <td>1500</td>
            <td>500</td>
            <td>3000</td>
            <td>2500</td>
          </tr>
        </tbody>
      </table>

      {/* Generate Salary Button */}
      <div className="text-end mt-3">
        <button className="btn btn-primary">Generate Salary</button>
      </div>
    </div>
  );
}

export default Salary;
