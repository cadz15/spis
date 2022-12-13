import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';
import './ChangePassword.css';

const ChangePassword = ({ id_number = 0 }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const { jwt_token, userAuth } = useAuthStore();
    const [hasError, setHasError] = useState({});
    const [hideError, setHideError] = useState(true);

    const onChangeNewPassword = (e) => {        
        setNewPassword(e.target.value)
    }

    const onChangeConfirmPassword = (e) => {        
        setConfirmPassword(e.target.value)
    }

    const handleChangePasswordScholar = async() => {

        if(newPassword !== '' && (newPassword === confirmPassword)){
            setHasError(['']);
            setHideError(true);
            
            await axios.post(`${process.env.REACT_APP_API_LINK}/auth/changePasswordScholar`,
            {password: newPassword, account_type: userAuth.account_type, id_number, token: jwt_token},
            { 
                headers: {
                    "Authorization" : `Bearer ${jwt_token}`,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    'withCredentials': 'true'
                }
            })
            .then((response) => {
                if(response.data.status){
                    toast.success('Password successfully updated!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }else{
                    setHasError(response.data.errors);
                    setHideError(false);
                }
            })
            .catch((error) => {
                toast.error('Server connection error!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        }else{
            setHasError({'Error': ['Password and confirm password should be same']});
            setHideError(false);
        }
    }

    const handleChangePasswordAdmin = async() => {

        if(newPassword !== '' && (newPassword === confirmPassword)){
            setHasError(['']);
            setHideError(true);
            await axios.post(`${process.env.REACT_APP_API_LINK}/auth/changePasswordAdmin`,
            {password: newPassword,id: userAuth.id, token: jwt_token},
            { 
                headers: {
                    "Authorization" : `Bearer ${jwt_token}`,
                    'Accept' : 'application/json',
                    'Content-Type': 'application/json',
                    'withCredentials': 'true'
                }
            })
            .then((response) => {
                if(response.data.status){
                    toast.success('Password successfully updated!', {
                        position: toast.POSITION.TOP_RIGHT,
                    });
                }else{
                    setHasError(response.data.errors);
                    setHideError(false);
                }
            })
            .catch((error) => {
                toast.error('Server connection error!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            })
        }else{
            setHasError(['Password and confirm password should be same']);
            setHideError(false);
        }
    }

  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Change Password</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body px-3 m-0 ">
            <div className={`alert alert-danger alert-dismissible fade show ${hideError? 'd-none': ''} `} role="alert">
                {hasError && 
                    Object.entries(hasError).map((errorValidation) => (
                    <p key={errorValidation[0]}><strong>{errorValidation[0] !== '0' ? errorValidation[0]: ''}</strong> {errorValidation[1]} </p>
                    ))
                }
            </div>
            <div className=" ">
                <div className='row'>
                    <div className='mb-3'>
                        <div className='form-floating'>
                            <input type="password" className="form-control" id="floatingNewPassword" placeholder="New Password" onChange={onChangeNewPassword} value={newPassword} required/>
                            <label htmlFor="floatingNewPassword">New Password</label>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='mb-3'>
                        <div className='form-floating'>
                            <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" onChange={onChangeConfirmPassword} value={confirmPassword} required />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row px-2 py-3'>
                {id_number !== 0? (
                    <button className='btn btn-primary' onClick={handleChangePasswordScholar}>Update Password</button>
                ):(
                    <button className='btn btn-primary' onClick={handleChangePasswordAdmin}>Update Admin Password</button>
                )}
                
            </div>
        </div>
    </div>
  )
}

export default ChangePassword;