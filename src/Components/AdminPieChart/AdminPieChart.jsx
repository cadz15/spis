import React, { useState } from 'react';
import {Chart, ArcElement, Tooltip, Legend } from 'chart.js';
import { getElementAtEvent } from 'react-chartjs-2';
import { useRef } from 'react';
import axios from 'axios';
import useAuthStore from '../../Store/globalStates';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AdminPieChart = (props) => {
    const chartRef = useRef();
    const {jwt_token } = useAuthStore();
    const [myChart, setMyChart] = useState(null);
    const [scholarshipName, setScholarshipName] = useState(null);
    const navigate = useNavigate();
    Chart.register(ArcElement, Tooltip, Legend);


    const handleOnClick = (event) => {
        // console.log(myChart, event);
        let element = getElementAtEvent(myChart, event);
        if(element.length > 0){
            console.log(element, scholarshipName[element[0].index]);
            navigate(`/admin/reports?scholarship=${scholarshipName[element[0].index]}`);
        }
    }

    const fetchData = async() => {
        await axios.get(`${process.env.REACT_APP_API_LINK}/scholarship/totalScholars`, 
        { headers: {
            "Authorization" : `Bearer ${jwt_token}`,
            'Accept' : 'application/json',
            'Content-Type': 'application/json',
            'withCredentials': 'true'
            }
        }
        )
        .then((response) => {
            // console.log(response.data);
            if(response.data.status){
                const labels = response.data.total.map((total) => {
                    return total.scholarship_name;
                });
                setScholarshipName(labels);

                const data = response.data.total.map((total) => {
                    return total.scholars_count;
                });

                let borderColor = [];
                let backgroundColor = [];

                response.data.total.map((total) => {
                    let color = Math.floor(Math.random()*16777215).toString(16).match(/.{1,2}/g);
                    var aRgb = [
                        parseInt(color[0], 16),
                        parseInt(color[1], 16),
                        parseInt(color[2], 16)
                    ];

                    borderColor.push(`rgba(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]}, 1)`);
                    backgroundColor.push(`rgba(${aRgb[0]}, ${aRgb[1]}, ${aRgb[2]}, 0.4)`);
                })

               
                if (myChart) {
                    myChart.data = {labels: labels, datasets: [{data: data, backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: 1}]};
                    myChart.update();
                } else {
                    setMyChart(new Chart(document.getElementById("chart"), {
                      type: "pie",
                      options: {},
                      data: {labels: labels, datasets: [{data: data, backgroundColor: backgroundColor, borderColor: borderColor, borderWidth: 1}]}
                    }))
                }
            }

        })
        .catch((error) => console.log(error));
    }

    useEffect(() => {
        fetchData()
    }, []);

  return (
    <>
        <div className="card latest-update-card p-0">
            <div className="card-header p-3">
                <h6>Total Scholars</h6>
                <div className="card-header-right">
                </div>
            </div>
            <div className="card-body p-0 m-0  d-flex justify-content-center">
                <canvas id={`chart`} ref={chartRef} onClick={handleOnClick}/>
            </div>
        </div>
    </>
  )
}

export default AdminPieChart;