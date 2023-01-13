import axios from 'axios';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import EventList from '../Components/EventList/EventList';
import ScholarQueryList from '../Components/ScholarQueryList/ScholarQueryList';
import ScholarUploadedDocument from '../Components/ScholarUploadedDocument/ScholarUploadedDocument';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const ScholarDashboard = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isLoadingConcern, setIsLoadingConcern] = useState(false);
    const [eventsList, setEventsList] = useState([]);
    const [queryList, setQueryList] = useState([]);
    const [documentList, setDocumentList] = useState(null);
    const [isDocumentLoading, setIsDocumentLoading] = useState(false);
    const { jwt_token, userAuth, activeAcademicYear } = useAuthStore();

    useTitle(`Dashboard | ${userAuth.first_name} ${userAuth.last_name}`); // PAGE TITLE

    const  fetchData = () => {
        setIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_LINK}/events?id=${userAuth.id}&academic_year=${activeAcademicYear[0].academic_year}`, 
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            // console.log(response);
            // setEventsList(response.data.map((event) => {
            //     return event.event;
            // }));
            setEventsList(response.data)
            setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }


    const fetchConcern = () => {
        setIsLoadingConcern(true);
        axios.get(`${process.env.REACT_APP_API_LINK}/concern/scholar/${userAuth.id}`, 
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            console.log(response.data);
            setQueryList(response.data);
            setIsLoadingConcern(false);
        })
        .catch((error) => console.log(error));
    }


    const  fetchDocumentData = () => {
        setIsDocumentLoading(true);
        axios.get(`${process.env.REACT_APP_API_LINK}/documents?id_number=${userAuth.id_number}`, 
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            console.log(response);
            setDocumentList(response.data.documents);
            setIsDocumentLoading(false);
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData();
        fetchDocumentData();
        fetchConcern()
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
                                <ScholarUploadedDocument handleListSelect={() => null} isLoading={isDocumentLoading} data={documentList} />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ScholarQueryList handleListSelect={() => null} isLoading={isLoadingConcern} data={queryList} />
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