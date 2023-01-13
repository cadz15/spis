import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import AdminReports from '../Components/AdminReports/AdminReports';
import useTitle from '../Utils/useTitle';

const AdminReport = () => {
    useTitle('Generate Report'); // PAGE TITLE

    return (
      <div className='main-content-bg'>
          <div className='main-content p-4'>
              <div className='breacrumb-container mb-4'>
                  <span className='subtext fs-5'>Generate Report</span>
                  <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                      <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Reports</span>
                  </div>
              </div>
  
              <div className='row'>
                  <AdminReports />
              </div>
          </div>
      </div>
    )
}

export default AdminReport;