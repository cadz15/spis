import React from 'react';

const ScholarshipList = (props) => {


  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Scholarship List</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 ">
            <div className={`event-list-table-container ${props.isLoading? 'list-loading':''}`}>
                
            <table className="table table-hover event-list-table">
                {props.data?.length > 0 && (
                    <thead>
                    <tr>
                        <th className='py-3'>
                            Name
                        </th>
                        <th className='py-3'>
                            Detail
                        </th>
                    </tr>
                </thead>
                )}
                
                <tbody>
                        {props.data?.length > 0 ? 
                            props.data.map((scholarshipData) => (
                                <tr key={scholarshipData.id} tabIndex={scholarshipData.id} onClick={(e) => {props.handleListSelect(e)}} className="cursor-pointer">
                                    <td className='px-4'>
                                        <div className='event-list-head pb-2'>
                                            {scholarshipData.scholarship_name}
                                        </div>
                                    </td>
                                    <td className='px-4'>
                                        <div className='event-list-body col-md-12'>
                                            {scholarshipData.scholarship_detail}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        :
                            (
                            <tr>
                                <td>
                                    <div className='empty-list'>
                                        No Scholarship!
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
  )
}

export default ScholarshipList;