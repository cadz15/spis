import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Landing.css';
import useAuthStore from '../../Store/globalStates';
import useTitle from '../../Utils/useTitle';

const Landing = () => {
    const [error, setError] = useState(null);
    const { userAuth, addUser, setToken, jwt_token, setScholarships } = useAuthStore();
    const navigate = useNavigate();

    useTitle('Welcome to SPIS'); // PAGE TITLE


    const hanldeGetScholarship = async () => {
        await axios.get(`${process.env.REACT_APP_API_LINK}/scholarship`, { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            setScholarships(response.data)
        })
        .catch((error) => {
            console.log(error);
        })
    }

    const handleLogin = async () => {
        const username = document.getElementById('floatingUsername').value;
        const password = document.getElementById('floatingPassword').value;
        
        await axios.post(`${process.env.REACT_APP_API_LINK}/auth/login`, {username, password})
        .then((response) => {
            if(response.data.status){
                addUser(response.data.user);
                setToken(response.data.access_token);
            }else{
                if(response.data.message === undefined) {
                    setError('Empty Username or Password!');
                }else{
                    setError(response.data.message);
                }
            }
        })
        .catch((error) => {
            setError(error.response?.data?.message);
        });
        
    }

    useEffect(() => {
        setError(null);        
        hanldeGetScholarship()
        if(userAuth?.account_type === 1){
            navigate('/admin/dashboard/');
        }else if(userAuth?.account_type === 2) {
            navigate('/scholar/dashboard/');
        }
    },[userAuth])


   return (
        <div className="main-banner">
                <div className="container d-flex align-items-center">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="row">
                                <div className="col-lg-6 align-self-center mb-5">
                                    <div className="left-content ">
                                        <div className="row">
                                            <div className="col-lg-12 z-index-5 ">
                                                <h2>Scholar Profiling Information System</h2>
                                                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perferendis inventore error ut ab non ipsum tempora laboriosam sed, accusantium magni porro deserunt doloribus! Ex corrupti non magni, iusto mollitia aut.</p>
                                            </div>                        
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-6 z-index-5">
                                    <div className="auth-wrapper">
                                        <div className="auth-content">
                                            <div className="card">
                                                <div className="row align-items-center text-center">
                                                    <div className="col-md-12">
                                                        <div className="card-body login-body">
                                                            <img src="https://cdn-icons-png.flaticon.com/512/5526/5526478.png" alt="" className="login-icon mb-4" />
                                                            <h4 className="mb-3 f-w-400">Signin</h4>
                                                            <div className={`alert alert-danger alert-dismissible fade show ${error == null ? 'd-none': ''} `} role="alert">
                                                                <strong>Error!</strong> {`${error}`}
                                                            </div>
                                                            <div className=" form-floating mb-3">
                                                                <input type="email" className="form-control" id="floatingUsername" placeholder="name@example.com" />
                                                                <label htmlFor="floatingUsername">Email address</label>
                                                            </div>
                                                            <div className="form-floating">
                                                                <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                                                <label htmlFor="floatingPassword">Password</label>
                                                            </div>
                                                            <div className="my-3">
                                                                <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" defaultChecked />
                                                                <label className="px-2" htmlFor="flexCheckChecked">Save credentials.</label>
                                                                <span><Link to='/ForgotPassword' className='text-primary'>Forgot Password?</Link></span>
                                                            </div>
                                                            <button className="btn btn-block btn-primary p-2 px-3" onClick={handleLogin}>Login</button>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
        </div>
    
  )
}

export default Landing;