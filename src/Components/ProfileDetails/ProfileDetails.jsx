import React from 'react';
import useAuthStore from '../../Store/globalStates';
import './ProfileDetails.css';

const ProfileDetails = () => {
    const { userAuth } = useAuthStore();


  return (
    <div className="card latest-update-card p-0">
        <div className="card-body p-3 ">
            <form method='post'>

                <div className='row '>
                    <div className='profile-image-container d-flex  justify-content-center'>
                        <img className="profile-avatar" src="https://cdn-icons-png.flaticon.com/512/3048/3048127.png" alt="User-Profile-Image" />
                    </div>                    
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className='form-floating'>
                                    <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" defaultValue={userAuth.first_name} />
                                    <label htmlFor="floatingFirstName">First Name</label>
                                </div>
                            </div>
                            <div className='form-floating col-md-6 col-sm-12 mb-3'>
                                <div className='form-floating'>
                                    <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name"  defaultValue={userAuth.last_name}/>
                                    <label htmlFor="floatingLastName">Last Name</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {userAuth.account_type !== 1 && (<>
                    <div className='row'>
                        <div className='col-md-12'>
                            <div className='row'>
                                <div className=' col-md-6 col-sm-12 mb-3'>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingIdNumber" placeholder="ID number" required defaultValue={userAuth.id_number}/>
                                        <label htmlFor="floatingIdNumber">ID Number</label>
                                    </div>
                                </div>
                                <div className=' col-md-6 col-sm-12 mb-3'>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingCourse" placeholder="Course" required  defaultValue={userAuth.course}/>
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
                                        <input type="text" className="form-control" id="floatingDepartment" placeholder="Phone Number" required defaultValue={userAuth.department}/>
                                        <label htmlFor="floatingDepartment">Department</label>
                                    </div>
                                </div>
                                <div className=' col-md-6 col-sm-12 mb-3'>
                                    <div className="form-floating mb-3">
                                        <select className="form-select" id='floatingScholarship' required>
                                            <option value="CHED">CHED</option>
                                            <option value="TES">TES</option>
                                            <option value="FHE">FHE</option>
                                            <option value="DOST">DOST</option>
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
                                        <input type="text" className="form-control" id="floatingYearLevel" placeholder="Year Level" required defaultValue={userAuth.year_level}/>
                                        <label htmlFor="floatingYearLevel">Year Level</label>
                                    </div> 
                                </div>
                                <div className=' col-md-6 col-sm-12 mb-3'>
                                    <div className="form-floating mb-3">
                                        <input type="text" className="form-control" id="floatingMajor" placeholder="Major" required defaultValue={userAuth.major}/>
                                        <label htmlFor="floatingMajor">Major</label>
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
                                        <input type="text" className="form-control" id="floatingPhone" placeholder="Phone Number" required defaultValue={userAuth.phone_number}/>
                                        <label htmlFor="floatingPhone">Phone Number</label>
                                    </div>
                                </div>
                                <div className=' col-md-6 col-sm-12 mb-3'>
                                    <div className="form-floating mb-3">
                                        <input type="email" className="form-control" id="floatingEmail" placeholder="E-mail" required defaultValue={userAuth.email}/>
                                        <label htmlFor="floatingEmail">E-mail</label>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>)
                }

                <div className='row px-2 py-3'>
                    <button className='btn btn-primary'>Update Detail</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ProfileDetails;