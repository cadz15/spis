import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';

const ScholarQueryForm = (props) => {
    const [hideError, setHideError] = useState(true);
    const [hasError, setHasError] = useState({});
    const [details, setDetails] = useState('');
    const { jwt_token, userAuth } = useAuthStore();

    const onChangeDetails = (e) => {
        setDetails(e.target.value);
    }


    const handleCreateConcern = () => {
        const details = document.getElementById('floatinQueryDetail').value;


        axios.post(`${process.env.REACT_APP_API_LINK}/concern`,
        {scholar_id: userAuth.id, details, token: jwt_token},
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
                toast.success('Query/Concern successfully added!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                setDetails('');
                props.refreshList(true);
            }
        })
        .catch((error) => console.log(error));
    }

  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Create Query/Concern</h6>
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
                <div className='row'>
                    <div className="form-floating mb-3">
                        <textarea className='form-control' id='floatinQueryDetail' onChange={onChangeDetails} value={details} required></textarea>
                        <label htmlFor="floatinQueryDetail">Query/Concern</label>
                    </div>
                </div>
                <div className='row px-2 py-3'>
                    <button className='btn btn-primary' onClick={handleCreateConcern}>Submit Query/Concern</button>
                </div>
        </div>
    </div>
  )
}

export default ScholarQueryForm;