import React, { useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ChangePassword from '../Components/ChangePassword/ChangePassword';
import ScholarProfileDetails from '../Components/ScholarProfileDetails/ScholarProfileDetails';
import EventList from '../Components/EventList/EventList';
import DocumentCard from '../Components/DocumentCard/DocumentCard';
import useTitle from '../Utils/useTitle';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../Store/globalStates';
import { useEffect } from 'react';
import ScholarUploadedDocument from '../Components/ScholarUploadedDocument/ScholarUploadedDocument';

const Profiles = () => {
    const { id } = useParams(); //Get route parameter :id
    const [eventsList, setEventsList] = useState([]);
    const [isEventLoading, setEventIsLoading] = useState(false);
    const [isDocumentLoading, setDocumentIsLoading] = useState(false);
    const [documentList, setDocumentList] = useState(null);
    const { jwt_token } = useAuthStore();

    useTitle('Scholar Profile'); // PAGE TITLE

    const  fetchEventData = () => {
        setEventIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_LINK}/events?id_number=${id}`, 
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
            setEventIsLoading(false);
        })
        .catch((error) => console.log(error));
    }


    const  fetchDocumentData = async() => {
        setDocumentIsLoading(true);
        await axios.get(`${process.env.REACT_APP_API_LINK}/documents/search?scholarId_number=${id}&limit=5`,
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                setDocumentList(response.data.documents);
                console.log(documentList);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
        setDocumentIsLoading(false);
    }

    useEffect(() => {
        fetchEventData();
        fetchDocumentData();
    },[]);

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
                                <EventList handleListSelect={() => null} data={eventsList} isLoading={isEventLoading}/>
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <DocumentCard handleListSelect={() => null} isLoading={isDocumentLoading} dataList={documentList} />
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