import React from 'react';
import { SiGooglescholar } from 'react-icons/si';
import './ScholarCard.css';

const ScholarCard = (props) => {
  return (
    <div className="card card-radius support-bar overflow-hidden p-0">
        <div className="card-body bg-white pb-3 d-flex align-items-center justify-content-between">
            <div>
                <h2 className={`text-${props.cardType}`}>{props.data.scholars_count}</h2>
                <span >Active Scholar of {props.data.scholarship_name}</span>
            </div>
            
            <div className={`text-${props.cardType} fs-1`}>
                <SiGooglescholar />
            </div>
        </div>
        <div id="support-chart1"></div>
        <div className={`card-footer bg-${props.cardType} text-white`}>
            <div className="row align-items-center">
                <div className="col-9">
                    <p className="text-white m-b-0">{props.data.scholarship_name} total scholar <strong>{props.data.scholars_count}</strong></p>
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