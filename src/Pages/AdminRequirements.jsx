import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import AdminRequirementEditModal from '../Components/AdminRequirementEditModal/AdminRequirementEditModal';
import AdminRequirementForm from '../Components/AdminRequirementForm/AdminRequirementForm';
import AdminRequirementList from '../Components/AdminRequirementList/AdminRequirementList';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const AdminRequirements = () => {
    const [selectedRequirement, setSelectedRequirement] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dataList, setDataList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState({});
    const [hideError, setHideError] = useState(true);

    const { jwt_token, requirementData, setRequirements } = useAuthStore();


    useTitle('Scholarship Requirements Master list'); // PAGE TITLE


    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(current => !current);
    }

    const handleListSelect = (e) => {
        setShowModal(current => !current);
        setSelectedRequirement(dataList.find((item) => item.id === e.currentTarget.tabIndex));
    }

    const handleSubmit = async (scholarship_id, requirement) => {

        await axios.post(`${process.env.REACT_APP_API_LINK}/requirements`, 
            {scholarship_id, requirement},
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
                toast.success('Requirement added successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });        
                fetchRequirement();
            }
        })
        .catch((error) => console.log(error))
    }

    const handleDelete = async () => {

        await axios.delete(`${process.env.REACT_APP_API_LINK}/requirements/${selectedRequirement.id}`,
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
                setHasError(response.data.errors)
                setHideError(false);
            }else {
                setHideError(true);
                setHasError({})
                toast.success('Requirements deleted successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });        
                fetchRequirement();
            }
        })
        .catch((error) => console.log(error))
    }

    const handleUpdate = async(scholarship_id, requirement) => {

        await axios.put(`${process.env.REACT_APP_API_LINK}/requirements/${selectedRequirement.id}`, 
            { scholarship_id: selectedRequirement.scholarship_id, requirement},
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
                toast.error('Requirement unable to update!', {
                    position: toast.POSITION.TOP_RIGHT
                });    
            }else {
                toast.success('Requirement updated successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });        
                fetchRequirement();
            }
        })
        .catch((error) => console.log(error))
    }

    const  fetchRequirement = async () => {
        setIsLoading(true);

        await axios.get(`${process.env.REACT_APP_API_LINK}/requirements`, { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'withCredentials': 'true'
            }
            })        
        .then((response) => setRequirements(response.data.requirements))        
        .catch((err) => {
            console.log(err.message);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setDataList(requirementData);
     }, [requirementData])

  return (
    <>
        <AdminRequirementEditModal show={showModal} handleDelete={handleDelete} onClose={handleShowModal} data={selectedRequirement} handleUpdate={handleUpdate} />
        <div className='main-content-bg'>
            <div className='main-content p-4'>
                <div className='breacrumb-container mb-4'>
                    <span className='subtext fs-5'>Requirements</span>
                    <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                        <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Requirements</span>
                    </div>
                </div>

                <div className='row'>
                        <div className='col-md-12 col-lg-12'>
                            <div className='row'>
                                <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                    <AdminRequirementForm handleSubmit={handleSubmit} hasError={hasError} hideError={hideError} />
                                </div>
                                <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                    <AdminRequirementList handleListSelect={handleListSelect} data={dataList} isLoading={isLoading}  />
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default AdminRequirements;