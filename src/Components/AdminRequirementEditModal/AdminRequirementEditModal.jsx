import React from 'react'

const AdminRequirementEditModal = (props) => {
    const handleUpdateForm = () => {        
        const scholarship_name = document.getElementById('floatingScholarshipName').value;
        const scholarship_detail = document.getElementById('floatingScholarshipDetails').value;

        props.handleUpdate(scholarship_name, scholarship_detail);
    }

    if (!props.show) return null;

  return (
    <div className="modal " onClick={props.onClose}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Edit Requirements</h1>
                <button type="button" className="btn-close" onClick={props.onClose}></button>
            </div>
            <div className="modal-body">
                <div className='editForm'>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingScholarshipName" placeholder="Scholaship Name" defaultValue={props.data?.scholarships.scholarship_name}  readOnly/>
                        <label htmlFor="floatingScholarshipName">Scholarship Name</label>
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingScholarshipDetails" placeholder="Scholarship Details" defaultValue={props.data?.requirement} />
                        <label htmlFor="floatingScholarshipDetails">Requirement</label>
                    </div>
                </div>  
            </div>
            <div className="modal-footer d-flex justify-content-between">
                <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                <div className="btn-group" role="group">
                    <button type="button" className="btn btn-danger" onClick={props.handleDelete} >Delete</button>
                    <button type="button" className="btn btn-success" onClick={handleUpdateForm} >Update</button>
                </div>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AdminRequirementEditModal;