import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ConcernCard from '../Components/ConcernCard/ConcernCard';
import DocumentCard from '../Components/DocumentCard/DocumentCard';
import EventList from '../Components/EventList/EventList';
import useAuthStore from '../Store/globalStates';

const ScholarDashboard = () => {
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
                <span className='subtext fs-5'>Dashboard</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Dashboard</span>
                </div>
            </div>

            <div className=''>

                <div className='row'>
                    <div className='mx-1 my-3'>
                        <EventList handleListSelect={() => null} data={eventsList} isLoading={isLoading} />
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
    </>
  )
}

export default ScholarDashboard;