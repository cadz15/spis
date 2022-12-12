import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import ScholarshipEditModal from '../Components/ScholarshipEditModal/ScholarshipEditModal';
import ScholarshipForm from '../Components/ScholarshipForm/ScholarshipForm';
import ScholarshipList from '../Components/ScholashipList/ScholarshipList';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const AdminScholarship = () => {
    const [selectedScholarship, setSelectedScholarship] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dataList, setDataList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState({});
    const [hideError, setHideError] = useState(true);

    const { jwt_token, scholarshipData, setScholarships } = useAuthStore();


    useTitle('Scholarship master list'); // PAGE TITLE


    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(current => !current);
    }

    const handleListSelect = (e) => {
        setShowModal(current => !current);
        setSelectedScholarship(dataList.find((item) => item.id === e.currentTarget.tabIndex));
    }

    const handleSubmit = async (scholarship_name, scholarship_detail) => {

        await axios.post(`${process.env.REACT_APP_API_LINK}/scholarship`, 
            {scholarship_name, scholarship_detail},
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
            })
        .then((response) => {
            if(response.data.errors){
                setHasError(response.data.errors)
                setHideError(false);
            }else {
                setHideError(true);
                setHasError({})
                toast.success('Scholarship added successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });        
                fetchScholarship();
            }
        })
        .catch((error) => console.log(error))
    }

    const handleUpdate = async(scholarship_name, scholarship_detail) => {

        await axios.put(`${process.env.REACT_APP_API_LINK}/scholarship/${selectedScholarship.id}`, 
            { scholarship_name, scholarship_detail},
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
            })
        .then((response) => {
            setShowModal(false);
            if(response.data.errors){
                toast.error('Scholarship unable to update!', {
                    position: toast.POSITION.TOP_RIGHT
                });    
            }else {
                toast.success('Scholarship updated successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });        
                fetchScholarship();
            }
        })
        .catch((error) => console.log(error))
    }

    const  fetchScholarship = async () => {
        setIsLoading(true);

        await axios.get(`${process.env.REACT_APP_API_LINK}/scholarship`, { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'withCredentials': 'true'
            }
            })        
        .then((response) => setScholarships(response.data))        
        .catch((err) => {
            console.log(err.message);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setDataList(scholarshipData);
     }, [scholarshipData])

    

  return (
    <>
        <ScholarshipEditModal show={showModal} onClose={handleShowModal} data={selectedScholarship} handleUpdate={handleUpdate} />
        <div className='main-content-bg'>
            <div className='main-content p-4'>
                <div className='breacrumb-container mb-4'>
                    <span className='subtext fs-5'>Scholarship</span>
                    <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                        <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Scholarship</span>
                    </div>
                </div>

                <div className='row'>
                        <div className='col-md-12 col-lg-12'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                    <ScholarshipForm handleSubmit={handleSubmit} hasError={hasError} hideError={hideError} />
                                </div>
                                <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                    <ScholarshipList handleListSelect={handleListSelect} data={dataList} isLoading={isLoading}  />
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default AdminScholarship;