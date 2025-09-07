import React from 'react'

function page() {
  return (
    <div className="container mt-4">
      <h2>Manage Role</h2>

      <div className="mb-3">
        <input type="text" placeholder="Enter Role" className="form-control" />
      </div>

      <div className="mb-4">
        <button className="btn btn-primary me-2">Add Role</button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Super Admin</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>              
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>Admin</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>              
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>User</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>              
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  )
}

export default page
