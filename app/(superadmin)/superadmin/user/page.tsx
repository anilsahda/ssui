import React from 'react'

function page() {
  return (
    <div className="container mt-4">
      <h2>Manage User</h2>

      <div className='row'>
        <div className="col-md-6 mb-3">
          <input type="text" placeholder="Enter Name" className="form-control" />
        </div>
        <div className="col-md-6 mb-3">
          <input type="mobile" placeholder="Enter Mobile" className="form-control" />
        </div>
      </div>

      <div className='row'>
        <div className="col-md-6 mb-3">
          <input type="email" placeholder="Enter Email" className="form-control" />
        </div>
        <div className="col-md-6 mb-3">
          <input type="password" placeholder="Enter Password" className="form-control" />
        </div>
      </div>

      <div className="mb-4">
        <button className="btn btn-primary me-2">Add User</button>
      </div>

      <table className="table table-bordered table-striped">
        <thead className="table-light">
          <tr>
            <th>Id</th>
            <th>Name</th>
            <th>Mobile</th>
            <th>Email</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>Philip</td>
            <td>9999999999</td>
            <td>philip@gmail.com</td>
            <td>Philip@121</td>                        
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>              
            </td>
          </tr>
          <tr>
            <td>2</td>
            <td>John</td>
            <td>9999999999</td>
            <td>john@gmail.com</td>
            <td>John@121</td>                        
            <td>
              <button className="btn btn-warning me-1">Edit</button>
              <button className="btn btn-danger me-1">Delete</button>
              <button className="btn btn-success">View</button>              
            </td>
          </tr>
          <tr>
            <td>3</td>
            <td>Paul</td>
            <td>9999999999</td>
            <td>paul@gmail.com</td>
            <td>Paul@121</td>                        
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
