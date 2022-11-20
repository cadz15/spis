import React from 'react';

const CourseForm = () => {
  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Create Course</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-3 ">
            <form method='post'>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingCoursehipName" placeholder="Course Name" />
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
            </form>
        </div>
    </div>
  )
}

export default CourseForm;