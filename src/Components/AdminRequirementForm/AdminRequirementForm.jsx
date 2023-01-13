import React, { useState } from 'react'
import useAuthStore from '../../Store/globalStates';

const AdminRequirementForm = (props) => {
    const [name, setName] = useState('');
    const [details, setDetails] = useState('');
    const { scholarshipData } = useAuthStore();

    const handleCreateScholarship = () => {
        const scholarship_id = document.getElementById('floatingScholarship').value;
        const requirement = document.getElementById('floatingRequirement').value;


        props.handleSubmit(scholarship_id, requirement);

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
            <h6>Create Requirements</h6>
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
                    <select className="form-select" id='floatingScholarship'>
                        {scholarshipData?.length > 0 ? scholarshipData?.map((scholarshipListData) => 
                            (<option key={scholarshipListData.id} value={scholarshipListData.id}>{scholarshipListData.scholarship_name}</option>)
                            ) 
                            : 
                            ''
                        }
                    </select>
                    <label htmlFor="floatingScholarship">Scholarship</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingRequirement" placeholder="Requirement Name Details" value={details} onChange={(e) => onChangeDetail(e)} />
                    <label htmlFor="floatingRequirement">Requirement Name</label>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary' onClick={handleCreateScholarship}>Create Requirement</button>
                </div>
        </div>
    </div>
  )
}

export default AdminRequirementForm;