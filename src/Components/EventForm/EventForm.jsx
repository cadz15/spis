import React, { useState } from 'react';
import Multiselect from 'multiselect-react-dropdown';
import axios from 'axios';
import useAuthStore from '../../Store/globalStates';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const EventForm = (props) => {
    const { jwt_token, activeAcademicYear } = useAuthStore();
    // const [recipientList, setRecipientList] = useState([]);
    const [selectedRecipient, setSelectedRecipient] = useState([]);
    const [hideError, setHideError] = useState(true);
    const [hasError, setHasError] = useState({});
    const [preSelectedValues, setPreSelectedValues] = useState([]);
    const navigate = useNavigate();

    const handleCreateEvent = async() => {
        const title = document.getElementById('floatingEventTitle').value;
        const event_start = document.getElementById('floatingEventDateFrom').value;
        const event_end = document.getElementById('floatingEventDateTo').value;
        const details = document.getElementById('floatinEventDetail').value;
        const academic_year = activeAcademicYear[0].academic_year;

        await axios.post(`${process.env.REACT_APP_API_LINK}/events?academic_year=${academic_year}`, 
        { title, event_start, event_end, academic_year, recipients: selectedRecipient, details},
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
                toast.success('Scholar registered successfully!', {
                    position: toast.POSITION.TOP_RIGHT,
                    onClose: () => {navigate('/admin/dashboard');}
                });
            }
        })
        .catch((error) => console.log(error));
    }

    const handleMultiselectSelect = (selectedList, selectedItem) => {
        // setSelectedRecipient((current) => [...current, selectedItem.id])
        if (selectedItem.id === 0 ){
            setPreSelectedValues(props.recipientList);
            setSelectedRecipient(props.recipientList.map((recipient) => recipient.id));
        }else {
            setSelectedRecipient((current) => [...current, selectedItem.id]);
            setPreSelectedValues((current) => current.filter((recipient) => recipient.id !== 0));
        }
    }

    const handleMultiselectRemove = (selectedList, removedItem) => {
        // setSelectedRecipient((current) => current.filter((recipient) => recipient !== removedItem.id));
        if (removedItem.id === 0){
            setPreSelectedValues([]);
            setSelectedRecipient([]);
        }else{
            setSelectedRecipient((current) => current.filter((recipient) => recipient !== removedItem.id));        
            setPreSelectedValues((current) => current.filter((recipient) => recipient !== removedItem)); 
    
            setSelectedRecipient((current) => current.filter((recipient) => recipient !== 0));
            setPreSelectedValues((current) => current.filter((recipient) => recipient.id !== 0));              
        }
    }


  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Create Event</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-3 ">
                <div className={`alert alert-danger alert-dismissible fade show ${hideError? 'd-none': ''} `} role="alert">
                    {hasError && 
                        Object.entries(hasError).map((errorValidation) => (
                        <p key={errorValidation[0]}><strong>{errorValidation[0]}</strong> {errorValidation[1]} </p>
                        ))
                    }
                </div>
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
                        options={props.recipientList} // Options to display in the dropdown
                        groupBy='scholarship_name'
                        displayValue="display_name" // Property name to display in the dropdown options
                        showCheckbox
                        placeholder='Select Recipient'
                        onSelect={handleMultiselectSelect}
                        onRemove={handleMultiselectRemove}
                        selectedValues={preSelectedValues}
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
                    <button className='btn btn-primary' onClick={handleCreateEvent}>Create Event</button>
                </div>
        </div>
    </div>
  )
}

export default EventForm;