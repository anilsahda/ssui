import React from 'react'

function page() {
  return (
    <div className="container mt-4">
      <h2>Manage User Role</h2>

      <div className="mb-3">
        <select className='form-control'>
          <option>Select User</option>
          <option>Philip</option>
          <option>John</option>
          <option>Paul</option>
        </select>
      </div>

      <div className="mb-3">
        <select className='form-control'>
          <option>Select Role</option>
          <option>Super Admin</option>
          <option>Admin</option>
          <option>User</option>
        </select>
      </div>

      <div className="mb-4">
        <button className="btn btn-primary me-2">Assing Role</button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>User</th>
            <th>Role</th>            
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Philip</td>
            <td>Super Admin</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>              
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>John</td>
            <td>Admin</td>
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>              
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Paul</td>
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
