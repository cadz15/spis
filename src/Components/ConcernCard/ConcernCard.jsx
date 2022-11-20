import React from 'react';
import './ConcernCard.css';

const ConcernCard = () => {
  return (
    <div className="card latest-update-card p-0">
        <div className="card-header p-3">
            <h6>Queries And Concerns</h6>
            <div className="card-header-right">
            </div>
        </div>
        <div className="card-body p-0 m-0 ">
            <div className="latest-update-box ">
                
            <table className="table table-hover document-card-table">
                <tbody>
                    <tr>
                        <td>
                        <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3048/3048127.png" alt="User-Profile-Image" />
                        </td>
                        <td>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe, quaerat facere et dolor culpa similique totam voluptatum iste ducimus sunt, aut nam nisi eaque amet voluptate asperiores, aspernatur illum molestias.
                        </td>
                    </tr>
                    <tr>
                        <td>
                        <img className="avatar" src="https://cdn-icons-png.flaticon.com/512/3048/3048127.png" alt="User-Profile-Image" />
                        </td>
                        <td>
                            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Fugiat, dolorum libero vitae consequuntur aliquam rerum animi architecto ullam reprehenderit voluptates voluptatem veritatis praesentium quas corporis omnis. Nihil quo recusandae deleniti?
                        </td>
                    </tr>
                </tbody>
            </table>
                
            </div>
            <div className="text-center">
                <a href="#!" className="b-b-primary text-primary">View all Query/Concern</a>
            </div>
        </div>
    </div>
  )
}

export default ConcernCard;