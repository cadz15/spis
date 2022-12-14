import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useAuthStore from '../../Store/globalStates';
import AdminDocumentModal from '../AdminDocumentModal/AdminDocumentModal';
import './DocumentSubmitted.css';

const DocumentSubmitted = () => {
    const [showModal, setShowModal] = useState(false);
    const { jwt_token, scholarshipData } = useAuthStore();
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedId, setSelectedId] = useState(null);
    const [refreshList, setRefreshList] = useState(false);

    const handleShowModal = (e) => {
        if(e.currentTarget === e.target) setShowModal(false);
    }

    const  fetchData = async (scholarName='', scholarship='') => {
        setIsLoading(true);

        await axios.get(`${process.env.REACT_APP_API_LINK}/documents/search?scholarName=${scholarName}&scholarship=${scholarship}`,
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                setDataList(response.data.documents);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
            setIsLoading(false);
    }

    const handleListSelect = (e) => {
        setSelectedId(dataList.filter((documentData) => documentData.id === e.currentTarget.tabIndex));
        setShowModal(true);
    }

    const handleSearchButton = () => {
        const scholar_name = document.getElementById('floatingSearchBox').value;
        const scholarship_id = document.getElementById('floatingScholarship').value;
        
        fetchData(scholar_name, scholarship_id);
    }

    useEffect(() => {
       fetchData();
       setRefreshList(false);
    }, [refreshList])
    
  return (
    <div>       
        <AdminDocumentModal show={showModal} refreshList={setRefreshList}  data={selectedId} forceClose={() => setShowModal(false)} onClose={handleShowModal} />
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
                                    {scholarshipData.length > 0 ? scholarshipData.map((scholarshipListData) => 
                                        (<option key={scholarshipListData.id} value={scholarshipListData.id}>{scholarshipListData.scholarship_name}</option>)
                                        ) 
                                        : 
                                        ''
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
                        {dataList?.length > 0 ?  
                            dataList.map((documentData) => (
                            <tr key={documentData.id} tabIndex={documentData.id} className={`cursor-pointer`} onClick={handleListSelect} >
                                <td >{documentData.scholars.first_name} {documentData.scholars.last_name}</td>
                                <td>{scholarshipData.filter((scholarship_name) => scholarship_name.id === documentData.scholars.scholarship_id)[0].scholarship_name}</td>
                                <td>{documentData.filename.substring(0, 20)}...</td>
                                <td ><span className={`document-${documentData.document_histories[0].status}`}>{documentData.document_histories[0].status}</span></td>
                            </tr>
                        ))
                        :
                        (
                        <tr>
                            <td>
                                <div className='empty-list'>
                                    No Document!
                                </div>
                            </td>
                        </tr>
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