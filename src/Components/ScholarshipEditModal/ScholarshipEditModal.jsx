import React from 'react';

const ScholarshipEditModal = (props) => {

    if (!props.show) return null;

  return (
    <div className="modal " onClick={props.onClose}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Edit Scholarship</h1>
                <button type="button" className="btn-close" onClick={props.onClose}></button>
            </div>
            <div className="modal-body">
                <div className='editForm'>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingScholarshipName" placeholder="Scholaship Name" defaultValue={props.data?.scholarshipName} />
                        <label htmlFor="floatingScholarshipName">Scholarship Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingScholarshipDetails" placeholder="Scholarship Details" defaultValue={props.data?.scholarshipDetail} />
                        <label htmlFor="floatingScholarshipDetails">Scholarship Details</label>
                    </div>
                </div>  
            </div>
            <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                <div class="btn-group" role="group">
                    <button type="button" class="btn btn-danger">Delete</button>
                    <button type="button" class="btn btn-success">Update</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default ScholarshipEditModal;