import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import styled from 'styled-components';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const Chart = styled.div`
    display: flex;
    height: 25rem;
    width: 60rem;
    margin: 2rem;
    margin-left: 5rem;
`

const labels = ['J1', 'J2', 'J3', 'J4', 'J5', 'J6', 'J8', 'CMDT', 'CG', 'POTFF', 'JOG-C'];


const BarChart = (dataSet) => {
  const directorateData = [];
  const j1 = [];
  const j2 = [];
  const j3 = [];
  const j4 = [];
  const j5 = [];
  const j6 = [];
  const j8 = [];
  const cmdt = [];
  const cg = [];
  const potff = [];
  const jogc = [];

  for (let element in dataSet.data) {
    let directorate = {
      directorate: dataSet.data[element].directorate,
      boi: dataSet.data[element].boi
    }
    if (directorate.directorate === 'J1') j1.push(directorate);
    else if (directorate.directorate === 'J2') j2.push(directorate);
    else if (directorate.directorate === 'J3') j3.push(directorate);
    else if (directorate.directorate === 'J4') j4.push(directorate);
    else if (directorate.directorate === 'J5') j5.push(directorate);
    else if (directorate.directorate === 'J6') j6.push(directorate);
    else if (directorate.directorate === 'J8') j8.push(directorate);
    else if (directorate.directorate === 'CMDT') cmdt.push(directorate);
    else if (directorate.directorate === 'CG') cg.push(directorate);
    else if (directorate.directorate === 'POTFF') potff.push(directorate);
    else if (directorate.directorate === 'JOG-C') jogc.push(directorate);
    else directorateData.push(directorate)
  }

  const j1Count = j1.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const j2Count = j2.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const j3Count = j3.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const j4Count = j4.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const j5Count = j5.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const j6Count = j6.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const j8Count = j8.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const cmdtCount = cmdt.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const cgCount = cg.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const potffCount = potff.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})

  const jogcCount = jogc.reduce((acc, curr) => {
    return acc[curr.boi] ? ++acc[curr.boi] : acc[curr.boi] = 1, acc
  }, {})



  return (
    <Chart>
      <Bar
        data={{
          labels,
          datasets: [
            {
              label: 'BOI Kit',
              data: [j1Count.true, j2Count.true, j3Count.true, j4Count.true, j5Count.true, j6Count.true, j8Count.true, cmdtCount.true, cgCount.true, potffCount.true, jogcCount.true],
              borderColor: 'rgb(255, 99, 132)',
              hoverBackgroundColor: '#e63946',
              backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
              label: 'Non-BOI Kit',
              data: [j1Count.false, j2Count.false, j3Count.false, j4Count.false, j5Count.false, j6Count.false, j8Count.false, cmdtCount.false, cgCount.false, potffCount.false, jogcCount.false],
              borderColor: 'rgb(53, 162, 235)',
              hoverBackgroundColor: '#1d3557',
              backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
          ],
        }} />
    </Chart>
  );
}

export default BarChart;