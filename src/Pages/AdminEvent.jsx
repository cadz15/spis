import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import EventForm from '../Components/EventForm/EventForm';
import EventList from '../Components/EventList/EventList';

const AdminEvent = () => {
  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>Events</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Events</span>
                </div>
            </div>

            <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <EventForm />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <EventList />
                            </div>

                        </div>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default AdminEvent;