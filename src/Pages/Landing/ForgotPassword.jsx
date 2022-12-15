import axios from 'axios';
import React from 'react';
import { toast, ToastContainer } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';
import useTitle from '../../Utils/useTitle';

const ForgotPassword = () => {
    const { jwt_token } = useAuthStore();
    useTitle('Forgot password'); // PAGE TITLE

    const handleResetPassword = async() => {
        const scholarID = document.getElementById('floatingInput').value;
        await   axios.post(`${process.env.REACT_APP_API_LINK}/auth/password-request`,
        {id_number: scholarID, token: jwt_token},
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            if(response.data.status){
                toast.success('Your request has been process kindly check your sms.', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }else{
                toast.error('You changed your password recently, Unable to change password', {
                    position: toast.POSITION.TOP_RIGHT,
                });
            }
        })
        .catch((error) => {
            toast.error('Server connection error!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
    }
    
  return (
    <>
    <ToastContainer />
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
                                    <input type="text" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                    <label htmlFor="floatingInput">Scholar ID Number</label>
                                </div>
                                <button className="btn btn-block btn-primary p-2 px-3" onClick={handleResetPassword}>Reset Password</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
  </div>
    </>
  )
}

export default ForgotPassword;