import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './ConcernCard.css';

const ConcernCard = (props) => {
    


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
                {props?.dataList.length > 0 ? 
                    props?.dataList.map((queryData) => (
                        <tr key={queryData.id}>
                            <td className='py-3'>
                                {queryData.scholars.first_name} {queryData.scholars.last_name}
                            </td>
                            <td className='py-3'>
                                <div className='event-list-head pb-2'>
                                    <p className='p-0 m-0 text-muted event-list-date'>{queryData.replies_count} Replies</p>
                                </div>
                                {queryData.details}
                            </td>
                        </tr>
                    ))
                    :
                        (
                        <tr>
                            <td>
                                <div className='empty-list'>
                                    No Queries can be found!
                                </div>
                            </td>
                        </tr>
                        
                        )
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