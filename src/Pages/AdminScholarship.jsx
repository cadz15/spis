import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ScholarshipEditModal from '../Components/ScholarshipEditModal/ScholarshipEditModal';
import ScholarshipForm from '../Components/ScholarshipForm/ScholarshipForm';
import ScholarshipList from '../Components/ScholashipList/ScholarshipList';
import useTitle from '../Utils/useTitle';

const AdminScholarship = () => {
    const [selectedId, setSelectedId] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);


    useTitle('Scholarship master list'); // PAGE TITLE


    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(current => !current);
    }

    const handleListSelect = (e) => {
        setShowModal(current => !current);
        setSelectedId(dataList[e.currentTarget.tabIndex]);
    }

    const  fetchData = async () => {
        setIsLoading(true);

        await fetch(`api/link`) //Change for API Link
        
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                `This is an HTTP error: The status is ${response.status}`
                );
            }
            return response.json();
        })
        
        .then((actualData) => setDataList(actualData))
        
        .catch((err) => {
            console.log(err.message);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        //fetchData
     }, [])

    

  return (
    <>
        <ScholarshipEditModal show={showModal} onClose={handleShowModal} data={selectedId} />
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
                                    <ScholarshipForm />
                                </div>
                                <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                    <ScholarshipList handleListSelect={handleListSelect} data={dataList} />
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