import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import { toast } from 'react-toastify';
import ConfirmDeleteDocument from '../Components/ConfirmDeleteDocument/ConfirmDeleteDocument';
import ScholarUploadedDocument from '../Components/ScholarUploadedDocument/ScholarUploadedDocument';
import UploadDocument from '../Components/UploadDocument/UploadDocument';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';

const ScholarDocumentUpload = () => {
    const { jwt_token, userAuth } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [refreshList, setRefreshList] = useState(false);
    const [documentList, setDocumentList] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [selectedId, setSelectedId] = useState(null);


    const  fetchData = () => {
        setIsLoading(true);
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
            setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }

    const handleCloseModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(false);
    }

    const handleDeleteDocument = () => {
        axios.delete(`${process.env.REACT_APP_API_LINK}/documents?document_id=${selectedId}`,{ headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
            }
        )
        .then((response) => {
            if (response.data.status) {
                toast.success('Scholar successfully deleted!', {
                    position: toast.POSITION.TOP_RIGHT
                  });
            }else{
                toast.error('Error on deleting Scholar!', {
                    position: toast.POSITION.TOP_RIGHT,
                  });
            }
        })
        .catch((error) => {
            toast.error('Error on deleting Scholar!', {
                position: toast.POSITION.TOP_RIGHT
              });
        });

        
        setShowModal(false);
        setRefreshList(true);
    }

    const handleListSelect = (e) => {
        setSelectedId(e.currentTarget.tabIndex);
        setShowModal(true);
    }

    useTitle('Scholar Upload Document'); // PAGE TITLE

    useEffect(() => {
        fetchData();
        setRefreshList(false);
    },[refreshList]);


  return (
    <>
        <ConfirmDeleteDocument  show={showModal} handleDeleteDocument={handleDeleteDocument} onClose={handleCloseModal} />
        <div className='main-content-bg'>
            <div className='main-content p-4'>
                <div className='breacrumb-container mb-4'>
                    <span className='subtext fs-5'>Document Upload</span>
                    <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                        <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Document Upload</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <UploadDocument />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ScholarUploadedDocument handleListSelect={handleListSelect} isLoading={isLoading} data={documentList} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </>
  )
}

export default ScholarDocumentUpload;