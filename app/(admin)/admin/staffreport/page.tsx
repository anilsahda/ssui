import React from "react";

function Page() {
  return (
    <div className="container mt-4">
      <h2>Staff Report</h2>

      <div className="card p-4 shadow-sm">
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Mobile</th>
              <th>Qualification</th>
              <th>City</th>
              <th>Pincode</th>
              <th>Photo</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {/* Example row */}
            <tr>
              <td>John Doe</td>
              <td>john@example.com</td>
              <td>9876543210</td>
              <td>MBA</td>
              <td>Delhi</td>
              <td>110001</td>
              <td>photo.jpg</td>
              <td>
                <button className="btn btn-info btn-sm me-2">View</button>
                <button className="btn btn-sm btn-warning me-2">Edit</button>
                <button className="btn btn-sm btn-danger">Delete</button>
              </td>
            </tr>

            {/* Empty row if no data */}
            {/* 
            <tr>
              <td colSpan="8" className="text-center">No Staff Records Found</td>
            </tr> 
            */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Page;
