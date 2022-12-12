import Multiselect from 'multiselect-react-dropdown';
import React, { useState } from 'react';

const SMSBlastForm = (props) => {
    const [selectedRecipient, setSelectedRecipient] = useState([]);
    

    const handleMultiselectSelect = (selectedList, selectedItem) => {
        setSelectedRecipient((current) => [...current, selectedItem.id]);
    }

    const handleMultiselectRemove = (selectedList, removedItem) => {
        setSelectedRecipient((current) => current.filter((recipient) => recipient !== removedItem.id));
    }



  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Send SMS </h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-3 ">
            <form method='post'>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingSMSSender" placeholder="Sender" />
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
                        />
                </div>
                <div className='row'>
                    <div className="form-floating mb-3">
                        <textarea className='form-control' id='floatinEventDetail'>

                        </textarea>
                        <label htmlFor="floatingEventDateT">SMS Detail</label>
                    </div>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary py-2'>Send SMS</button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default SMSBlastForm;