import React from 'react'

const AdminAcademicYearEditModal = (props) => {
    if (!props.show) return null;

    return (
      <div className="modal " onClick={props.onClose}>
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5">Confirm Activate Academic Year</h1>
                  <button type="button" className="btn-close" onClick={props.onClose}></button>
              </div>
              <div className="modal-body">
                <div>
                  Are you sure you want to activate academic year {props.academic_year}?
                </div>
              </div>
              <div className="modal-footer d-flex justify-content-end">
                  <div className="btn-group" role="group">
                      <button type="button" className="btn btn-secondary" onClick={props.onClose}>Cancel</button>
                      <button type="button" className="btn btn-warning" onClick={props.handleUpdateAcademicYear}>Update</button>
                  </div>
              </div>
              </div>
          </div>
      </div>
    )
}

export default AdminAcademicYearEditModal;