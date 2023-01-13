import React, { useRef, useState } from 'react';
import {Chart, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { getElementAtEvent, Line } from 'react-chartjs-2';
import useAuthStore from '../../Store/globalStates';
import axios from 'axios';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const AdminBarChart = () => {
    const chartRef = useRef();
    const { jwt_token } = useAuthStore();
    const [scholarsData, setScholarsData] = useState([]);
    const [myChartLine, setMyChartLine] = useState(null);
    const navigate = useNavigate();
    
    Chart.register(CategoryScale,
        LinearScale,
        PointElement,
        LineElement,
        Title,
        Tooltip,
        Legend);

    const fetchData = async() => {
        await axios.get(`${process.env.REACT_APP_API_LINK}/scholars/semesterScholar`, 
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
                const labels = response.data.academic_year.map((academic_year) => {
                    return academic_year.academic_year;
                });
                setScholarsData(labels);

                let data = {};

                let data1stSem = [];

                response.data.data1stSem.map((data) => {
                    data1stSem[data.academic_year] = data.total1stSemester;
                });

                let data2ndSem = [];

                response.data.data2ndSem.map((data) => {
                    data2ndSem[data.academic_year] = data.total2ndSemester;
                });

                data.datasets = [
                    {
                        label: '1st Semester', 
                        data: labels.map((academic_year) => {
                            return data1stSem[academic_year]? data1stSem[academic_year]: 0;
                        }),
                        borderColor: 'rgb(255, 99, 132)',
                        backgroundColor: 'rgba(255, 99,132, 0.5)'
                    },
                    {
                        label: '2nd Semester', 
                        data: labels.map((academic_year) => {
                            return data2ndSem[academic_year]? data2ndSem[academic_year]: 0;
                        }),
                        borderColor: 'rgb(53, 162, 235)',
                        backgroundColor: 'rgba(53, 162, 235, 0.5)',
                    }
                ];

                if (myChartLine) {
                    myChartLine.data = {labels: labels, datasets: [data.datasets]};
                    myChartLine.update();
                } else {                      
                    setMyChartLine(new Chart(document.getElementById("chartLine"), {
                        type: "line",
                        options: {
                          responsive: true,
                          plugins: {
                              legend: {
                                  position: 'top',
                              },
                              title: {
                                  display: true,
                                  text: 'Scholars per Academic Year'
                              }
                          }
                      },
                          data: {labels: labels, datasets: [ 
                              {
                                  label: data.datasets[0].label,
                                  data: data.datasets[0].data,
                                  borderColor: 'rgb(255, 99, 132)',
                                  backgroundColor: 'rgba(255, 99,132, 0.5)'
                              },
                              {
                                  label: data.datasets[1].label,
                                  data: data.datasets[1].data,
                                  borderColor: 'rgb(53, 162, 235)',
                                  backgroundColor: 'rgba(53, 162, 235, 0.5)',
                              },
                              
                          ]}
                      }));
                }
            }

        })
        .catch((error) => console.log(error));
    }

    const handleOnClick = (event) => {
        let element = getElementAtEvent(myChartLine, event);
        if(element.length > 0){
            navigate(`/admin/reports?academic_year=${scholarsData[element[0].index]}&semester=${element[0].datasetIndex === 0? '1st Semester' : '2nd Semester'}`);
        }
    }

    useEffect(()=>{
        fetchData();
    }, []);

    return (
      <>
          <div className="card latest-update-card p-0">
              <div className="card-header p-3">
                  <h6>Scholars per Academic Year</h6>
                  <div className="card-header-right">
                  </div>
              </div>
              <div className="card-body p-0 m-0 d-flex justify-content-center ">
                <canvas id={`chartLine`} ref={chartRef} onClick={handleOnClick}/>
              </div>
          </div>
      </>
    )
}

export default AdminBarChart;