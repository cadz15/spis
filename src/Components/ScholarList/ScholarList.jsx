import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '../../Store/globalStates';
import './ScholarList.css';

const ScholarList = () => {
    const [dataResponse, setDataResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [selectedYear, setSelectedYear] = useState(0);
    const { jwt_token, scholarshipData, academicYear } = useAuthStore();
    const navigate = useNavigate();

    const  fetchData = async (scholarName='', year='', scholarship=0) => {
        setIsLoading(true);
        await axios.get(`${process.env.REACT_APP_API_LINK}/scholars?scholarName=${scholarName}&scholarship=${scholarship}&academicYear=${year}`,
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
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
    const handleSearchButton = () => {
        const scholar_name = document.getElementById('floatingSearchBox').value;
        const scholarship_id = document.getElementById('floatingScholarship').value;
        const academic_year = document.getElementById('floatingYear').value;
        setSelectedYear(academic_year);
        fetchData(scholar_name, academic_year ,scholarship_id);
    }

    useEffect(() => {
       fetchData()
    }, [])


  return (
    <div>
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
                    {(dataResponse?.length > 0 ) && 
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
                            </tr>
                        </thead>)
                    }
                    
                    <tbody>
                        {(dataResponse?.length > 0) ? 
                            dataResponse.map((scholarData) => (
                            <tr className='cursor-pointer' key={scholarData.id_number} tabIndex={scholarData.id_number} onClick={() => navigate(`/admin/profiles/${scholarData.id_number}/${scholarData.academic_year}`)}>
                                <td className='py-3'>
                                        {`${scholarData.first_name} ${scholarData.last_name}`}
                                </td>
                                <td className='py-3'>
                                    {`${scholarData.course} ${scholarData.year_level}`}
                                </td>
                                <td className='py-3'>
                                    {scholarData.scholarship_name}
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