import React, { useState } from 'react';
import useAuthStore from '../../Store/globalStates';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterScholarForm = () => {
    const [hideError, setHideError] = useState(true);
    const { jwt_token } = useAuthStore();
    const navigate = useNavigate();
    const [hasError, setHasError] = useState({})



    const handleRegisterScholar = () => {        
        const first_name = document.getElementById('floatingFirstName').value;
        const last_name = document.getElementById('floatingLastName').value;
        const id_number = document.getElementById('floatingIdNumber').value;
        const course = document.getElementById('floatingCourse').value;
        const department = document.getElementById('floatingDepartment').value;
        const scholarship = document.getElementById('floatingScholarship').value;
        const year_level = document.getElementById('floatingYearLevel').value;
        const email = document.getElementById('floatingEmail').value;
        const phone_number = document.getElementById('floatingPhone').value;
        const major = document.getElementById('floatingMajor').value;

        axios.post(`${process.env.REACT_APP_API_LINK}/scholars`, 
        {first_name, last_name, id_number, course, department, scholarship, year_level, email, phone_number, major, token: jwt_token}, 
        {headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            if(response.data.errors){
                setHasError(response.data.errors)
                setHideError(false);
            }else {
                setHideError(true);
                setHasError({});
                toast.success('Scholar registered successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    onClose: () => {navigate('/admin/list');}
                });
            }
        })
        .catch((error) => {
            console.log(error);
            console.log(jwt_token);
        })
    }



  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Register Scholar </h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-3 ">
            <div>
                <div className={`alert alert-danger alert-dismissible fade show ${hideError? 'd-none': ''} `} role="alert">
                    {hasError && 
                        Object.entries(hasError).map((errorValidation) => (
                        <p key={errorValidation[0]}><strong>{errorValidation[0]}</strong> {errorValidation[1]} </p>
                        ))
                    }
                </div>

                <div className='row'>
                    <div className='col-md-12'>
                        <div className='row'>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className='form-floating'>
                                    <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name"  required/>
                                    <label htmlFor="floatingFirstName">First Name</label>
                                </div>
                            </div>
                            <div className='form-floating col-md-6 col-sm-12 mb-3'>
                                <div className='form-floating'>
                                    <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name" required/>
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
                                    <input type="text" className="form-control" id="floatingIdNumber" placeholder="ID number" required/>
                                    <label htmlFor="floatingIdNumber">ID Number</label>
                                </div>
                            </div>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingCourse" placeholder="Course" required/>
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
                                    <input type="text" className="form-control" id="floatingDepartment" placeholder="Phone Number" required/>
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
                                    <input type="text" className="form-control" id="floatingYearLevel" placeholder="Year Level" required/>
                                    <label htmlFor="floatingYearLevel">Year Level</label>
                                </div> 
                            </div>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingMajor" placeholder="Major" required/>
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
                        <button className='btn btn-primary py-3' onClick={handleRegisterScholar}>Add Scholar</button>
                    </div>
                </div>

            </div>
        </div>
    </div>
  )
}

export default RegisterScholarForm;