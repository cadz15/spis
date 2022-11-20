import React from 'react';

const RegisterScholarForm = () => {
  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Register Scholar </h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-3 ">
            <form method='post'>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className='form-floating'>
                                    <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" />
                                    <label htmlFor="floatingFirstName">First Name</label>
                                </div>
                            </div>
                            <div className='form-floating col-md-6 col-sm-12 mb-3'>
                                <div className='form-floating'>
                                    <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name" />
                                    <label htmlFor="floatingLastName">Last Name</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingIdNumber" placeholder="ID number" />
                                    <label htmlFor="floatingIdNumber">ID Number</label>
                                </div>
                            </div>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingCourse" placeholder="Course" />
                                    <label htmlFor="floatingCourse">Course</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingYearLevel" placeholder="Year Level" />
                                    <label htmlFor="floatingYearLevel">Year Level</label>
                                </div>
                            </div>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id='floatingScholarship'>
                                        <option value="1">CHED</option>
                                        <option value="2">TES</option>
                                        <option value="3">FHE</option>
                                        <option value="2">DOST</option>
                                    </select>
                                    <label htmlFor="floatingScholarship">Scholarship</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className=' col-md-6 col-sm-12 mb-3'>                                
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingPhone" placeholder="Phone Number" required/>
                                    <label htmlFor="floatingPhone">Phone Number</label>
                                </div>
                            </div>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingEmail" placeholder="E-mail" required/>
                                    <label htmlFor="floatingEmail">E-mail</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='col-sm-12 d-flex justify-content-end'>
                    <div className='row px-2 py-3 col-md-2 col-sm-12'>
                        <button className='btn btn-primary py-3'>Add Scholar</button>
                    </div>
                </div>

            </form>
        </div>
    </div>
  )
}

export default RegisterScholarForm;