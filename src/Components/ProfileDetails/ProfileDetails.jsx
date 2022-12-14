import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';
import './ProfileDetails.css';

const ProfileDetails = (props) => {
    const [profileData, setProfileData] = useState(props.scholarData);
    const [isLoading, setIsLoading] = useState(false);
    const { userAuth, jwt_token } = useAuthStore();

    const [firstName, setFirstName] = useState(userAuth.first_name);
    const [lastName, setLastName] = useState(userAuth.last_name);

    const handleUpdateAdminProfile = () => {
        const first_name = document.getElementById('floatingFirstName').value;
        const last_name = document.getElementById('floatingLastName').value;

        setIsLoading(true);

        
        axios.put(`${process.env.REACT_APP_API_LINK}/admin`,
        {id: userAuth.id ,first_name, last_name, token: jwt_token}
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
                toast.success('Admin details updated successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                  });
                  userAuth.first_name = firstName;
                  userAuth.last_name = lastName;
            }else{
                toast.error('Error on updating Admin details!', {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }
        })
        .catch((error) => {
            toast.error('Error on updating Admin details!', {
                position: toast.POSITION.TOP_RIGHT
              });
        })

            
        setIsLoading(false);
    }

    const onChangeFirstName = (e) => {
        setFirstName(e.target.value);
    }

    const onChangeLastName = (e) => {
        setLastName(e.target.value);
    }



  return (
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
                                    <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" onChange={onChangeFirstName} value={firstName}/>
                                    <label htmlFor="floatingFirstName">First Name</label>
                                </div>
                            </div>
                            <div className='form-floating col-md-6 col-sm-12 mb-3'>
                                <div className='form-floating'>
                                    <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name" onChange={onChangeLastName} value={lastName}/>
                                    <label htmlFor="floatingLastName">Last Name</label>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                
            <div className='row px-2 py-3'>
            <button className='btn btn-primary' onClick={handleUpdateAdminProfile}>Update Detail</button>
            </div> 
                
        </div>
        
    </div>
  )
}

export default ProfileDetails;