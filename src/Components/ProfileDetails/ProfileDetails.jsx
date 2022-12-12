import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import useAuthStore from '../../Store/globalStates';
import './ProfileDetails.css';

const ProfileDetails = (props) => {
    const [profileData, setProfileData] = useState(props.scholarData);
    const [isLoading, setIsLoading] = useState(false);
    const { userAuth, jwt_token } = useAuthStore();

    const handleUpdateAdminProfile = () => {
        setIsLoading(true);

        
        console.log('lmao');

            
        setIsLoading(false);
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
                                    <input type="text" className="form-control" id="floatingFirstName" placeholder="First Name" defaultValue={profileData?.first_name} />
                                    <label htmlFor="floatingFirstName">First Name</label>
                                </div>
                            </div>
                            <div className='form-floating col-md-6 col-sm-12 mb-3'>
                                <div className='form-floating'>
                                    <input type="text" className="form-control" id="floatingLastName" placeholder="Last Name"  defaultValue={profileData?.last_name}/>
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