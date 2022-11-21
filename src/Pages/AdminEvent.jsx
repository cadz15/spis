import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import EventEditModal from '../Components/EventEditModal/EventEditModal';
import EventForm from '../Components/EventForm/EventForm';
import EventList from '../Components/EventList/EventList';

const AdminEvent = () => {
    const [selectedId, setSelectedId] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [eventsList, setEventsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const  fetchData = async () => {
        setIsLoading(true);

        await fetch(`api/link`) //Change for API Link
        
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                `This is an HTTP error: The status is ${response.status}`
                );
            }
            return response.json();
        })
        
        .then((actualData) => setEventsList(actualData))
        
        .catch((err) => {
            console.log(err.message);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }

    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(current => !current);
    }

    const handleListSelect = (e) => {
        setShowModal(current => !current);
        setSelectedId(e.currentTarget.tabIndex);
    }

    useEffect(() => {
        // fetchData()
    }, [])

  return (
    <>
        <EventEditModal show={showModal} onClose={handleShowModal} data={selectedId} />
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
                                    <EventList handleListSelect={handleListSelect} data={eventsList} isLoading={isLoading}/>
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default AdminEvent;