import React, { useEffect, useState } from 'react';
import AdminDocumentModal from '../AdminDocumentModal/AdminDocumentModal';
import './DocumentSubmitted.css';

const DocumentSubmitted = () => {
    const [showModal, setShowModal] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [scholarshipList, setScholarshipList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalData, setModalData] = useState([]);

    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(current => !current);
        setModalData(dataList[e.currentTarget.tabIndex]);
    }

    const  fetchData = async (scholarName='', scholarship='') => {
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


    const fetchScholarship = async () => {
        await fetch(`api/link`) //Change for API Link
        
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                `This is an HTTP error: The status is ${response.status}`
                );
            }
            return response.json();
        })
        
        .then((actualData) => setScholarshipList(actualData))
    }


    const handleSearchButton = () => {
        //fetchData()
    }

    useEffect(() => {
       //fetchData
       //fetchScholarship
    }, [])
    
  return (
    <div>       
        <AdminDocumentModal show={showModal}  data={modalData} onClose={handleShowModal} />
        <div className='search-container'>
            <div className='row'>
                <div className='col-md-12 col-sm-12'>
                    <div className='row'>
                        <div className='search-box col-sm-12 col-md-6'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingSearchBox" placeholder="Scholar Name" />
                                <label htmlFor="floatingSearchBox">Scholar Name</label>
                            </div>
                        </div>
                        <div className='search-filter d-md-block d-sm-none col-md-3'>
                            <div className="form-floating mb-3">
                                <select className="form-select" id='floatingScholarship'>
                                    <option value="0">All</option>
                                    {scholarshipList.length > 0 &&
                                        scholarshipList.map(({i, scholarshipData}) => (
                                            <option value={scholarshipData.id}>{scholarshipData.scholarship}</option>
                                        ))
                                    }
                                </select>
                                <label htmlFor="floatingScholarship">Scholarship</label>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-12'>
                            <button className='btn btn-primary form-control col-sm-12 py-3' onClick={handleSearchButton}>Search</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
        <div className="card latest-update-card p-0">
            <div className="card-body p-0 m-0 ">
                <div className={`event-list-table-container ${isLoading? 'list-loading':''}`}>
                    
                <table className="table table-hover event-list-table">
                    {dataList.length > 0 && (
                        <thead>
                            <tr>
                                <th className='py-3'>
                                    Scholar
                                </th>
                                <th className='py-3'>
                                    Scholarship
                                </th>
                                <th className='py-3'>
                                    Document
                                </th>
                                <th className='py-3'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                    )}

                    <tbody>
                        {dataList.length > 0 ? 
                            dataList.map(({i, documentData}) => (
                                <tr>
                                    <td className='py-3'>
                                        {documentData.scholarName}
                                    </td>
                                    <td className='py-3'>
                                        {documentData.scholarship}
                                    </td>
                                    <td className='py-3'>
                                        {documentData.status}
                                    </td>
                                    <td className='py-3'>
                                        <button className='btn btn-success' tabIndex={documentData.id}  onClick={handleShowModal}>
                                            Action
                                        </button>
                                    </td>
                                </tr>
                            ))
                        :
                            (<div className='empty-list'>
                                No Document can be found!
                            </div>
                            )
                        }  
                        
                    </tbody>
                </table>                    
                </div>
            </div>
        </div>
    </div>
  )
}

export default DocumentSubmitted;