import React, { useEffect, useState } from 'react';
import './EventList.css';

const EventList = (props) => {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const  fetchData = async () => {
        // setIsLoading(true);

       // await axios.get('http://slsu_spis.localtest/api/events',{headers: {
        //         "Authorization" : `Bearer ${jwt_token}`,
        //         'withCredentials': 'true'
        //         }
        //         }
        //     )
        //     .then((response) => {
        //         setDataList(response.data);
        //         // console.log(response.data);
        //     })
        //     .catch((error) => {
        //         console.log(error);
        //         console.log(jwt_token);
        //     })

        setDataList([
            {
                id: 0,
                event: 'This is dummy event #1',
                event_date: '10/12/2022',
                event_detail: 'This is sample Event details. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste assumenda pariatur recusandae libero ipsa amet aliquid ea excepturi nisi sunt, sit impedit incidunt vitae quod placeat praesentium reiciendis. Ipsa, sapiente.' 
            },
            {
                id: 1,
                event: 'This is dummy event #2',
                event_date: '10/12/2022',
                event_detail: 'This is sample Event details. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste assumenda pariatur recusandae libero ipsa amet aliquid ea excepturi nisi sunt, sit impedit incidunt vitae quod placeat praesentium reiciendis. Ipsa, sapiente.' 
            },
            {
                id: 2,
                event: 'This is dummy event #3',
                event_date: '10/12/2022',
                event_detail: 'This is sample Event details. Lorem ipsum dolor sit amet consectetur adipisicing elit. Iste assumenda pariatur recusandae libero ipsa amet aliquid ea excepturi nisi sunt, sit impedit incidunt vitae quod placeat praesentium reiciendis. Ipsa, sapiente.' 
            },
        ])

        // setIsLoading(true);
        console.log(props);
    }
    
    useEffect(() => {
        console.log(props);
        if (Object.keys(props).length === 0){
            fetchData()
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
                    {dataList?.length > 0 ? 
                        dataList?.map((eventsData) => (
                            <tr key={eventsData.id} tabIndex={eventsData.id} onClick={(e) => {props?.handleListSelect(e)}} className="cursor-pointer">
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
                    (<div className='empty-list'>
                        No Event!
                    </div>
                    )}                    
                </tbody>
            </table>
                
            </div>
        </div>
    </div>
  )
}

export default EventList;