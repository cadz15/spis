import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import EventEditModal from '../Components/EventEditModal/EventEditModal';
import EventForm from '../Components/EventForm/EventForm';
import EventList from '../Components/EventList/EventList';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const AdminEvent = () => {
    const [selectedId, setSelectedId] = useState(0);
    const [refreshList, setRefreshList] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [eventsList, setEventsList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [recipientList, setRecipientList] = useState([]);
    const { jwt_token } = useAuthStore();

    useTitle('Events'); // PAGE TITLE

    const  fetchData = () => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_LINK}/events`, 
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            setEventsList(response.data);
            setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }

    const getRecipientList = () => {
        axios.get(`${process.env.REACT_APP_API_LINK}/scholars/recipient`, 
        {headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            setRecipientList(response.data);
        })
        .catch((error) => console.log(error));
    }

    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) {
            setShowModal(current => !current)
        };
    }

    const handleListSelect = (e) => {
        setSelectedId(eventsList.filter((event) => event.id === e.currentTarget.tabIndex));
        setShowModal(current => !current);
    }

    const closeModalUpdate = () => {
        setShowModal(false);
    }

    useEffect(() => {
        fetchData();
        getRecipientList()
        setRefreshList(false);
    }, [refreshList])

  return (
    <>
        <EventEditModal show={showModal} onClose={handleShowModal} refreshList={setRefreshList} recipientList={recipientList} data={selectedId} closeModalUpdate={closeModalUpdate} />
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