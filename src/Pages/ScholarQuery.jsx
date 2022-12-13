import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ScholarQueryForm from '../Components/ScholarQueryFrom/ScholarQueryForm';
import ScholarQueryList from '../Components/ScholarQueryList/ScholarQueryList';
import ScholarQueryModal from '../Components/ScholarQueryModal/ScholarQueryModal';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const ScholarQuery = () => {
    const { jwt_token, userAuth } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [queryList, setQueryList] = useState([]);
    const [selectedQuery, setSelectedQuery] = useState([]);

    useTitle(`Query | ${userAuth.first_name} ${userAuth.last_name}`); // PAGE TITLE

    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) {
            setShowModal(current => !current)
        };
    }

    const handleListSelect = (e) => {
        setSelectedQuery(queryList.filter((concern) => concern.id === e.currentTarget.tabIndex));
        setShowModal(true);
    }

    const  fetchData = () => {
        setIsLoading(true);
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
            setQueryList(response.data);
            setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData();
        setRefreshList(false);
    },[refreshList]);

  return (
    <>
        <ScholarQueryModal show={showModal} onClose={handleShowModal} refreshList={setRefreshList} data={selectedQuery}  />
        <div className='main-content-bg'>
            <div className='main-content p-4'>
                <div className='breacrumb-container mb-4'>
                    <span className='subtext fs-5'>Query And Concerns</span>
                    <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                        <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Query And Concerns</span>
                    </div>
                </div>

                <div className='row'>
                        <div className='col-md-12 col-lg-12'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                    <ScholarQueryForm refreshList={setRefreshList} />
                                </div>
                                <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                    <ScholarQueryList handleListSelect={handleListSelect} isLoading={isLoading} data={queryList} />
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default ScholarQuery;