import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import './DocumentCard.css';

const DocumentCard = () => {
    const [dataList, setDataList] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const  fetchData = async () => {
        setIsLoading(true);

        await fetch(`api/link`) //change for API LINK
        
        .then((response) => {
            if (!response.ok) {
                throw new Error(
                `This is an HTTP error: The status is ${response.status}`
                );
            }
            return response.json();
        })
        
        .then((actualData) => setDataList(actualData))
        
        .catch((err) => {
            console.log(err.message);
        })
        .finally(()=> {
            setIsLoading(false);
        });
    }

    useEffect(() => {
        // fetchData()
    }, [])


  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Recent Uploaded Documents</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 ">
            <div className={`latest-update-box  ${isLoading? 'list-loading':''}`}>
                
            <table className="table table-hover document-card-table">
                {dataList.length > 0 && (
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
                {dataList.length > 0 ?  
                     dataList.map((documentData, index) => (
                        <tr key={index} >
                            <th scope="row">{documentData.scholarName}</th>
                            <td>{documentData.scholarship}</td>
                            <td>{documentData.documentName}</td>
                            <td>{documentData.documentStatus}</td>
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