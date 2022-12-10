import React from 'react';
import useTitle from '../../Utils/useTitle';

const ForgotPassword = () => {
    useTitle('Forgot password'); // PAGE TITLE
    
  return (
    <div className="main-banner">
        <div className="container ">
            <div className="row d-flex justify-content-center">
                <div className="card  z-index-5 col-md-6">
                    <div className="row align-items-center text-center">
                        <div className="col-md-12">
                            <div className="card-body login-body">
                                <img src="https://cdn-icons-png.flaticon.com/512/6195/6195699.png" alt="" className="login-icon mb-4" />
                                <h4 className="mb-3 f-w-400">Forgot Password</h4>
                                <div className=" form-floating mb-3">
                                    <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Email address</label>
                                </div>
                                <button className="btn btn-block btn-primary p-2 px-3">Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
  )
}

export default ForgotPassword;