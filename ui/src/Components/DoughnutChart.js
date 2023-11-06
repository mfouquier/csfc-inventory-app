import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut, getDatasetAtEvent } from 'react-chartjs-2';
import styled from 'styled-components';
import axios from 'axios';

ChartJS.register(ArcElement, Tooltip, Legend)

const Chart = styled.div`
display: flex;
height: 25rem;
width: 60rem;
margin: 2rem;
margin-right: 10rem;
justify-content: right;
`

const DoughnutChart = (props) => {
  const [inventoryData, setInventoryData] = useState([]);
  const navigate = useNavigate();
  const [isAdmin, setIsAdmin] = useState(props.isAdmin);
  const changeState = props.change;

  let j1Count = 0;
  let j2Count = 0;
  let j3Count = 0;
  let j4Count = 0;
  let j5Count = 0;
  let j6Count = 0;
  let j8Count = 0;
  let cmdtCount = 0;
  let cgCount = 0;
  let potffCount = 0;
  let jogcCount = 0;

  useEffect(() => {
    const getInventoryData = async () => {
      const response = await axios.get('http://localhost:8080/inventory');
      const data = await response.data;
      setInventoryData(data);
    }
    getInventoryData();
  }, [])

  inventoryData.forEach(obj => {
    if (obj.directorate === 'J1') {
      j1Count++
    } else if (obj.directorate === 'J2') {
      j2Count++
    } else if (obj.directorate === 'J3') {
      j3Count++
    } else if (obj.directorate === 'J4') {
      j4Count++
    } else if (obj.directorate === 'J5') {
      j5Count++
    } else if (obj.directorate === 'J6') {
      j6Count++
    } else if (obj.directorate === 'J8') {
      j8Count++
    } else if (obj.directorate === 'CMDT') {
      cmdtCount++
    } else if (obj.directorate === 'CG') {
      cgCount++
    } else if (obj.directorate === 'POTFF') {
      potffCount++
    } else if (obj.directorate === 'JOG-C') {
      jogcCount++
    }
  })

  const data = {
    labels: ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J8', 'CMDT', 'CG', 'POTFF', 'JOG-C'],
    datasets: [
      {
        label: 'Total Devices Signed Out',
        data: [j1Count, j2Count, j3Count, j4Count, j5Count, j6Count, j8Count, cmdtCount, cgCount, potffCount, jogcCount],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(0, 255, 132, 0.2)',
          'rgba(54, 0, 235, 0.2)',
          'rgba(255, 69, 0, 0.2)',
          'rgba(176, 196, 222, 0.2)',
          'rgba(25, 220, 105, 0.2)',
          'rgba(235, 15, 198, 0.2)',
          'rgba(38, 205, 232, 0.2)',
          'rgba(154, 150, 35, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(0, 255, 132, 1)',
          'rgba(54, 0, 235, 1)',
          'rgba(255, 69, 0, 1)',
          'rgba(176, 196, 222, 1)',
          'rgba(25, 220, 105, 1)',
          'rgba(235, 15, 198, 1)',
          'rgba(38, 205, 232, 1)',
          'rgba(154, 150, 35, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(255,0,0,.5)',
          'rgba(0,0,255,.5)',
          'rgba(255,255,0,.5)',
          'rgba(0, 255, 12, 0.5)',
          'rgba(5, 0, 235, 0.5)',
          'rgba(255, 69, 0, 0.5)',
          'rgba(176, 196, 222, 0.5)',
          'rgba(25, 220, 105, 0.5)',
          'rgba(235, 15, 198, 0.5)',
          'rgba(38, 205, 232, 0.5)',
          'rgba(154, 150, 35, 0.5)'
        ],
        borderWidth: 1,
      },
    ],
  };


  return (
    <Chart>
      <Doughnut options={{
        onClick: function (event, element) {
          if (element[0].index === 0) {
            navigate('/Directorates', { state: {search: '?directorate=J1', isAdmin: isAdmin} })
          } else if (element[0].index === 1) {
            navigate('/Directorates', { state: {search: '?directorate=J2', isAdmin: isAdmin} })
          } else if (element[0].index === 2) {
            navigate('/Directorates', { state: {search: '?directorate=J3', isAdmin: isAdmin} })
          } else if (element[0].index === 3) {
            navigate('/Directorates', { state: {search: '?directorate=J4', isAdmin: isAdmin} })
          } else if (element[0].index === 4) {
            navigate('/Directorates', { state: {search: '?directorate=J5', isAdmin: isAdmin} })
          } else if (element[0].index === 5) {
            navigate('/Directorates', { state: {search: '?directorate=J6', isAdmin: isAdmin} })
          } else if (element[0].index === 6) {
            navigate('/Directorates', { state: {search: '?directorate=J8', isAdmin: isAdmin} })
          } else if (element[0].index === 7) {
            navigate('/Directorates', { state: {search: '?directorate=CMDT', isAdmin: isAdmin} })
          } else if (element[0].index === 8) {
            navigate('/Directorates', { state: {search: '?directorate=CG', isAdmin: isAdmin} })
          } else if (element[0].index === 9) {
            navigate('/Directorates', { state: {search: '?directorate=POTFF', isAdmin: isAdmin} })
          } else if (element[0].index === 10) {
            navigate('/Directorates', { state: {search: '?directorate=JOG-C', isAdmin: isAdmin} })
          }
        }
      }} data={data} />
    </Chart >
  );
}

export default DoughnutChart;