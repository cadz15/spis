import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import useAuthStore from '../../Store/globalStates';
import ConcernCard from '../ConcernCard/ConcernCard';
import DocumentCard from '../DocumentCard/DocumentCard';
import EventList from '../EventList/EventList';
import ScholarCard from '../ScholarCard/ScholarCard';
import './Main.css';

const Main = () => {
    const [dataList, setDataList] = useState([]);
    const [documentDataList, setDocumentDataList] = useState([]);
    const [concernDataList, setConcernDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isDocumentLoading, setDocumentIsLoading] = useState(false);
    const [isConcernLoading, setConcernIsLoading] = useState(false);
    const [eventsList, setEventsList] = useState([]);
    const [scholarCount, setScholarCount] = useState([]);
    const { jwt_token } = useAuthStore();

    const fetchScholarshipCounts = async() => {

        await axios.get(`${process.env.REACT_APP_API_LINK}/scholarship/counts?limit=4`,
        {headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            setScholarCount(response.data);
            // console.log(response);
        })
        .catch((error) => {
            // console.log(error);
            // console.log(jwt_token);
        })
    }


    const  fetchConcernData = async (scholarName='', scholarship='') => {
        setConcernIsLoading(true);
        await axios.get(`${process.env.REACT_APP_API_LINK}/concern/search?scholarName=${scholarName}&scholarship=${scholarship}&limit=5`,
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                setConcernDataList(response.data);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
            
            setConcernIsLoading(false);
    }

    const  fetchDocumentData = async (scholarName='', scholarship='') => {
        setDocumentIsLoading(true);
        await axios.get(`${process.env.REACT_APP_API_LINK}/documents/search?scholarName=${scholarName}&scholarship=${scholarship}&limit=5`,
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                setDocumentDataList(response.data.documents);
                // console.log(response.data);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
            
        setDocumentIsLoading(false);
    }


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



    useEffect(() => {
        setDataList(['primary', 'success', 'warning', 'danger']);

    fetchScholarshipCounts();
    fetchData();
    fetchDocumentData();
    fetchConcernData();
    }, []);


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
                            {scholarCount && scholarCount.map((dataScholarship, index) => 
                            (<div  key={index} className='col-md-6  col-lg-3 col-sm-12 mb-3'>
                                <ScholarCard cardType={dataList[index]} data={dataScholarship} />
                            </div>)
                            )}
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='mx-1 my-3'>
                        <EventList data={eventsList} isLoading={isLoading} />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <DocumentCard dataList={documentDataList} isLoading={isDocumentLoading}/>
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ConcernCard dataList={concernDataList} isLoading={isConcernLoading} />
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