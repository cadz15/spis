import React from 'react';
import { RiHome3Line } from 'react-icons/ri';
import EventForm from '../EventForm/EventForm';
import EventList from '../EventList/EventList';

const ScholarshipForm = () => {
  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Create Event</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-3 ">
            <form method='post'>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingScholarshipName" placeholder="Scholaship Name" />
                    <label htmlFor="floatingScholarshipName">Scholarship Name</label>
                </div>
                <div className='row'>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingScholarshipDetails" placeholder="Scholarship Details" />
                        <label htmlFor="floatingScholarshipDetails">Scholarship Details</label>
                    </div>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary'>Create Scholarship</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default ScholarshipForm;