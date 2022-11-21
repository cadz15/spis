import React from 'react';

const CoursesEditModal = (props) => {
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
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingCoursehipName" placeholder="Course Name"  defaultValue={props.data} />
                    <label htmlFor="floatingCourseName">Course Name</label>
                </div>
                <div className="form-floating mb-3">
                    <select className="form-select" id='floatingCourseDepartment'>
                        <option value="1">CHED</option>
                        <option value="2">TES</option>
                        <option value="3">FHE</option>
                        <option value="2">DOST</option>
                    </select>
                    <label htmlFor="floatingCourseDepartment">Department</label>
                </div>
                <div className="form-floating mb-3">
                    <select className="form-select" id='floatingCourseMajor'>
                        <option value="1">CHED</option>
                        <option value="2">TES</option>
                        <option value="3">FHE</option>
                        <option value="2">DOST</option>
                    </select>
                    <label htmlFor="floatingCourseMajor">Major</label>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary'>Create Course</button>
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

export default CoursesEditModal;