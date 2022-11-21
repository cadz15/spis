import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ConcernCard.css';

const ConcernCard = () => {
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
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Queries And Concerns</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 ">
            <div className="latest-update-box ">
                
            <table className="table table-hover document-card-table">
                <tbody>
                    {dataList.length > 0 ? 
                        dataList.map(({i, concernData}) => (
                            <tr>
                                <td>
                                <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3048/3048127.png" alt="User-Profile-Image" />
                                </td>
                                <td className='px-4'>
                                    <div className='event-list-head pb-2'>
                                        <p className='p-0 m-0 fw-bold event-list-title col-md-12'>{concernData.scholarName}</p>
                                    </div>
                                    <div className='event-list-body col-md-12'>
                                        {concernData.query}
                                    </div>
                                </td>
                            </tr>
                         ))
                         : 
                         (<div className='empty-list'>
                            No Query And Concern!
                            </div>)
                    }
                </tbody>
            </table>
                
            </div>
            <div className="text-center">
                <Link to={'/admin/query'} className="b-b-primary text-primary">View all Query/Concern</Link>
            </div>
        </div>
    </div>
  )
}

export default ConcernCard;