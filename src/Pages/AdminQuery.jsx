import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import AdminQueryAndConcern from '../Components/AdminQueryAndConcern/AdminQueryAndConcern';
import useTitle from '../Utils/useTitle';

const AdminQuery = () => {
    useTitle('Query and Concern'); // PAGE TITLE

  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>Scholar Query and Concer</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Query & Concern</span>
                </div>
            </div>

            <div className='row'>
                <AdminQueryAndConcern />
            </div>
        </div>
    </div>
  )
}

export default AdminQuery;