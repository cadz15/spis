import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import DocumentCard from '../Components/DocumentCard/DocumentCard';
import UploadDocument from '../Components/UploadDocument/UploadDocument';
import useTitle from '../Utils/useTitle';

const ScholarDocumentUpload = () => {
    useTitle('Scholar Upload Document'); // PAGE TITLE

  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>Document Upload</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Document Upload</span>
                </div>
            </div>

            <div className='row'>
                <div className='col-md-12 col-lg-12'>
                    <div className='row'>
                        <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                            <UploadDocument />
                        </div>
                        <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                            <DocumentCard />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ScholarDocumentUpload;