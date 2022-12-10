import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import SMSBlastForm from '../Components/SMSBlastForm/SMSBlastForm';
import useTitle from '../Utils/useTitle';

const AdminSMSBlast = () => {
    useTitle('SMS Blast'); // PAGE TITLE

  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>SMS Blast</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> SMS Blast</span>
                </div>
            </div>

            <div className='row'>
                <SMSBlastForm />            
            </div>
        </div>
    </div>
  )
}

export default AdminSMSBlast;