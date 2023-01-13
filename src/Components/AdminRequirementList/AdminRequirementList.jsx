import React from 'react';

const AdminRequirementList = (props) => {
    return (
        <div className="card latest-update-card p-0">
            <div className="card-header p-3">
                <h6>Requirements List</h6>
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
                                Scholarship
                            </th>
                            <th className='py-3'>
                                Requirement
                            </th>
                        </tr>
                    </thead>
                    )}
                    
                    <tbody>
                            {props.data?.length > 0 ? 
                                props.data.map((requirementData) => (
                                    <tr key={requirementData.id} tabIndex={requirementData.id} onClick={(e) => {props.handleListSelect(e)}} className="cursor-pointer">
                                        <td className='px-4'>
                                            <div className='event-list-head pb-2'>
                                                {requirementData.scholarships.scholarship_name}
                                            </div>
                                        </td>
                                        <td className='px-4'>
                                            <div className='event-list-body col-md-12'>
                                                {requirementData.requirement}
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            :
                                (
                                <tr>
                                    <td>
                                        <div className='empty-list'>
                                            No Requirements!
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

export default AdminRequirementList;