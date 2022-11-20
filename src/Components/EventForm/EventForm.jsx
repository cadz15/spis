import React from 'react';
import Multiselect from 'multiselect-react-dropdown';

const EventForm = () => {
    const data =  [
        {scholarship: 'adidas' ,name: 'Option 1️⃣', id: 1},{scholarship: 'nike' ,name: 'Option 2️⃣', id: 2}
    ];

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
                    <input type="text" className="form-control" id="floatingEventTitle" placeholder="Event Title" />
                    <label htmlFor="floatingEventTitle">Event Title</label>
                </div>
                <div className='row'>
                    <div className='col-md-12 col-sm-12'>
                        <div className='row'>
                            <div className='col-md-6 col-sm-12'>
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="floatingEventDateFrom" placeholder="Start" min={`${new Date().toISOString().split('T')[0]}`}/>
                                    <label htmlFor="floatingEventDateFrom">Event Date Start</label>
                                </div>
                            </div>
                            <div className='col-md-6 col-sm-12'>                            
                                <div className="form-floating mb-3">
                                    <input type="date" className="form-control" id="floatingEventDateTo" placeholder="End" min={`${new Date().toISOString().split('T')[0]}`} />
                                    <label htmlFor="floatingEventDateTo">Event Date End</label>
                                </div>
                            </div>                            
                        </div>
                    </div>
                </div>
                <div className='row mb-3'>
                    <Multiselect
                        options={data} // Options to display in the dropdown
                        groupBy='scholarship'
                        displayValue="name" // Property name to display in the dropdown options
                        showCheckbox
                        placeholder='Select Recipient'
                    />
                </div>
                <div className='row'>
                    <div className="form-floating mb-3">
                        <textarea className='form-control' id='floatinEventDetail'>

                        </textarea>
                        <label htmlFor="floatingEventDateT">Event Detail</label>
                    </div>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary'>Create Event</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default EventForm;