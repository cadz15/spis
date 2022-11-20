import React from 'react';
import './ChangePassword.css';

const ChangePassword = () => {
  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Change Password</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body px-3 m-0 ">

            <div className=" ">
                <div className='row'>
                    <div className='mb-3'>
                        <div className='form-floating'>
                            <input type="password" className="form-control" id="floatingNewPassword" placeholder="New Password" />
                            <label htmlFor="floatingNewPassword">New Password</label>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='mb-3'>
                        <div className='form-floating'>
                            <input type="password" className="form-control" id="floatingConfirmPassword" placeholder="Confirm Password" />
                            <label htmlFor="floatingConfirmPassword">Confirm Password</label>
                        </div>
                    </div>
                </div>
            </div>

            <div className='row px-2 py-3'>
                <button className='btn btn-primary'>Update Password</button>
            </div>
        </div>
    </div>
  )
}

export default ChangePassword;