import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';

const EventEditModal = (props) => {
    const { jwt_token } = useAuthStore();
    const [selectedRecipient, setSelectedRecipient] = useState([]);
    const [hideError, setHideError] = useState(true);
    const [hasError, setHasError] = useState({});
    const [preSelectedValues, setPreSelectedValues] = useState([]);


    const handleMultiselectSelect = (selectedList, selectedItem) => {
        setSelectedRecipient((current) => [...current, selectedItem.id]);
        setPreSelectedValues((current) => [...current, selectedItem]);
    }

    const handleMultiselectRemove = (selectedList, removedItem) => {
        setSelectedRecipient((current) => current.filter((recipient) => recipient !== removedItem.id));
        setPreSelectedValues((current) => current.filter((recipient) => recipient !== removedItem));
    }

    const handleDelete = async() => {
        await axios.delete(`${process.env.REACT_APP_API_LINK}/events/${props.data[0].id}`,
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            if(response.data.errors){
                setHasError(response.data.errors)
                setHideError(false);
            }else {
                setHideError(true);
                setHasError({});
                toast.success('Event successfully deleted!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                props.closeModalUpdate();
                props.refreshList(true);
            }
        })
        .catch((error) => console.log(error));
    }
    
    const handleUpdateEvent = async() => {
        const title = document.getElementById('floatingEventTitle').value;
        const event_start = document.getElementById('floatingEventDateFrom').value;
        const event_end = document.getElementById('floatingEventDateTo').value;
        const details = document.getElementById('floatinEventDetail').value;

        await axios.put(`${process.env.REACT_APP_API_LINK}/events/${props.data[0].id}`, 
        { title, event_start, event_end, recipients: selectedRecipient, details},
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            if(response.data.errors){
                setHasError(response.data.errors)
                setHideError(false);
            }else {
                setHideError(true);
                setHasError({});
                toast.success('Event successfully updated!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                props.closeModalUpdate();
                props.refreshList(true);
            }
        })
        .catch((error) => console.log(error));
    }

    const handleCloseModal = (e) => {
        props.onClose(e);
    }

    const handlePrePopulateRecipient =() => {
        let array_data = []

        props.data[0]?.event_individual.map((individual) => {
            array_data.push(props.recipientList.filter((recipient) => recipient.id === individual.scholar_id)[0])
            setSelectedRecipient((current) => [...current, props.recipientList.filter((recipient) => recipient.id === individual.scholar_id)[0].id])
        })
        setPreSelectedValues(array_data);
    }

    useEffect(() => {
        setPreSelectedValues([]); //clean selected recipient
        setSelectedRecipient([]); //clean selected recipient
        handlePrePopulateRecipient();
    },[props.show]);
    
    if (!props.show) return null;

    return (
      <div className="modal " onClick={handleCloseModal}>
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5">Edit Event</h1>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
              </div>
              <div className="modal-body">
                <div className='editForm'>
                    <div className={`alert alert-danger alert-dismissible fade show ${hideError? 'd-none': ''} `} role="alert">
                        {hasError && 
                            Object.entries(hasError).map((errorValidation) => (
                            <p key={errorValidation[0]}><strong>{errorValidation[0]}</strong> {errorValidation[1]} </p>
                            ))
                        }
                    </div>
                    <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingEventTitle" placeholder="Event Title" defaultValue={props.data[0]?.title} />
                        <label htmlFor="floatingEventTitle">Event Title</label>
                    </div>
                    <div className='row'>
                        <div className='col-md-12 col-sm-12'>
                            <div className='row'>
                                <div className='col-md-6 col-sm-12'>
                                    <div className="form-floating mb-3">
                                        <input type="date" className="form-control" id="floatingEventDateFrom" placeholder="Start" min={`${new Date().toISOString().split('T')[0]}` }  defaultValue={props.data[0]?.event_start} />
                                        <label htmlFor="floatingEventDateFrom">Event Date Start</label>
                                    </div>
                                </div>
                                <div className='col-md-6 col-sm-12'>                            
                                    <div className="form-floating mb-3">
                                        <input type="date" className="form-control" id="floatingEventDateTo" placeholder="End" min={`${new Date().toISOString().split('T')[0]}`} defaultValue={props.data[0]?.event_end} />
                                        <label htmlFor="floatingEventDateTo">Event Date End</label>
                                    </div>
                                </div>                            
                            </div>
                        </div>
                    </div>
                    <div className='row mb-3'>
                        <Multiselect
                            options={props.recipientList} // Options to display in the dropdown
                            groupBy='scholarship_name'
                            displayValue="display_name" // Property name to display in the dropdown options
                            selectedValues={preSelectedValues}
                            showCheckbox
                            placeholder='Select Recipient'
                            onSelect={handleMultiselectSelect}
                            onRemove={handleMultiselectRemove}
                        />
                    </div>
                    <div className='row'>
                        <div className="form-floating mb-3">
                            <textarea className='form-control' id='floatinEventDetail' defaultValue={props.data[0]?.details}>

                            </textarea>
                            <label htmlFor="floatingEventDateT">Event Detail</label>
                        </div>
                    </div>
                </div>  
              </div>
              <div className="modal-footer d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>
                    <div className="btn-group" role="group">
                        <button type="button" className="btn btn-danger" onClick={handleDelete}>Delete</button>
                        <button type="button" className="btn btn-success" onClick={handleUpdateEvent} >Update</button>
                    </div>
              </div>
              </div>
          </div>
      </div>
    )
}

export default EventEditModal;