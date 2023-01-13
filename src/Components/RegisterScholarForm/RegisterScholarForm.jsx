import React, { useState } from 'react';
import useAuthStore from '../../Store/globalStates';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

const RegisterScholarForm = () => {
    const [hideError, setHideError] = useState(true);
    const { jwt_token, scholarshipData, departmentAndCourses, academicYear } = useAuthStore();
    const navigate = useNavigate();
    const [hasError, setHasError] = useState({});
    const [courseAndMajors, setCourseAndMajors] = useState([]);
    

    const handleOnChangeDepartment = (e) => {
        setCourseAndMajors(departmentAndCourses.filter((course) => course.name === e.target.value));
    }

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
        const academic_year = document.getElementById('floatingAcademicYear').value;
        const semester = document.getElementById('floatingSemester').value;

        axios.post(`${process.env.REACT_APP_API_LINK}/scholars`, 
        {first_name, last_name, id_number, course, department, scholarship, year_level, email, phone_number, academic_year, semester, token: jwt_token}, 
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
            toast.error('Server Error. Please contact system admin!', {
                position: toast.POSITION.TOP_RIGHT,
            });
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
                                    <select className="form-select" id='floatingDepartment' required onChange={handleOnChangeDepartment}>
                                        <option key={0} value=''>--Select Department--</option>
                                        {departmentAndCourses?.length > 0 ? departmentAndCourses?.map((department) => (
                                             <option key={department.name} value={department.name}>{department.name}</option>
                                        ))
                                        :
                                        ''
                                        }
                                       
                                    </select>
                                    <label htmlFor="floatingDepartment">Department</label>
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
                                    <select className="form-select" id='floatingCourse' required>
                                        {courseAndMajors[0]?.course?.length > 0 ? courseAndMajors[0]?.course?.map((course) => (
                                             <option key={course} value={course}>{course}</option>
                                        ))
                                        :
                                        ''
                                        }
                                       
                                    </select>
                                    <label htmlFor="floatingCourse">Course</label>
                                </div>
                            </div>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id='floatingScholarship' required>
                                        {scholarshipData.length > 0 ? scholarshipData.map((scholarshipListData) => 
                                            (<option key={scholarshipListData.id} value={scholarshipListData.id}>{scholarshipListData.scholarship_name}</option>)
                                            ) 
                                            : 
                                            ''
                                        }
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
                                    <select className="form-select" id='floatingYearLevel' required>
                                        <option value={`1st Year`}>1st Year</option>
                                        <option value={`2nd Year`}>2nd Year</option>
                                        <option value={`3rd Year`}>3rd Year</option>
                                        <option value={`4th Year`}>4th Year</option>
                                    </select>
                                    <label htmlFor="floatingYearLevel">Year Level</label>
                                </div> 
                            </div>
                            <div className=' col-md-6 col-sm-12 mb-3'>                              
                                <div className="form-floating mb-3">
                                    <input type="text" className="form-control" id="floatingPhone" placeholder="Phone Number" required/>
                                    <label htmlFor="floatingPhone">Phone Number</label>
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
                                    <select className="form-select" id='floatingAcademicYear' required>
                                        {academicYear?.length > 0 ? academicYear?.map((academicYearListData) => 
                                            (<option key={academicYearListData.id} value={academicYearListData.academic_year}>{academicYearListData.academic_year}</option>)
                                            ) 
                                            : 
                                            ''
                                        }
                                    </select>                                    
                                    <label htmlFor="floatingAcademicYear">Academic Year</label>
                                </div>
                            </div>
                            <div className=' col-md-6 col-sm-12 mb-3'>
                                <div className="form-floating mb-3">
                                    <select className="form-select" id='floatingSemester' required>
                                        <option value={`1st Semester`}>1st Semester</option>
                                        <option value={`2nd Semester`}>2nd Semester</option>
                                    </select>
                                    <label htmlFor="floatingSemester">Semester</label>
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