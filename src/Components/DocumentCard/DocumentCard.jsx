import React from 'react';
import { Link } from 'react-router-dom';
import useAuthStore from '../../Store/globalStates';
import './DocumentCard.css';

const DocumentCard = (props) => {
    const {  scholarshipData } = useAuthStore();
   
  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Recent Uploaded Documents</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 ">
            <div className={`latest-update-box  ${props.isLoading? 'list-loading':''}`}>
                
            <table className="table table-hover document-card-table">
                {props?.dataList?.length > 0 && (
                    <thead>
                        <tr>
                            <th scope="col">Scholar</th>
                            <th scope="col">Scholarship</th>
                            <th scope="col">Document</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                )}

                <tbody>
                    {props?.dataList?.length > 0 ?  
                        props?.dataList?.map((documentData) => (                            
                        <tr key={documentData.id} tabIndex={documentData.id} className={`cursor-pointer`} >
                            <td >{documentData.scholars.first_name} {documentData.scholars.last_name}</td>
                            <td>{scholarshipData.filter((scholarship_name) => scholarship_name.id === documentData.scholars.scholarship_id)[0].scholarship_name}</td>
                            <td>{documentData.filename.substring(0, 20)}...</td>
                            <td ><span className={`document-${documentData.document_histories[0].status}`}>{documentData.document_histories[0].status}</span></td>
                        </tr>
                    ))
                    :
                    (
                    <tr>
                        <td>
                            <div className='empty-list'>
                                No Document!
                            </div>
                        </td>
                    </tr>
                    )
                    } 
                    
                </tbody>
            </table>
                
            </div>
            <div className="text-center">
                <Link to={'/admin/scholardocument'} className="b-b-primary text-primary">View all Documents</Link>
            </div>
        </div>
    </div>
  )
}

export default DocumentCard;