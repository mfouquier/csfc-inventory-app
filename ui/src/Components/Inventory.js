import React, { useEffect, useState } from 'react';
import axios from 'axios';
import DoughnutChart from './DoughnutChart';
import InventoryTable from './InventoryTable';
import BarChart from './BarChart';
import styled from 'styled-components';
import Navbar from './Navbar';
import AddKit from './AddKit';


const HomePage = styled.div`
  display: flex;
  flex-direction: wrap;
  justify-content: center;
`

const Inventory = () => {
    const [inventoryData, setInventoryData] = useState([]);

    useEffect(() => {
        const getInventoryData = async () => {
            const response = await axios.get('http://localhost:8080/inventory');
            const data = await response.data;
            setInventoryData(data);
        }
        getInventoryData();
    }, [])
    return (
        <>
            <Navbar />
            <HomePage>
                <BarChart data={inventoryData} />
                <DoughnutChart data={inventoryData} />
            </HomePage>
            <InventoryTable data={inventoryData} />
        </>
    )
}

export default Inventory;