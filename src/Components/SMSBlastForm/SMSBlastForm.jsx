import Multiselect from 'multiselect-react-dropdown';
import React from 'react';

const SMSBlastForm = () => {
    const data =  [
        {scholarship: 'adidas' ,name: 'Option 1️⃣', id: 1},{scholarship: 'nike' ,name: 'Option 2️⃣', id: 2}
    ];

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