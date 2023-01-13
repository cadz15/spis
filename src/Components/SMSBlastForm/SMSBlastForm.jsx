import axios from 'axios';
import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react';
import { useRef } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';

const SMSBlastForm = (props) => {
    const [selectedRecipient, setSelectedRecipient] = useState([]);
    const { jwt_token } = useAuthStore();
    const [hideError, setHideError] = useState(true);
    const [hasError, setHasError] = useState({});
    const [senderName, setSenderName] = useState('');
    const [smsDetails, setSMSDetails] = useState('');
    const [preSelectedValues, setPreSelectedValues] = useState([]);
    const multiselectRef = useRef();
    
    const onChangeName = (e) => {
        setSenderName(e.target.value)
    }

    const onChangeDetail = (e) => {
        setSMSDetails(e.target.value)
    }


    const handleMultiselectSelect = (selectedList, selectedItem) => {
        if (selectedItem.id === 0 ){
            setPreSelectedValues(props.recipientList);
            setSelectedRecipient(props.recipientList.map((recipient) => recipient.id));
        }else {
            setSelectedRecipient((current) => [...current, selectedItem.id]);
            setPreSelectedValues((current) => current.filter((recipient) => recipient.id !== 0));
        }
    }

    const handleMultiselectRemove = (selectedList, removedItem) => {
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

    const resetMultiselect = () => {
        multiselectRef.current.resetSelectedValues();
        setSenderName('');
        setSMSDetails('');
        setSelectedRecipient([]);
    }

    const handleSendSMS = async() => {
        const sender_name = document.getElementById('floatingSMSSender').value;
        const sms_detail = document.getElementById('floatinEventDetail').value;


        await axios.post(`${process.env.REACT_APP_API_LINK}/sms`, 
        {sender_name, sms_detail, recipients: selectedRecipient, token: jwt_token},
        {
            header : {
                "Authorization" : `Bearer ${jwt_token}`,
                'Accept' : 'application/json',
                'Content-Type': 'application/json',
                'withCredentials': 'true'
            }                
        })
        .then((response) => {
            if(response.data.status){
                setHideError(true);
                setHasError({});
                toast.success('SMS successfully sent!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                resetMultiselect();
            }else{
                setHasError(response.data.errors)
                setHideError(false);
            }
        })
        .catch((error) => {
            toast.error('Server connection failed!', {
                position: toast.POSITION.TOP_RIGHT,
            });
        })
    }

  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Send SMS </h6>
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
                    <input type="text" className="form-control" id="floatingSMSSender" placeholder="Sender" value={senderName} onChange={onChangeName} />
                    <label htmlFor="floatingSMSSender">Sender Name</label>
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
                            ref={multiselectRef}
                        />
                </div>
                <div className='row'>
                    <div className="form-floating mb-3">
                        <textarea className='form-control' id='floatinEventDetail' value={smsDetails}  onChange={onChangeDetail} >                            
                        </textarea>
                        <label htmlFor="floatingEventDateT">SMS Detail</label>
                    </div>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary py-2' onClick={handleSendSMS}>Send SMS</button>
                </div>
        </div>
    </div>
  )
}

export default SMSBlastForm;