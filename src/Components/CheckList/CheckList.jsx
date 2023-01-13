import React, { useState } from 'react';
import { BsCheckLg } from 'react-icons/bs';
import { GrClose } from 'react-icons/gr';
import CheckListModal from '../CheckListModal/CheckListModal';

const CheckList = (props) => {
    const [showModal, setShowModal] = useState(false);

    const onClose = (e) => {
        if(e.currentTarget === e.target) setShowModal(false);
    }


  return (
    <>  
        <CheckListModal show={showModal} forceClose={()=> setShowModal(false)} onClose={onClose} scholar_history_id={props.scholar_history_id} year={props.year} semester={props.semester} />

        {props.noData === true && (
            <div className="alert alert-danger" role="alert">
                This scholar has no data or not added to qualified for this academic year or semester.
            </div>
        )}



        <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Document Checklist</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 ">
            <div className={`latest-update-box  ${props.isLoading? 'list-loading':''}`}>
                {props?.data?.qualified === 1 && (
                    <div className="alert alert-success" role="alert">
                        This Scholar is already completed the requirements and qualified.
                    </div>
                )}
                
            <table className="table table-hover document-card-table">
                {props?.dataList?.length > 0 && (
                    <thead>
                        <tr>
                            <th scope="col">Requirement</th>
                            <th scope="col">Status</th>
                        </tr>
                    </thead>
                )}

                <tbody>
                    {Object.keys(props?.data)?.length > 0 ?  
                        Object.entries(props?.data?.checkList).map((requirement, status) => (                            
                        <tr key={requirement} tabIndex={requirement} className={`cursor-pointer`} >
                            <td >{requirement[0]}</td>
                            <td ><span className={`document-${requirement[1]}`}>{requirement[1] !== 'approved'? <GrClose />: <BsCheckLg />}</span></td>
                        </tr>
                    ))
                    :
                    (
                    <tr>
                        <td>
                            <div className='empty-list'>
                                No Requirements!
                            </div>
                        </td>
                    </tr>
                    )
                    } 
                    
                </tbody>
            </table>
                
            </div>
            <div className="text-center px-2 pb-2">
                {(props?.data?.isQualified === true && props?.data?.qualified === 0) && (
                     <button className='btn btn-success form-control col-sm-12 py-3' onClick={() => setShowModal(true)}>Qualify and Create</button>
                )}
            </div>
        </div>
    </div>
    </>
  )
}

export default CheckList;