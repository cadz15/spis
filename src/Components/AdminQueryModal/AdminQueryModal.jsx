import axios from 'axios';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';
import './AdminQueryModal.css';

const AdminQueryModal = (props) => {
    const [replies, setReplies] = useState('');
    const { jwt_token, userAuth } = useAuthStore();
    const [hideError, setHideError] = useState(true);
    const [hasError, setHasError] = useState({});

    const onChangeReply = (e) => {
        setReplies(e.target.value);
    }

    const handleReply = async() => {

        await axios.post(`${process.env.REACT_APP_API_LINK}/concern/reply/${props.data[0].id}`, 
        {user_id: userAuth.id, concern_id: props.data[0].id, reply: replies, token: jwt_token},
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            console.log(response);
            if(response.data.errors){
                setHasError(response.data.errors)
                setHideError(false);
            }else {
                setHideError(true);
                setHasError({});
                toast.success('Reply successfully sent!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                props.forceClose();
            }
        })
        .catch((error) => console.log(error));
    }

    if (!props.show) return null;

    return (
      <div className="modal " onClick={props.onClose}>
          <div className="modal-dialog">
              <div className="modal-content">
              <div className="modal-header">
                  <h1 className="modal-title fs-5">Queries And Concerns</h1>
                  <button type="button" className="btn-close" onClick={props.onClose}></button>
              </div>
              <div className="modal-body">
                  <p>Scholar : <em>{props.data[0].scholars.first_name} {props.data[0].scholars.last_name}</em></p>
                  <p>Query : <em className='concerns'>{props.data[0].details}</em></p>
                  <div className={`alert alert-danger alert-dismissible fade show ${hideError? 'd-none': ''} `} role="alert">
                        {hasError && 
                            Object.entries(hasError).map((errorValidation) => (
                            <p key={errorValidation[0]}><strong>{errorValidation[0]}</strong> {errorValidation[1]} </p>
                            ))
                        }
                    </div>

                  <div className="form-floating mb-3">
                      <textarea className="form-control" id="floatingDocumentDescription" placeholder="Description" onChange={onChangeReply} value={replies} rows={5}/>
                      <label htmlFor="floatingDocumentDescription">Reply</label>
                  </div>  
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={handleReply}>Reply</button>
              </div>
              </div>
          </div>
      </div>
    )
}

export default AdminQueryModal;