import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import DocumentSubmitted from '../Components/DocumentSubmitted/DocumentSubmitted';

const AdminDocument = () => {
  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>Document Submitted</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Document Submitted</span>
                </div>
            </div>

            <div className='row'>
                <DocumentSubmitted />
            </div>
        </div>
    </div>
  )
}

export default AdminDocument;