import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ScholarList from '../Components/ScholarList/ScholarList';
import useTitle from '../Utils/useTitle';

const ListScholar = () => {
    useTitle('Scholar list'); // PAGE TITLE

  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>Scholar List</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Scholar List</span>
                </div>
            </div>

            <div className='row'>
                <ScholarList />
            </div>
        </div>
    </div>
  )
}

export default ListScholar;