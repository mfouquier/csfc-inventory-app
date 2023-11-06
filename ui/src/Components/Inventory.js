import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import DoughnutChart from "./DoughnutChart";
import InventoryTable from "./InventoryTable";
import BarChart from "./BarChart";
import styled from "styled-components";
import Navbar from "./Navbar";
import AddKit from "./AddKit";
import UserView from "./UserView";
import UserContext from "./UserContext";

const HomePage = styled.div`
  display: flex;
  flex-direction: wrap;
  justify-content: center;
`;

const Inventory = () => {
  const [inventoryData, setInventoryData] = useState([]);
  const [refresh, setRefresh] = useState(false);

  const handleRefresh = () => {
    setRefresh(!refresh);
  };

  const { isAdmin } = useContext(UserContext);
  const { handleIsAdmin } = useContext(UserContext);

  useEffect(() => {
    const getInventoryData = async () => {
      const response = await axios.get("http://localhost:8080/inventory");
      const data = await response.data;
      setInventoryData(data);
    };
    getInventoryData();
  }, [refresh]);
  return (
    <>
      <HomePage>
        <BarChart data={inventoryData} />
        <DoughnutChart
          data={inventoryData}
          isAdmin={isAdmin}
          change={handleRefresh}
        />
      </HomePage>
      {isAdmin ? (
        <InventoryTable
          isAdmin={!isAdmin}
          data={inventoryData}
          change={handleRefresh}
        />
      ) : (
        <UserView isAdmin={isAdmin} data={inventoryData} />
      )}
    </>
  );
};

export default Inventory;
