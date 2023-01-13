import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ChangePassword from '../Components/ChangePassword/ChangePassword';
import DocumentCard from '../Components/DocumentCard/DocumentCard';
import EventList from '../Components/EventList/EventList';
import ScholarProfileDetails from '../Components/ScholarProfileDetails/ScholarProfileDetails';
import ScholarUploadedDocument from '../Components/ScholarUploadedDocument/ScholarUploadedDocument';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const ScholarProfile = () => {
    const { jwt_token, userAuth, activeAcademicYear } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [eventsList, setEventsList] = useState([]);
    const [isDocumentLoading, setIsDocumentLoading] = useState(false);
    const [documentList, setDocumentList] = useState(null);

    useTitle(`Profile | ${userAuth.first_name} ${userAuth.last_name}`); // PAGE TITLE

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
            setEventsList(response.data.map((event) => {
                return event.event;
            }));
            setIsLoading(false);
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
                                <ScholarProfileDetails id_number={userAuth.id_number} />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ChangePassword id_number={userAuth.id_number} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <EventList handleListSelect={() => null} data={eventsList} isLoading={isLoading}/>
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ScholarUploadedDocument handleListSelect={() => null} isLoading={isDocumentLoading} data={documentList} />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default ScholarProfile;