import React from 'react';
import './Landing.css';

const Landing = () => {
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
                                                    <div className=" form-floating mb-3">
                                                        <input type="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                                        <label htmlFor="floatingInput">Email address</label>
                                                    </div>
                                                    <div className="form-floating">
                                                        <input type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                                                        <label htmlFor="floatingPassword">Password</label>
                                                    </div>
                                                    <div className="my-3">
                                                        <input className="form-check-input" type="checkbox" value="" id="flexCheckChecked" checked />
                                                        <label className="px-2" htmlFor="flexCheckChecked">Save credentials.</label>
                                                    </div>
                                                    <button className="btn btn-block btn-primary p-2 px-3">Login</button>
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