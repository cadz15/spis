import React from 'react';
import './DocumentCard.css';

const DocumentCard = () => {
  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Recent Uploaded Documents</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 ">
            <div className="latest-update-box ">
                
            <table className="table table-hover document-card-table">
                <thead>
                    <tr>
                        <th scope="col">Scholar</th>
                        <th scope="col">Scholarship</th>
                        <th scope="col">Document</th>
                        <th scope="col">Status</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                    </tr>
                    <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                    </tr>
                </tbody>
            </table>
                
            </div>
            <div className="text-center">
                <a href="#!" className="b-b-primary text-primary">View all Documents</a>
            </div>
        </div>
    </div>
  )
}

export default DocumentCard;