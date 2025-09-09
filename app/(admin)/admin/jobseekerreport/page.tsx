import React from "react";

function page() {
  return (
    <div className="container mt-4">
      <h2>Manage Jobseeker Report</h2>

      {/* Select Jobseeker */}
      <div className="mb-3">
        <label className="form-label">Select Jobseeker</label>
        <select className="form-select">
          <option>-- Select --</option>
          <option>Rahul Sharma</option>
          <option>Priya Verma</option>
        </select>
      </div>

      {/* Button aligned right */}
      <div className="mb-3 text-end">
        <button className="btn btn-primary">View Report</button>
      </div>

      {/* Table */}
      <table className="table table-bordered">
        <thead className="table-dark">
          <tr>
            <th>Jobseeker Name</th>
            <th>Address</th>
            <th>City</th>
            <th>Pincode</th>
            <th>Mobile</th>
            <th>Degree</th>
            <th>Skill</th>
            <th>Experience</th>
            <th>Pass Year</th>
            <th>Email</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Rahul Sharma</td>
            <td>123 MG Road</td>
            <td>Delhi</td>
            <td>110001</td>
            <td>9876543210</td>
            <td>B.Tech</td>
            <td>React, Node.js</td>
            <td>2 Years</td>
            <td>2022</td>
            <td>rahul@example.com</td>
            <td>
              <button className="btn btn-sm btn-info me-2">View</button>
              <button className="btn btn-sm btn-warning me-2">Edit</button>
              <button className="btn btn-sm btn-danger">Delete</button>
            </td>
          </tr>
          <tr>
            <td>Priya Verma</td>
            <td>45 Nehru Nagar</td>
            <td>Mumbai</td>
            <td>400001</td>
            <td>9123456780</td>
            <td>MBA</td>
            <td>HR, Recruitment</td>
            <td>3 Years</td>
            <td>2021</td>
            <td>priya@example.com</td>
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
