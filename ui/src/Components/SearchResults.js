import React, { useContext } from "react";
import { useLocation } from "react-router-dom";
import SearchResultCard from "./SearchResultCard";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Navbar from "./Navbar";
import UserContext from "./UserContext";

export default function SearchResults(props) {
  const location = useLocation();
  const searchData = location.state;
  const { isAdmin } = useContext(UserContext);
  const { handleIsAdmin } = useContext(UserContext);

  return (
    <>
      <Container>
        <Grid container spacing={3} sx={{ display: "flex", flexWrap: "wrap" }}>
          {searchData.map((data) => (
            <Grid
              container
              item
              key={data.id}
              xs={6}
              sm={4}
              sx={{ justifyContent: "space-around" }}
            >
              <SearchResultCard asset={data} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
}
