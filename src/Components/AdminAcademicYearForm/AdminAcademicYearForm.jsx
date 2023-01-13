import React, { useState } from 'react';

const AdminAcademicYearForm = (props) => {
    const [details, setDetails] = useState('');

    const handleCreateScholarship = () => {
        const academic_year = document.getElementById('floatingAcademicYear').value;


        props.handleSubmit(academic_year);

        setDetails('');
    }

    const onChangeDetail = (e) => {
        setDetails(e.target.value)
    }

  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Create Academic Year</h6>
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
                    <input type="text" className="form-control" id="floatingAcademicYear" placeholder="Requirement Name Details" value={details} onChange={(e) => onChangeDetail(e)} />
                    <label htmlFor="floatingAcademicYear">Academic Year ex.(2022-2023)</label>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary' onClick={handleCreateScholarship}>Create Academic Year</button>
                </div>
        </div>
    </div>
  )
}

export default AdminAcademicYearForm;