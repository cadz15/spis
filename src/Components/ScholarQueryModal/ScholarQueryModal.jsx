import React from 'react';

const ScholarQueryModal = (props) => {

    const handleCloseModal = (e) => {
        props.onClose(e);
    }


    if (!props.show) return null;


  return (
    <div className="modal " onClick={handleCloseModal}>
        <div className="modal-dialog">
            <div className="modal-content">
                <div className="modal-header">
                    <h1 className="modal-title fs-5">View Replies</h1>
                    <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <div className="modal-body">
                    <div className="row">
                        <div className='col-sm-12'>
                            <h6>Query/Concern</h6>
                            <p>
                                {props?.data[0].details}
                            </p>
                        </div>
                    </div>
                    <hr />
                    <div className="row">
                        <div className='col-sm-12'>
                            <h6>{props?.data[0].replies_count} Replies</h6>

                            <table className={`table table-hover event-list-table  `}>
                                <tbody>          
                                    {props?.data[0].replies.length > 0 ? 
                                        props?.data[0].replies.map((repliesData) => (
                                            <tr key={repliesData.id} className="cursor-pointer">
                                                <td className='px-4'>
                                                    <div className='event-list-body col-md-12'>
                                                        {repliesData.reply}
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    : 
                                    (
                                        <tr>
                                            <td>No Reply</td>
                                        </tr>
                                    )
                                    }                    
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="modal-footer d-flex justify-content-between">
                  <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Close</button>                
                </div>
            </div>
        </div>
    </div>
  )
}

export default ScholarQueryModal;