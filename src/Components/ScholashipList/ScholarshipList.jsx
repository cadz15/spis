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
            <div className="event-list-table-container ">
                
            <table className="table table-hover event-list-table">
                {props.dataList > 0 && (
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
                        {props.dataList?.length > 0 ? 
                            props.dataList.map(({i, scholarshipData}) => (
                                <tr tabIndex={scholarshipData.id} onClick={(e) => {props.handleListSelect(e)}} className="cursor-pointer">
                                    <td className='px-4'>
                                        <div className='event-list-head pb-2'>
                                            {scholarshipData.scholarshipName}
                                        </div>
                                    </td>
                                    <td className='px-4'>
                                        <div className='event-list-body col-md-12'>
                                            {scholarshipData.scholarshipDetails}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        :
                            (<div className='empty-list'>
                                No Scholarship!
                            </div>
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