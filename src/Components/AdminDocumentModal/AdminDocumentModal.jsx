import React from 'react';
import './AdminDocumentModal.css';

const AdminDocumentModal = (props) => {
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
                <p>Scholar : <em>SCHOLAR NAME</em></p>
                <p>Document : <em>Document NAME</em></p>
                <div className="form-floating mb-3">
                    <select className="form-select" id='floatingScholarship'>
                        <option value="0">Pending</option>
                        <option value="1">Reviewed</option>
                        <option value="2">Approved</option>
                        <option value="3">Declined</option>
                    </select>
                    <label htmlFor="floatingScholarship">Status</label>
                </div>
                <div className="form-floating mb-3">
                    <input type="text" className="form-control" id="floatingDocumentDescription" placeholder="Description"/>
                    <label htmlFor="floatingDocumentDescription">Description</label>
                </div>

            </div>
            <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                <button type="button" className="btn btn-primary" onClick={props.onClose}>Save changes</button>
            </div>
            </div>
        </div>
    </div>
  )
}

export default AdminDocumentModal;