import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import RegisterScholarForm from '../Components/RegisterScholarForm/RegisterScholarForm';
import useTitle from '../Utils/useTitle';

const RegisterScholar = () => {
    useTitle('Register Scholar'); // PAGE TITLE


  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>Register Scholar</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Register Scholar</span>
                </div>
            </div>

            <div className='row'>
                <RegisterScholarForm />            
            </div>
        </div>
    </div>
  )
}

export default RegisterScholar;