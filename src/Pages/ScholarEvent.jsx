import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import EventList from '../Components/EventList/EventList';
import useAuthStore from '../Store/globalStates';

const ScholarEvent = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [eventsList, setEventsList] = useState([]);
    const { jwt_token, userAuth } = useAuthStore();


    const  fetchData = () => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_LINK}/events?id=${userAuth.id}`, 
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            setEventsList(response.data.map((event) => {
                return event.event;
            }));
            setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData();
    },[]);


  return (
    <>
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
                            <EventList handleListSelect={() => null} data={eventsList} isLoading={isLoading}/>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default ScholarEvent;