import React from 'react';
import useAuthStore from '../../Store/globalStates';

const ScholarUploadedDocument = (props) => {
    const { userAuth } = useAuthStore();

  return (
    <>
        <div className="card latest-update-card p-0">
            <div className="card-header p-3">
                <h6>Recent Uploaded Documents</h6>
                <div className="card-header-right">
                </div>
            </div>
            <div className="card-body scrollable-div p-0 m-0 scrollable-list">
                <div className={`latest-update-box  ${props?.isLoading? 'list-loading':''}`}>
                    
                <table className="table table-hover table-responsive-sm document-card-table">
                    {props?.data?.length > 0 && (
                        <thead>
                            <tr>
                                <th scope="col">Scholar</th>
                                <th scope="col">Scholarship</th>
                                <th scope="col">Document For</th>
                                <th scope="col">Document</th>
                                <th scope="col">Status</th>
                            </tr>
                        </thead>
                    )}

                    <tbody>
                    {props?.data?.length > 0 ?  
                        props?.data.map((documentData) => (
                            <tr key={documentData.id} tabIndex={documentData.id} className={`cursor-pointer`}  onClick={props.handleListSelect}>
                                <td >{userAuth.first_name} {userAuth.last_name}</td>
                                <td>{userAuth.scholarship_name}</td>
                                <td>{documentData.document_for}</td>
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
            </div>
        </div>
    </>
  )
}

export default ScholarUploadedDocument;