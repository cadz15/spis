import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import ConfirmDeleteScholarModal from '../ConfirmDeleteScholarModal/ConfirmDeleteScholarModal';
import useAuthStore from '../../Store/globalStates';
import { useNavigate } from 'react-router-dom';

const ScholarProfileDetails = ({id_number}) => {
    const [scholarData, setScholarData] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const { jwt_token, userAuth, scholarshipData } = useAuthStore();
    const navigate = useNavigate();

    
    const handleUpdateScholarProfile = () => {
        const first_name = document.getElementById('floatingFirstName').value;
        const last_name = document.getElementById('floatingLastName').value;
        const course = document.getElementById('floatingCourse').value;
        const department = document.getElementById('floatingDepartment').value;
        const scholarship = document.getElementById('floatingScholarship').value;
        const year_level = document.getElementById('floatingYearLevel').value;
        const email = document.getElementById('floatingEmail').value;
        const phone_number = document.getElementById('floatingPhone').value;
        const major = document.getElementById('floatingMajor').value;

        
        axios.put(`${process.env.REACT_APP_API_LINK}/scholars/${id_number}`,
        {first_name, last_name,  course, department, scholarship, year_level, email, phone_number, major, token: jwt_token}
        ,{headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            if (response.data.status) {
                toast.success('Scholar details updated successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }else{
                toast.error('Error on updating Scholar details!', {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
        })
        .catch((error) => {
            toast.error('Error on updating Scholar details!', {
                position: toast.POSITION.TOP_RIGHT
              });
        })

    }

    const handleDeleteScholar = () => {
        axios.delete(`${process.env.REACT_APP_API_LINK}/scholars/${id_number}`,{ headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            if (response.data.status) {
                toast.success('Scholar successfully deleted!', {
                    position: toast.POSITION.TOP_RIGHT,
                    onClose: () => {navigate('/admin/list');}
                  });
            }else{
                toast.error('Error on deleting Scholar!', {
                    position: toast.POSITION.TOP_RIGHT,
                    onClose: () => {navigate('/admin/list');}
                  });
            }
        })
        .catch((error) => {
            toast.error('Server connection error!', {
                position: toast.POSITION.TOP_RIGHT
              });
        })
    }

    const handleCloseModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(false);
    }

    useEffect(()=> {
        axios.get(`${process.env.REACT_APP_API_LINK}/scholars/${id_number}`,{headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'withCredentials': 'true'
            }
            })
            .then((response) => {
                if(response.data.scholar.length > 0){
                    setScholarData(response.data.scholar[0]);
                }else{
                    navigate('/error/');
                }
            })
            .catch((error) => {
                console.log(error);
            });
    },[id_number])
  return (
    <>
        <ConfirmDeleteScholarModal show={showModal} handleDeleteScholar={handleDeleteScholar} onClose={handleCloseModal} id_number={id_number} />
        <div className="card latest-update-card p-0">
                <div className="card-body p-3 ">
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
                                        <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" defaultValue={scholarData?.first_name} />
                                        <label htmlFor="floatingFirstName">First Name</label>
                                    </div>
                                </div>
                                <div className='form-floating col-md-6 col-sm-12 mb-3'>
                                    <div className='form-floating'>
                                        <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name"  defaultValue={scholarData?.last_name}/>
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
                                            <input type="text" className="form-control" id="floatingIdNumber" placeholder="ID number" required defaultValue={scholarData?.id_number} readOnly/>
                                            <label htmlFor="floatingIdNumber">ID Number</label>
                                        </div>
                                    </div>
                                    <div className=' col-md-6 col-sm-12 mb-3'>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingCourse" placeholder="Course" required  defaultValue={scholarData?.course}/>
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
                                            <input type="text" className="form-control" id="floatingDepartment" placeholder="Phone Number" required defaultValue={scholarData?.department}/>
                                            <label htmlFor="floatingDepartment">Department</label>
                                        </div>
                                    </div>
                                    <div className=' col-md-6 col-sm-12 mb-3'>
                                        <div className="form-floating mb-3">
                                            <select className="form-select" id='floatingScholarship' required>
                                                {scholarshipData.length > 0 ? scholarshipData.map((scholarshipListData) => {
                                                        if(scholarData?.scholarship_name === scholarshipListData.scholarship_name){
                                                            return (<option key={scholarshipListData.id} value={scholarshipListData.id} selected>{scholarshipListData.scholarship_name}</option>)
                                                        }else{
                                                            return (<option key={scholarshipListData.id} value={scholarshipListData.id} >{scholarshipListData.scholarship_name}</option>)
                                                        }
                                                    })
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
                                            <input type="text" className="form-control" id="floatingYearLevel" placeholder="Year Level" required defaultValue={scholarData?.year_level}/>
                                            <label htmlFor="floatingYearLevel">Year Level</label>
                                        </div> 
                                    </div>
                                    <div className=' col-md-6 col-sm-12 mb-3'>
                                        <div className="form-floating mb-3">
                                            <input type="text" className="form-control" id="floatingMajor" placeholder="Major" required defaultValue={scholarData?.major}/>
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
                                            <input type="text" className="form-control" id="floatingPhone" placeholder="Phone Number" required defaultValue={scholarData?.phone_number}/>
                                            <label htmlFor="floatingPhone">Phone Number</label>
                                        </div>
                                    </div>
                                    <div className=' col-md-6 col-sm-12 mb-3'>
                                        <div className="form-floating mb-3">
                                            <input type="email" className="form-control" id="floatingEmail" placeholder="E-mail" required defaultValue={scholarData?.email}/>
                                            <label htmlFor="floatingEmail">E-mail</label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                
                        <div className='row px-2 py-3'>
                            <button className='btn btn-primary' onClick={handleUpdateScholarProfile}>Update Scholar Detail</button>
                        </div>
                        {userAuth?.account_type === 1 && (
                            <div className='row px-2'>
                                <button className='btn btn-danger' onClick={() => setShowModal(true)}>Delete Scholar</button>
                            </div>
                        )}

                
            </div>
            
        </div>
    </>
  )
}

export default ScholarProfileDetails;