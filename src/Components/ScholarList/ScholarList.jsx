import React from 'react';
import './ScholarList.css';

const ScholarList = () => {
  return (
    <div>
        <div className='search-container'>
            <div className='row'>
                <div className='col-md-12 col-sm-12'>
                    <div className='row'>
                        <div className='search-box col-sm-12 col-md-6'>
                            <div className="form-floating mb-3">
                                <input type="text" className="form-control" id="floatingSearchBox" placeholder="Scholar Name" />
                                <label htmlFor="floatingSearchBox">Scholar Name</label>
                            </div>
                        </div>
                        <div className='search-filter d-md-block d-sm-none col-md-3'>
                            <div className="form-floating mb-3">
                                <select className="form-select" id='floatingScholarship'>
                                    <option value="0">All</option>
                                    <option value="1">CHED</option>
                                    <option value="2">TES</option>
                                    <option value="3">FHE</option>
                                    <option value="2">DOST</option>
                                </select>
                                <label htmlFor="floatingScholarship">Scholarship</label>
                            </div>
                        </div>
                        <div className='col-md-3 col-sm-12'>
                            <button className='btn btn-primary form-control col-sm-12 py-3'>Search</button>
                        </div>
                        
                    </div>
                </div>
                
            </div>
        </div>
        <div className="card latest-update-card p-0">
            <div className="card-body p-0 m-0 ">
                <div className="event-list-table-container ">
                    
                <table className="table table-hover event-list-table">
                    <thead>
                        <tr>
                            <th className='py-3'>
                                Scholar
                            </th>
                            <th className='py-3'>
                                Course And Year
                            </th>
                            <th className='py-3'>
                                Scholarship
                            </th>
                            <th className='py-3'>
                                Status
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td className='py-3'>
                                Scholar
                            </td>
                            <td className='py-3'>
                                Course And Year
                            </td>
                            <td className='py-3'>
                                Scholarship
                            </td>
                            <td className='py-3'>
                                Status
                            </td>
                        </tr>
                        <tr >
                            <td className='py-3'>
                                Scholar
                            </td>
                            <td className='py-3'>
                                Course And Year
                            </td>
                            <td className='py-3'>
                                Scholarship
                            </td>
                            <td className='py-3'>
                                Status
                            </td>
                        </tr>
                        <tr>
                            <td className='py-3'>
                                Scholar
                            </td>
                            <td className='py-3'>
                                Course And Year
                            </td>
                            <td className='py-3'>
                                Scholarship
                            </td>
                            <td className='py-3'>
                                Status
                            </td>
                        </tr>
                        <tr>
                            <td className='py-3'>
                                Scholar
                            </td>
                            <td className='py-3'>
                                Course And Year
                            </td>
                            <td className='py-3'>
                                Scholarship
                            </td>
                            <td className='py-3'>
                                Status
                            </td>
                        </tr>
                        
                    </tbody>
                </table>
                    
                </div>
            </div>
        </div>
    </div>

  )
}

export default ScholarList;