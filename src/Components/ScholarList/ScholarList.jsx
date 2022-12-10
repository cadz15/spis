import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../Store/globalStates';
import './ScholarList.css';

const ScholarList = () => {
    const [dataResponse, setDataResponse] = useState([]);
    const [scholarshipList, setScholarshipList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { jwt_token } = useAuthStore();
    const navigate = useNavigate();

    const  fetchData = async (scholarName='', scholarship='') => {
        setIsLoading(true);
        await axios.get(`${process.env.REACT_APP_API_LINK}/scholars`,{headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                setDataResponse(response.data);
                // console.log(response.data);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
            
        setIsLoading(false);
    }

    const fetchScholarship = async () => {
        setScholarshipList([
            {
                scholarship: 'DOST-SEI (Department of Science and Technology - Science Education Institute)'
            },
            {
                scholarship: 'TES (Tertiary Education Subsidy)'
            },
            {
                scholarship: 'FHE (Free Higher Education)'
            },
            {
                scholarship: 'CHED (Commision on Higher Education)'
            },
        ]);
    }

    const handleSearchButton = () => {
        //fetchData()
    }

    useEffect(() => {
       fetchData()
       fetchScholarship()
    }, [])


  return (
    <div>
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
                                    {scholarshipList.length > 0 ? scholarshipList.map((scholarshipListData) => 
                                        (<option key={scholarshipListData.scholarship} value={scholarshipListData.scholarship}>{scholarshipListData.scholarship}</option>)
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
                    {dataResponse?.length > 0 && 
                        (<thead>
                            <tr>
                                <th className='py-3'>
                                    Scholar
                                </th>
                                <th className='py-3'>
                                    Course And Year
                                </th>
                                <th className='py-3'>
                                    Scholarship
                                </th>
                                <th className='py-3'>
                                    Status
                                </th>
                            </tr>
                        </thead>)
                    }
                    
                    <tbody>
                        {dataResponse?.length > 0 ? 
                            dataResponse[0].data.map((scholarData) => (
                            <tr className='cursor-pointer' key={scholarData.id_number} tabIndex={scholarData.id_number} onClick={() => navigate(`/admin/profiles/${scholarData.id_number}`)}>
                                <td className='py-3'>
                                        {`${scholarData.first_name} ${scholarData.last_name}`}
                                </td>
                                <td className='py-3'>
                                    {`${scholarData.course} ${scholarData.year_level}`}
                                </td>
                                <td className='py-3'>
                                    {scholarData.scholarship_name}
                                </td>
                                <td className='py-3'>
                                    {/* <p className={`${scholarData.scholarStatus == 'active'? 'bg-success': 'bg-secondary'}`}>{scholarData.scholarStatus}</p> */}
                                </td>
                            </tr>
                            ))
                            : 
                            (
                            <tr>
                                <td>
                                    <div className='empty-list'>
                                        No Scholar can be found!
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

export default ScholarList;