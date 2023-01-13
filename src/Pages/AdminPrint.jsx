import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import useAuthStore from '../Store/globalStates';
import useTitle from '../Utils/useTitle';
import logo from '../slsu.png';

const AdminPrint = () => {
    const [dataResponse, setDataResponse] = useState([]);
    const { jwt_token, printable } = useAuthStore();
    const search = useLocation().search;
    let academic_year = new URLSearchParams(search).get('academic_year');
    let semester = new URLSearchParams(search).get('semester');
    let scholarship = new URLSearchParams(search).get('scholarship');
    let department = new URLSearchParams(search).get('department');
    
    useTitle('Print'); // PAGE TITLE


    const  fetchData = async (scholarship='', academic_year=0, semester=0, department='') => {
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
                console.log(response.data);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            });
    }

    const doPrint = async() => {
        await setTimeout(() => window.print(), 1000)
    }


    useEffect(() => {
        doPrint();
    }, []);

  return (
    <>
        <div className='bg-light printable-body d-flex flex-column  align-items-center'>
            <div className='printable-header d-flex justify-content-between'>
                <img src={logo} className='printable-logo' alt="" srcset="" />
                <p className='printable-header-link-text'>
                    <p className='p-0 m-0'>Main Campus  </p>
                    <p className='p-0 m-0'>San Roque, Sogod, Southern Leyte  </p>
                    <p className='p-0 m-0'>Email: president@southernleytestateu.edu.ph  </p>
                    <p className='p-0 m-0'>Website: www.southernleytestateu.edu.ph  </p>
                </p>
            </div>
            <div className="printable-header-link-text-ssm">
            Excellence | Service | Leadership and Good Governance | Innovation | Social Responsibility | Integrity | Professionalism | Spirituality
            </div>
            <hr className='printable-hr' />

            <div className="printable-title mb-4">
                LIST OF SCHOLAR
            </div>

            <div>
                <table className='table table-striped table-bordered printable-table'>
                    <thead>
                        <th>ID Number</th>
                        <th>Scholar Name</th>
                        <th>Year & Semester</th>
                        <th>Course</th>
                        <th>Scholarship</th>
                        <th>Academic Year </th>
                    </thead>
                    <tbody>
                        {printable?.length > 0 ?  
                         printable?.map((scholarData) => (
                                <tr className='cursor-pointer' key={scholarData.id_number} tabIndex={scholarData.id_number} onClick={null}>
                                    <td className='py-3'>
                                            {scholarData.id_number.replace('-old', '')}
                                    </td>
                                    <td className='py-3'>
                                            {`${scholarData.first_name} ${scholarData.last_name}`}
                                    </td>
                                    <td className='py-3'>
                                        {scholarData.year_level} - {scholarData.scholar_histories[0].semester}
                                    </td>
                                    <td className='py-3'>
                                        {scholarData.course}
                                    </td>
                                    <td className='py-3'>
                                        {scholarData.scholarships.scholarship_name}
                                    </td>
                                    <td className='py-3'>
                                        {`${scholarData.scholar_histories[0].academic_year}`}
                                    </td>
                                </tr>
                                ))
                                : 
                                (
                                <tr>
                                    <td>
                                        <div className='empty-list'>
                                            No Scholar Data!
                                        </div>
                                    </td>
                                </tr>
                                )
                               
                        }
                    </tbody>
                </table>
            </div>
        
        </div>
    </>
  )
}

export default AdminPrint;