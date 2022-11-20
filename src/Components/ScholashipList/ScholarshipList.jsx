import React from 'react';

const ScholarshipList = () => {
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
                <tbody>
                    <tr>
                        <td className='px-4'>
                            <div className='event-list-head pb-2'>
                                doremon and friends
                            </div>
                        </td>
                        <td className='px-4'>
                            <div className='event-list-body col-md-12'>
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quaerat facere et dolor culpa similique totam voluptatum iste ducimus sunt, aut nam nisi eaque amet voluptate asperiores, aspernatur illum molestias.
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
                
            </div>
        </div>
    </div>
  )
}

export default ScholarshipList;