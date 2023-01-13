import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import AdminAcademicYearEditModal from '../Components/AdminAcademicYearEditModal/AdminAcademicYearEditModal';
import AdminAcademicYearForm from '../Components/AdminAcademicYearForm/AdminAcademicYearForm';
import AdminAcademicYearList from '../Components/AdminAcademicYearList/AdminAcademicYearList';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const AdminAcademicYear = () => {
    const [selectedAcademicYear, setSelectedAcademicYear] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [dataList, setDataList] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [hasError, setHasError] = useState({});
    const [hideError, setHideError] = useState(true);

    const { jwt_token, academicYear, setAcademicYear } = useAuthStore();


    useTitle('Scholarship Requirements Master list'); // PAGE TITLE


    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(current => !current);
    }

    const handleListSelect = (e) => {
        setShowModal(current => !current);
        setSelectedAcademicYear(dataList.find((item) => item.id === e.currentTarget.tabIndex));
    }

    const handleUpdate = () => {
        axios.put(`${process.env.REACT_APP_API_LINK}/academic/${selectedAcademicYear.id}`,
        {_token: jwt_token}
        ,{ headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            if (response.data.status) {
                toast.success('Academic Year Activated!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }else{
                toast.error('Error on activating academic year!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }
            setShowModal(false);
            fetchRequirement();
        })
        .catch((error) => {
            toast.error('Server connection error!', {
                position: toast.POSITION.TOP_RIGHT
              });
        })
    }

    const handleSubmit = async (academic_year) => {

        await axios.post(`${process.env.REACT_APP_API_LINK}/academic`, 
            {academic_year},
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
                toast.success('Academic Year added successfully!', {
                    position: toast.POSITION.TOP_RIGHT
                });        
                fetchRequirement();
            }
        })
        .catch((error) => console.log(error))
    }

    const  fetchRequirement = async () => {
        setIsLoading(true);

        await axios.get(`${process.env.REACT_APP_API_LINK}/academic`, { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'withCredentials': 'true'
            }
            })        
        .then((response) => setAcademicYear(response.data.academicYears))        
        .catch((err) => {
            console.log(err.message);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        setDataList(academicYear);
     }, [academicYear])

  return (
    <>
        <AdminAcademicYearEditModal handleUpdateAcademicYear={handleUpdate} academic_year={selectedAcademicYear?.academic_year} onClose={handleShowModal} show={showModal} />
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
                                    <AdminAcademicYearForm handleSubmit={handleSubmit} hasError={hasError} hideError={hideError} />
                                </div>
                                <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                    <AdminAcademicYearList handleListSelect={handleListSelect} data={dataList} isLoading={isLoading}  />
                                </div>

                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </>
  )
}

export default AdminAcademicYear;