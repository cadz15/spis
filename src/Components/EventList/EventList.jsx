import React, { useEffect, useState } from 'react';
import './EventList.css';

const EventList = (props) => {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const  fetchData = async () => {
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
    
    useEffect(() => {
        if (Object.keys(props).length === 0){
            // fetchData()
        }else{
            setIsLoading(props.isLoading);
            setDataList(props.data);
        }
    }, [])


  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Events List</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 ">
            <div className={`event-list-table-container ${isLoading? 'list-loading':''}`}>
                
            <table className={`table table-hover event-list-table  `}>
                <tbody>
                    
                    {dataList.length > 0 ?
                        dataList.map(({i, eventsData}) => (
                            <tr tabIndex={eventsData.id} onClick={(e) => {props?.handleListSelect(e)}} className="cursor-pointer">
                                <td className='px-4'>
                                    <div className='event-list-head pb-2'>
                                        <p className='p-0 m-0 fw-bold event-list-title col-md-12'>{eventsData.event}</p>
                                        <p className='p-0 m-0 text-muted event-list-date'>{eventsData.event_date}</p>
                                    </div>
                                    <div className='event-list-body col-md-12'>
                                        {eventsData.event_detail}
                                    </div>
                                </td>
                            </tr>
                        ))
                        :
                        <div className='empty-list'>
                            No Event!
                        </div>
                    }
                    
                </tbody>
            </table>
                
            </div>
        </div>
    </div>
  )
}

export default EventList;