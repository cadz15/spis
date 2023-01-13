import axios from 'axios';
import React, { useState, useEffect } from 'react';
import useAuthStore from '../../Store/globalStates';
import AdminQueryModal from '../AdminQueryModal/AdminQueryModal';
import './AdminQueryAndConcern.css';

const AdminQueryAndConcern = () => {
    const [showModal, setShowModal] = useState(false);
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [modalData, setModalData] = useState([]);
    const [refreshList, setRefreshList] = useState(false);
    const { jwt_token, scholarshipData, academicYear } = useAuthStore();

    const handleShowModal = (e) => {
        setModalData(dataList.filter((concern) => concern.id === e.currentTarget.tabIndex));
        if(e.currentTarget === e.target) setShowModal(true);
    }

    const  fetchData = async (scholarName='', year='', scholarship='') => {
        setIsLoading(true);
        await axios.get(`${process.env.REACT_APP_API_LINK}/concern/search?scholarName=${scholarName}&scholarship=${scholarship}&academicYear=${year}`,
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                setDataList(response.data.map((concern) => {
                    concern.scholars = concern.scholar_histories.scholars
                    return concern
                }));
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
            
        setIsLoading(false);
    }

    const handleSearchButton = () => {
        const scholar_name = document.getElementById('floatingSearchBox').value;
        const scholarship_id = document.getElementById('floatingScholarship').value;
        const academic_year = document.getElementById('floatingYear').value;
        
        fetchData(scholar_name, academic_year, scholarship_id);
    }

    useEffect(() => {
       fetchData();
       setRefreshList(false);
       //fetchScholarship
    }, [refreshList])

    

  return (
    <div>
        <AdminQueryModal show={showModal} data={modalData} refreshList={setRefreshList} forceClose={() => setShowModal(false)} onClose={(e) => {if(e.currentTarget === e.target) setShowModal(false)}} />
        <div className='search-container'>
            <div className='row'>
                <div className='col-md-12 col-sm-12'>
                    <div className='row'>
                        <div className='search-box col-sm-12 col-md-4'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingSearchBox" placeholder="Scholar Name" />
                                <label htmlFor="floatingSearchBox">Scholar Name</label>
                            </div>
                        </div>                        
                        <div className='search-filter d-md-block d-sm-none col-md-2'>
                            <div className="form-floating mb-3">
                                <select className="form-select" id='floatingYear'>
                                    <option value="0">All</option>
                                    {academicYear?.length > 0 ? academicYear?.map((academicYearListData) => 
                                        (<option key={academicYearListData.id} value={academicYearListData.academic_year}>{academicYearListData.academic_year}</option>)
                                        ) 
                                        : 
                                        ''
                                    }
                                </select>
                                <label htmlFor="floatingYear">Academic Year</label>
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
                                    Query / Concern
                                </th>
                                <th className='py-3'>
                                    Action
                                </th>
                            </tr>
                        </thead>
                    )}


                    <tbody>
                        {dataList.length > 0 ? 
                            dataList.map((queryData) => (
                                <tr key={queryData.id}>
                                    <td className='py-3'>
                                        {queryData.scholars.first_name} {queryData.scholars.last_name}
                                    </td>
                                    <td className='py-3'>
                                        <div className='event-list-head pb-2'>
                                            <p className='p-0 m-0 text-muted event-list-date'>{queryData.replies_count} Replies</p>
                                        </div>
                                        {queryData.details}
                                    </td>
                                    <td className='py-3'>
                                        <button className='btn btn-success' tabIndex={queryData.id} onClick={handleShowModal}>
                                            Reply
                                        </button>
                                    </td>
                                </tr>
                            ))
                            :
                                (
                                <tr>
                                    <td>
                                        <div className='empty-list'>
                                            No Queries can be found!
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

export default AdminQueryAndConcern;