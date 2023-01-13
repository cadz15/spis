import React, { useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ChangePassword from '../Components/ChangePassword/ChangePassword';
import ScholarProfileDetails from '../Components/ScholarProfileDetails/ScholarProfileDetails';
import EventList from '../Components/EventList/EventList';
import DocumentCard from '../Components/DocumentCard/DocumentCard';
import CheckList from '../Components/CheckList/CheckList';
import useTitle from '../Utils/useTitle';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import useAuthStore from '../Store/globalStates';
import { useEffect } from 'react';

const Profiles = () => {
    const { id, year } = useParams(); //Get route parameter :id
    const [eventsList, setEventsList] = useState([]);
    const [checkList, setCheckList] = useState([]);
    const [isEventLoading, setEventIsLoading] = useState(false);
    const [checkListIsLoading, setCheckListIsLoading] = useState(false);
    const [isDocumentLoading, setDocumentIsLoading] = useState(false);
    const [documentList, setDocumentList] = useState(null);
    const [selectedYear, setSelectedYear] = useState(year);
    const [selectedSemester, setSelectedSemester] = useState('1st Semester');
    const [noData, setNoData] = useState(false);
    const { jwt_token, academicYear } = useAuthStore();

    useTitle('Scholar Profile'); // PAGE TITLE

    const handleOnChangeYear = () => {
        const semester = document.getElementById('floatingSemester').value;

        setSelectedYear(year);
        setSelectedSemester(semester);
    }

    const fetchCheckListData = () => {
        setCheckListIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_LINK}/documents/checklist/${id}?academicYear=${selectedYear}&semester=${selectedSemester}`, 
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            // console.log(response.data);
            if(response.data.status === true){
                setCheckList(response.data);
                setNoData(false);
            }else{
                setCheckList([]);
                setNoData(true);
            }
            setCheckListIsLoading(false);
        })
        .catch((error) => console.log(error));
    }

    const  fetchEventData = () => {
        setEventIsLoading(true);
        axios.get(`${process.env.REACT_APP_API_LINK}/events?id_number=${id}&academic_year=${selectedYear}&semester=${selectedSemester}`, 
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            setEventsList(response.data);
        })
        .catch((error) => {
            console.log(error);
            setEventsList([]);
        });
        setEventIsLoading(false);
    }


    const  fetchDocumentData = async() => {
        setDocumentIsLoading(true);
        await axios.get(`${process.env.REACT_APP_API_LINK}/documents/search?scholarId_number=${id}&limit=5&academic_year=${selectedYear}&semester=${selectedSemester}`,
            {headers: {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
                }
                }
            )
            .then((response) => {
                setDocumentList(response.data.documents.map((document) => {
                    document.scholars = document.scholar_histories.scholars;
                    return document;
                }));
                // console.log(documentList);
            })
            .catch((error) => {
                // console.log(error);
                // console.log(jwt_token);
            })
        setDocumentIsLoading(false);
    }

    useEffect(() => {
        if(year !== '0'){
            fetchCheckListData();
            fetchEventData();
            fetchDocumentData();
        }
    },[selectedSemester]);

  return (
    <>
        <div className='main-content-bg'>
            <div className='main-content p-4'>
                <div className='breacrumb-container mb-4'>
                    <span className='subtext fs-5'>Profile</span>
                    <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                        <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Profile</span>
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <ScholarProfileDetails id_number={id} />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ChangePassword id_number={id} />
                            </div>
                        </div>
                    </div>
                </div>
                <hr />
                <div className="row">
                    <div className='search-box col-sm-12 col-md-4'>
                        <div className="form-floating mb-3">
                            
                            <select className="form-select" id='floatingAcademicYear' defaultValue={year} disabled={year !== '0' ? true : false} >
                                <option value={0}>Select Year</option>
                                {academicYear?.length > 0 ? academicYear?.map((academicYearListData) => 
                                    (<option key={academicYearListData.id} value={academicYearListData.academic_year}>{academicYearListData.academic_year}</option>)
                                    ) 
                                    : 
                                    ''
                                }
                            </select>
                            <label htmlFor="floatingAcademicYear">Academic Year</label>
                        </div>
                    </div> 
                    <div className='search-filter d-md-block d-sm-none col-md-3'>
                        <div className="form-floating mb-3">
                            <select className="form-select" id='floatingSemester' defaultValue={selectedSemester}>
                                <option value={`1st Semester`}>1st Semester</option> 
                                <option value={`2nd Semester`}>2nd Semester</option> 
                            </select>
                            <label htmlFor="floatingSemester">Semester</label>
                        </div>
                    </div>
                    <div className='col-md-3 col-sm-12'>
                        <button className='btn btn-primary form-control col-sm-12 py-3' onClick={handleOnChangeYear}>View</button>
                    </div>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <CheckList noData={noData} handleListSelect={() => null} data={checkList} scholar_history_id={checkList} year={year} semester={selectedSemester} isLoading={checkListIsLoading}/>
                            </div>

                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <EventList handleListSelect={() => null} data={eventsList} isLoading={isEventLoading}/>
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <DocumentCard handleListSelect={() => null} isLoading={isDocumentLoading} dataList={documentList} />
                            </div>
                        </div>
                    </div>
                </div>
                
            </div>
        </div>
    </>
  )
}

export default Profiles;