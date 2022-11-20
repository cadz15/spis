import React from 'react';
import { SiGooglescholar } from 'react-icons/si';
import './ScholarCard.css';

const ScholarCard = ({cardType = 'primary'}) => {
  return (
    <div className="card card-radius support-bar overflow-hidden p-0">
        <div className="card-body bg-white pb-3 d-flex align-items-center justify-content-between">
            <div>
                <h2 className={`text-${cardType}`}>350</h2>
                <span >Active Scholar of CHED</span>
            </div>
            
            <div className={`text-${cardType} fs-1`}>
                <SiGooglescholar />
            </div>
        </div>
        <div id="support-chart1"></div>
        <div className={`card-footer bg-${cardType} text-white`}>
            <div className="row align-items-center">
                <div className="col-9">
                    <p className="text-white m-b-0">CHED total scholar <strong>300</strong></p>
                </div>
                <div className="col-3 text-right">
                    <i className="feather icon-trending-up text-white f-16"></i>
                </div>
            </div>
        </div>
    </div>
  )
}

export default ScholarCard;