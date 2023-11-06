import React from "react";
import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import InventoryTable from "./InventoryTable";
import Navbar from "./Navbar";
import UserView from "./UserView";
import UserContext from "./UserContext";

const LayoutDiv = styled.div`
  padding: 2%;
  display: flex;
  justify-content: space-between;
`;

export default function Directorates(props) {
  const [deviceCards, setDeviceCards] = useState([]);
  const location = useLocation();
  const [refresh, setRefresh] = useState(false)

  const { isAdmin } = useContext(UserContext);
  const { handleIsAdmin } = useContext(UserContext);

  const url = `http://localhost:8080/dir_query${location.state.search}`;

  useEffect(() => {
    async function getQueryResults() {
      const response = await fetch(url);
      const data = await response.json();
      setDeviceCards(data);
    }
    getQueryResults();
  }, [url, refresh]);

  const handleRefresh = () => {
    setRefresh(!refresh)
}
  
  return (
    <>
      {isAdmin ? <InventoryTable isAdmin={!isAdmin} data={deviceCards} change={handleRefresh} />:<UserView isAdmin={isAdmin} data={deviceCards} />}
    </>
  );
}
