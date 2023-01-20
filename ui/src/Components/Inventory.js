import React, {useEffect, useState} from 'react';
import axios from 'axios';
import DoughnutChart from './DoughnutChart';
import InventoryTable from './InventoryTable';

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
           <DoughnutChart data={inventoryData} />
           <InventoryTable data={inventoryData} />
        </>
    )
}

export default Inventory;