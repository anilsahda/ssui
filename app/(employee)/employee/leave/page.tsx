import React from "react";

function LeavePage() {
  return (
    <div className="container mt-4">
      {/* Card Section */}
      <div className="card shadow-sm">
        <div className="card-header bg-primary text-white text-center border-bottom">
          <h4 className="mb-0">Apply Leave</h4>
        </div>

        <div className="card-body">
          <div className="row">
            { /* Leave Type */}
            <div className="mb-3">
              <label className="form-label fw-bold">Leave Type</label>
              <select className="form-control">
                <option>Select Leave Type</option>
                <option>Happiness Leave</option>
                <option>Wedding Leave</option>
                <option>Guru Gobind SinghJi Birthday</option>
                <option>Lohri</option>
                <option>Pongal & Makar Sankrati</option>
                <option>Vaisakhi</option>
                <option>Maha Shivratri</option>
                <option>Ram Navami</option>

              </select>
            </div>

            {/* From Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">From Date</label>
              <input type="date" className="form-control" />
            </div>


             {/* To date Date */}
            <div className="col-md-6 mb-3">
              <label className="form-label fw-bold">To Date</label>
              <input type="date" className="form-control" />
            </div>


            {/* Reason */}
            <div className="col-12 mb-3">
              <label className="form-label fw-bold">Reason</label>
              <textarea className="form-control" rows={3} placeholder="Enter Reason"></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <div className="text-end">
            <button className="btn btn-primary">Leave Apply</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeavePage;
