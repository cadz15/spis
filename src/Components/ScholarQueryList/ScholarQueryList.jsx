import React from 'react';

const ScholarQueryList = (props) => {
  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Query and Concern List</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 scrollable-list ">
            <div className={`event-list-table-container ${props.isLoading? 'list-loading':''}`}>
                
            <table className={`table table-hover event-list-table  `}>
                <tbody>          
                    {props.data?.length > 0 ? 
                        props.data?.map((eventsData) => (
                            <tr key={eventsData.id} tabIndex={eventsData.id} onClick={(e) => {props?.handleListSelect(e)}} className="cursor-pointer">
                                <td className='px-4'>
                                    <div className='event-list-head pb-2'>
                                        <p className='p-0 m-0 text-muted event-list-date'>{eventsData.replies_count} Replies</p>
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
                                No Query / Concern!
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

export default ScholarQueryList;