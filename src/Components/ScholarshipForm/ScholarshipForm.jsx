import React, { useState } from 'react';

const ScholarshipForm = (props) => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');

    const handleCreateScholarship = () => {
        const scholarship_name = document.getElementById('floatingScholarshipName').value;
        const scholarship_detail = document.getElementById('floatingScholarshipDetails').value;


        props.handleSubmit(scholarship_name, scholarship_detail);

        setName('');
        setDetails('');
    }

    const onChangeName = (e) => {
        setName(e.target.value)
    }

    const onChangeDetail = (e) => {
        setDetails(e.target.value)
    }

  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Create Scholarship</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-3 ">
            <div className={`alert alert-danger alert-dismissible fade show ${props.hideError? 'd-none': ''} `} role="alert">
                {props.hasError && 
                    Object.entries(props.hasError).map((errorValidation) => (
                    <p key={errorValidation[0]}><strong>{errorValidation[0]}</strong> {errorValidation[1]} </p>
                    ))
                }
            </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingScholarshipName" placeholder="Scholaship Name"  value={name} onChange={(e) => onChangeName(e)} />
                    <label htmlFor="floatingScholarshipName">Scholarship Name</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingScholarshipDetails" placeholder="Scholarship Details" value={details} onChange={(e) => onChangeDetail(e)} />
                    <label htmlFor="floatingScholarshipDetails">Scholarship Details</label>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary' onClick={handleCreateScholarship}>Create Scholarship</button>
                </div>
        </div>
    </div>
  )
}

export default ScholarshipForm;