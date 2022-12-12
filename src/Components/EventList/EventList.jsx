import React, { useEffect, useState } from 'react';
import './EventList.css';

const EventList = (props) => {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const dateFormatToHuman = (old_date) => {
        const new_date = new Date(old_date);

        return new_date.toDateString();
    }
    
    useEffect(() => {
        if (Object.keys(props).length === 0){
            // fetchData();
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
            <div className={`event-list-table-container ${props.isLoading? 'list-loading':''}`}>
                
            <table className={`table table-hover event-list-table  `}>
                <tbody>          
                    {props.data?.length > 0 ? 
                        props.data?.map((eventsData) => (
                            <tr key={eventsData.id} tabIndex={eventsData.id} onClick={(e) => {props?.handleListSelect(e)}} className="cursor-pointer">
                                <td className='px-4'>
                                    <div className='event-list-head pb-2'>
                                        <p className='p-0 m-0 fw-bold event-list-title col-md-12'>{eventsData.title}</p>
                                        <p className='p-0 m-0 text-muted event-list-date'>{dateFormatToHuman(eventsData.event_start)} to {dateFormatToHuman(eventsData.event_end)}</p>
                                    </div>
                                    <div className='event-list-body col-md-12'>
                                        {eventsData.details}
                                    </div>
                                </td>
                            </tr>
                        ))
                    : 
                    (
                    <tr>
                        <td>
                            <div className='empty-list'>
                                No Event!
                            </div>

                        </td>
                    </tr>
                    )}                    
                </tbody>
            </table>
                
            </div>
        </div>
    </div>
  )
}

export default EventList;