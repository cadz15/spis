import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ConcernCard from '../ConcernCard/ConcernCard';
import DocumentCard from '../DocumentCard/DocumentCard';
import EventCard from '../EventCard/EventCard';
import EventList from '../EventList/EventList';
import ScholarCard from '../ScholarCard/ScholarCard';
import './Main.css';

const Main = () => {
  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>Dashboard</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Dashboard</span>
                </div>
            </div>

            <div className=''>
                <div className='row'>
                    <div className='col-sm-12 col-md-12'>
                        <div className='row'>
                            <div className='col-md-6  col-lg-3 col-sm-12 mb-3'>
                                <ScholarCard cardType='primary' />
                            </div>
                            <div className='col-md-6 col-lg-3 col-sm-12  mb-3'>
                                <ScholarCard cardType='success' />
                            </div>
                            <div className='col-md-6 col-lg-3 col-sm-12  mb-3'>
                                <ScholarCard cardType='danger' />
                            </div>
                            <div className='col-md-6 col-lg-3 col-sm-12  mb-3'>
                                <ScholarCard cardType='warning' />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='mx-1 my-3'>
                        <EventList />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <DocumentCard />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ConcernCard />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main;