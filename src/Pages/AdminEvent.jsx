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

    const  fetchData = () => {
        // setIsLoading(true);

       // await axios.get('http://slsu_spis.localtest/api/events',{headers: {
        //         "Authorization" : `Bearer ${jwt_token}`,
        //         'withCredentials': 'true'
        //         }
        //         }
        //     )
        //     .then((response) => {
        //         setDataList(response.data);
        //         // console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         console.log(jwt_token);
        //     })

        setEventsList([
            {
                id: 0,
                event: 'This is dummy event #1',
                event_date: '10/12/2022',
                event_detail: 'This is sample Event details. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste assumenda pariatur recusandae libero ipsa amet aliquid ea excepturi nisi sunt, sit impedit incidunt vitae quod placeat praesentium reiciendis. Ipsa, sapiente.' 
            },
            {
                id: 1,
                event: 'This is dummy event #2',
                event_date: '10/12/2022',
                event_detail: 'This is sample Event details. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste assumenda pariatur recusandae libero ipsa amet aliquid ea excepturi nisi sunt, sit impedit incidunt vitae quod placeat praesentium reiciendis. Ipsa, sapiente.' 
            },
            {
                id: 2,
                event: 'This is dummy event #3',
                event_date: '10/12/2022',
                event_detail: 'This is sample Event details. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste assumenda pariatur recusandae libero ipsa amet aliquid ea excepturi nisi sunt, sit impedit incidunt vitae quod placeat praesentium reiciendis. Ipsa, sapiente.' 
            },
        ])
    }

    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(current => !current);
    }

    const handleListSelect = (e) => {
        setShowModal(current => !current);
        setSelectedId(e.currentTarget.tabIndex);
    }

    useEffect(() => {
        fetchData()
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