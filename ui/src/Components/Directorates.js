import React from "react";
import { useState, useEffect, useContext } from "react";
import Table from "@mui/material/Table";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import InventoryTable from "./InventoryTable";
import Navbar from "./Navbar";

const LayoutDiv = styled.div`
  padding: 2%;
  display: flex;
  justify-content: space-between;
`;

export default function Directorates() {
  const [deviceCards, setDeviceCards] = useState([]);
  const location = useLocation();

  console.log(location.search);
  const url = `http://localhost:8080/dir_query${location.search}`;

  useEffect(() => {
    async function getQueryResults() {
      const response = await fetch(url);
      const data = await response.json();
      setDeviceCards(data);
    }
    getQueryResults();
  }, [url]);

  console.log(deviceCards);

  return (
    <>
      <Navbar />
      <InventoryTable data={deviceCards} />
    </>
  );
}
