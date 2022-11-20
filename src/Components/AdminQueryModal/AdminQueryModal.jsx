import React from 'react';
import './AdminQueryModal.css';

const AdminQueryModal = (props) => {
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
                  <p>Scholar : <em>SCHOLAR NAME</em></p>
                  <p>Queries : <em className='concerns'>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Cumque, debitis. Consequuntur exercitationem, nam illo maxime vitae quidem, voluptas nobis distinctio aliquam ullam commodi, quisquam deserunt libero autem voluptate eligendi laudantium.</em></p>
                  <div className="form-floating mb-3">
                      <textarea className="form-control" id="floatingDocumentDescription" placeholder="Description" rows={5}/>
                      <label htmlFor="floatingDocumentDescription">Reply</label>
                  </div>
  
              </div>
              <div className="modal-footer">
                  <button type="button" className="btn btn-secondary" onClick={props.onClose}>Close</button>
                  <button type="button" className="btn btn-primary" onClick={props.onClose}>Reply</button>
              </div>
              </div>
          </div>
      </div>
    )
}

export default AdminQueryModal;