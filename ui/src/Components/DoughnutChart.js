import React, { useState, useEffect } from 'react';
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

const DoughnutChart = () => {
  const [inventoryData, setInventoryData] = useState([]);

  let j1Count = 0;
  let j2Count = 0;
  let j3Count = 0;
  let j4Count = 0;
  let j5Count = 0;
  let j6Count = 0;
  let j8Count = 0;

  useEffect(() => {
    const getInventoryData = async () => {
      const response = await axios.get('http://localhost:8080/inventory');
      const data = await response.data;
      setInventoryData(data);
    }
    getInventoryData();
  }, [])
  //console.log(inventoryData)

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
    }
  })

  const data = {
    labels: ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J8'],
    datasets: [
      {
        label: 'Total Devices Signed Out',
        data: [j1Count, j2Count, j3Count, j4Count, j5Count, j6Count, j8Count],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(0, 255, 132, 0.2)',
          'rgba(54, 0, 235, 0.2)',
          'rgba(255, 69, 0, 0.2)',
          'rgba(176, 196, 222, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(0, 255, 132, 1)',
          'rgba(54, 0, 235, 1)',
          'rgba(255, 69, 0, 1)',
          'rgba(176, 196, 222, 1)'
        ],
        hoverBackgroundColor: [
          'rgba(255,0,0,.5)',
          'rgba(0,0,255,.5)',
          'rgba(255,255,0,.5)',
          'rgba(0, 255, 12, 0.5)',
          'rgba(5, 0, 235, 0.5)',
          'rgba(255, 69, 0, 0.5)',
          'rgba(176, 196, 222, 0.5)'
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
            navigate({ pathname: '/device_type', search: '?device_type=Laptop' })
          } else if (element[0].index === 1) {
            navigate({ pathname: '/device_type', search: '?device_type=Cell Phone' })
          } else if (element[0].index === 2) {
            navigate({ pathname: '/device_type', search: '?device_type=Television' })
          }
        }
      }} data={data} />
    </Chart >
  );
}

export default DoughnutChart;