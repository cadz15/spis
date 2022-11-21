import Multiselect from 'multiselect-react-dropdown';
import React from 'react';

const EventEditModal = (props) => {
    const data =  [
        {scholarship: 'adidas' ,name: 'Option 1️⃣', id: 1},{scholarship: 'nike' ,name: 'Option 2️⃣', id: 2}
    ];
    
    if (!props.show) return null;

    return (
      <div className="modal " onClick={props.onClose}>
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5">Edit Event</h1>
                  <button type="button" className="btn-close" onClick={props.onClose}></button>
              </div>
              <div className="modal-body">
                <div className='editForm'>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingEventTitle" placeholder="Event Title" defaultValue={props.data} />
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
                </div>  
              </div>
              <div className="modal-footer d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-danger">Delete</button>
                        <button type="button" className="btn btn-success">Update</button>
                    </div>
              </div>
              </div>
          </div>
      </div>
    )
}

export default EventEditModal;