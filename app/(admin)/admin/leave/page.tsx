import React from "react";

function LeavePage() {
  return (
    <div className="container mt-4">
      {/* Card for Leave Form */}
      <div className="card shadow-sm">
        <div className="bg-primary text-white text-center py-2 mb-3 rounded-top">
          <h4 className="mb-0">Apply Leave</h4>
        </div>

        <div className="card-body">

          <div className="row mb-2">
            { /* Leave Type */}
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

          <div className="row">
            {/* From Date */}
            <div className="col-md-6 mb-3">
              <label htmlFor="fromDate" className="form-label fw-bold border-bottom pb-1">
                From Date
              </label>
              <input type="date" id="fromDate" className="form-control" />
            </div>


            {/* To Date */}
            <div className="col-md-6 mb-3">
              <label htmlFor="fromDate" className="form-label fw-bold border-bottom pb-1">
                From Date
              </label>
              <input type="date" id="fromDate" className="form-control" />
            </div>


            {/* Reason */}
            <div className="col-md-12 mb-3">
              <label htmlFor="reason" className="form-label fw-bold border-bottom pb-1">
                Reason
              </label>
              <textarea id="reason" className="form-control" rows={3} placeholder="Enter reason for leave"></textarea>
            </div>
          </div>

          {/* Leave Apply Button */}
          <div className="text-end">
            <button className="btn btn-primary" type="button">
              Leave Apply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LeavePage;
