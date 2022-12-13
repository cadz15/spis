import axios from 'axios';
import React from 'react';
import { toast } from 'react-toastify';
import useAuthStore from '../../Store/globalStates';
import './AdminDocumentModal.css';

const AdminDocumentModal = (props) => {
    const { jwt_token } = useAuthStore();

    const handleUpdateDocument = async() => {
        const status = document.getElementById('floatingStatus').value;


        await axios.put(`${process.env.REACT_APP_API_LINK}/documents/${props.data[0]?.document_histories[0].id}`, 
        { status},
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
                console.log(response.data.errors);
            }else {
                toast.success('Document successfully updated!', {
                    position: toast.POSITION.TOP_RIGHT,
                });
                props.refreshList(true);
            }
        })
        .catch((error) => console.log(error));
        props.forceClose();
    }

    if (!props.show) return null;

  return (
    <div className="modal " onClick={props.onClose}>
        <div className="modal-dialog">
            <div className="modal-content">
            <div className="modal-header">
                <h1 className="modal-title fs-5">Submitted Documents</h1>
                <button type="button" className="btn-close" onClick={props.onClose}></button>
            </div>
            <div className="modal-body">
                <p>Scholar : <em>{props.data[0]?.scholars.first_name} {props.data[0]?.scholars.last_name}</em></p>
                <p>Document : <em>{props.data[0]?.filename}</em></p>
                <div className="form-floating mb-3">
                    <select className="form-select" id='floatingStatus'>
                        {props.data[0]?.document_histories[0].status === 'uploaded' ?  
                            (<option value="uploaded" selected>Uploaded</option>) 
                            :
                            (<option value="uploaded" >Uploaded</option>)
                        }
                        {props.data[0]?.document_histories[0].status === 'pending' ?  
                            (<option value="pending" selected>Pending</option>) 
                            :
                            (<option value="pending" >Pending</option>)
                        }
                        {props.data[0]?.document_histories[0].status === 'approved' ?  
                            (<option value="approved" selected>Approved</option>) 
                            :
                            (<option value="approved">Approved</option>)
                        }
                        {props.data[0]?.document_histories[0].status === 'denied' ?  
                            (<option value="denied" selected>Denied</option>) 
                            :
                            (<option value="denied">Denied</option>)
                        }
                        
                        
                        
                        
                    </select>
                    <label htmlFor="floatingScholarship">Status</label>
                </div>
            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={handleUpdateDocument}>Save changes</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDocumentModal;