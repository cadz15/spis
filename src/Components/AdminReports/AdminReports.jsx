import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import useAuthStore from '../../Store/globalStates';
import ReactToPrint from 'react-to-print';
import AdminPrint from '../../Pages/AdminPrint';

const AdminReports = () => {
    const [dataResponse, setDataResponse] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const { jwt_token, academicYear, scholarshipData, departmentAndCourses, setPrintable } = useAuthStore();
    const search = useLocation().search;
    const navigate = useNavigate();

    let academic_year = new URLSearchParams(search).get('academic_year');
    let semester = new URLSearchParams(search).get('semester');
    let scholarship = new URLSearchParams(search).get('scholarship');
    let department = new URLSearchParams(search).get('department');

    const handleSearch = () => {
        const academic_year = document.getElementById('floatingYear').value;
        const semester = document.getElementById('floatingSemester').value;
        const scholarship = document.getElementById('floatingScholarship').value;
        const department = document.getElementById('floatingDepartment').value;
        const path = window.location.href.split('?')[0];
        const nextTitle = 'Generate Report';
        const nextState = { additionalInformation: 'Searching scholar data' };

        fetchData(scholarship, academic_year, semester, department);
        window.history.replaceState(nextState, nextTitle, `${path}?scholarship=${scholarship}&academic_year=${academic_year}&semester=${semester}&department=${department}`);
    }

    const handlePrint = () => {
        navigate(`/print`);
    }

    const  fetchData = async (scholarship='', academic_year=0, semester=0, department='') => {
        setIsLoading(true);
        await axios.get(`${process.env.REACT_APP_API_LINK}/scholars/generate-report?scholarship=${scholarship}&academic_year=${academic_year}&semester=${semester}&department=${department}`,
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                setDataResponse(response.data.scholar);
                setPrintable(response.data.scholar);
                // console.log(response.data);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
            
        setIsLoading(false);
    }


    useEffect(() => {
        if(academic_year === null ) academic_year = 0;
        if(scholarship === null ) scholarship = '';
        if(semester === null ) semester = 0;
        if(department === null ) department = '';
        fetchData(scholarship, academic_year, semester, department);
    }, [search]);
  return (
    <>
        <div className='search-container'>
            <div className='row'>
                <div className='col-md-12 col-sm-12'>
                    <div className='row'>
                        <div className='search-filter d-md-block col-md-2'>
                            <div className="form-floating mb-3">
                                <select className="form-select" id='floatingYear' defaultValue={academic_year}>
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
                        <div className='search-filter d-md-block col-md-2'>
                            <div className="form-floating mb-3">
                                <select className="form-select" id='floatingSemester' defaultValue={semester}>
                                    <option value="0">All</option>
                                    <option value="1st Semester">1st Semester</option>
                                    <option value="2nd Semester">2nd Semester</option>                                    
                                </select>
                                <label htmlFor="floatingSemester">Semester</label>
                            </div>
                        </div>
                        <div className='search-filter d-md-block col-md-2'>
                            <div className="form-floating mb-3">
                                <select className="form-select" id='floatingScholarship' defaultValue={scholarship}>
                                    <option value="">All</option>
                                    {scholarshipData.length > 0 ? scholarshipData.map((scholarshipListData) => 
                                        (<option key={scholarshipListData.id} value={scholarshipListData.scholarship_name}>{scholarshipListData.scholarship_name}</option>)
                                        ) 
                                        : 
                                        ''
                                    }
                                </select>
                                <label htmlFor="floatingScholarship">Scholarship</label>
                            </div>
                        </div>
                        <div className='search-filter d-md-block col-md-3'>
                            <div className="form-floating mb-3">
                                <select className="form-select" id='floatingDepartment' defaultValue={department}>
                                    <option key={0} value=''>All</option>
                                    {departmentAndCourses?.length > 0 ? departmentAndCourses?.map((department) => (
                                            <option key={department.name} value={department.name}>{department.name}</option>
                                    ))
                                    :
                                    ''
                                    }
                                    
                                </select>
                                <label htmlFor="floatingDepartment">Department</label>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-12'>
                            <button className='btn btn-primary form-control col-sm-12 py-3' onClick={handleSearch}>Search</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>

        <div className="card latest-update-card p-0">
            <div className="card-body p-0 m-0 ">
                <div className={`event-list-table-container ${isLoading? 'list-loading':''}`}>
                {(dataResponse?.length > 0 ) && (<div className='btn btn-primary' onClick={handlePrint}>Print</div>)
                        
                        }
                <table className="table table-hover event-list-table">
                    {(dataResponse?.length > 0 ) && 
                        (<thead>
                            <tr>
                                <th className='py-3'>
                                    Scholar
                                </th>
                                <th className='py-3'>
                                    Year
                                </th>
                                <th className='py-3'>
                                    Course
                                </th>
                                <th className='py-3'>
                                    Scholarship
                                </th>
                                <th className='py-3'>
                                    Academic Year And Semester
                                </th>
                            </tr>
                        </thead>)
                    }
                    
                    <tbody>
                        
                        {(dataResponse?.length > 0) ? 
                            dataResponse?.map((scholarData) => (
                            <tr className='cursor-pointer' key={scholarData.id_number} tabIndex={scholarData.id_number} onClick={null}>
                                <td className='py-3'>
                                        {`${scholarData.first_name} ${scholarData.last_name}`}
                                </td>
                                <td className='py-3'>
                                    {scholarData.year_level}
                                </td>
                                <td className='py-3'>
                                    {scholarData.course}
                                </td>
                                <td className='py-3'>
                                    {scholarData.scholarships.scholarship_name}
                                </td>
                                <td className='py-3'>
                                    {`${scholarData.scholar_histories[0].semester} ${scholarData.scholar_histories[0].academic_year}`}
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
    </>
  )
}

export default AdminReports;