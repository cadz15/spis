import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ChangePassword from '../Components/ChangePassword/ChangePassword';
import ScholarProfileDetails from '../Components/ScholarProfileDetails/ScholarProfileDetails';
import EventList from '../Components/EventList/EventList';
import DocumentCard from '../Components/DocumentCard/DocumentCard';
import useTitle from '../Utils/useTitle';
import { useParams } from 'react-router-dom';

const Profiles = () => {
    const { id } = useParams(); //Get route parameter :id

    useTitle('Scholar Profile'); // PAGE TITLE
  return (
    <>
        <div className='main-content-bg'>
            <div className='main-content p-4'>
                <div className='breacrumb-container mb-4'>
                    <span className='subtext fs-5'>Profile</span>
                    <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                        <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Profile</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <ScholarProfileDetails id_number={id} />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ChangePassword />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <EventList />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <DocumentCard />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Profiles;