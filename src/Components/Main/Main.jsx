import React, { useEffect, useState } from 'react';
import { RiHome3Line } from 'react-icons/ri';
import ConcernCard from '../ConcernCard/ConcernCard';
import DocumentCard from '../DocumentCard/DocumentCard';
import EventList from '../EventList/EventList';
import ScholarCard from '../ScholarCard/ScholarCard';
import './Main.css';

const Main = () => {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const  fetchData = async () => {
        setIsLoading(true);

        await fetch(`api/link`) //change for API LINK
        
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

    useEffect(() => {
        // fetchData()
    }, []);


  return (
    <div className='main-content-bg'>
        <div className='main-content p-4'>
            <div className='breacrumb-container mb-4'>
                <span className='subtext fs-5'>Dashboard</span>
                <div className='breadcrumbs d-flex align-items-center gap-2 subtext mt-2'>
                    <RiHome3Line /> <span className='breadcrumbs-text'>/</span> <span className='breadcrumbs-text'> Dashboard</span>
                </div>
            </div>

            <div className=''>
                <div className='row'>
                    <div className='col-sm-12 col-md-12'>
                        <div className='row'>
                            <div className='col-md-6  col-lg-3 col-sm-12 mb-3'>
                                <ScholarCard cardType='primary' data={dataList} />
                            </div>
                            <div className='col-md-6 col-lg-3 col-sm-12  mb-3'>
                                <ScholarCard cardType='success' data={dataList} />
                            </div>
                            <div className='col-md-6 col-lg-3 col-sm-12  mb-3'>
                                <ScholarCard cardType='danger' data={dataList} />
                            </div>
                            <div className='col-md-6 col-lg-3 col-sm-12  mb-3'>
                                <ScholarCard cardType='warning' data={dataList} />
                            </div>
                        </div>
                    </div>
                </div>

                <div className='row'>
                    <div className='mx-1 my-3'>
                        <EventList />
                    </div>
                </div>

                <div className='row'>
                    <div className='col-md-12 col-lg-12'>
                        <div className='row'>
                            <div className='col-sm-12 col-lg-6 col-md-12 mb-3'>
                                <DocumentCard />
                            </div>
                            <div className='col-sm-12  col-lg-6 col-md-12 mb-3'>
                                <ConcernCard />
                            </div>

                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Main;